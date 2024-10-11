from pymongo import MongoClient
import pymysql
import json
import os 
from dotenv import load_dotenv 

## ------------------ mongoDB 

def mongo_connect():
    load_dotenv()
    config_mongo_user = os.getenv('MONGO_USER')
    config_mongo_pw = os.getenv('MONGO_PW')
    config_mongo_host = os.getenv('MONGO_HOST')
    config_mongo_port = int(os.getenv('MONGO_PORT'))
    mongo_uri = f"mongodb://{config_mongo_user}:{config_mongo_pw}@{config_mongo_host}:{config_mongo_port}/"
    client = MongoClient(mongo_uri)
    return client 

def mongo_disconnect(client):
    client.close()

def mongo_get_collection(client, db_name, col_name):
    db = client["d206"]
    collection = db[db_name+"_"+col_name]

    return collection

def mongo_save_many(collection, data):
    result = collection.insert_many(data)

def mongo_update_one(collection, filter, data):
    result = collection.update_one(filter, {'$set': data}, upsert=True) 

def mongo_delete_many(collection, filter):
    collection.delete_many(filter)

def mongo_save_with_delete(collection, data):
    mongo_delete_many(collection, {})
    mongo_save_many(collection, data)

def mongo_save_with_update(collection, data):
    for item in data:
        mongo_update_one(collection, {'theme_id': item['theme_id']}, 
                         {'similar_themes': item['similar_themes'], 'similar_themes_sim': item['similar_themes_sim']})


## -------------- mysql 

def mysql_connect():
    load_dotenv()
    connection = pymysql.connect(
        host= os.getenv('MYSQL_HOST'),
        port= int(os.getenv('MYSQL_PORT')),
        user= os.getenv('MYSQL_USER'),
        password= os.getenv('MYSQL_PW'),
        database= os.getenv('MYSQL_DB'),
        cursorclass=pymysql.cursors.DictCursor
    )

    return connection 
    
def mysql_disconnect(connection):
    connection.close() 


def mysql_read_all(connection, query):
    with connection.cursor() as cursor:
        sql_query = query
        cursor.execute(sql_query)
        results = cursor.fetchall()

        return results
