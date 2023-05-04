from pydantic import BaseModel, Field, EmailStr
from pydantic_mongo import AbstractRepository, ObjectIdField
from bson.objectid import ObjectId
from typing import Optional, List
from datetime import datetime
from datetime import timedelta
from fastapi import File
import uuid

class PyObjectId(ObjectId):
    """ Custom Type for reading MongoDB IDs """
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid object_id")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class Dates(BaseModel):
    creation : datetime = Field(default_factory=datetime.now)
    modification : datetime = Field(default_factory=datetime.now)
    deletion : datetime = Field(default_factory=datetime.now)

class UserPreferences(BaseModel):

    notify_if_list_shared : Optional[bool] = True
    notify_if_list_deleted : Optional[bool] = True
    notify_if_item_taken : Optional[bool] = True
    notify_7days_remaining : Optional[bool] = True

    share_birthday : Optional[bool] = True
    share_gift_preferences : Optional[bool] = True
    share_phone : Optional[bool] = True
    share_mail : Optional[bool] = True
    share_address : Optional[bool] = True

    hide_taken_gifts : Optional[bool] = True
    hide_expired_lists : Optional[bool] = True

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, PyObjectId:str}


class UserGifts(BaseModel):
    tech: float = Field(2.5, ge=0.0, le=5.0)#, multiple_of=0.5)
    books : float = Field(2.5, ge=0.0, le=5.0)#, multiple_of=0.5)
    music : float = Field(2.5, ge=0.0, le=5.0)#, multiple_of=0.5)
    outdoor : float = Field(2.5, ge=0.0, le=5.0)#, multiple_of=0.5)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, PyObjectId:str}

class UserPresentation(BaseModel):
    like : str = ""
    dislike : str = ""

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, PyObjectId:str}

class UserLists(BaseModel):
    listid: PyObjectId = Field(default_factory=PyObjectId)
    hidden : bool = False

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, PyObjectId:str}

class UserLogin(BaseModel):
    name : str = "Guest"
    password : str= "guest"
    email: str = "guest@example.com"
    
class UserLight(BaseModel):
    userid: PyObjectId = Field(default_factory=PyObjectId)
    name : str = None
    email: str = None

class UserAccount(BaseModel):
    is_deleted : bool = False

class User(BaseModel):

    userid: PyObjectId = Field(default_factory=PyObjectId)
    login : UserLogin = UserLogin()
    preferences : UserPreferences = UserPreferences()
    bio : UserPresentation = UserPresentation()
    gifts : UserGifts = UserGifts()
    dates : Dates = Dates()
    friends : list[UserLight] = []
    lists : list[UserLists] = []
    account : UserAccount = UserAccount()

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, PyObjectId:str}

class WishList(BaseModel):

    listid: PyObjectId = Field(default_factory=PyObjectId)
    userid : Optional[PyObjectId]

    designation: str = ""
    description : str | None = ""
    dates : Dates = Dates()
    expiration_date : Optional[datetime] = None
    
    is_shared: bool | None = False
    is_shared_with : list[UserLight] = []
    is_deleted : bool | None = False

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, PyObjectId:str}

class Item(BaseModel):

    itemid: PyObjectId = Field(default_factory=PyObjectId)
    listid : Optional[PyObjectId]

    is_taken : Optional[bool] = False
    is_taken_by : Optional[UserLight] = None
    is_taken_at : Optional[datetime] = None
    is_deleted : bool = False

    designation = ""
    description : Optional[str] = ""
    url : Optional[str] = ""
    can_be_second_hand : Optional[bool] = True

    dates : Dates = Dates()
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str, PyObjectId:str}
        
class Login(BaseModel):
    mail: str
    password: str
