$(document).ready(function () {
    new ToCSV();
    $("#dtable").DataTable({
        lengthChange: false,
        info: false,
        lengthMenu: [9],
    });
});

function preview(event) {
    $(".preview_img").remove();

    var reader = new FileReader();

    reader.onload = function (event) {
        var img = document.createElement("img");
        img.setAttribute("src", event.target.result);
        img.setAttribute("class", "preview_img");
        document.querySelector("div#preview").appendChild(img);
    };

    reader.readAsDataURL(event.target.files[0]);
}

const InputImage = document.getElementById("input_file");
InputImage.addEventListener("change", (event) => {
    preview(event);
});

$(".form_row").click(function () {
    $(".table-active").not(this).removeClass("table-active");
    var row = $(this).children();
    $(this).toggleClass("table-active");

    if ($("tr").hasClass("table-active")) {
        $("#input_title").attr("value", row[1].innerHTML);
        $("#title_name").html("선택된 양식 : " + row[1].innerHTML);
        // document.getElementById("toPython").submit();
    } else {
        $("#input_title").removeAttr("value");
        $("#title_name").html("선택된 양식 : " + "");
    }
});

$("#onoff").click(function () {
    if ($("tr").hasClass("table-active")) {
        $("#input_title").removeAttr("value");
        $("#title_name").html("선택된 양식 : " + "");
        $(".table-active").not(this).removeClass("table-active");
        $("#onoff").css({
            "background-color": "red",
            border: "3px solid black",
        });
        $("#onoff").html("자동감지중");
    }
});

$("tr").click(function () {
    $("#onoff").css("background-color", "green");
    $("#onoff").html("자동감지 시작");
});

$("#preview")
    .on("dragover", dragOver)
    .on("dragleave", dragOver)
    .on("drop", uploadFiles);

function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.type == "dragover") {
        $(e.target).css({
            "background-color": "black",
            "outline-offset": "-20px",
        });
    } else {
        $(e.target).css({
            "background-color": "white",
            "outline-offset": "-10px",
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
        alert("하나만 올려라.");
        return;
    }
    if (files[0].type.match(/image.*/)) {
        $(".preview_img").remove();

        var img = document.createElement("img");
        img.setAttribute("src", window.URL.createObjectURL(files[0]));
        img.setAttribute("class", "preview_img");
        document.querySelector("div#preview").appendChild(img);
    } else {
        alert("이미지가 아닙니다.");
        return;
    }
}
class ToCSV {
    constructor() {
        // CSV 버튼에 이벤트 등록
        document
            .querySelector("#csvDownloadButton")
            .addEventListener("click", (e) => {
                e.preventDefault();
                this.getCSV("mycsv.csv");
            });
    }

    downloadCSV(csv, filename) {
        let csvFile;
        let downloadLink;

        const BOM = "\uFEFF";
        csv = BOM + csv;

        // CSV 파일을 위한 Blob 만들기
        csvFile = new Blob([csv], {
            type: "text/csv",
        });

        // Download link를 위한 a 엘리먼스 생성
        downloadLink = document.createElement("a");

        // 다운받을 csv 파일 이름 지정하기
        downloadLink.download = filename;

        // 위에서 만든 blob과 링크를 연결
        downloadLink.href = window.URL.createObjectURL(csvFile);

        // 링크가 눈에 보일 필요는 없으니 숨겨줍시다.
        downloadLink.style.display = "none";

        // HTML 가장 아래 부분에 링크를 붙여줍시다.
        document.body.appendChild(downloadLink);

        // 클릭 이벤트를 발생시켜 실제로 브라우저가 '다운로드'하도록 만들어줍시다.
        downloadLink.click();
    }

    getCSV(filename) {
        // csv를 담기 위한 빈 Array를 만듭시다.
        const csv = [];
        const rows = document.querySelectorAll("#mytable tr");

        for (let i = 0; i < rows.length; i++) {
            const row = [],
                cols = rows[i].querySelectorAll("td, th");

            for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        // Download CSV
        this.downloadCSV(csv.join("\n"), filename);
    }
}
$('#loading').hide();
$("#input_file").click(function () {
    // $("#button").click(function () {
    //     $.ajax({
    //         url: "/home/",
    //         data: {
    //             url_catch: $("#input_file").val(),
    //         },
    //         success: function (data) {
    //             $("body").append(data);
    //         },
    //         beforeSend: function () {
    //             $("#wrap-loading").show();
    //         },
    //         complete: function () {
    //             $("#wrap-loading").hide();
    //         },
    //     });
    // });
    $('#toPython').submit(function () {
        $('#loading').show();
        return true;
    });
    $("#button").removeAttr("disabled");
    // $("#button").css('display', 'block')
});