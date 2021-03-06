// 상수설정
SIZE_RANGE = 10;  // 사각형 크기변경가능 범위

// 캔버스요소 가져오기  
var canvas = document.getElementById("p-canvas");

// 사각형을 그리는 함수
function drawRect(d, color) {
    // 드로잉요 컨텍스트 생성
    var a = canvas.getContext("2d");
    // 선 색
    if (color == 'red') {
        a.strokeStyle = "#cc0000";
    } else if (color == 'blue') {
        a.strokeStyle = "#0000cc";
    }
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
    
    // 투명 배경
    a.fillStyle = 'white';
    a.globalAlpha = 0.1;
    a.fillRect(0, 0, canvas.width, canvas.height);
    a.globalAlpha = 1;

    // 그림 그리기
    let temp_cvs = document.querySelector('canvas').getBoundingClientRect()
    a.drawImage(back_img, 0, 0, temp_cvs.width, temp_cvs.height);

    // 사각형 그리기
    for (i=0; i<data.length; i++){
        if (i == target['idx']) {
            drawRect(d[i], 'blue');
        } else {
            drawRect(d[i], 'red');
        }
    }
    // console.log(data);
};
draw(data);

// 데이터 복사해주는 함수 (data[i]에 target을 복사해서 넣는데 사용됨)
function dataCopy(d, t) {
    d[t["idx"]]["x"] = t["x"];
    d[t["idx"]]["y"] = t["y"];
    d[t["idx"]]["w"] = t["w"];
    d[t["idx"]]["h"] = t["h"];
    return d
}


// 표의 내용을 data에 적용
function setDataFromTable(d) {
    table_data = document.getElementById("data-table").getElementsByTagName("tr");
    for (i=0; i<d.length; i++){
        d[i]["label"] = table_data[i+1].getElementsByTagName("td")[0].getElementsByTagName("input")[0].value;
        d[i]["x"] = table_data[i+1].getElementsByTagName("td")[1].getElementsByTagName("input")[0].value;
        d[i]["y"] = table_data[i+1].getElementsByTagName("td")[2].getElementsByTagName("input")[0].value;
        d[i]["w"] = table_data[i+1].getElementsByTagName("td")[3].getElementsByTagName("input")[0].value;
        d[i]["h"] = table_data[i+1].getElementsByTagName("td")[4].getElementsByTagName("input")[0].value;
        d[i]["type"] = table_data[i+1].getElementsByTagName("td")[5].getElementsByTagName("input")[0].value;
    }

    return d
}

// 사각형 크기&위치 변경시 표의 데이터를 수정해주는 함수
function setTabelData(t) {
    const table_tr = document.getElementById("data-table").getElementsByTagName("tr")[t["idx"] + 1];

    table_tr.getElementsByTagName("td")[1].getElementsByTagName("input")[0].value = t["x"];
    table_tr.getElementsByTagName("td")[2].getElementsByTagName("input")[0].value = t["y"];
    table_tr.getElementsByTagName("td")[3].getElementsByTagName("input")[0].value = t["w"];
    table_tr.getElementsByTagName("td")[4].getElementsByTagName("input")[0].value = t["h"];

}

// 테이블 적용시 data적용하고 그리기
function drawTableData(event){
    data = setDataFromTable(data);
    target["x"] = Number(data[target["idx"]]["x"]);
    target["y"] = Number(data[target["idx"]]["y"]);
    target["w"] = Number(data[target["idx"]]["w"]);
    target["h"] = Number(data[target["idx"]]["h"]);
    draw(data);
}

// data를 표에 적용하는 함수
function dataToTable(d){
    // table 클리어
    del_class = document.getElementsByClassName("data_box");
    // console.log(del_class.length);
    for (i=del_class.length - 1; i>=0; i--){
        del_class[i].remove();
    }


    // data를 table에 적용
    parent_node = document.getElementById("data_tr");
    for (i=data.length - 1; i>=0; i--){
        let tr_tag = document.createElement('tr');
        tr_tag.setAttribute('class', 'data_box');
        tr_tag.setAttribute('value', i);
        tr_tag.setAttribute('onclick', 'clickTr(this)');
        parent_node.prepend(tr_tag);

        // td_tags = []
        label_list = ["label", "x", "y", "w", "h", "type"];
        for (j=0; j<6; j++){
            let td_tag = document.createElement('td');
            tr_tag.appendChild(td_tag);

            let input_tag = document.createElement('input');
            if (j == 0 || j == 5){
                input_tag.setAttribute('type', 'text');
            } else {
                input_tag.setAttribute('type', 'number');
            }
            input_tag.setAttribute('class', 'form-control p-1');
            input_tag.setAttribute('value', d[i][label_list[j]]);
            td_tag.appendChild(input_tag);
        }

        let td_tag = document.createElement('td');
        tr_tag.appendChild(td_tag);

        let btn_tag = document.createElement('button');
        btn_tag.setAttribute('class', 'btn btn-light del_tr');
        btn_tag.setAttribute('value', i);
        btn_tag.setAttribute('onclick', 'delTabelData(this.value)');
        btn_tag.innerHTML = "del";

        td_tag.appendChild(btn_tag);
    }


}

