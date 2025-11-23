# schemas.py
from pydantic import BaseModel
from typing import List


class UserPostSchema(BaseModel):
    name: str
    femail: str
    username: str
    password: str
    number: str

class FilmPostSchema(BaseModel):
    title: str
    subtitle: str
    imageUrl: str
    rating: float
    href: str

class FilmSchema(FilmPostSchema):
    id: int

class UserSchema(UserPostSchema):
    id: int

class ReviewPostSchema(BaseModel):
    username: str
    type: str
    avatar: str
    title: str
    text: List[str]


class ReviewSchema(ReviewPostSchema):
    id: int


class UserLoginSchema(BaseModel):
    username: str
    password: str
