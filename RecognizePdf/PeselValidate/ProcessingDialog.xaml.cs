using Microsoft.Win32;
using PeselValidate.Models;
using RecognizePdf;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Windows;

namespace PeselValidate
{
    /// <summary>
    /// Logika interakcji dla klasy ProcessingDialog.xaml
    /// </summary>
    public partial class ProcessingDialog : Window
    {
        public ProcessingDialog()
        {
            InitializeComponent();
        }

        public static IEnumerable<PdfFileModel> LoadPdfFiles()
        {
            var openFileDialog = new OpenFileDialog
            {
                Filter = "PDF (*.pdf)|*.Pdf",
                Multiselect = true,
                InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)
            };

            if (openFileDialog.ShowDialog() == true)
            {
                foreach (var fileName in openFileDialog.FileNames)
                {
                    Thread.Sleep(500);
                    yield return new PdfFileModel { FileName = fileName, FileContent = PdfToText.GetText(fileName) };
                }
            }
        }
    }
}
