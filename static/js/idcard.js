$(document).ready(function () {
    new ToCSV()
});
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

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('img-fluid').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('img-fluid').src = "";
    }
}