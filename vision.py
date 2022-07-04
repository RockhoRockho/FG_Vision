import sys, os
import tensorflow as tf
import pandas as pd
import cv2
import numpy as np
import csv
import json
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

#import할거는 여기있는거 지우고 다 views에 넣을 계획
#원래는 파라미터에 img를 넣을 계획인데 현재는 cmd에서 테스트 하고있어서 뺏다
def vision():
    final = []
    #json 부르고
    with open('jsonbase.json', encoding='utf-8') as json_file:
        json_data = json.load(json_file)
    
    #사용자가 입력한 이미지 (현재는 테스트를 위해서 임의로 넣어놨다
    img = cv2.imread("./static/img/scan4.jpg")
    img = cv2.resize(img, (2480, 3508))
    #판별된 양식 (현재는 테스트를 위해서 임의로 선언해두었다)
    form = 0
    #label 갯수 만큼 돌리기
    #만약에 해당 좌표에 인식할 문자가 아예 없으면 에러가 떠서 try except로 진행
    for i in range(1, len(json_data[form]['lot'])):
        try:
            w = json_data[form]['lot'][i]['w']
            h = json_data[form]['lot'][i]['h']
            cx = json_data[form]['lot'][i]['cx']
            cy = json_data[form]['lot'][i]['cy']
            label = json_data[form]['lot'][i]['label']
        
            
            img2 = cv2.getRectSubPix(
                        img,
                        patchSize=(w, h),
                        center=(cx, cy),
                )
            img_gray = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
            img_blur = cv2.GaussianBlur(img_gray, (5, 5), 0)

            ret, img_th = cv2.threshold(img_blur, 120, 230, cv2.THRESH_BINARY_INV)

            aaa = cv2.cvtColor(img_th, cv2.COLOR_BGR2RGB)
            
            options = "--psm 4"
            final.append(pytesseract.image_to_string(cv2.cvtColor(img_th, cv2.COLOR_BGR2RGB), config=options, lang='Hangul+eng')
        except:
            pass
    #csv파일 이름은 계속 바꿔줘야된다 안그럼 덮어쓴다
    with open('muyaho3.csv', 'w', encoding='UTF8', newline='') as f:
        writer = csv.writer(f)
        #한줄식 넣는다
        writer.writerows(final)
if __name__ == '__main__':
    vision()