// 캔버스요소 가져오기  
var canvas = document.getElementById("p-canvas");

function drawRect(d) {
    // 드로잉요 컨텍스트 생성
    var a = canvas.getContext("2d");
    // 선 색
    a.strokeStyle = "#cc0000";
    // 선 굵기
    a.lineWidth=2.0;
    // 사각형 그리기
    a.strokeRect(d["x"], d["y"], d["w"], d["h"]);
};

function draw() {
    for (i=0; i<data.length; i++){
        console.log(i);
        drawRect(data[i]);
    }
};
draw();


function dataCopy(target_idx) {
    data[target_idx]["x"] = target["x"]
    data[target_idx]["y"] = target["y"]
    data[target_idx]["w"] = target["w"]
    data[target_idx]["h"] = target["h"]
}

// 먼저 눌린 키를 수신할 이벤트 리스너 필요
document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
 
// 키보드가 눌렸을 때 일어나는 함수 (매개변수: e)
function keyDownHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
        target["x"] = target["x"] + 10;
        dataCopy(target["idx"]);
        draw();
	}
	else if(e.key == 39 || e.key == "ArrowLeft") {
    }
    else if(e.key == 38 || e.key == "ArrowUp") {
    }
    else if(e.key == 40 || e.key == "ArrowDown") {
    }
}
// // 키보드가 안 눌렸을 때 일어나는 함수 (매개변수: e)
// function keyUpHandler(e) {
// 	if(e.key == 37 || e.key == "ArrowRight") {
//     }
//     else if(e.key == 39 || e.key == "ArrowLeft") {
//     }
//     else if(e.key == 38 || e.key == "ArrowUp") {
//     }
//     else if(e.key == 40 || e.key == "ArrowDown") {
//     }
// }

