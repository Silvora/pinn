from sqlalchemy import Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from pydantic import SecretStr
from database.main import Base


class Settings(Base):
    __tablename__ = "settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    model: Mapped[str] = mapped_column(String, default="")
    temperature: Mapped[float] = mapped_column(Float, default=0.7)
    api_key: Mapped[SecretStr | None] = mapped_column(String, default=None)
    base_url: Mapped[str] = mapped_column(String, default="")
    zhipu_search_api_key: Mapped[str] = mapped_column(String, default="")
    created_at: Mapped[str | None] = mapped_column(String)
    updated_at: Mapped[str | None] = mapped_column(String)
