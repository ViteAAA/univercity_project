from sqlalchemy.orm import Mapped, mapped_column
from db_base import Base

class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    femail: Mapped[str]
    email: Mapped[str]
    username: Mapped[str]
    password: Mapped[str]
    number: Mapped[str]

class FilmModel(Base):
    __tablename__ = "films"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    subtitle: Mapped[str]
    imageUrl: Mapped[str]
    rating: Mapped[float]
    href: Mapped[str]


class UserLoginModel(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}
    username: Mapped[str]
    password: Mapped[str]
