// 상수설정
SIZE_RANGE = 6;

// 캔버스요소 가져오기  
var canvas = document.getElementById("p-canvas");

// 사각형을 그리는 함수
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

// 모든 사각형을 지우고 새로 그려주는 함수
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

// 


// 데이터 복사해주는 함수 (data[i]에 target을 복사해서 넣는데 사용됨)
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

// 마우스 위치를 잡기위한 변수
elem = document.querySelector('canvas');
canvasX = 0;
canvasY = 0;
isPress = false;

// 마우스 움직일때의 이벤트 함수
// 캔버스 내에서의 마우스 위치 잡기
function mousemove(event){
    let rect = elem.getBoundingClientRect();
    
    tempX = event.clientX - rect.x;
    tempY = event.clientY - rect.y;
    
    moveX = tempX - canvasX;
    moveY = tempY - canvasY;
    
    canvasX = tempX;
    canvasY = tempY;
    
    // console.log('move:', moveX, moveY);
    // console.log('offset', canvasX, canvasY);
    
    // 마우스 클릭상태인지 체크
    if (isPress == true){
        // 캔버스 내부인지 체크
        // 캔버스 크기가 고정일때만 정상작동됨 -> 크기가 바뀌어도 작동하려면 비율계산식 추가필요
        if (rect.x <= event.clientX & event.clientX <= (rect.x + rect.width) & rect.y <= event.clientY & event.clientY <= (rect.y + rect.height)){
            // 타겟 사각형 안쪽인지 확인
            if (target['x'] < canvasX & canvasX < (target['x'] + target['w']) & target['y'] < canvasY & canvasY < (target['y'] + target['h'])){
                // 마우스 움직임만큼 크기 더하기
                target['x'] += moveX;
                target['y'] += moveY;
    
                data = dataCopy(data, target);
                draw(data);
            }


            // 타겟의 외곽선인지 확인
            // 왼쪽선
            if (target['x'] - SIZE_RANGE < canvasX & canvasX < target['x'] + SIZE_RANGE) {
                target['x'] += moveX;
                target['w'] -= moveX;

                data = dataCopy(data, target);
                draw(data);
            }

            // 오른쪽선
            if (target['x'] + target['w'] - SIZE_RANGE < canvasX & canvasX < target['x'] + target['w'] + SIZE_RANGE) {
                target['w'] += moveX;

                data = dataCopy(data, target);
                draw(data);
            }

            // 위쪽선
            if (target['y'] - SIZE_RANGE < canvasY & canvasY < target['y'] + SIZE_RANGE) {
                target['y'] += moveY;
                target['h'] -= moveY;

                data = dataCopy(data, target);
                draw(data);
            }

            // 아래쪽선
            if (target['y'] + target['h'] - SIZE_RANGE < canvasY & canvasY < target['y'] + target['h'] + SIZE_RANGE) {
                target['h'] += moveY;

                data = dataCopy(data, target);
                draw(data);
            }

            // 솔직히 꼭지점은 귀찮은데 안하면 안되려나

        }
    }
}

// 마우스 클릭시 이벤트 함수
function mousedown(event){
    isPress = true;
    // 해당 위치 확인후 마우스 모양과 작동 바꾸기
}

// 마우스 클릭 해제시 이벤트 함수
function mouseup(event){
    isPress = false;
}


// 이벤트 추가
window.addEventListener('mousedown', mousedown);
window.addEventListener('mouseup', mouseup);
window.addEventListener('mousemove', mousemove);

// ?
function getDateObject(key, value) {
    if (key === 'date') return new Date(value);
    return value;
}