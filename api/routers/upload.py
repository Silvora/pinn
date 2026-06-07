from fastapi import APIRouter, Depends, Form, UploadFile, File, status
from sqlalchemy.orm import Session
from typing import List,Optional

from database.main import get_db
from database.schemas.upload import UploadResponse
from api.services.upload_service import upload_service

router = APIRouter(tags=["upload"])


@router.post("/upload", response_model=UploadResponse, status_code=status.HTTP_201_CREATED)
async def upload(
    files: Optional[List[UploadFile]] = File(default=None),
    context: str | None = Form(default=None),
    db: Session = Depends(get_db),
):
    result = await upload_service(
        files=files,
        context=context,
        db=db,
    )

    return UploadResponse(**result)
