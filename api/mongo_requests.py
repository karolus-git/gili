from datetime import datetime, timedelta
from bson.objectid import ObjectId
from pymongo.collection import ReturnDocument

from models import WishList, Item, User
from models import PyObjectId

#Mongo
import motor.motor_asyncio
import os

mng_user = os.environ['MONGO_USER']
mng_pwd = os.environ['MONGO_PWD']
mng_ip = os.environ['MONGO_IP']
mng_port = os.environ['MONGO_PORT']

#Connection to client
#TODO Make this better with @app.on_event("startup")
client = motor.motor_asyncio.AsyncIOMotorClient(f'mongodb://{mng_user}:{mng_pwd}@{mng_ip}:{mng_port}')

#Connection to database
database = client.gili

### LIST
async def insert_list(conf): 
    result = await database.lists.insert_one(conf)
    return WishList(**conf) if result else None

async def update_list(query, conf):
    result = await database.lists.find_one_and_update(
        query,
        conf,
        upsert=True,
        return_document=ReturnDocument.AFTER
    )

    return WishList(**result)

async def fetch_lists(query):
    results = database.lists.find(query)
    return [WishList(**result) async for result in results]

async def fetch_list(query):
    result = await database.lists.find_one(query)
    return WishList(**result) if result else None
    
### ITEM
async def insert_item(conf):
    result = await database.items.insert_one(conf)
    return Item(**conf) if result else None

async def update_item(query, conf):
    result = await database.items.find_one_and_update(
        query,
        conf,
        upsert=True,
        return_document=ReturnDocument.AFTER
    )

    return Item(**result)

async def fetch_item(query):
    result = await database.items.find_one(query)
    return Item(**result) if result else None

### USER
async def fetch_items(query):
    results = database.items.find(query)
    return [Item(**result) async for result in results]

async def fetch_users(query):
    results = database.users.find(query)
    return [User(**result) async for result in results]

async def fetch_user(query):
    result = await database.users.find_one(query)
    return User(**result) if result else None

async def insert_user(conf):
    result = await database.users.insert_one(conf)
    return User(**conf) if result else None

async def update_user(query, conf):
    result = await database.users.find_one_and_update(
        query,
        conf,
        upsert=True,
        return_document=ReturnDocument.AFTER
    )

    return User(**result)



# async def insert_image(conf): 

#     fs = motor.motor_asyncio.AsyncIOMotorGridFSBucket(database)
#     file_id = ObjectId()
#     grid_in = fs.open_upload_stream_with_id(
#         file_id, "test_file",
#         metadata={"contentType": "text/plain"})

#     await grid_in.write(conf)
#     await grid_in.close()  # uploaded on close

#     return str(file_id)