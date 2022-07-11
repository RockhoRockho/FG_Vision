import cv2
import pytesseract
import numpy as np
import re

def order_points(pta):
    rect = np.zeros((4, 2), dtype=np.float32)
    
    s = pta.sum(axis = 1)
    rect[0] = pta[np.argmin(s)]
    rect[2] = pta[np.argmax(s)]
    
    diff = np.diff(pta, axis = 1)
    rect[1] = pta[np.argmin(diff)]
    rect[3] = pta[np.argmax(diff)]
    
    return rect

#import할거는 여기있는거 지우고 다 views에 넣을 계획
#원래는 파라미터에 img를 넣을 계획인데 현재는 cmd에서 테스트 하고있어서 뺏다
#사진, (민증 0, 여권 1)
def vision2(form2, src):

    src_gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    th, src_bin = cv2.threshold(src_gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    cnts, _ = cv2.findContours(src_bin, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    cnts = sorted(cnts, key = cv2.contourArea, reverse = True)[:5]

    for c in cnts:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)

        if len(approx) == 4:
            global screenCnt
            screenCnt = approx
            break

    rect = order_points(screenCnt.reshape(4, 2))
    (topLeft, topRight, bottomRight, bottomLeft) = rect
    # print(rect)
    # 두개의 너비, 높이 계산
    w1 = abs(bottomRight[0] - bottomLeft[0])
    w2 = abs(topRight[0] - topLeft[0])
    h1 = abs(topRight[1] - bottomRight[1])
    h2 = abs(topLeft[1] - bottomLeft[1])

    # # 최대 너비와 최대 높이 계산
    maxWidth = max([w1, w2])
    maxHeight = max([h1, h2])

    # # 반환할 좌표의 위치 초기화
    dat = np.float32([[0, 0], [maxWidth-1, 0], [maxWidth-1, maxHeight-1], [0, maxHeight-1]])
    M = cv2.getPerspectiveTransform(rect, dat)
    warped = cv2.warpPerspective(src.copy(), M, (int(maxWidth), int(maxHeight)), flags=cv2.INTER_CUBIC)

    #노이즈 캔슬링
    warped = cv2.fastNlMeansDenoisingColored(warped, None, 10, 10, 7, 21)

    #반사광
    warped = cv2.cvtColor(warped, cv2.COLOR_RGB2HSV)
    h, s, v = cv2.split(warped)
    
    clahe = cv2.createCLAHE(clipLimit = 2.0, tileGridSize = (8, 8))
    v = clahe.apply(v)
    
    warped = cv2.merge([h, s, v])
    warped = cv2.cvtColor(warped, cv2.COLOR_HSV2RGB)
    dst_rgb = cv2.cvtColor(warped, cv2.COLOR_BGR2RGB)
    if form2 == 0:
        text = pytesseract.image_to_string(dst_rgb, lang='hangul')
        text = re.sub('[=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\[\]\<\>`\'…》¢]','', text)
        text = re.sub('[a-zA-Z]','', text)
        jnum = re.search('(\d{6}[ ,-]-?[1-4]\d{6})|(\d{6}[ ,-]?[1-4])', text).group()
        text = text.replace(' ', '')
        f = text.split('\n')
        f = [i for i in f if i] 
        for i in range(len(f)):
            jindex = f[i].find(jnum)
            if jindex == 1:
                juso = f[i+1]+f[i+2]+f[i+3]
                balgup = f[i+4]
        final = [{'성명': f[2][0:f[2].index('(')]}, {'주민등록번호': jnum}, {'주소': juso}, {'발급일': balgup}]
    else:
        text = pytesseract.image_to_string(dst_rgb, lang='hangul+eng')
        text = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》¢]','', text)
        pnum = re.search('([a-zA-Z]{1}|[a-zA-Z]{2})\d{8}', text).group()
        text = text.replace(' ', '')
        f = text.split('\n')
        f = [i for i in f if i]
            
        final = [{'여권번호': pnum}, {'성': f[-15]}, {'이름': f[-13]}, {'생년월일': f[-9][0:9]}, {'주민등록번호': f[-9][9:]}, {'성별': f[-7]}, {'발급일': f[-5][0:9]}, {'기간만료일': f[-3][0:9]}]

    return final
