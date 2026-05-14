from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tasks_db = []

class ProjectRequest(BaseModel):
    goal: str

@app.get("/")
def home():
    return {
        "message": "SynapseOS Backend Running"
    }

@app.post("/start-project")
def start_project(request: ProjectRequest):

    global tasks_db

    tasks_db = [
        {
            "id": 1,
            "title": "Analyze Requirements",
            "assigned_agent": "Planner Agent",
            "status": "Completed"
        },
        {
            "id": 2,
            "title": "Generate UI Components",
            "assigned_agent": "Frontend Agent",
            "status": "In Progress"
        },
        {
            "id": 3,
            "title": "Deploy Backend APIs",
            "assigned_agent": "DevOps Agent",
            "status": "Pending"
        }
    ]

    return {
        "message": f"Project started: {request.goal}",
        "tasks": tasks_db
    }

@app.get("/tasks")
def get_tasks():
    return {
        "tasks": tasks_db
    }
