import pandas as pd
import numpy as np

# -----------------
from dbutils import mysql_connect, mysql_disconnect, mysql_read_all
from dbutils import mongo_connect, mongo_get_collection, mongo_save_with_delete, mongo_save_with_update, mongo_disconnect


def load_mysql_data():
    connection = mysql_connect()
    theme_query = "SELECT t.themeId from theme t"
    theme = mysql_read_all(connection, theme_query)
    theme_df = pd.DataFrame(theme)
    review = mysql_read_all(connection, "SELECT externalReviewId, themeId, content FROM externalreview")
    review_df = pd.DataFrame(review)

    mysql_disconnect(connection)

    return theme_df, review_df 

def external_review_tf_idf():
    # 데이터 읽기

    # tf-idf 분석

    # 데이터 저장 
