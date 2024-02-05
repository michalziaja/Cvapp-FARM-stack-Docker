from fastapi import APIRouter
from app.api.api_v1.handlers import user
from app.api.api_v1.handlers import data
from app.api.api_v1.handlers import selenium
from app.api.auth.jwt import auth_router

router = APIRouter()

router.include_router(user.user_router, prefix='/users', tags=["users"])
router.include_router(data.data_router, prefix='/data', tags=["data"])
router.include_router(auth_router, prefix='/auth', tags=["auth"])
router.include_router(selenium.selenium_router, prefix="/selenium", tags=["selenium"])
