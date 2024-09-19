from pymongo import MongoClient
import pymysql
import json

## ------------------ mongoDB 

def mongo_connect():
    with open('config.json', encoding='utf-8') as config_file:
        config = json.load(config_file)
        client = MongoClient(host=config['mongo_host'], port=config['mongo_port'])
        return client 

def mongo_disconnect(client):
    client.close()

def mongo_get_collection(client, db_name, col_name):
    db = client[db_name]
    collection = db[col_name]

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
    with open('config.json') as config_file:
        config = json.load(config_file)

        connection = pymysql.connect(
            host= config['mysql_host'],
            port= config['mysql_port'],
            user= config['mysql_user'],
            password= config['mysql_pw'],
            database= config['mysql_db'],
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
