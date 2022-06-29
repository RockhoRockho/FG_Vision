function preview(event) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = document.createElement("img");
        img.setAttribute("src", event.target.result);
        document.querySelector("div.prepre").appendChild(img).style.width = '300px';
    };

    reader.readAsDataURL(event.target.files[0]);
}

