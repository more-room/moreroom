from pathlib import Path
import geopandas as gpd
import pandas as pd 
from shapely.geometry import MultiPolygon
from shapely.ops import unary_union
##------------------------------------
from dbutil import mysql_connect, mysql_read_all, mysql_disconnect, mongo_connect, mongo_disconnect, mongo_get_collection, mongo_save_with_delete, mongo_save_many, mongo_read

def get_file_path_if_exists(file_path):
    file = Path(file_path)
    
    if file.exists():
        return str(file.resolve())  
    else:
        return None  
def read_file_p(p):
    r = get_file_path_if_exists(p)
    return [r] 

def read_file():
    paths = [
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_강원특별자치도",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_경기",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_경남",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_경북",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_광주",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_대구",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_대전",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_부산",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_서울",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_세종",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_울산",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_인천",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_전남",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_전북특별자치도",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_제주",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_충남",
               "c:\SSAFY\\3_특화프로젝트\센서스\LARD_ADM_SECT_SGG_충북"
            ]
    
    prefix = "\LARD_ADM_SECT_SGG_"
    folders = ["27"
        "51", 
               "41",
               "48", "47", "29", "27", "30", "26", "11",
               "36", "31", "28", "46", "52", "50", "44", "43"
               ]
    postfix = "_202405"

    extensions = [".cpg", ".dbf", ".prj", ".shp", ".shx"]

    result = [] 
    for i in range(0,len(paths)):
        p = paths[i] + prefix + folders[i] + postfix+".shp"
        r = get_file_path_if_exists(p)
        if r is not None:
            result.append(r)

    return result 

def get_gdp(files):
    data_to_insert = []
    for file in files:
        gdf = gpd.read_file(file)

        for index, row in gdf.iterrows():
            region_code = row['ADM_SECT_C']+"00000"
            region_name = row['SGG_NM']
            geom = row['geometry']

            # Polygon 데이터
            if geom.geom_type == 'Polygon':
                polygon = geom  # 단일 폴리곤일 경우
            elif geom.geom_type == 'MultiPolygon':
                polygon = geom.geoms[0]
            else:
                continue  
            
            polygon_wkt = polygon.wkt
            
            data_to_insert.append((region_code, region_name, polygon_wkt))
    
    print(len(data_to_insert))
    return data_to_insert

def get_gdp_si(files):
    data_to_insert = {}
    for file in files:
        gdf = gpd.read_file(file)

        for index, row in gdf.iterrows():
            region_code = row['ADM_SECT_C']
            if region_code[-1] != "0":
                region_code = region_code[:-1] + "0"  # 마지막 문자가 0이 아니면 0으로 바꾸기
            region_code += "00000"  # 00000을 덧붙임
            
            region_name = row['SGG_NM']
            geom = row['geometry']

            # Polygon 또는 MultiPolygon 처리
            if geom.geom_type == 'Polygon':
                polygons = [geom]  # 단일 폴리곤일 경우 리스트로 저장
            elif geom.geom_type == 'MultiPolygon':
                polygons = list(geom.geoms)  # MultiPolygon의 모든 폴리곤을 리스트로 저장
            else:
                continue  # Polygon 또는 MultiPolygon이 아닌 경우 생략

            # 이미 해당 region_code가 있는 경우 폴리곤 병합
            if region_code in data_to_insert:
                existing_polygons = data_to_insert[region_code]['polygons']
                for polygon in polygons:
                    # 중복되지 않은 폴리곤만 추가
                    if not any(p.equals(polygon) for p in existing_polygons):
                        existing_polygons.append(polygon)
            else:
                data_to_insert[region_code] = {
                    'name': region_name,
                    'polygons': polygons
                }

    # 병합된 데이터를 최종적으로 MultiPolygon으로 변환하고 WKT 형식으로 저장
    result = []
    for region_code, region_data in data_to_insert.items():
        merged_polygon = unary_union(region_data['polygons'])  # 모든 폴리곤을 하나의 MultiPolygon으로 병합
        region_polygon_wkt = merged_polygon.wkt  # WKT 형식으로 변환
        result.append((region_code, region_data['name'], region_polygon_wkt))

    print(len(result))
    print(result[0][0]+" "+result[0][2][:20])
    print("==============================================================")
    return result

def get_gdp_sido(files):
    data_multi = []
    data_poly = []
    for file in files:
        gdf = gpd.read_file(file)

        for index, row in gdf.iterrows():
            print(row)
            region_code = row['BJCD']
            region_name = row['NAME']
            geom = row['geometry']

            # Polygon 데이터
            if geom.geom_type == 'MultiPolygon':
                polygon = geom  
                polygon_wkt = polygon.wkt
                data_multi.append((region_code, region_name, polygon_wkt))
            elif geom.geom_type == 'Polygon':
                polygon = geom
                polygon_wkt = polygon.wkt
                data_poly.append((region_code, region_name, polygon_wkt))
            else:
                continue  
            
    
    print(str(len(data_multi))+" "+str(len(data_poly)))
    return data_multi, data_poly

def save_data(data):
    dm_df = pd.DataFrame(data, columns=['regionId', 'region_name', 'regionPolygon'])

    # MySQL 연결
    connection = mysql_connect()  # 연결된 MySQL 커넥터를 얻는 함수 호출
    cursor = connection.cursor()
    updated_rows = 0
    update_query_multi = """
        UPDATE region
        SET regionMultiPolygon = ST_GeomFromText(%s, 5186)
        WHERE regionId = %s
        and regionMultiPolygon is null
        and regionPolygon is null
        """
    update_query_one = """
        UPDATE region
        SET regionPolygon = ST_GeomFromText(%s, 5186)
        WHERE regionId = %s
        and regionPolygon is null
        """
    
    # UPDATE 쿼리 실행
    for index, row in dm_df.iterrows():
        print(row['regionId'], row['region_name'], row['regionPolygon'][:20])
        if row['regionId'] == "2772000000":
            row['regionId'] = "4772000000"
        if "MULTIPOLYGON" in row['regionPolygon']:
            cursor.execute(update_query_multi, (row['regionPolygon'], row['regionId']))
        else:
            cursor.execute(update_query_one, (row['regionPolygon'], row['regionId']))

        updated_rows += cursor.rowcount 

    # 커밋 및 연결 종료
    connection.commit()
    cursor.close()
    connection.close()
    print(f"총 {updated_rows} 행이 업데이트되었습니다.")

def region_parsing():
    files = read_file() 
    # files = read_file_p("C:\SSAFY\\3_특화프로젝트\센서스\\N3A_G0010000\\N3A_G0010000")
    data = get_gdp(files)
    # data = get_gdp_si(files)
    # print(len(data))
    # for i in data:
    #     print(i[0]+" "+i[1])
    # dm, dp = get_gdp_sido(files)
    save_data(data) 

region_parsing()