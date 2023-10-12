function convert() {
    console.log("ran");
    fetch("2.heic")
        .then((res) => res.blob())
        .then((blob) => heic2any({
            blob,
            toType:"image/png",
            quality: 1
        }))
        .then((conversionResult) => {
            var url = URL.createObjectURL(conversionResult);
            document.getElementById("target").innerHTML = `<a target="_blank" href="${url}"><img src="${url}"></a>`;
        })
        .catch((e) => {
            console.log(e);
        });
}

const fileInput = document.getElementById('input');
function uploadFile() {
}