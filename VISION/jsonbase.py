# json형태의 database를 관리하는 클래스 함수
import json


class JsonBase:
    json_path = None

    # 객체 생성시 path저장
    def __init__(self, path):
        self.json_path = path

    # data 추가 후 저장
    # json_data를 파일로 저장
    # ret의 내림차순으로 정렬해서 저장
    def update_data(self, data):
        with open(self.json_path, 'r', encoding='utf-8') as f:
            json_data = json.load(f)

        json_data.append(data)

        json_data = sorted(json_data, key=(lambda x: x["form_ret"]), reverse=True)

        with open(self.json_path, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent="\t")
        return True

    # title에 해당하는 data 삭제 후 저장
    def delete_data(self, title):
        with open(self.json_path, 'r', encoding='utf-8') as f:
            json_data = json.load(f)

        idx = -1
        for i, data in enumerate(json_data):
            if data["form_title"] == title:
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
        with open(self.json_path, 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        
        if title != "":
            temp = []
            if json_data != []:
                for data in json_data:
                    if data["form_title"] == title:
                        temp.append(data)
                json_data = temp

        if ret != "":
            temp = []
            if json_data != []:
                max_date = 0
                for data in json_data:
                    if max_date <= data["form_ret"] <= ret:
                        max_date = data["form_ret"]
                        temp = data
                json_data = temp
        else:
            json_data = sorted(json_data, key=(lambda x: x["form_ret"]), reverse=True)

        return json_data

    # 모든 데이터
    # title로 정렬해서 리턴
    def all_data(self):
        with open(self.json_path, 'r', encoding='utf-8') as f:
            json_data = json.load(f)
        json_data = sorted(json_data, key=(lambda x: x['form_title']))
        return json_data
