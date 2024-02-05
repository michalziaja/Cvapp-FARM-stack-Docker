from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.schemas.data_schema import DataOut, DataCreate, DataUpdate
from app.services.data_service import DataService
from app.models.data_model import Data
from app.services.selenium_service import SeleniumService

# selenium_router = APIRouter()

# @selenium_router.post('/get_url', summary="Save offer details from URL", response_model=DataOut)
# async def get_data_from_url(url: str, current_user: User = Depends(get_current_user)):
#     site, job_position, company_name, offer_url = data_from_url(url)
#     data = DataCreate(site=site, job_position=job_position, company_name=company_name, offer_url=offer_url)
#     return await DataService.create_data(current_user, data)

selenium_router = APIRouter()

@selenium_router.post('/get_url', summary="Save offer details from URL", response_model=DataOut)
async def get_data_from_url(url: str, current_user: User = Depends(get_current_user)):
    selenium_service = SeleniumService()
    site, job_position, company_name, offer_url = selenium_service.data_from_url(url)
    
    data = DataCreate(site=site, job_position=job_position, company_name=company_name, offer_url=offer_url)
    return await DataService.create_data(current_user, data)