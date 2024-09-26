id_to_name = {
    1: "미공개",
    2: "SF",
    3: "감성",
    4: "공포",
    5: "기타",
    6: "동화",
    7: "드라마",
    8: "로맨스",
    9: "모험",
    10: "미스터리",
    11: "범죄",
    12: "스릴러",
    13: "아케이드",
    14: "액션",
    15: "에로",
    16: "역사",
    17: "잠입/탈출",
    18: "추리",
    19: "코미디",
    20: "판타지"
}

def get_genre_name(id):
    return id_to_name.get(id, "알 수 없음")

def get_genre_names(id_list):
    return [id_to_name.get(id, "알 수 없음") for id in id_list]