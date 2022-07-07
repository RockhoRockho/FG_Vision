$(document).ready(function () {
    new ToCSV()
    $('#dtable').DataTable({
        lengthChange: false,
        info: false,
        lengthMenu: [7]
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
        $('#onoff').html('자동감지중')
    }
})

$('tr').click(function () {
    $('#onoff').css('background-color', 'green')
    $('#onoff').html('자동감지 시작')
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
class ToCSV {
    constructor() {
        // CSV 버튼에 이벤트 등록
        document.querySelector('#csvDownloadButton').addEventListener('click', e => {
            e.preventDefault()
            this.getCSV('mycsv.csv')
        })
    }

    downloadCSV(csv, filename) {
        let csvFile;
        let downloadLink;

        const BOM = "\uFEFF"
        csv = BOM + csv

        // CSV 파일을 위한 Blob 만들기
        csvFile = new Blob([csv], {type: "text/csv"})

        // Download link를 위한 a 엘리먼스 생성
        downloadLink = document.createElement("a")

        // 다운받을 csv 파일 이름 지정하기
        downloadLink.download = filename;

        // 위에서 만든 blob과 링크를 연결
        downloadLink.href = window.URL.createObjectURL(csvFile)

        // 링크가 눈에 보일 필요는 없으니 숨겨줍시다.
        downloadLink.style.display = "none"

        // HTML 가장 아래 부분에 링크를 붙여줍시다.
        document.body.appendChild(downloadLink)

        // 클릭 이벤트를 발생시켜 실제로 브라우저가 '다운로드'하도록 만들어줍시다.
        downloadLink.click()
    }

    getCSV(filename) {
        // csv를 담기 위한 빈 Array를 만듭시다.
        const csv = []
        const rows = document.querySelectorAll("#mytable tr")

        for (let i = 0; i < rows.length; i++) {
            const row = [], cols = rows[i].querySelectorAll("td, th")

            for (let j = 0; j < cols.length; j++)
                row.push(cols[j].innerText)

            csv.push(row.join(","))
        }

        // Download CSV
        this.downloadCSV(csv.join("\n"), filename)
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

// var btn = document.querySelector("#button");
// btn.addEventListener("click", function (e) {
//     this.setAttribute("disabled", "disabled");
// })

// $(document).ready(function () {
//     $('#button').on('click', function (e) {
//         $('#' + e.target.id).unbind('click');
//         console.log(e.target.id + '이 버튼이 클릭이 되었고 이제 이 버튼은 비활성화 됩니다.')
//     });
// });

// $(document).ready(function () {
//     $('.button').on('click', function () {
//         alert('클릭이 되었습니다.');
//         var form = document.topython;
//         form.submit();
//         // $('.button').attr("disabled",true);
//     });
// });

// $('button[type=submit]').one('submit', function() {
//     $(this).attr('disabled','disabled');
// });

// $(document).ready(function () {
//     $('.button').on('click', function () {
//         // alert('클릭이 되었습니다.');
//         // document.getElementById("toPython").submit();
//         document.getElementById('button').style.visibility = 'hidden';
//     });
// });

// $("#button").unbind("click");
// $("#button").bind("click", function () {
//     alert("click event");
// });

//     $("#button").attr('disabled', 'disabled')
// function onFileUpload() {
//     $("#button").attr('disabled', 'enabled')
// }

// $(function(){
//     $("#input_file").change(function(){
//         $("#button").style('display', 'block')
//     })
// })

// const fileEvent = (e) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//         console.log('파일 업로드 완료.');
//     };
//     reader.readAsText(e.target.files[0]);
// }

// $fileItem.addEventListener('change', fileEvent);

$('#input_file').click(function () {
    alert('dasdsadsadsadasdsadsa')
    $('#button').removeAttr('disabled')
    // $("#button").css('display', 'block')
})