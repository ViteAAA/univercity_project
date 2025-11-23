# routers/films.py
from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select
from database import SessionReviewDep
from models import ReviewModel
from schemas import ReviewPostSchema, ReviewSchema

router = APIRouter(prefix="/reviews", tags=["Reviews"])

@router.post("/", response_model=ReviewSchema, status_code=status.HTTP_201_CREATED)
async def create_book(review_data: ReviewPostSchema, session: SessionReviewDep):
    new_review = ReviewModel(
        username=review_data.username,
        type=review_data.type,
        avatar=review_data.avatar,
        title=review_data.title,
        text=review_data.text,
    )
    session.add(new_review)
    await session.commit()
    await session.refresh(new_review) # Обновляем объект, чтобы получить сгенерированный ID
    return new_review



@router.get("/", response_model=list[ReviewSchema])
async def get_all_reviews(session: SessionReviewDep):
    query = select(ReviewModel)
    result = await session.execute(query)
    return result.scalars().all()
