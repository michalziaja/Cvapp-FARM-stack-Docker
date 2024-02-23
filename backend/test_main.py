import pytest
from fastapi.testclient import TestClient
from app.core.config import settings
from app.app import app 

client = TestClient(app)

def test_read_main():
    response = client.get(f"{settings.API_V1_STR}/openapi.json")
    assert response.status_code == 200