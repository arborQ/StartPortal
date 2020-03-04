using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Reflection;
using iTextSharp.text.pdf;
using iTextSharp.text;

namespace OrangeEdit
{
    public static class Function1
    {
        [FunctionName("Function1")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            try
            {
                using (var oldFile = GetBaseFile())
                {
                    using (var newFile = new MemoryStream())
                    {

                        PdfReader reader = new PdfReader(oldFile);
                        Rectangle size = reader.GetPageSizeWithRotation(1);
                        Document document = new Document(size);

                        // open the writer
                        PdfWriter writer = PdfWriter.GetInstance(document, newFile);
                        document.Open();

                        //// the pdf content
                        //PdfContentByte cb = writer.DirectContent;

                        //// select the font properties
                        //BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                        //cb.SetColorFill(BaseColor.DARK_GRAY);
                        //cb.SetFontAndSize(bf, 8);

                        //// write the text in the pdf content
                        //cb.BeginText();
                        //string text = "Some random blablablabla...";
                        //// put the alignment and coordinates here
                        //cb.ShowTextAligned(1, text, 520, 640, 0);
                        //cb.EndText();
                        //cb.BeginText();
                        //text = "Other random blabla...";
                        //// put the alignment and coordinates here
                        //cb.ShowTextAligned(2, text, 100, 200, 0);
                        //cb.EndText();

                        //// create the new page and add it to the pdf
                        //PdfImportedPage page = writer.GetImportedPage(reader, 1);
                        //cb.AddTemplate(page, 0, 0);

                        var byteResult = ReadFully(newFile);
                        var result = new FileContentResult(byteResult, "application/pdf")
                        {
                            FileDownloadName = "Export.pdf"
                        };

                        // close the streams and voilá the file should be changed :)
                        document.Close();
                        newFile.Close();
                        writer.Close();
                        reader.Close();

                        return result;
                    }
                }

                return null;
                //var byteResult = ReadFully(newfile);
                //var result = new FileContentResult(byteResult, "application/pdf")
                //{
                //    FileDownloadName = "Export.pdf"
                //};
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(e.Message);
            }
            //log.LogInformation("C# HTTP trigger function processed a request.");

            //string name = req.Query["name"];

            //string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            //dynamic data = JsonConvert.DeserializeObject(requestBody);
            //name = name ?? data?.name;

            //return name != null
            //    ? (ActionResult)new OkObjectResult($"Hello, {name}")
            //    : new BadRequestObjectResult("Please pass a name on the query string or in the request body");
        }

        private static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }

        private static Stream GetBaseFile()
        {
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "OrangeEdit.deklaracja.pdf";
            //var names = assembly.GetManifestResourceNames();
            return assembly.GetManifestResourceStream(resourceName);
        }
    }
}
