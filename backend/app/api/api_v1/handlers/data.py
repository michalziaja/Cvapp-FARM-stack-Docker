from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends
from app.models.user_model import User
from app.api.deps.user_deps import get_current_user
from app.schemas.data_schema import DataOut, DataCreate, DataUpdate
from app.services.data_service import DataService
from app.models.data_model import Data


data_router = APIRouter()

@data_router.get('/', summary="Get all offers", response_model=List[DataOut])
async def list(current_user: User = Depends(get_current_user)):
    return await DataService.list_data(current_user)


@data_router.post('/create', summary="Create offer", response_model=Data)
async def create_data(data: DataCreate, current_user: User = Depends(get_current_user)):
    return await DataService.create_data(current_user, data)


@data_router.get('/{data_id}', summary="Get an offer by data_id", response_model=DataOut)
async def retrieve(data_id: UUID, current_user: User = Depends(get_current_user)):
    return await DataService.retrieve_data(current_user, data_id)


@data_router.put('/{data_id}', summary="Update an offer by data_id", response_model=DataOut)
async def update(data_id: UUID, data: DataUpdate, current_user: User = Depends(get_current_user)):
    return await DataService.update_data(current_user, data_id, data)


@data_router.delete('/{data_id}', summary="Delete an offer by data_id")
async def delete(data_id: UUID, current_user: User = Depends(get_current_user)):
    await DataService.delete_data(current_user, data_id)
    return None

#######
