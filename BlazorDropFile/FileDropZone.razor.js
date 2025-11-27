export class FileDropZone {
    constructor() {
        console.log("new");
        this.dotNetHelper = null;
        this.droppableClass = 'droppable';
        this.dragoverClass = 'dragover';
        this.datasetname = 'droppableid';
        this.callbackfunction = null;
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    highlight(e) {
        if (e.dataTransfer.types && e.dataTransfer.types[0] != "Files") return;
        if (e.target.classList.contains(this.droppableClass) === false) {
            e.dataTransfer.dropEffect = "none";
            return;
        }
        e.dataTransfer.dropEffect = "copy";
        e.target.classList.add('dragover');
    }

    unhighlight(e) {
        if (e.dataTransfer.types && e.dataTransfer.types[0] != "Files") return;
        if (e.target.classList.contains(this.droppableClass) === false) return;
        e.target.classList.remove('dragover');
    }
    async handleDrop(e) {
        if (e.dataTransfer.types && e.dataTransfer.types[0] != "Files") return;
        if (e.target.classList.contains(this.droppableClass) === false) return;
        const dt = e.dataTransfer;
        const files = dt.files;

        const fileList = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const base64 = await this.readFileAsBase64(file);
            fileList.push({
                name: file.name,
                type: file.type,
                size: file.size,
                htmlelementdata: e.target.dataset[this.datasetname],
                content: base64
            });
        }

        await this.dotNetHelper.invokeMethodAsync(this.callbackfunction, fileList);
    }
    readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // Remove data URL prefix (e.g., "data:image/png;base64,")
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    initialize(dropZoneElement, dropZoneElementDataSetName, droppableClass, dragoverClass, dotNetHelper, callbackfunction) {
        console.log(this.droppableClass);
        this.dotNetHelper = dotNetHelper;
        this.datasetname = dropZoneElementDataSetName;
        this.droppableClass = droppableClass;
        this.dragoverClass = dragoverClass;
        this.callbackfunction = callbackfunction;
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZoneElement.addEventListener(eventName, this.preventDefaults.bind(this), false);
            //document.body.addEventListener(eventName, preventDefaults, false);
        });

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZoneElement.addEventListener(eventName, this.highlight.bind(this), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZoneElement.addEventListener(eventName, this.unhighlight.bind(this), false);
        });

        // Handle dropped files
        dropZoneElement.addEventListener('drop', this.handleDrop.bind(this), false);

    }
    uninitialize(dropZoneElement) {
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZoneElement.removeEventListener(eventName, this.preventDefaults, false);
            //document.body.removeEventListener(eventName, preventDefaults, false);
        });


        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZoneElement.removeEventListener(eventName, this.highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZoneElement.removeEventListener(eventName, this.unhighlight, false);
        });


        // Handle dropped files
        dropZoneElement.removeEventListener('drop', this.handleDrop, false);
        this.dotNetHelper.dispose();
        this.dotNetHelper = null;
        this.droppableClass = null;
        this.dragoverClass = null;
        this.callbackfunction = null;
    }
}

export function createFileDropZoneInstance() {
    return new FileDropZone();
}
//export default new FileDropZone();

//let dotNetHelper;
//let droppableClass;
//let callbackfunction;
//function preventDefaults(e) {
//    e.preventDefault();
//    e.stopPropagation();
//}
//function highlight(e) {
//    if (e.target.classList.contains(droppableClass) === false) {
//        e.dataTransfer.dropEffect = "none";
//        return;
//    }
//    e.dataTransfer.dropEffect = "copy";
//    e.target.classList.add('dragover');
//}

//function unhighlight(e) {
//    if (e.target.classList.contains(droppableClass) === false) {
//        return;
//    }
//    e.target.classList.remove('dragover');
//}
//async function handleDrop(e) {
//    if (e.target.classList.contains(droppableClass) === false) {
//        return;
//    }
//    const dt = e.dataTransfer;
//    const files = dt.files;

//    const fileList = [];
//    for (let i = 0; i < files.length; i++) {
//        const file = files[i];
//        const base64 = await readFileAsBase64(file);
//        fileList.push({
//            name: file.name,
//            type: file.type,
//            size: file.size,
//            content: base64
//        });
//    }

//    dotNetHelper.invokeMethodAsync(callbackfunction, fileList);
//}
//function readFileAsBase64(file) {
//    return new Promise((resolve, reject) => {
//        const reader = new FileReader();
//        reader.onload = () => {
//            // Remove data URL prefix (e.g., "data:image/png;base64,")
//            const base64 = reader.result.split(',')[1];
//            resolve(base64);
//        };
//        reader.onerror = reject;
//        reader.readAsDataURL(file);
//    });
//}
//export function initialize(dropZoneElement, droppableClass, dotNetHelper, callbackfunction) {
//    console.log(droppableClass);
//    dotNetHelper = dotNetHelper;
//    droppableClass = droppableClass;
//    callbackfunction = callbackfunction;
//    // Prevent default drag behaviors
//    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//        dropZoneElement.addEventListener(eventName, preventDefaults, false);
//        //document.body.addEventListener(eventName, preventDefaults, false);
//    });

//    // Highlight drop zone when item is dragged over it
//    ['dragenter', 'dragover'].forEach(eventName => {
//        dropZoneElement.addEventListener(eventName, highlight, false);
//    });

//    ['dragleave', 'drop'].forEach(eventName => {
//        dropZoneElement.addEventListener(eventName, unhighlight, false);
//    });

//    // Handle dropped files
//    dropZoneElement.addEventListener('drop', handleDrop, false);

//}
//export function uninitialize(dropZoneElement) {
//    // Prevent default drag behaviors
//    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
//        dropZoneElement.removeEventListener(eventName, preventDefaults, false);
//        //document.body.removeEventListener(eventName, preventDefaults, false);
//    });


//    // Highlight drop zone when item is dragged over it
//    ['dragenter', 'dragover'].forEach(eventName => {
//        dropZoneElement.removeEventListener(eventName, highlight, false);
//    });

//    ['dragleave', 'drop'].forEach(eventName => {
//        dropZoneElement.removeEventListener(eventName, unhighlight, false);
//    });


//    // Handle dropped files
//    dropZoneElement.removeEventListener('drop', handleDrop, false);
//    dotNetHelper = null;
//    droppableClass = null;
//    callbackfunction = null;
//}