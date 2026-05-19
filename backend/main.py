from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile
from fastapi import File
from fastapi import WebSocket

from dotenv import load_dotenv

from database.database import engine
from database.models import Base

from ai_agents.orchestrator import execute_ai_workflow
from uploads.file_handler import process_file
from analytics.analytics_engine import generate_metrics
from websocket.socket_manager import manager

import os

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():

    return {
        "message":
        "SynapseOS Enterprise AI Workforce Running"
    }

@app.post("/start-project")
def start_project():

    workflow = execute_ai_workflow(
        "Enterprise AI Execution"
    )

    return {
        "workflow": workflow
    }

@app.get("/analytics")
def analytics():

    return generate_metrics()

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    return await process_file(file)

@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket
):

    await manager.connect(websocket)

    while True:

        await websocket.receive_text()

        await manager.broadcast(
            "AI workflow updated"
        )