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

### 손 글씨 인식 모델

![alt text](https://github.com/RockhoRockho/FG_Vision/blob/main/rmimg/rm1.JPG?raw=true)

◆ 26만개 이상의 손글씨, 인쇄체 한글이미지와 7만개의 손글씨 숫자이미지를  사용하여 학습진행

◆ VGG10, VGG16, ResNet50, SE-ResNet50 모델을 사용함

◆ 최종적으로 가장 성능이 좋은 SE-ResNet50으로 95%의 정확도를 끌어올렸고 0.39의 loss값을 도출해냄

