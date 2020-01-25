using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using System.Text;

namespace RecognizePdf
{
    public static class PdfToText
    {
        public static string GetText(string filePath)
        {
            using (var pdfReader = new PdfReader(filePath))
            {
                var pages = pdfReader.NumberOfPages;
                var builder = new StringBuilder();

                for (var i = 0; i < pages; i++)
                {
                    var page = pdfReader.GetPageContent(i + 1);
                    var text = PdfTextExtractor.GetTextFromPage(pdfReader, i + 1);
                    builder.Append(text);
                }

                return builder.ToString();
            }
        }
    }
}