// 표가 삭제되면 사각형 다시그려주는 함수
function delTabelData(this_idx){
    temp = data.splice(this_idx, 1);
    dataToTable(data);
    draw(data);
}

// 표에 데이터 추가
function createTableData(){
    // data에 새로운 행 추가
    data.push({ "label": "label", "x": 100, "y": 100, "w": 100, "h": 100, "type": "type" });

    dataToTable(data);
    draw(data);
}

// 테이블 행 클릭시 선택된 사각형 변경해주는 함수 + 선택중인 행 표시
function clickTr(this_tr){
    // 모든 행 선택 풀기
    c = document.getElementsByClassName('data_box');
    for (i=0; i<c.length; i++){
        c[i].setAttribute('class', 'data_box');
    }

    // 선택 행 선택 적용
    this_tr.setAttribute('class', 'data_box table-active');

    // target에 적용
    target['idx'] = Number(this_tr.getAttribute('value'));
    target['x'] = data[target['idx']]['x'];
    target['y'] = data[target['idx']]['y'];
    target['w'] = data[target['idx']]['w'];
    target['h'] = data[target['idx']]['h'];
    draw(data);
}

// submit 버튼

function submitBtn() {
    data = JSON.stringify(data);
    document.getElementById("data_lot").setAttribute('value', data);
    document.getElementById('data_form').submit();
};

// 이미지 추가=
// drawImage(image, x, y, width, height);=
$('#p-canvas')
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

        document.querySelector("#p-canvas").setAttribute("style", "background-image: url(" + window.URL.createObjectURL(files[0]) + "); background-repeat: no-repeat; background-size: cover;");
        
    } else {
        alert('이미지가 아닙니다.');
        return;
    }   
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
    
    
    // 캔버스 내부인지 체크
    // 캔버스 크기가 고정일때만 정상작동됨 -> 크기가 바뀌어도 작동하려면 비율계산식 추가필요
    if (rect.x + SIZE_RANGE <= event.clientX & event.clientX <= (rect.x + rect.width - SIZE_RANGE) & rect.y + SIZE_RANGE <= event.clientY & event.clientY <= (rect.y + rect.height - SIZE_RANGE)){

        // 타겟 사각형 안쪽인지 확인
        if (target['x'] + SIZE_RANGE < canvasX & canvasX < (target['x'] + target['w'] - SIZE_RANGE) & target['y'] + SIZE_RANGE < canvasY & canvasY < (target['y'] + target['h'] - SIZE_RANGE)){

            document.body.style.cursor = "move";

            // 클릭상태인지 체크
            if (isPress == true){
                // 마우스 움직임만큼 크기 더하기
                target['x'] += moveX;
                target['y'] += moveY;

                data = dataCopy(data, target);
                draw(data);
            }
        }

        // 타겟의 외곽선인지 확인
        else if (target['x'] - SIZE_RANGE < canvasX & canvasX < (target['x'] + target['w']) + SIZE_RANGE & target['y'] - SIZE_RANGE < canvasY & canvasY < (target['y'] + target['h']) + SIZE_RANGE){

            // 왼쪽선
            if (target['x'] - SIZE_RANGE < canvasX & canvasX < target['x'] + SIZE_RANGE) {

                document.body.style.cursor = "e-resize";

                // 클릭상태인지 체크
                if (isPress == true){
                    target['x'] = tempX;
                    target['w'] -= moveX;

                    data = dataCopy(data, target);
                    draw(data);
                }
            }

            // 오른쪽선
            if (target['x'] + target['w'] - SIZE_RANGE < canvasX & canvasX < target['x'] + target['w'] + SIZE_RANGE) {

                document.body.style.cursor = "e-resize";

                // 클릭상태인지 체크
                if (isPress == true){
                    target['w'] += moveX;

                    data = dataCopy(data, target);
                    draw(data);
                }
            }

            // 위쪽선
            if (target['y'] - SIZE_RANGE < canvasY & canvasY < target['y'] + SIZE_RANGE) {

                document.body.style.cursor = "n-resize";

                // 클릭상태인지 체크
                if (isPress == true){
                    target['y'] = tempY;
                    target['h'] -= moveY;

                    data = dataCopy(data, target);
                    draw(data);
                }
            }

            // 아래쪽선
            if (target['y'] + target['h'] - SIZE_RANGE < canvasY & canvasY < target['y'] + target['h'] + SIZE_RANGE) {

                document.body.style.cursor = "n-resize";

                // 클릭상태인지 체크
                if (isPress == true){
                    target['h'] += moveY;

                    data = dataCopy(data, target);
                    draw(data);
                }
            }
        } else {
            document.body.style.cursor = "default";
        }
        

        // 테이블과 데이터 값 연동
        setTabelData(target);
        // data = setDataFromTable(data);
        // console.log(data)
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


// 마우스 이벤트 추가
window.addEventListener('mousedown', mousedown);
window.addEventListener('mouseup', mouseup);
window.addEventListener('mousemove', mousemove);

// 테이블 데이터 적용 이벤트 추가
document.getElementById('table_submit').addEventListener('click', drawTableData);



// ?
function getDateObject(key, value) {
    if (key === 'date') return new Date(value);
    return value;
}