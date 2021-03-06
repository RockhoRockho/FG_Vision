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

function draw(d) {
    // 캔버스 지우기
    var a = canvas.getContext("2d");
    a.clearRect(0, 0, canvas.width, canvas.height);
    a.beginPath();
    
    // 그리기
    for (i=0; i<data.length; i++){
        drawRect(d[i]);
    }
};
draw(data);


function dataCopy(d, t) {
    d[t["idx"]]["x"] = t["x"];
    d[t["idx"]]["y"] = t["y"];
    d[t["idx"]]["w"] = t["w"];
    d[t["idx"]]["h"] = t["h"];
    return d
}

// 먼저 눌린 키를 수신할 이벤트 리스너 필요
document.addEventListener("keydown", keyDownHandler, false);
 
// 키보드가 눌렸을 때 일어나는 함수 (매개변수: e)
function keyDownHandler(e) {
	if(e.key == 37 || e.key == "ArrowRight") {
        target["x"] = target["x"] + 1;
	}
	else if(e.key == 39 || e.key == "ArrowLeft") {
        target["x"] = target["x"] - 1;
    }
    else if(e.key == 38 || e.key == "ArrowUp") {
        target["y"] = target["y"] - 1;
    }
    else if(e.key == 40 || e.key == "ArrowDown") {
        target["y"] = target["y"] + 1;
    }
    data = dataCopy(data, target);
    draw(data);
}

