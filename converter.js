function convert(file) {
    console.log("file converting");
    fetch(URL.createObjectURL(file))
        .then((res) => res.blob())
        .then((blob) => heic2any({
            blob,
            toType:"image/png",
            quality: 1
        }))
        .then((conversionResult) => {
            var url = URL.createObjectURL(conversionResult);
            download(url);
        })
        .catch((e) => {
            console.log(e);
            window.alert(e.message);
            download(null);
        });
}

const fileInput = document.getElementById('input');
const convertButton = document.getElementById('convertButton');
const progress = document.getElementById("progress");
var filesToDownload = 0;
var filesDownloaded = 0;
var currentlyDownloading = false;
function uploadFiles() {
    console.log("files uploaded")
    if (currentlyDownloading) {
        window.alert("Wait until all your currently downloading files have been downloaded!");
        return;
    } else {
        currentlyDownloading = true;
    }
    const files = [...fileInput.files];
    filesToDownload = files.length;
    convertButton.style.backgroundColor = "rgb(228, 227, 145)";
    let progText = "Files Downloaded: 0/" + filesToDownload;
    progress.innerText = progText;
    files.forEach(file => {
        convert(file);
    });
}

function download(url) {
    console.log("downloadingg");
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    filesDownloaded++;
    let progText = "Files Downloaded: " + filesDownloaded + "/" + filesToDownload;
    progress.innerText = progText;
    if (filesDownloaded >= filesToDownload) {
        convertButton.style.backgroundColor = "rgb(145, 228, 155)";
        filesDownloaded = 0;
        currentlyDownloading = false;
    }
}

fileInput.onchange = () => {
    convertButton.style.backgroundColor = "rgb(145, 214, 228)";
};