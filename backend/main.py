from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime
import uuid

app = FastAPI(
    title="SynapseOS API",
    description="AI Multi-Agent Workforce Operating System",
    version="1.0.0"
)

# ---------------------------------------------------
# CORS CONFIGURATION
# ---------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------
# IN-MEMORY DATABASE
# ---------------------------------------------------

tasks_db = []
logs_db = []
connected_clients = []

# ---------------------------------------------------
# MODELS
# ---------------------------------------------------

class ProjectRequest(BaseModel):
    goal: str


class Task(BaseModel):
    id: str
    title: str
    status: str
    assigned_agent: str
    created_at: str


# ---------------------------------------------------
# WEBSOCKET MANAGER
# ---------------------------------------------------

class ConnectionManager:

    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: Dict):
        for connection in self.active_connections:
            await connection.send_json(message)


manager = ConnectionManager()

# ---------------------------------------------------
# ROOT ROUTE
# ---------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "SynapseOS Backend Running",
        "status": "active",
        "version": "1.0.0"
    }

# ---------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow()
    }

# ---------------------------------------------------
# START PROJECT WORKFLOW
# ---------------------------------------------------

@app.post("/start-project")
async def start_project(request: ProjectRequest):

    goal = request.goal

    workflow_tasks = [
        {
            "title": "Design frontend dashboard",
            "agent": "Planner Agent"
        },
        {
            "title": "Research APIs and datasets",
            "agent": "Research Agent"
        },
        {
            "title": "Generate backend services",
            "agent": "Developer Agent"
        },
        {
            "title": "Run automated tests",
            "agent": "QA Agent"
        },
        {
            "title": "Perform security validation",
            "agent": "Security Agent"
        }
    ]

    created_tasks = []

    for item in workflow_tasks:

        task = {
            "id": str(uuid.uuid4()),
            "title": item["title"],
            "status": "completed",
            "assigned_agent": item["agent"],
            "created_at": str(datetime.utcnow())
        }

        tasks_db.append(task)
        created_tasks.append(task)

        log = {
            "agent": item["agent"],
            "action": item["title"],
            "timestamp": str(datetime.utcnow())
        }

        logs_db.append(log)

        await manager.broadcast({
            "event": "task_completed",
            "data": task
        })

    return {
        "success": True,
        "goal": goal,
        "tasks": created_tasks,
        "message": "Workflow completed successfully"
    }

# ---------------------------------------------------
# GET TASKS
# ---------------------------------------------------

@app.get("/tasks")
def get_tasks():
    return {
        "count": len(tasks_db),
        "tasks": tasks_db
    }

# ---------------------------------------------------
# GET LOGS
# ---------------------------------------------------

@app.get("/logs")
def get_logs():
    return {
        "count": len(logs_db),
        "logs": logs_db
    }

# ---------------------------------------------------
# AGENT STATUS
# ---------------------------------------------------

@app.get("/agents/status")
def agent_status():

    agents = [
        {
            "name": "Planner Agent",
            "status": "active"
        },
        {
            "name": "Research Agent",
            "status": "active"
        },
        {
            "name": "Developer Agent",
            "status": "active"
        },
        {
            "name": "QA Agent",
            "status": "active"
        },
        {
            "name": "Security Agent",
            "status": "active"
        },
        {
            "name": "Manager Agent",
            "status": "active"
        }
    ]

    return {
        "agents": agents
    }

# ---------------------------------------------------
# SECURITY SCAN
# ---------------------------------------------------

@app.post("/scan-prompt")
def scan_prompt(request: ProjectRequest):

    blocked_keywords = [
        "hack",
        "exploit",
        "malware",
        "bypass",
        "steal"
    ]

    for keyword in blocked_keywords:

        if keyword.lower() in request.goal.lower():

            return {
                "safe": False,
                "message": "Potential malicious prompt detected",
                "blocked_keyword": keyword
            }

    return {
        "safe": True,
        "message": "Prompt passed security validation"
    }

# ---------------------------------------------------
# WEBSOCKET ENDPOINT
# ---------------------------------------------------

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()

            await manager.broadcast({
                "event": "message",
                "data": data
            })

    except WebSocketDisconnect:
        manager.disconnect(websocket)

# ---------------------------------------------------
# DELETE ALL TASKS
# ---------------------------------------------------

@app.delete("/tasks")
def clear_tasks():

    tasks_db.clear()

    return {
        "message": "All tasks cleared"
    }

# ---------------------------------------------------
# DELETE ALL LOGS
# ---------------------------------------------------

@app.delete("/logs")
def clear_logs():

    logs_db.clear()

    return {
        "message": "All logs cleared"
    }
