from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func

from database import Base

class Organization(Base):

    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    role = Column(String)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id")
    )

class Workflow(Base):

    __tablename__ = "workflows"

    id = Column(Integer, primary_key=True)

    name = Column(String)

    status = Column(String)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id")
    )

class WorkflowTask(Base):

    __tablename__ = "workflow_tasks"

    id = Column(Integer, primary_key=True)

    workflow_id = Column(
        Integer,
        ForeignKey("workflows.id")
    )

    agent = Column(String)

    task = Column(String)

    status = Column(String)