
from fastapi import APIRouter, HTTPException, status, Response, Depends
from sqlalchemy import select
from database import SessionUserDep
from models import UserModel, UserLoginModel
from authx import AuthX, AuthXConfig
from schemas import UserPostSchema, UserSchema, UserLoginSchema

config = AuthXConfig()
config.JWT_SECRET_KEY = "SECRET_KEY"
config.JWT_ACCESS_COOKIE_NAME = "my_access_token"
config.JWT_TOKEN_LOCATION = ["cookies"]



security = AuthX(config=config)


router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserSchema, status_code=status.HTTP_201_CREATED)
async def create_user(film_data: UserPostSchema, session: SessionUserDep):
    new_user = UserModel(
        name=film_data.name,
        femail=film_data.femail,
        username=film_data.username,
        email=film_data.number,
        password=film_data.password,
        number=film_data.number,
    )
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user) # Обновляем объект, чтобы получить сгенерированный ID
    return new_user

@router.get("/", response_model=list[UserSchema])
async def get_user(session: SessionUserDep):
    query = select(UserModel)
    result = await session.execute(query)
    # rows = result.scalars().all()
    # return [{"username": user.username, "password": user.password} for user in rows]
    return result.scalars().all()

@router.post("/login")
async def login(creds: UserLoginSchema, response: Response, session: SessionUserDep):
    query = select(UserLoginModel)
    result = await session.execute(query)
    isUser: bool = False
    for user in result.scalars():
        if creds.username == user.username and creds.password == user.password:
            isUser = True
            break
    if isUser:
        token = security.create_access_token(uid="5")
        response.set_cookie(
            key=config.JWT_ACCESS_COOKIE_NAME,
            value=token,
        )
        return {"access": True}
    raise HTTPException(
        status_code=401,
        detail="Incorrect username or password"
    )

@router.get("/protected", dependencies=[Depends(security.access_token_required)])
async def is_auth():
    return {"access_token": True}