from typing import Any

from pydantic import BaseModel


class UploadItem(BaseModel):
    id: str
    filename: str
    file_path: str = ""
    md5: str | None = None
    context: str | None = None
    status: str
    data: dict[str, Any] | None = None
    created_at: str | None = None
    updated_at: str | None = None


class UploadResponse(BaseModel):
    success: bool = True
    count: int
    items: list[UploadItem] | None = None
    context: str | None = None
