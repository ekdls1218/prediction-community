from typing import Optional
from fastapi import Depends, FastAPI, Form, UploadFile, File
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
    selectedCategory: int
    title: str
    deadline: str
    userInfo: str

class Vote(BaseModel):
    vote: int
    userInfo:str
    postId:int

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
    return await pDao.createPrediction(prediction.selectedCategory, prediction.title, prediction.deadline, prediction.userInfo)

@app.get("/predictions")
async def getPredictions():
    return await pDao.getPredictions()

@app.get("/category")
def getCategory():
    return pDao.getCategory()

@app.post("/predictions/vote")
async def addVote(v: Vote):
    print("ok")
    return await pDao.addVote(v.vote, v.userInfo, v.postId)

@app.get("/predictions/{post_id}/vote")
def getVote(post_id:int):
    return pDao.getVote(post_id)


@app.get("/predictions/votes")
def getUserVotes(user_id:str = Depends(pDao.getUserId2)):
    print(user_id)
    return pDao.getUserVotes(user_id)