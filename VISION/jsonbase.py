# json형태의 database를 관리하는 클래스 함수
import json


class JsonBase:
    json_path = None

    # 객체 생성시 path저장
    def __init__(self, path):
        self.json_path = path
        with open(self.json_path, 'r') as f:
            json_data = json.load(f)
            print(json_data[0])

    # data 추가 후 저장
    # json_data를 파일로 저장
    # ret의 내림차순으로 정렬해서 저장
    def update_date(self, data):
        with open(self.json_path, 'r') as f:
            json_data = json.load(f)

        json_data.append(data)

        json_data = sorted(json_data, key=(lambda x: x['form_ret']), reverse=True)

        with open(self.json_path, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent="\t")
        return True

    # title에 해당하는 data 삭제 후 저장
    def delete_data(self, title):
        with open(self.json_path, 'r') as f:
            json_data = json.load(f)

        idx = -1
        for i, data in enumerate(json_data):
            if json_data['form_title'] == title:
                idx = i
        
        if i != -1:
            del json_data[idx]
            with open(self.json_path, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, indent="\t")
            return True

        return False

    # data 검색
    # title과 같은것, ret보다 작은것중 가장 큰 것(없으면 가장 큰 것(최근것))
    def search_data(self, title="", ret=""):
        with open(self.json_path, 'r') as f:
            json_data = json.load(f)
        

        if title != "":
            temp = []

        if ret != "":
            temp = []


        if len(json_data) > 0:
            return json_data[0]
        return []

    # 모든 데이터
    # title로 정렬해서 리턴
    def all_data(self):
        with open(self.json_path, 'r') as f:
            json_data = json.load(f)
        json_data = sorted(json_data, key=(lambda x: x['form_title']), reverse=True)
        return json_data
