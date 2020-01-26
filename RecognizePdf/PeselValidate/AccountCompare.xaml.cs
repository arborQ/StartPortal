using Microsoft.VisualBasic.FileIO;
using Microsoft.Win32;
using RecognizePdf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;

namespace PeselValidate
{
    public class AccountListModel
    {
        public int Index { get; set; }

        public int StartPage { get; set; }

        public int EndPage { get; set; }

        public int ComparePage { get; set; }

        public string ClientName { get; set; } = "";
    }

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class AccountCompare : Window
    {
        private AccountListModel[] LoadedRecords { get; set; }
        private string[] PdfDocumentText { get; set; }

        public AccountCompare()
        {
            PdfDocumentText = new string[0];
            LoadedRecords = new AccountListModel[0];
            InitializeComponent();
        }

        private void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            var openFileDialog = new OpenFileDialog
            {
                Filter = "CSV (*.csv)|*.csv",
                Multiselect = true,
                InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)
            };

            if (openFileDialog.ShowDialog() == true)
            {
                LoadedRecords = ReadCsvModel(openFileDialog.FileName).ToArray();
                RecalculateData();
            }
        }

        private void MenuItem_Click_1(object sender, RoutedEventArgs e)
        {
            var openFileDialog = new OpenFileDialog
            {
                Filter = "PDF (*.pdf)|*.pdf",
                Multiselect = true,
                InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)
            };

            if (openFileDialog.ShowDialog() == true)
            {
                PdfDocumentText = PdfToText.GetPagesText(openFileDialog.FileName).ToArray();
                RecalculateData();
            }
        }

        private IEnumerable<AccountListModel> ReadCsvModel(string path)
        {
            using (var csvParser = new TextFieldParser(path))
            {
                csvParser.SetDelimiters(new string[] { "," });
                while (!csvParser.EndOfData)
                {
                    var line = csvParser.ReadFields();
                    yield return new AccountListModel
                    {
                        Index = int.Parse(line[0]),
                        StartPage = int.Parse(line[1]),
                        EndPage = int.Parse(line[2]),
                        ComparePage = int.Parse(line[3]), // zestawienie
                    };
                }
            }
        }

        private bool ContainsName(string[] lines, int inLine, string searchName)
        {
            if (lines.Length < inLine + 1)
            {
                return false;
            }

            var lineText = lines[inLine];
            var lineParts = searchName.Split(' ');

            return lineParts.All(lineText.Contains);
        }

        private void RecalculateData()
        {
            try
            {

                ResultList.Items.Clear();
                foreach (var item in LoadedRecords)
                {
                    var clientPages = PdfDocumentText
                        .Skip(item.StartPage)
                        .Take(item.EndPage - item.StartPage)
                        .ToArray();

                    if (clientPages.Any())
                    {
                        // czy page 1 jest pusty
                        // czy page 2, linia 5 ma imie
                        // PADZOKONO2 PADKO00001
                        // czy page  6, linia 4 ma imie
                        // czy page 6, Prowadzono dla: imie
                        var clientName = clientPages[0]
                            .ReadLineByLine()
                            .Skip(4)
                            .FirstOrDefault();

                        if (string.IsNullOrEmpty(clientName))
                        {
                            item.ClientName = "Nie znalazłem danych klienta!";
                            continue;
                        }

                        var sb = new StringBuilder();
                        sb.Append($"Nazwa: {clientName} ");

                        if (ContainsName(clientPages[2].ReadLineByLine().ToArray(), 4, clientName))
                        {
                            sb.Append($"Druga strona zawiera imię ");
                        }
                        else
                        {
                            sb.Append($"Druga NIE strona zawiera imienia ");
                        }
                        var findTokenExpression = new Func<string, bool>((pageText) => pageText.Contains("PADZOKONO2") || pageText.Contains("PADKO00001"));
                        var findTokenPredicate = new Predicate<string>(pageText => findTokenExpression(pageText));

                        var orderPageFirstIndex = Array
                            .FindIndex(
                            clientPages,
                            findTokenPredicate);

                        var orderPageLastIndex = Array
                            .FindLastIndex(
                            clientPages,
                            findTokenPredicate);

                        var allTokens = clientPages
                            .Skip(orderPageFirstIndex)
                            .Take(orderPageLastIndex - orderPageFirstIndex)
                            .All(findTokenExpression);

                        if (allTokens)
                        {
                            sb.Append($"Wszystkie strony od {item.StartPage + orderPageFirstIndex} do {item.StartPage + orderPageLastIndex} mają token");
                        }

                        if (clientPages.Length > orderPageLastIndex + 3)
                        {
                            if (ContainsName(clientPages[orderPageLastIndex + 2].ReadLineByLine().ToArray(), 4, clientName))
                            {
                                sb.Append($"{orderPageLastIndex + 2} strona zawiera imię ");
                            }
                            else
                            {
                                sb.Append($"{orderPageLastIndex + 2} NIE strona zawiera imienia ");
                            }
                        }

                        item.ClientName = sb.ToString();
                    }
                    else
                    {
                        item.ClientName = "Nie ma odpowiedniej strony";
                    }

                    ResultList.Items.Add(item);
                }
            }
            catch (Exception e)
            {
                MessageBox.Show(e.Message);
            }
        }
    }
}
