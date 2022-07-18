# 프로젝트명 : FG_VISION

## 개요 : 공공기관 문서 OCR 및 신분증 인식 웹사이트 입니다.

### 기간 : 2022.06.24 ~ 2022.07.19

### 팀명 : Project FG

### 팀원 : 

 * (조장)이준영 :  전체 총괄 및 손글씨 전처리 및 VGG10, VGG16, ResNet152, SE-ResNet50 모델학습

 * 유원준 : 전체 디자인 및 백엔드 서비스 구축 

 * 정연교 : Pytesseract를 이용한 신분증 인식 서비스 구축

 * 김두원 : 손글씨 모델을 이용한 문서 인식 서비스 구축

 * 강재원 : Canvas를 이용한 json 양식 추가 서비스 및 제작 tool  구축

### 사용기술 : 
 1) 데이터 : AIhub(한국어 글자체 이미지), mnist / Model - VGG10, VGG16, ResNet152, SE-ResNet50
 2) 개발 환경 : Jupyter Notebook, VScode, Sqlite3
 3) 개발 언어 : Python, Javascript, Jquery, HTML, CSS
 4) 개발 라이브러리 : Django, Tensorflow, Pandas, pytesseract, OpenCV, canvas


## 손 글씨 인식 모델

![alt text](https://github.com/RockhoRockho/FG_Vision/blob/main/rmimg/rm1.JPG?raw=true)

◆ 26만개 이상의 손글씨, 인쇄체 한글이미지와 7만개의 손글씨 숫자이미지를  사용하여 학습진행

◆ VGG10, VGG16, ResNet50, SE-ResNet50 모델을 사용함

◆ 최종적으로 가장 성능이 좋은 SE-ResNet50으로 95%의 정확도를 끌어올렸고 0.39의 loss값을 도출해냄


## 관공서에 손 글씨 인식 모델 적용 후 결과

![alt text](https://github.com/RockhoRockho/FG_Vision/blob/main/rmimg/rm2.JPG?raw=true)

◆ 양식선택을 하지않고 적용하기를 클릭 시 자동으로 양식의 이름(주민등록표)를 인식 후 저장된 데이터와 매칭 후 분석할  영역 표시

◆ 양식 선택 후 적용하기 클릭 시 자동감지 표시가 꺼지면서 선택된 양식의 분석영역을 미리보기에 표시

![alt text](https://github.com/RockhoRockho/FG_Vision/blob/main/rmimg/rm3.JPG?raw=true)


## 관공서 양식 추가 기능

![alt text](https://github.com/RockhoRockho/FG_Vision/blob/main/rmimg/rm4.JPG?raw=true)

## 신분증/여권 인식

![alt text](https://github.com/RockhoRockho/FG_Vision/blob/main/rmimg/rm6.JPG?raw=true)

![alt text](https://github.com/RockhoRockho/FG_Vision/blob/main/rmimg/rm5.JPG?raw=true)

◆ 신분증이나 여권 사진을 첨부한 후, 알맞은 양식을 선택하고 실행 하면 사진 안에 신분증이나 여권의 사각형을 인지합니다.

◆ 사각형 이미지를 인지하고 추출해서 pytesseract로 text를 인식해서  졍규표현식과 각종 indexing을 활용하여 필요한 데이터만 추출해서 CSV파일로 다운로드 할 수 있습니다.




