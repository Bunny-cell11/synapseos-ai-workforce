from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

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
        "message": "SynapseOS AI Backend Running"
    }

@app.post("/start-project")
def start_project(request: ProjectRequest):

    global tasks_db

    prompt = f"""
    Create software project execution tasks for:
    {request.goal}

    Return JSON array only.
    """

    try:

        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response.choices[0].message.content

        tasks_db = json.loads(content)

    except Exception as e:

        print("OpenAI Error:", e)

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
                "title": "Run AI Validation Testing",
                "assigned_agent": "QA Agent",
                "status": "Pending"
            }
        ]

    return {
        "message": f"Workflow Started: {request.goal}",
        "tasks": tasks_db
    }

@app.get("/tasks")
def get_tasks():
    return {
        "tasks": tasks_db
    }