from fastapi import FastAPI, HTTPException, Depends
from starlette.middleware.cors import CORSMiddleware

from models import FilmModel, UserModel
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from db_base import Base
from typing import Annotated

films = [
    {
        "title": "Звёздные войны: Скайуокер. Восход",
        "subtitle": "Фантастика, фэнтези, боевик, приключения",
        "imageUrl": "images/png/starWars.png",
        "rating": "6.70",
        "href": "pages/film_page.html"
    },
    {
        "title": "Побег из Претории",
        "subtitle": "Триллер",
        "imageUrl": "images/png/run.png",
        "rating": "6.70",
        "href": "pages/film_page.html"
    },
    {
        "title": "Джокер",
        "subtitle": "Триллер, драма, криминал",
        "imageUrl": "images/png/joker.png",
        "rating": "8.50",
        "href": "pages/film_page.html"
    },
    {
        "title": "Джентльмены",
        "subtitle": "Боевик, комедия, криминал",
        "imageUrl": "images/png/gentelmen.png",
        "rating": "8.00",
        "href": "pages/film_page.html"

    },
    {
        "title": "Ford против Ferrari",
        "subtitle": "Биография, спорт, драма, боевик",
        "imageUrl": "images/png/ford&ferrary.png",
        "rating": "8.10",
        "href": "pages/pages/film_page.html"
    },
    {
        "title": "3022",
        "subtitle": "Фантастика, триллер",
        "imageUrl": "images/png/future.png",
        "rating": "4.90",
        "href": "pages/film_page.html"
    },
    {
        "title": "Хищные птицы: Потрясающая история Харли Квинн",
        "subtitle": "Боевик, криминал, комедия",
        "imageUrl": "images/png/birds.png",
        "rating": "6.20",
        "href": "pages/film_page.html"
    },
    {
        "title": "Плохие парни навсегда",
        "subtitle": "Боевик, комедия, криминал",
        "imageUrl": "images/png/boys.png",
        "rating": "6.90",
        "href": "pages/film_page.html"
    }
]

app = FastAPI(
    title="Film Catalog API",
    description="API для управления каталогом фильмов на FastAPI и SQLAlchemy"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500", "http://localhost:5500", "https://viteaaa.github.io"],  # Ваш фронтенд origin
    allow_credentials=True,  # ВАЖНО: должно быть True для кук
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]  # Добавьте эту строку
)

engine = create_async_engine("sqlite+aiosqlite:///films.db")
engine_users = create_async_engine("sqlite+aiosqlite:///users.db")

new_session = async_sessionmaker(engine, expire_on_commit=False)
new_user_session = async_sessionmaker(engine_users, expire_on_commit=False)


async def get_session():
    async with new_session() as session:
        yield session

async def get_users_session():
    async with new_user_session() as session:
        yield session

SessionDep = Annotated[AsyncSession, Depends(get_session)]
SessionUserDep = Annotated[AsyncSession, Depends(get_users_session)]



@app.post("/populate_db")
async def populate_films_db(session: AsyncSession = Depends(get_session)):
    """
    Добавляет все фильмы из списка films_data в БД.
    """
    try:
        # Создаем список объектов FilmModel из списка словарей films_data
        film_objects = [FilmModel(**film_data) for film_data in films]

        # Используем session.add_all() для эффективной массовой вставки
        session.add_all(film_objects)

        # Фиксируем изменения
        await session.commit()

        return {"message": f"Successfully added {len(film_objects)} films."}
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

@app.post("/setup_db")
async def setup_database(engine_instance=engine):
    async with engine_instance.begin() as connection:
        await connection.run_sync(Base.metadata.drop_all)
        await connection.run_sync(Base.metadata.create_all)

    return {"message": "success"}

@app.post("/setup_users_db")
async def setup_database(engine_instance=engine_users):
    async with engine_instance.begin() as connection:
        await connection.run_sync(Base.metadata.drop_all)
        await connection.run_sync(Base.metadata.create_all)

    return {"message": "success"}
