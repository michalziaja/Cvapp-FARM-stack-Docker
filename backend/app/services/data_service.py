from typing import List, Dict
from uuid import UUID
from app.models.user_model import User
from app.models.data_model import Data
from app.schemas.data_schema import DataCreate, DataUpdate, DataOut


class DataService:
    @staticmethod
    async def list_data(user: User) -> List[Data]:
        data = await Data.find(Data.owner.id == user.id).to_list()
        return data
    
    @staticmethod
    async def create_data(user: User, data: DataCreate) -> Data:
        data = Data(**data.dict(), owner=user)
        return await data.insert()
    
    @staticmethod
    async def retrieve_data(current_user: User, data_id: UUID):
        data = await Data.find_one(Data.data_id == data_id, Data.owner.id == current_user.id)

        return data
    
    @staticmethod
    async def update_data(current_user: User, data_id: UUID, data: DataUpdate):
        data_instance = await DataService.retrieve_data(current_user, data_id)

        if data_instance:
            # Update data attributes
            #data_instance.site = data.site
            #data_instance.job_position = data.job_position
            #data_instance.company_name = data.company_name
            data_instance.status = data.status
            #data_instance.offer_url = data.offer_url  ##

            # Save the updated data
            await data_instance.save()

        return data_instance

    
    @staticmethod
    async def delete_data(current_user: User, data_id: UUID) -> None:
        data = await DataService.retrieve_data(current_user, data_id)
        if data:
            await data.delete()
            
        return None
