from typing import Optional
from datetime import datetime
from uuid import UUID, uuid4
from beanie import Document, Indexed, Link, before_event, Replace, Insert
from pydantic import Field
from .user_model import User

class Data(Document):
    data_id: UUID = Field(default_factory=uuid4, unique=True)
    status: Optional[str] = "saved"
    site: Optional[str]
    job_position: Optional[str]
    company_name: Optional[str]
    offer_url: Optional[str] ###
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    owner: Link[User]
    
    def __repr__(self) -> str:
        return f"<Data {self.title}>"

    def __str__(self) -> str:
        return self.title

    def __hash__(self) -> int:
        return hash(self.title)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Data):
            return self.data_id == other.data_id
        return False
    
    @before_event([Replace, Insert])
    def update_update_at(self):
        self.updated_at = datetime.utcnow()
        
    
    class Collection:
        name = "data"

