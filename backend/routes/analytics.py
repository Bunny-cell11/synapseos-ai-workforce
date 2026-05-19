from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics")
def analytics():
    return {
        "active_agents": 12,
        "completed_workflows": 248,
        "team_efficiency": "94%"
    }
