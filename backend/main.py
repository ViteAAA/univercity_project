# main.py
import uvicorn
# from fastapi import FastAPI, Depends
# from starlette.middleware.cors import CORSMiddleware

from db_base import Base
from sqlalchemy.ext.asyncio import AsyncSession
from database import setup_database, setup_reviews_database, engine, engine_users, engine_reviews, populate_films_db, SessionDep, app
from routers import films, users, reviews # Импортируем объект роутера из файла routers/films.py


# Создаем экземпляр приложения FastAPI


# Подключаем маршруты, определенные в routers/films.py, к основному приложению.
# Все эндпоинты в том файле будут доступны по адресу /books
app.include_router(films.router)
app.include_router(users.router)
app.include_router(reviews.router)

# @app.on_event("startup")
# async def startup_event():
#     """
#     Обработчик события запуска приложения.
#     Здесь мы можем гарантировать создание всех таблиц в БД при старте сервера.
#     """
#     print("Приложение запускается, создаем таблицы в БД...")
    # await setup_database(engine) # Используем функцию setup_database из database.py

# Эндпоинт для ручного запуска настройки БД, если необходимо.
# (Хотя @app.on_event("startup") делает его ненужным для обычного использования)
@app.post("/setup_db_manual", summary="Manually setup/recreate database tables")
async def setup_database_endpoint():
    # Эта функция удалит и создаст таблицы заново. Будьте осторожны с данными!
    # await setup_database(engine) # Закомментировано по умолчанию, чтобы избежать случайной потери данных
    # Вместо этого можно просто создать их, если их нет:
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    return {"message": "Database setup requested/verified"}

@app.post("/setup_users_db_manual", summary="Manually setup/recreate database tables")
async def setup_users_database_endpoint():
    # Эта функция удалит и создаст таблицы заново. Будьте осторожны с данными!
    # await setup_database(engine) # Закомментировано по умолчанию, чтобы избежать случайной потери данных
    # Вместо этого можно просто создать их, если их нет:
    async with engine_users.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    return {"message": "Database setup requested/verified"}

@app.post("/setup_reviews_db_manual", summary="Manually setup/recreate database tables")
async def setup_reviews_database_endpoint():
    # Эта функция удалит и создаст таблицы заново. Будьте осторожны с данными!
    # await setup_reviews_database(engine) # Закомментировано по умолчанию, чтобы избежать случайной потери данных
    # Вместо этого можно просто создать их, если их нет:
    async with engine_reviews.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    return {"message": "Database setup requested/verified"}

@app.post("/setup_values_of_database")
async def setup_values_of_database_endpoint(session: SessionDep):
    await populate_films_db(session=session)
    return {"message": "Database setup requested/verified"}


if __name__ == "__main__":
    # Эта часть позволяет запускать приложение прямо из файла main.py
    # командой `python main.py`
    uvicorn.run(
        "main:app",
        reload=True # Включает автоматическую перезагрузку при изменении кода
    )
