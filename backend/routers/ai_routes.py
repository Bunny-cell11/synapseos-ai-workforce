from fastapi import APIRouter
from database.db import SessionLocal
from models.team import Team

router = APIRouter()

@router.post("/create")
def create_team(name: str, owner_id: int):

    db = SessionLocal()

    team = Team(
        name=name,
        owner_id=owner_id
    )

    db.add(team)
    db.commit()
    db.refresh(team)

    return {
        "team_id": team.id,
        "name": team.name
    }


@router.get("/{team_id}")
def get_team(team_id: int):

    db = SessionLocal()

    return db.query(Team).filter(Team.id == team_id).first()
