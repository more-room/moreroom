from pymongo import MongoClient

def mongo_connect():
    client = MongoClient(host='j11d206.p.ssafy.io', port=27017)
    return client 

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