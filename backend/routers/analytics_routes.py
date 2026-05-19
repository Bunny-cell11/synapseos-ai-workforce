from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics")
def analytics():

    return {
        "users": 2450,
        "active_agents": 38,
        "automation_rate": "89%",
        "tasks_completed": 15420
    }