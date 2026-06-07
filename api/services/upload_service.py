from typing import Any

from fastapi import UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List,Optional
async def upload_service(
    *,
    files: Optional[List[UploadFile]] = File(default=None),
    context: str | None = Form(default=None),
    db: Session,
) -> dict[str, Any]:
    return {
        "success": True,
        "count": len(files) if files else 0,
        "items": None,
        "context": context,
    }
