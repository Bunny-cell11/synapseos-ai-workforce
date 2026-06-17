from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import WebSocket
from fastapi import UploadFile
from fastapi import File

from dotenv import load_dotenv

from sqlalchemy.orm import Session
from sqlalchemy import text
from ai_agents.orchestrator import (
    execute_ai_workflow,
    execute_orchestration
)

from monitoring.system_monitor import (
    get_live_metrics
)

from database.database import (
    Base,
    engine,
    SessionLocal
)

from database.models import (
    Workflow,
    WorkflowTask,
    Organization
)

load_dotenv()

print("RENDER DEPLOY TEST - COMMIT 1fbfae0")

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConnectionManager:

    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):

        for connection in self.active_connections:
            await connection.send_json(message)


manager = ConnectionManager()


@app.get("/")
def home():

    return {
        "message": "SynapseOS Enterprise AI OS"
    }


@app.post("/start-project")
async def start_project():

    db: Session = SessionLocal()

    try:

        organization = db.query(Organization).first()

        if not organization:

            organization = Organization(
                name="Default Organization"
            )

            db.add(organization)
            db.commit()
            db.refresh(organization)

        workflow_record = Workflow(
            name="Enterprise AI System",
            status="running",
            organization_id=organization.id
        )

        db.add(workflow_record)
        db.commit()
        db.refresh(workflow_record)

        workflow_items = execute_ai_workflow(
            "Enterprise AI System"
        )

        for item in workflow_items:

            task = WorkflowTask(
                workflow_id=workflow_record.id,
                agent=item["assigned_agent"],
                task=item["title"],
                status=item["status"]
            )

            db.add(task)

        db.commit()

        await manager.broadcast({
            "event": "workflow_started",
            "workflow_id": workflow_record.id
        })

        return {
            "workflow_id": workflow_record.id,
            "workflow": workflow_items
        }

    finally:
        db.close()


@app.get("/tasks")
def get_tasks():

    db: Session = SessionLocal()

    try:

        tasks = db.query(WorkflowTask).all()

        formatted_tasks = []

        for task in tasks:

            formatted_tasks.append({
                "id": task.id,
                "workflow_id": task.workflow_id,
                "task": task.task,
                "agent": task.agent,
                "status": task.status
            })

        return {
            "tasks": formatted_tasks
        }

    finally:
        db.close()


@app.get("/orchestration")
def orchestration():

    return {
        "agents": execute_orchestration()
    }


@app.get("/monitoring")
def monitoring():

    return get_live_metrics()


@app.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket
):

    await manager.connect(websocket)

    try:

        while True:

            await websocket.receive_text()

            await websocket.send_json({
                "event": "workflow_updated"
            })

    except Exception:

        manager.disconnect(websocket)


@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    return {
        "filename": file.filename
    }


@app.get("/workflow-graph")
def workflow_graph():

    return {
        "nodes": [
            {
                "id": "1",
                "position": {
                    "x": 100,
                    "y": 100
                },
                "data": {
                    "label": "Planner Agent"
                },
                "type": "default"
            },
            {
                "id": "2",
                "position": {
                    "x": 400,
                    "y": 100
                },
                "data": {
                    "label": "Backend Agent"
                },
                "type": "default"
            },
            {
                "id": "3",
                "position": {
                    "x": 700,
                    "y": 100
                },
                "data": {
                    "label": "DevOps Agent"
                },
                "type": "default"
            }
        ],
        "edges": [
            {
                "id": "e1-2",
                "source": "1",
                "target": "2"
            },
            {
                "id": "e2-3",
                "source": "2",
                "target": "3"
            }
        ]
    }
@app.get("/debug-workflows")
def debug_workflows():

    db = SessionLocal()

    result = db.execute(
        text("""
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name='workflows'
        """)
    )

    return {
        "columns": [row[0] for row in result]
    }
@app.get("/recreate-db")
def recreate_db():

    from database.database import Base, engine

    Base.metadata.create_all(bind=engine)

    return {"message": "tables recreated"}