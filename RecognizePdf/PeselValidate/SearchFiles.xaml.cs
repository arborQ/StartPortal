using Microsoft.VisualBasic.FileIO;
using Microsoft.Win32;
using RecognizePdf;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Media;

namespace PeselValidate
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class SearchFiles : Window, INotifyPropertyChanged
    {

        public event PropertyChangedEventHandler PropertyChanged;

        private string _searchText;
        public string Search
        {
            get { return _searchText; }
            set
            {
                _searchText = value;
                OnPropertyChanged(nameof(Search));
                OnPropertyChanged(nameof(DisplayResults));
                OnPropertyChanged(nameof(PageTitle));
            }
        }

        public string PageTitle => $"Znaleziono w {DisplayResults.Count(c => c.FindCount > 0)}, {DisplayResults.Sum(c => c.FindCount)} razy";

        protected void OnPropertyChanged(string name)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }

        private IReadOnlyCollection<SearchFileViewModel> _results { get; set; }
        public IReadOnlyCollection<SearchFileViewModel> Results
        {
            get { return _results; }
            set
            {
                _results = value;
                OnPropertyChanged(nameof(DisplayResults));
                OnPropertyChanged(nameof(PageTitle));
            }
        }

        public IReadOnlyCollection<SearchFileViewModel> DisplayResults =>
            Results.Select(r => {
                r.FindCount = Regex.Matches(r.DocumentContent, Search).Count;
                r.Searched = true;
                return r;
            }).ToList();

        public SearchFiles(string defaultSearch = "")
        {
            Results = new List<SearchFileViewModel>();
            Search = defaultSearch;
            InitializeComponent();
            this.DataContext = this;
        }

        private void MenuItem_Click_1(object sender, RoutedEventArgs e)
        {
            var openFileDialog = new OpenFileDialog
            {
                Filter = "PDF (*.pdf)|*.pdf",
                Multiselect = true,
                InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
                RestoreDirectory = true,
            };

            if (openFileDialog.ShowDialog() == true)
            {
                Results = openFileDialog
                    .FileNames
                    .Select(f => new SearchFileViewModel { DocumentName = f })
                    .ToArray();

                Task.Run(async () =>
                {
                    var resultList = new List<SearchFileViewModel>();
                    foreach(var result in Results)
                    {
                        result.DocumentContent = PdfToText.GetText(result.DocumentName);
                        resultList.Add(result);
                    }
                    Results = resultList;
                });
            }
        }
    }

    public class SearchFileViewModel
    {
        public SearchFileViewModel()
        {
            DocumentContent = string.Empty;
        }

        public string DocumentName { get; set; }

        public string DocumentContent { get; set; }

        public string ContainsSearchText
        {
            get
            {
                if (!Searched)
                {
                    return "Przetwarzam...";
                }

                return FindCount > 0 ? $"Znaleziono {FindCount}" : string.Empty;
            }

        }

        public bool Searched { get; set; }

        public int FindCount { get; set; }
    }
}
