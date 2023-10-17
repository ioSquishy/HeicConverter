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
            document.getElementById("target").innerHTML += `<a target="_blank" href="${url}"><img src="${url}"></a>`;
        })
        .catch((e) => {
            console.log(e);
        });
}

const fileInput = document.getElementById('input');
const convertButton = document.getElementById('convertButton');
function uploadFiles() {
    console.log("files uploaded")
    convertButton.style.backgroundColor = "rgb(228, 227, 145)";
    const files = [...fileInput.files];
    files.forEach(file => {
        convert(file);
    });
    convertButton.style.backgroundColor = "rgb(145, 228, 155)";
}