from fastapi import APIRouter
from pydantic import BaseModel
from auth import hash_password, create_access_token

router = APIRouter()

class UserRequest(BaseModel):
    email: str
    password: str

@router.post("/register")
def register(user: UserRequest):

    token = create_access_token(
        {"email": user.email}
    )

    return {        "message": "User registered",
        "token": token
    }