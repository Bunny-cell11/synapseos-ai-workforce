from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey
from sqlalchemy import Text
from sqlalchemy.orm import relationship

from database.database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)

class Organization(Base):

    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True)
    name = Column(String)

class Workflow(Base):

    __tablename__ = "workflows"

    id = Column(Integer, primary_key=True)

    title = Column(String)

    assigned_agent = Column(String)

    status = Column(String)

    organization_id = Column(
        Integer,
        ForeignKey("organizations.id")
    )

class AIConversation(Base):

    __tablename__ = "ai_conversations"

    id = Column(Integer, primary_key=True)

    question = Column(Text)

    response = Column(Text)

class UploadedFile(Base):

    __tablename__ = "uploaded_files"

    id = Column(Integer, primary_key=True)

    filename = Column(String)

    summary = Column(Text)