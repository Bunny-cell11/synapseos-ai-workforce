from fastapi import APIRouter

router = APIRouter()

@router.get("/workflows")
def get_workflows():

    return {
        "workflows": [
            {
                "id": 1,
                "title": "AI Infrastructure Deployment",
                "status": "Running",
                "assigned_agent": "DevOps Agent"
            },
            {
                "id": 2,
                "title": "Analytics Generation",
                "status": "Completed",
                "assigned_agent": "Analytics Agent"
            }
        ]
    }