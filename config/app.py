from pathlib import Path
from typing import List

import yaml
from pydantic import BaseModel, SecretStr

CONFIG_PATH = Path(__file__).resolve().parents[1] / "config.yaml"


def _load_config() -> dict:
    with CONFIG_PATH.open("r", encoding="utf-8") as file:
        return yaml.safe_load(file) or {}


class AppConfig(BaseModel):
    name: str = ""
    version: str = ""


class LLMConfig(BaseModel):
    model: str = ""
    temperature: float = 0.7
    api_key: SecretStr | None = None
    base_url: str = ""

class ServerConfig(BaseModel):
    host: str = "0.0.0.0"
    port: int = 9000
    cors_origins: List[str] = ["*"]


class Config(BaseModel):
    app: AppConfig = AppConfig()
    llm: LLMConfig = LLMConfig()
    server: ServerConfig = ServerConfig()


appConfig = Config(**_load_config())
