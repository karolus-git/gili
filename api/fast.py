from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
#from tokenhandler import create_access_token
from bson.objectid import ObjectId
import bcrypt
import datetime

import pydantic

import mongo_requests as mng
from models import PyObjectId
from models import WishList, Item, Login
from models import User, UserLight, UserLogin, UserLists
from models import UserPreferences, UserGifts
import json

salt = bcrypt.gensalt()

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)   

#Instance
app = FastAPI()

@app.get("/")
async def base():
    return {"message":"Health Check Passed!"}

#Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/user")
async def api_fetch_user(userid: str):
    query = {"userid" : PyObjectId(userid)}
    response = await mng.fetch_user(query)

    if response :
        return response
    else:
        raise HTTPException(status_code=404, detail="No user found with this id")

@app.post("/api/user")
async def api_insert_user(conf: User):
    response = await mng.insert_user(conf.dict())
    return response

@app.delete("/api/user")
async def api_delete_user(userid:str):
    query = {"userid" : PyObjectId(userid)}
    conf = {"$set" : {"account.is_deleted" : True}}
    
    response = await mng.update_user(query, conf)
    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No user deleted")


@app.get("/api/user/login", response_model=User)
async def api_login_user(email: str, password:str):
    query = {"login.email" : email, "login.password" : password}
    response = await mng.fetch_user(query)

    if response :
        return response
    else:
        return False


@app.get("/api/user/email", response_model=User)
async def api_fetch_user_email(email: str):
    query = {"login.email" : email}
    response = await mng.fetch_user(query)

    if response :
        return response
    else:
        raise HTTPException(status_code=404, detail="No user found with this email")


@app.put("/api/user/lists")
async def api_update_user_lists(userid: str, conf:UserLists):
    query = {"userid" : PyObjectId(userid)}
    conf = {
        ""
    }
    response = await mng.update_user(query, )
    if response :
        return response
    else:
        raise HTTPException(status_code=404, detail="No user updated")


@app.put("/api/user/update/settings/preferences")
async def api_update_user_settings_preferences(userid: str, conf: UserPreferences):
    
    query = {"userid" : PyObjectId(userid)}
    conf_clean = conf.dict(exclude_unset=True)

    response = await mng.update_user(query, 
    {"$set" : {"preferences" : conf_clean}}
    )

    if response :
        return response
    else:
        raise HTTPException(status_code=404, detail="No user updated")
        
@app.put("/api/user/update/settings/gifts")
async def api_update_user_settings_gifts(userid: str, conf: UserGifts):
    
    query = {"userid" : PyObjectId(userid)}
    conf_clean = conf.dict(exclude_unset=True)

    response = await mng.update_user(query, 
    {"$set" : {"gifts" : conf_clean}}
    )

    if response :
        return response
    else:
        raise HTTPException(status_code=404, detail="No user updated")

@app.put("/api/user/update/friend")
async def api_update_user_friend(userid:str, conf: UserLight):
    query = {"userid" : PyObjectId(userid)}
    conf_clean = conf.dict(exclude_unset=True)
    response = await mng.update_user(
        query, 
        {"$addToSet": {"friends" : conf_clean} }
    )

    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No user updated")

@app.put("/api/user/update/list")
async def api_update_user_list(userid:str, conf: UserLists):
    query = {"userid" : PyObjectId(userid)}
    conf_clean = conf.dict(exclude_unset=True)

    response = await mng.update_user(
        query, 
        {"$addToSet": {"lists" : conf_clean} }
    )

    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No user updated")

@app.put("/api/user/update/list/hide")
async def api_update_user_list_hide(userid:str, conf: UserLists):
    query = {"$and" : [
        {"userid" : PyObjectId(userid)},
        {"lists.listid" : PyObjectId(conf.listid)}
    ]}
    conf_clean = conf.dict(exclude_unset=True)
    conf_clean["listid"] = PyObjectId(conf.listid)
    response = await mng.update_user(
        query, 
        {"$set": {"lists.$" : conf_clean}}
    )

    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No user updated")

@app.get("/api/user/lists/all")
async def api_fetch_user_lists_all(userid: str):
    query = {"$or" : [
        {"userid" : PyObjectId(userid)},
        {"is_shared" : True, "is_shared_with.userid" : PyObjectId(userid)}
    ]}
    response = await mng.fetch_lists(query)

    return response
    
@app.get("/api/user/lists")
async def api_fetch_user_private_lists(userid: str):
    print("tets")
    query = {"userid" : PyObjectId(userid)}
    response = await mng.fetch_lists(query)
    return response

@app.get("/api/list")
async def api_fetch_list(listid: str):
    query = {"listid" : PyObjectId(listid)}
    response = await mng.fetch_list(query)
    return response

@app.post("/api/list")
async def api_insert_list(conf: WishList):
    response = await mng.insert_list(conf.dict())
    return response

@app.put("/api/list/update")
async def api_update_list(listid:str, conf: WishList):
    query = {"listid" : PyObjectId(listid)}
    conf_clean = conf.dict(exclude_unset=True)
    response = await mng.update_list(query, {"$set": conf_clean})

    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No list updated")

@app.put("/api/list/update/share")
async def api_update_list_share(listid:str, conf: UserLight):
    query = {"listid" : PyObjectId(listid)}
    conf_clean = conf.dict(exclude_unset=True)
    response = await mng.update_list(
        query, 
        {
            "$set" : {"is_shared" : True},
            "$addToSet": {"is_shared_with" : conf_clean}
        }
    )

    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No list updated")


@app.delete("/api/list")
async def api_delete_list(listid:str):
    query = {"id" : PyObjectId(listid)}
    conf = {"$set" : {"is_deleted" : True}}

    response = await mng.update_list(query, conf)
    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No list deleted")

@app.get("/api/items")
async def api_fetch_items(listid: str):
    query = {"listid" : PyObjectId(listid)}
    response = await mng.fetch_items(query)
    return response

@app.get("/api/item")
async def api_fetch_item(itemid: str):
    query = {"itemid" : PyObjectId(itemid)}
    response = await mng.fetch_item(query)
    return response

@app.post("/api/item")
async def api_insert_item(conf: Item):
    response = await mng.insert_item(conf.dict())
    return response

@app.put("/api/item/update")
async def api_update_item(itemid:str, conf: Item):
    query = {"itemid" : PyObjectId(itemid)}
    conf_clean = conf.dict(exclude_unset=True)
    print(conf_clean)
    response = await mng.update_item(query, {"$set" : conf_clean})
    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No item updated")

@app.delete("/api/item")
async def api_delete_item(itemid:str):
    query = {"itemid" : PyObjectId(itemid)}
    conf = {
            "$set" : {"is_deleted" : True},
        }

    response = await mng.update_item(query, conf)
    if response :
        return response 
    else:
         raise HTTPException(status_code=404, detail="No item deleted")
