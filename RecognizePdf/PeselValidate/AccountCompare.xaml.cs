﻿using Microsoft.VisualBasic.FileIO;
using Microsoft.Win32;
using RecognizePdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Media;

namespace PeselValidate
{
    public class AccountListModel
    {
        public static readonly string PADZOKON02 = "PADZOKON02";
        public static readonly string PADKO00001 = "PADKO00001";

        public int Index { get; set; }

        public int StartPage { get; set; }

        public int EndPage { get; set; }

        public int ComparePage { get; set; }

        public string ClientName { get; set; } = "";

        public bool HasClientName => !string.IsNullOrEmpty(ClientName);

        public bool HasClientNameOnSecondPage { get; set; }

        public bool HasAllPageIndex { get; set; }

        public bool HasClientNameAfterPageIndex { get; set; }

        public int ErrorCount => new[] {
            !HasClientName ||
            !HasClientNameOnSecondPage ||
            !HasAllPageIndex ||
            !HasClientNameAfterPageIndex }
        .Where(a => a)
            .Count();

        public bool HasErrors => ErrorCount > 0;

        public string PagesRange => $"Strony {StartPage}/{EndPage}";

        public SolidColorBrush Color
        {
            get
            {
                if (HasErrors)
                {
                    SolidColorBrush brush = new SolidColorBrush();
                    brush.Color = Colors.Red;
                    return brush;
                }
                else
                {
                    SolidColorBrush brush = new SolidColorBrush();
                    brush.Color = Colors.Black;
                    return brush;
                }
            }
        }

        public string Summary
        {
            get
            {
                var sb = new StringBuilder();

                if (!HasClientName)
                {
                    return "Nie znalazłem nazwy klienta!";
                }

                if (!HasClientNameOnSecondPage)
                {
                    sb.AppendLine("Nie ma nazwy klienta na drugiej stronie!");
                }

                if (!HasAllPageIndex)
                {
                    sb.AppendLine($"Nie wszystkie strony zestawienia zawierają {PADZOKON02} lub {PADKO00001}");
                }

                if (!HasClientNameAfterPageIndex)
                {
                    sb.AppendLine("Strona po zestawieniu nie zawiera imienia klienta");
                }

                return sb.ToString();
            }
        }
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

            //ResultList.Items.Clear();
            //ResultList.Items.Add(new AccountListModel
            //{
            //    ClientName = "Łukasz Wójcik",
            //    StartPage = 10,
            //    EndPage = 20
            //});
            //ResultList.Items.Add(new AccountListModel
            //{
            //    ClientName = "Ola Wójcik",
            //    StartPage = 10,
            //    EndPage = 20,
            //    HasAllPageIndex = true,
            //    HasClientNameAfterPageIndex = true,
            //    HasClientNameOnSecondPage = true,
            //});
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
            var resultList = new List<AccountListModel>();
            foreach (var item in LoadedRecords)
            {
                try
                {
                    var clientPages = PdfDocumentText
                        .Skip(item.StartPage)
                        .Take(item.EndPage - item.StartPage)
                        .ToArray();

                    var clientName = clientPages[0]
                        .ReadLineByLine()
                        .Skip(4)
                        .FirstOrDefault();

                    if (!item.HasClientName)
                    {
                        continue;
                    }

                    var sb = new StringBuilder();

                    var linesWithNames = clientPages
                        .SelectMany((cp, i) => LinesWithNames(cp.ReadLineByLine().ToArray(), clientName)
                        .Select(c => $"S:{i},L:{c}"))
                        .ToArray();

                    var pagesWithNameIndex = clientPages
                       .Select((cp, i) => LinesWithNames(cp.ReadLineByLine().ToArray(), clientName).Any() ? i : -1)
                       .Where(p => p > 0)
                       .ToArray();

                    foreach (var indexName in pagesWithNameIndex)
                    {
                        var path = Path.Combine(DocumentPath, $"{clientName}_{indexName}.txt");
                        File.WriteAllText(path, clientPages[indexName]);
                    }

                    sb.Append(string.Join(", ", linesWithNames) + " ");
                    item.HasClientNameOnSecondPage = ContainsName(clientPages[2].ReadLineByLine().ToArray(), 5, clientName);

                    var findTokenExpression = new Func<string, bool>((pageText) => pageText.Contains(AccountListModel.PADZOKON02) || pageText.Contains(AccountListModel.PADKO00001));
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


                    item.HasAllPageIndex = allTokens;
                    //if (allTokens)
                    //{
                    //    sb.Append($"Wszystkie strony od {item.StartPage + orderPageFirstIndex} do {item.StartPage + orderPageLastIndex} mają index zestawienia ");
                    //}

                    item.HasClientNameAfterPageIndex = ContainsName(clientPages[orderPageLastIndex + 2].ReadLineByLine().ToArray(), 10, clientName);
                    //if (clientPages.Length > orderPageLastIndex + 3)
                    //{
                    //    if (ContainsName(clientPages[orderPageLastIndex + 2].ReadLineByLine().ToArray(), 10, clientName))
                    //    {
                    //        sb.Append($"{item.StartPage + orderPageLastIndex + 2} strona zawiera imię ");
                    //    }
                    //    else
                    //    {
                    //        sb.Append($"{item.StartPage + orderPageLastIndex + 2} NIE strona zawiera imienia ");
                    //    }
                    //}
                    //else
                    //{
                    //    var path = Path.Combine(DocumentPath, $"{clientName}.txt");
                    //    File.WriteAllText(path, clientPages[orderPageLastIndex + 2]);
                    //}

                    //item.ClientName = sb.ToString();

                    resultList.Add(item);
                }
                catch (Exception e)
                {
                    item.ClientName = e.Message + e.StackTrace;
                    resultList.Add(item);
                }
            }

            ResultList.Items.Clear();
            foreach (var item in resultList.OrderByDescending(r => r.ErrorCount))
            {
                ResultList.Items.Add(item);
            }
        }
    }
}
