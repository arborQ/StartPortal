using Microsoft.VisualBasic.FileIO;
using Microsoft.Win32;
using RecognizePdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

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

                // var index = 0;
                // foreach(var pageText in text)
                // {
                //     var pageLines = pageText.ReadLineByLine();
                //     var directory = System.IO.Path.GetDirectoryName(openFileDialog.FileName);
                //     File.WriteAllText($"{directory}/page_{index++}.txt", pageText);
                // }
            }
            //LoadedText = PdfToText.GetText(openFileDialog.FileName);
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
                        ComparePage = int.Parse(line[3]),
                    };
                }
            }
        }

        private void RecalculateData()
        {
            ResultList.Items.Clear();
            foreach (var item in LoadedRecords)
            {
                if (PdfDocumentText.Length > item.StartPage + 1)
                {
                    var clientName = PdfDocumentText[item.StartPage]
                        .ReadLineByLine()
                        .Skip(4)
                        .FirstOrDefault();

                    item.ClientName = string.IsNullOrEmpty(clientName) ? "????" : clientName;
                }
                else
                {
                    item.ClientName = "Nie ma odpowiedniej strony";
                }
                ResultList.Items.Add(item);
            }
        }
    }
}
