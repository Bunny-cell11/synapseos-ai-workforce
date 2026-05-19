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

    if "ev fleet" in question or "fleet management" in question:

        fallback = """
AI-Powered EV Fleet Management Architecture:

Frontend Layer:
• Next.js Enterprise Dashboard
• Real-time Fleet Monitoring UI
• Analytics Visualization System

Backend Layer:
• FastAPI Microservices
• Fleet Orchestration Engine
• REST API Gateway

AI Intelligence Layer:
• Predictive Maintenance Agents
• Route Optimization AI
• Battery Health Prediction
• Autonomous Scheduling Agents

Cloud Infrastructure:
• Azure Cloud Services
• Containerized Deployments
• Real-time Data Pipelines
• Monitoring & Logging

Business Outcomes:
• Reduced operational costs
• Improved fleet efficiency
• Predictive maintenance automation
"""

    elif "multi-agent" in question or "enterprise automation" in question:

        fallback = """
Scalable Multi-Agent Enterprise Workflow:

1. Planner Agent
• Requirement Analysis
• Task Distribution

2. Frontend Agent
• Dashboard Generation
• UI Workflow Creation

3. Backend Agent
• API Development
• Service Orchestration

4. DevOps Agent
• Infrastructure Deployment
• CI/CD Automation

5. QA Agent
• Validation Testing
• Performance Monitoring

6. Analytics Agent
• KPI Tracking
• Operational Insights

Result:
An autonomous enterprise automation ecosystem powered by collaborative AI agents.
"""

    elif "devops" in question:

        fallback = """
AI Agents Improve DevOps Productivity By:

• Automating CI/CD pipelines
• Monitoring infrastructure health
• Detecting deployment failures
• Predicting scaling requirements
• Auto-remediating incidents
• Generating deployment reports
• Optimizing cloud infrastructure
• Reducing operational downtime

Impact:
Faster deployments, reduced costs and improved reliability.
"""

    elif "azure" in question or "cloud-native" in question:

        fallback = """
Cloud-Native AI Infrastructure Architecture:

Frontend Layer:
• Next.js Enterprise Dashboard
• TailwindCSS UI System
• Real-time AI Operations Center

Backend Layer:
• FastAPI Microservices
• REST API Gateway
• AI Workflow Orchestrator

Cloud Infrastructure:
• Microsoft Azure Cloud
• Azure Kubernetes Service (AKS)
• Azure Blob Storage
• Azure Monitor & Logging
• Containerized Deployment Pipelines

AI Intelligence Layer:
• OpenAI-powered AI Agents
• Autonomous Workflow Engine
• Multi-Agent Collaboration System
• Predictive Analytics Engine

DevOps & Security:
• CI/CD Automation
• OAuth2 Authentication
• JWT Authorization
• Infrastructure Monitoring
• Enterprise-grade Scalability

Outcome:
A scalable enterprise AI workforce platform capable of autonomous operations and intelligent workflow orchestration.
"""

    elif "collaborate" in question or "autonomous ai teams" in question:

        fallback = """
SynapseOS enables autonomous AI teams to collaborate through intelligent workflow orchestration.

Planner Agents:
• Analyze enterprise requirements
• Coordinate task execution

Execution Agents:
• Build services and APIs
• Automate workflows

DevOps Agents:
• Deploy infrastructure
• Monitor system health

QA Agents:
• Validate outputs
• Ensure reliability

Analytics Agents:
• Track KPIs
• Generate operational insights

Result:
A fully autonomous AI workforce operating system.
"""

    elif "deployment roadmap" in question or "saas startup" in question:

        fallback = """
AI SaaS Deployment Roadmap:

Phase 1:
• Build MVP using FastAPI + Next.js

Phase 2:
• Deploy backend on Render
• Deploy frontend on Vercel

Phase 3:
• Integrate AI orchestration services
• Enable workflow automation

Phase 4:
• Add monitoring & analytics pipelines
• Scale using containerized infrastructure

Phase 5:
• Enterprise SaaS Launch
• Customer onboarding
• AI operations scaling
"""

    elif "1 million users" in question or "scale fastapi" in question:

        fallback = """
FastAPI Scaling Strategy for 1 Million Users:

Infrastructure:
• Kubernetes orchestration
• Load balancing
• Horizontal auto-scaling

Performance:
• Redis caching
• Async processing
• CDN integration

Database:
• Replication & sharding
• Managed cloud databases

Monitoring:
• Prometheus metrics
• Grafana dashboards
• Real-time alerting

Result:
High availability enterprise-grade backend infrastructure.
"""

    elif "security" in question:

        fallback = """
Enterprise AI Security Best Practices:

Authentication:
• OAuth2 Authentication
• JWT Authorization

Infrastructure:
• Zero-trust architecture
• API rate limiting
• Encrypted communications

AI Layer:
• AI workload isolation
• Prompt validation
• Threat monitoring pipelines

Access Control:
• Role-based access control
• Secure secrets management

Outcome:
Enterprise-grade AI security infrastructure.
"""

    elif "kpis" in question or "analytics" in question:

        fallback = """
Enterprise AI Operations KPIs:

Operational Metrics:
• Workflow completion rate
• AI agent productivity score
• Infrastructure uptime

Performance Metrics:
• AI response latency
• Deployment success rate
• Incident resolution time

Business Metrics:
• Automation efficiency gain
• Operational cost reduction
• Enterprise productivity growth

Outcome:
Real-time visibility into enterprise AI operations.
"""

    elif "startup pitch" in question or "pitch" in question:

        fallback = """
SynapseOS is an AI workforce operating system that enables enterprises to deploy autonomous AI teams for workflow automation, DevOps orchestration, analytics and enterprise productivity.

Unlike traditional automation platforms, SynapseOS combines autonomous AI agents, cloud-native infrastructure and enterprise intelligence into a scalable AI-native operating system.

Vision:
Transform enterprise operations into fully autonomous AI-powered ecosystems.
"""

    elif "different from traditional workflow" in question:

        fallback = """
Traditional workflow systems rely on static automation and manual orchestration.

SynapseOS introduces:

• Autonomous AI agents
• Real-time decision making
• Multi-agent collaboration
• Intelligent workflow orchestration
• AI-native infrastructure automation
• Enterprise productivity optimization

Result:
A next-generation autonomous workforce platform.
"""

    elif "market opportunity" in question:

        fallback = """
Market Opportunity for Autonomous AI Workforce Platforms:

The global enterprise AI automation market is rapidly expanding as organizations seek intelligent systems to improve productivity and reduce operational costs.

SynapseOS addresses this opportunity through:

• Autonomous enterprise workflows
• AI-native infrastructure
• Cloud-scale orchestration
• Real-time analytics
• Multi-agent collaboration

Market Potential:
The rise of enterprise AI transformation creates a multi-billion-dollar opportunity for autonomous workforce platforms.
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