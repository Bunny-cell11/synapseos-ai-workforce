from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from database.database import Base

class WorkflowTask(Base):

    __tablename__ = "workflow_tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(String)

    assigned_agent = Column(String)

    status = Column(String)
