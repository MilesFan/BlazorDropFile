# Blazor Drop File

A Blazor component for Drop File.

## minimun example
```razor
@using static BlazorDropFile.FileDropZone
<p>@errorMessage</p>
<FileDropZone DataSetName="rowcol" OnFilesDropped="HandleFilesDrop1">
    <table>
        <thead>
            <tr>
                @for (int col = 0; col < Grid1.GetLength(1); col++)
                {
                    <th>Column @col</th>
                }
            </tr>
        </thead>
        <tbody>
            @for (int row = 0; row < Grid1.GetLength(0); row++)
            {
                <tr>
                    @for (int col = 0; col < Grid1.GetLength(1); col++)
                    {
                        <td class="droppable" data-rowcol="@row-@col">
                            @if (Grid1[row, col].File!=null)
                            {
                                var img_type = Path.GetExtension(Grid1[row, col].File!.Name).ToLower();
                                <img style="max-width:100px; max-height: 60px;" src="data:image/@(img_type);base64,@(Convert.ToBase64String(Grid1[row, col].File!.Content))" alt="Red Dot">
                            }
                        </td>
                    }
                </tr>
            }
        </tbody>
    </table>
</FileDropZone>

@code{

    private class GridItem
    {
        public int Row { get; set; }
        public int Column { get; set; }
        public DroppedFile? File { get; set; }
    }

    private GridItem[,] Grid1 = new GridItem[5, 3];
    private string errorMessage = string.Empty;

    protected override void OnInitialized()
    {
        for (int row = 0; row < Grid1.GetLength(0); row++)
        {
            for (int col = 0; col < Grid1.GetLength(1); col++)
            {
                Grid1[row, col] = new GridItem { Row = row, Column = col };
            }
        }
        base.OnInitialized();
    }

    public async Task HandleFilesDrop1(IEnumerable<DroppedFile> files)
    {
        errorMessage = string.Empty;
        if (files.AsQueryable().Any(file =>
            file.Name.EndsWith(".png") == false &&
            file.Name.EndsWith(".jpg") == false &&
            file.Name.EndsWith(".jpeg") == false))
        {
            errorMessage = "accepts only png files";
            return;
        }
        foreach(var file in files)
        {
            var row_col = file.HTMLElementData?.Split('-');
            if (row_col == null || row_col.Length != 2)
                continue;
            var row = int.Parse(row_col[0]);
            var col = int.Parse(row_col[1]);
            Grid1[row, col].File = file;
        }
    }

}
```

## License

Licensed under the MIT License.
