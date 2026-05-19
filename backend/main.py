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

    question = data.question.lower()

    try:

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content": """
                    You are SynapseOS AI Workforce Assistant.
                    Help users with AI operations,
                    enterprise automation,
                    workflow orchestration,
                    DevOps and SaaS scaling.
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
            "response": answer,
            "mode": "live-ai"
        }

    except Exception:

        if "deployment" in question:

            fallback = """
AI Deployment Roadmap:

1. Build MVP using FastAPI + Next.js
2. Deploy backend on Render Cloud
3. Deploy frontend on Vercel
4. Integrate OpenAI-powered agents
5. Add workflow orchestration engine
6. Implement monitoring & analytics
7. Scale using containerized microservices
8. Launch enterprise SaaS platform
"""

        elif "startup" in question:

            fallback = """
SynapseOS is an AI workforce orchestration platform that enables enterprises to automate workflows using autonomous AI agents, cloud-native infrastructure and real-time analytics.
"""

        elif "security" in question:

            fallback = """
Recommended Security Stack:
- OAuth2 Authentication
- JWT Authorization
- Role-Based Access Control
- API Rate Limiting
- Secure Cloud Infrastructure
- AI Agent Isolation Layers
"""

        elif "architecture" in question:

            fallback = """
System Architecture:
Frontend: Next.js + TailwindCSS
Backend: FastAPI
AI Layer: OpenAI APIs
Deployment: Render + Vercel
Cloud Infrastructure: Containerized Services
"""

        else:

            fallback = f"""
SynapseOS AI analyzed your request:

"{data.question}"

Recommended Enterprise Actions:
• Deploy autonomous AI agents
• Enable workflow automation
• Integrate cloud-native infrastructure
• Monitor AI productivity metrics
• Scale using enterprise orchestration
"""

        return {
            "success": True,
            "response": fallback,
            "mode": "fallback-ai"
        }