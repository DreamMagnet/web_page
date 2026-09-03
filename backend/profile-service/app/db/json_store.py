"""Thread-safe, atomic JSON persistence for the shared users file."""

from __future__ import annotations

import json
import os
import tempfile
import threading
from pathlib import Path
from typing import Any

from app.core.config import settings


_lock = threading.Lock()


def _ensure_file(path: Path) -> None:
    if path.exists():
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as fh:
        json.dump({"users": []}, fh, indent=2)


def read_all() -> dict[str, Any]:
    with _lock:
        _ensure_file(settings.data_file)
        with settings.data_file.open("r", encoding="utf-8") as fh:
            data = json.load(fh)
        if "users" not in data or not isinstance(data["users"], list):
            data = {"users": []}
        return data


def write_all(data: dict[str, Any]) -> None:
    with _lock:
        _ensure_file(settings.data_file)
        target = settings.data_file
        fd, tmp_path = tempfile.mkstemp(
            prefix=".users-", suffix=".json.tmp", dir=str(target.parent)
        )
        try:
            with os.fdopen(fd, "w", encoding="utf-8") as fh:
                json.dump(data, fh, indent=2)
            os.replace(tmp_path, target)
        except Exception:
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
            raise
