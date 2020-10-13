using System;
using System.IO;
using KattisSolution.IO;

namespace KattisSolution
{
    public class Program
    {
        private static Action<string> Log;

        private static void Main(string[] args)
        {
            Log = (_) => {};
            Solve(Console.OpenStandardInput(), Console.OpenStandardOutput());
        }

        public static void Solve(Stream stdin, Stream stdout)
        {
            if(Log == null) 
            {
                Log = (msg) => Console.WriteLine(msg);
            }

            Log("Solving <%= problem %>. https://open.kattis.com/problems/<%= problem %>");

            //IScanner scanner = new OptimizedPositiveIntReader(stdin);
            // uncomment when you need more advanced reader
            // IScanner scanner = new Scanner(stdin);
            IScanner scanner = new LineReader(stdin);
            var writer = new BufferedStdoutWriter(stdout);

            var input = scanner.Next();
            Log($"Input: {input}");

            writer.Write("answer");
            writer.Write("\n");
            writer.Flush();
        }
    }
}