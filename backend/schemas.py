# schemas.py
from pydantic import BaseModel


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


class UserLoginSchema(BaseModel):
    username: str
    password: str
