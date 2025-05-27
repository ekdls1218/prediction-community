from typing import Optional
from fastapi import FastAPI, Form, UploadFile, File
from user.userDAO import UserDAO
from prediction.predictionDAO import PredictionDAO
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# uvicorn homeController:app --host=localhost --port=8000 --reload
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uDao = UserDAO()
pDao = PredictionDAO()

class Prediction(BaseModel):
    selectedCategory: str
    title: str
    deadline: str

@app.get("/auth/check-nick")
def checkNick(nick):
    return uDao.checkNick(nick)

@app.get("/auth/check-id")
def checkId(id):
    return uDao.checkId(id)

@app.post("/auth/login")
def login(id: str = Form(), pw: str = Form()):
    return uDao.login(id, pw)

@app.post("/auth/signup")
async def signUp(
    psa: Optional[UploadFile] = File(None),
    id: str = Form(),
    pw: str = Form(),
    nick: str = Form(),
    birth: str = Form(),
    gender: str = Form(),
    addr1: str = Form(),
    addr2: str = Form(),
    addr3: str = Form(),
):
    return await uDao.signUp(id, pw, nick, birth, gender, addr1, addr2, addr3, psa)

@app.post("/predictions")
async def createPrediction(prediction: Prediction):
    return await pDao.createPrediction(prediction.selectedCategory, prediction.title, prediction.deadline)
