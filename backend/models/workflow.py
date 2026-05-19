from sqlalchemy import Column, Integer, String
from database.db import Base

class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    status = Column(String)
    assigned_agent = Column(String)
