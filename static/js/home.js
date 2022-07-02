function preview(event) {

    $('.preview_img').remove();

    var reader = new FileReader();

    reader.onload = function(event) {
        var img = document.createElement("img");
        img.setAttribute("src", event.target.result);
        img.setAttribute("class", "preview_img");
        document.querySelector("div#preview").appendChild(img);
    };

    reader.readAsDataURL(event.target.files[0]);
}

const InputImage = document.getElementById('input_file')
InputImage.addEventListener('change', event => {
    preview(event)
})

$('#preview')
    .on("dragover", dragOver)
    .on("dragleave", dragOver)
    .on("drop", uploadFiles);

function dragOver(e){
    e.stopPropagation();
    e.preventDefault();
    if (e.type == "dragover") {
        $(e.target).css({
        "background-color": "black",
        "outline-offset": "-20px"
        });
    } else {
        $(e.target).css({
        "background-color": "white",
        "outline-offset": "-10px"
        });
        }
}

function uploadFiles(e) {
    e.stopPropagation();
    e.preventDefault();
    dragOver(e);
    
    $(e.target).css({});
    
    e.dataTransfer = e.originalEvent.dataTransfer;
    var files = e.target.files || e.dataTransfer.files;

    if (files.length > 1) {
        alert('하나만 올려라.');
        return;
    }
    if (files[0].type.match(/image.*/)) {

        $('.preview_img').remove();
        
        var img = document.createElement("img");
        img.setAttribute("src", window.URL.createObjectURL(files[0]));  
        img.setAttribute("class", "preview_img");
        document.querySelector("div#preview").appendChild(img);
        
    } else {
        alert('이미지가 아닙니다.');
        return;
    }   
}