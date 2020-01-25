using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RecognizePdf
{
    public static class PdfToText
    {
        public static IEnumerable<string> GetPagesText(string filePath)
        {
            using (var pdfReader = new PdfReader(filePath))
            {
                var pages = pdfReader.NumberOfPages;
                var builder = new StringBuilder();

                for (var i = 0; i < pages; i++)
                {
                    var page = pdfReader.GetPageContent(i + 1);
                    var text = PdfTextExtractor.GetTextFromPage(pdfReader, i + 1);
                    yield return text;
                }

            }
        }

        public static string GetText(string filePath)
        {
            return string.Join("", GetPagesText(filePath));
        }
    }
}
