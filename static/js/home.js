$(document).ready(function () {
    $('#dtable').DataTable({
        lengthChange: false,
        info: false
    });
});

function preview(event) {

    $('.preview_img').remove();

    var reader = new FileReader();

    reader.onload = function (event) {
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

$('.form_row').click(function () {
    $('.table-active').not(this).removeClass('table-active');
    var row = $(this).children()
    $(this).toggleClass('table-active');

    if ($('tr').hasClass('table-active')) {
        $('#input_title').attr('value', row[1].innerHTML)
        $('#title_name').html('선택된 양식 : ' + row[1].innerHTML)
        // document.getElementById("toPython").submit();
    } else {
        $('#input_title').removeAttr('value')
        $('#title_name').html('선택된 양식 : ' + '')
    }
})

$('#onoff').click(function () {
    if ($('tr').hasClass('table-active')) {
        $('#input_title').removeAttr('value')
        $('#title_name').html('선택된 양식 : ' + '')
        $('.table-active').not(this).removeClass('table-active')
        $('#onoff').css({
            'background-color': 'red',
            'border': '3px solid black'
        })
        $('#onoff').html('자동감지 off')
    }
})

$('tr').click(function () {
    $('#onoff').css('background-color', 'green')
    $('#onoff').html('자동감지 on')
})

$('#preview')
    .on("dragover", dragOver)
    .on("dragleave", dragOver)
    .on("drop", uploadFiles);

function dragOver(e) {
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

// $('.form_row').click(function(){
//     var input_file = $('#input_file').attr('name')
//     var input_title = $('#input_title').attr('name')
//     // var input_title = $('#input_title')
//     // var from = $('#toPython')[0];
//     // var formData = new FormData(form);
//     // formData.append($("#input_file")[0].files[0]);
//     // formData.append($("#input_title")[0].files[0]);

//     // var formdata = new FormData();
//     // formdata.append(document.querySelector('#input_file').files[0]);
//     // formdata.append(document.querySelector('#input_title').value);

//     $.ajax({
//         type: 'POST',
//         url : '/home/',
//         // data : formdata,
//         data : {'input_fil':input_file, 'input_titl':input_title},

//         success: function(data){
//             alert('tlqkf')
//         }
//     })
// })

// $(document).ready(function () {

//     $(".form_row").click(function () {

//         // var fd = new FormData();
//         var files = $('#input_file')[0].files;

//         // Check file selected or not
//         if (files.length > 0) {
//             fd.append('file', files[0]);

//             $.ajax({
//                 url: '/home/',
//                 type: 'post',
//                 data: {input_file : files},
//                 contentType: false,
//                 processData: false,
//                 success: function (response) {
//                     if (response != 0) {
//                         alert('file uploaded');
//                     } else {
//                         alert('file not uploaded');
//                     }
//                 },
//             });
//         } else {
//             alert("Please select a file.");
//         }
//     });
// });

// function myfunc(){
//     var row = $(this).children()
//     $('#input_title').attr('value', row[1].innerHTML)
//     $('#title_name').html('선택된 양식 : ' + row[1].innerHTML)
//     document.getElementById("toPython").submit();
// }