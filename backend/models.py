from sqlalchemy import Column, Integer, String, Text
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)

class Workflow(Base):
    __tablename__ = "workflows"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    status = Column(String)
    assigned_agent = Column(String)

class Analytics(Base):
    __tablename__ = "analytics"

    id = Column(Integer, primary_key=True)
    metric = Column(String)
    value = Column(String)