using System.Windows;

namespace PeselValidate
{
    /// <summary>
    /// Logika interakcji dla klasy CompareResult.xaml
    /// </summary>
    public partial class CompareResult : Window
    {
        public CompareResult(string leftText, string rightText)
        {
            InitializeComponent();
            DiffView.OldText = leftText;
            DiffView.NewText = rightText;
        }
    }
}
