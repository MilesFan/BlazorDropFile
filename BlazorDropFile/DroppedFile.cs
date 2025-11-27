using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorDropFile
{
    public class DroppedFileBase
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public long Size { get; set; }
        public string? HTMLElementData { get; set; }
    }
    public class DroppedFileBase64 : DroppedFileBase
    {
        public string? Content { get; set; } // Base64 encoded content

    }
    public class DroppedFile : DroppedFileBase
    {
        public byte[] Content { get; set; } = [];
        public static DroppedFile FromBase64(DroppedFileBase64 fileBase64)
        {
            return new DroppedFile
            {
                Name = fileBase64.Name,
                Type = fileBase64.Type,
                Size = fileBase64.Size,
                HTMLElementData = fileBase64.HTMLElementData,
                Content = fileBase64.Content == null ? [] : Convert.FromBase64String(fileBase64.Content)
            };
        }
    }
}
