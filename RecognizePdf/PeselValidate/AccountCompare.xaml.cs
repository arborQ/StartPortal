using Microsoft.VisualBasic.FileIO;
using Microsoft.Win32;
using RecognizePdf;
using System;
using System.Collections.Generic;
using System.IO;
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
        private string DocumentPath { get; set; }
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
                DocumentPath = Path.GetDirectoryName(openFileDialog.FileName);
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
                DocumentPath = Path.GetDirectoryName(openFileDialog.FileName);
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

        private IEnumerable<int> LinesWithNames(string[] lines, string searchName)
        {
            return lines.Select((lineText, index) =>
            {
                var lineParts = searchName.Split(' ');

                if (lineParts.All(lineText.Contains))
                {
                    return index;
                }

                return -1;
            }).Where(c => c > 0);
        }

        private bool ContainsName(string[] lines, int inLine, string searchName)
        {
            return LinesWithNames(lines, searchName).Any(c => c == inLine);
        }

        private void RecalculateData()
        {
            ResultList.Items.Clear();
            foreach (var item in LoadedRecords)
            {
                try
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

                        var linesWithNames = clientPages
                            .SelectMany((cp, i) => LinesWithNames(cp.ReadLineByLine().ToArray(), clientName)
                            .Select(c => $"S:{i},L:{c}"))
                            .ToArray();

                        var pagesWithNameIndex = clientPages
                           .Select((cp, i) => LinesWithNames(cp.ReadLineByLine().ToArray(), clientName).Any() ? i : -1)
                           .Where(p => p > 0)
                           .ToArray();

                        foreach(var indexName in pagesWithNameIndex)
                        {
                            var path = Path.Combine(DocumentPath, $"{clientName}_{indexName}.txt");
                            File.WriteAllText(path, clientPages[indexName]);
                        }

                       sb.Append(string.Join(", ", linesWithNames) + " ");

                        if (ContainsName(clientPages[2].ReadLineByLine().ToArray(), 5, clientName))
                        {
                            sb.Append($"Druga strona zawiera imię ");
                        }
                        else
                        {
                            sb.Append($"Druga NIE strona zawiera imienia ");
                        }
                        var findTokenExpression = new Func<string, bool>((pageText) => pageText.Contains("PADZOKON02") || pageText.Contains("PADKO00001"));
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
                            sb.Append($"Wszystkie strony od {item.StartPage + orderPageFirstIndex} do {item.StartPage + orderPageLastIndex} mają index zestawienia ");
                        }


                        if (clientPages.Length > orderPageLastIndex + 3)
                        {
                            if (ContainsName(clientPages[orderPageLastIndex + 2].ReadLineByLine().ToArray(), 10, clientName))
                            {
                                sb.Append($"{item.StartPage + orderPageLastIndex + 2} strona zawiera imię ");
                            }
                            else
                            {
                                sb.Append($"{item.StartPage + orderPageLastIndex + 2} NIE strona zawiera imienia ");
                            }
                        }
                        else
                        {
                            var path = Path.Combine(DocumentPath, $"{clientName}.txt");
                            File.WriteAllText(path, clientPages[orderPageLastIndex + 2]);
                        }

                        item.ClientName = sb.ToString();
                    }
                    else
                    {
                        item.ClientName = "Nie ma odpowiedniej strony";
                    }

                    ResultList.Items.Add(item);
                }
                catch (Exception e)
                {
                    item.ClientName = e.Message;
                    ResultList.Items.Add(item);
                    Title = e.Message;
                }
            }

        }
    }
}
