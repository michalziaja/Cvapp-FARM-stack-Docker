from datetime import datetime
from typing import Optional, Dict, List
from uuid import UUID
from pydantic import BaseModel, Field

class DataCreate(BaseModel):
    site: str = Field(..., title='Offer Site', max_length=755, min_lenght=1)
    job_position: str = Field(..., title='Job Position', max_length=99, min_length=1)
    company_name: str = Field(..., title='Company Name', max_length=755, min_length=1)
    offer_url: str = Field(..., title='Offer URL', max_length=999, min_lenght=1) ##
    status: Optional[str] = "Saved"

class DataUpdate(BaseModel):
    #site: Optional[str] = Field(..., title='Offer Site', max_length=55, min_lenght=1)
    #job_position: Optional[str] = Field(..., title='Job Position', max_length=55, min_length=1)
    #company_name: Optional[str] = Field(..., title='Company Name', max_length=755, min_length=1)
    status: Optional[str] = "Saved"
    #offer_url: Optional[str] = Field(..., title='Offer URL', max_length=755, min_lenght=1) ##

class DataOut(BaseModel):
    data_id: UUID
    status: Optional[str]
    site: Optional[str]
    job_position: Optional[str]
    company_name: Optional[str]
    offer_url: Optional[str] ##
    created_at: datetime
    updated_at: datetime

##############
