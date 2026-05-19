from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="SynapseOS AI Workforce API",
    description="AI Multi-Agent Workforce Operating System",
    version="1.0.0"
)

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

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

class AIQuestion(BaseModel):
    question: str

@app.get("/")
def home():
    return {
        "message": "SynapseOS AI Backend Running",
        "status": "active",
        "platform": "SynapseOS",
        "version": "1.0.0"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }

@app.post("/start-project")
def start_project(request: ProjectRequest):

    global tasks_db

    tasks_db = [
        {
            "id": 1,
            "title": "Analyze Project Requirements",
            "assigned_agent": "Planner Agent",
            "status": "Completed"
        },
        {
            "id": 2,
            "title": "Design Frontend Dashboard",
            "assigned_agent": "Frontend Agent",
            "status": "In Progress"
        },
        {
            "id": 3,
            "title": "Develop Backend APIs",
            "assigned_agent": "Backend Agent",
            "status": "Pending"
        },
        {
            "id": 4,
            "title": "Deploy Infrastructure",
            "assigned_agent": "DevOps Agent",
            "status": "Pending"
        },
        {
            "id": 5,
            "title": "Execute QA Validation",
            "assigned_agent": "QA Agent",
            "status": "Pending"
        }
    ]

    return {
        "message": f"Workflow Started: {request.goal}",
        "workflow_status": "active",
        "tasks": tasks_db
    }

@app.get("/tasks")
def get_tasks():
    return {
        "total_tasks": len(tasks_db),
        "tasks": tasks_db
    }

@app.get("/agents")
def get_agents():

    agents = [
        {
            "name": "Planner Agent",
            "status": "Online",
            "role": "Requirement Analysis"
        },
        {
            "name": "Frontend Agent",
            "status": "Working",
            "role": "UI Development"
        },
        {
            "name": "Backend Agent",
            "status": "Pending",
            "role": "API Development"
        },
        {
            "name": "DevOps Agent",
            "status": "Online",
            "role": "Infrastructure Deployment"
        },
        {
            "name": "QA Agent",
            "status": "Online",
            "role": "Testing & Validation"
        }
    ]

    return {
        "agents": agents
    }

@app.get("/analytics")
def analytics():

    return {
        "active_agents": 12,
        "tasks_executed": 1284,
        "ai_efficiency": "94%",
        "workflow_speed": "3.2x",
        "system_health": "Optimal"
    }

@app.post("/ask-ai")
def ask_ai(data: AIQuestion):

    try:

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": """
                    You are SynapseOS AI Workforce Assistant.
                    Help users manage AI workflows, automation,
                    enterprise systems, productivity and AI agents.
                    """
                },
                {
                    "role": "user",
                    "content": data.question
                }
            ],
            temperature=0.7,
            max_tokens=300
        )

        answer = response.choices[0].message.content

        return {
            "success": True,
            "response": answer
        }

    except Exception as e:

        return {
            "success": False,
            "response": "AI service unavailable.",
            "error": str(e)
        }