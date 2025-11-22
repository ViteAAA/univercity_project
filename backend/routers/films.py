# routers/films.py
from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select
from database import SessionDep
from models import FilmModel
from schemas import FilmPostSchema, FilmSchema

router = APIRouter(prefix="/films", tags=["Films"])

@router.post("/", response_model=FilmSchema, status_code=status.HTTP_201_CREATED)
async def create_book(film_data: FilmPostSchema, session: SessionDep):
    new_book = FilmModel(
        title=film_data.title,
        subtitle=film_data.subtitle,
        imageUrl=film_data.imageUrl,
        rating=film_data.rating,
        href=film_data.href,
    )
    session.add(new_book)
    await session.commit()
    await session.refresh(new_book) # Обновляем объект, чтобы получить сгенерированный ID
    return new_book



@router.get("/", response_model=list[FilmSchema])
async def get_all_books(session: SessionDep):
    query = select(FilmModel)
    result = await session.execute(query)
    return result.scalars().all()
