from django.shortcuts import render
from .jsonbase import JsonBase

# 사용자 메인 페이지
def vision(request):
    context = {}
    
    return render(request, 'vision.html', context)


# 관리자 메인 페이지
def admin_form_view(request):
    context = {

    }

    # 확인용 임시 test코드 나중에 지울 코드
    f = JsonBase("jsonbase.json")
    temp = {
		"form_title": "313",
		"form_ret": 23344567,
		"lot": [
			{
				"label": "123",
				"x": 123,
				"y": 234,
				"w": 5,
				"h": 6
			},
			{
				"label": "133",
				"x": 12,
				"y": 23,
				"w": 2,
				"h": 8
			}
		]
	}
    f.update_data(temp)
    print(f.search_data("313", ""))
    f.delete_data("313")
    print(f.all_data())


    
    return render(request, 'admin_form_view.html')

# 관리자 양식추가 페이지
def admin_form_make(request):
    context = {

    }
    
    return render(request, 'admin_form_make.html')