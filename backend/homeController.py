from typing import Optional
from fastapi import Depends, FastAPI, Form, UploadFile, File
from user.userDAO import UserDAO
from prediction.predictionDAO import PredictionDAO
from comment.commentDAO import CommentDAO
from my.MyDAO import MyDAO
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
cDao = CommentDAO()
mDao = MyDAO()

class Prediction(BaseModel):
    selectedCategory: int
    title: str
    deadline: str
    userInfo: str

class Vote(BaseModel):
    vote: int
    userInfo:str
    postId:int
    category_id: int

class Comment(BaseModel):
    content: str
    userInfo: str
    postId: int

class Result(BaseModel):
    post_id: int
    result: int

@app.get("/auth/check-nick")
def checkNick(nick):
    return uDao.checkNick(nick)

@app.get("/auth/check-id")
def checkId(id):
    return uDao.checkId(id)

@app.get("/auth/check-login")
def checkLogin(id:str = Depends(uDao.getUserId)):
    print(id)
    return uDao.checkLogin(id)

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

@app.post("/auth/delete")
def deleteUser(id:str = Depends(uDao.getUserId)):
    return uDao.deleteUser(id)

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
    print(v.vote, v.userInfo, v.postId, v.category_id)
    return await pDao.addVote(v.vote, v.userInfo, v.postId, v.category_id)

@app.get("/predictions/{post_id}/vote")
def getVote(post_id:int):
    return pDao.getVote(post_id)

@app.get("/predictions/votes")
def getUserVotes(user_id:str = Depends(pDao.getUserId2)):
    return pDao.getUserVotes(user_id)

@app.post("/comments")
async def addComment(c:Comment):
    return await cDao.addComment(c.content, c.userInfo, c.postId)

@app.get("/comments/{post_id}")
def getComment(post_id:int):
    return cDao.getComment(post_id)

@app.get("/my/stats/all-stat")
def getAllStat(user_id:str = Depends(mDao.getUserId)):
    return mDao.getAllStat(user_id)

@app.get("/my/stats/category-stat")
def getCategoryStat(user_id:str = Depends(mDao.getUserId)):
    return mDao.getCategoryStat(user_id)

@app.get("/my/prediction/votes")
def getVotePosts(user_id:str = Depends(mDao.getUserId)):
    return mDao.getVotePosts(user_id)

@app.get("/my/prediction")
def getMyPosts(user_id:str = Depends(mDao.getUserId)):
    return mDao.getMyPosts(user_id)

@app.post("/my/prediction/result")
def addResult(r:Result):
    print(r.post_id, r.result)
    return mDao.addResult(r.post_id, r.result)

@app.get("/stats/update")
def updateAccuracy(user_id:str = Depends(mDao.getUserId)):
    return mDao.updateAccuracy(user_id)

@app.get("/my/info")
def getMyInfo(user_id:str = Depends(mDao.getUserId)):
    return mDao.getMyInfo(user_id)

@app.patch("/my/info/update")
async def updateMyInfo(
    psa: Optional[UploadFile] = File(None),
    nick: str = Form(),
    birth: str = Form(),
    gender: str = Form(),
    addr1: str = Form(),
    addr2: str = Form(),
    addr3: str = Form(),
    id:str = Depends(mDao.getUserId)
):
    print(id, nick, birth, gender, addr1, addr2, addr3, psa)
    return await mDao.updateMyInfo(id, nick, birth, gender, addr1, addr2, addr3, psa)

@app.get("/rank/user")
def getRankUser():
    return mDao.getRankUser()

@app.get("/rank/post")
def getRankPost():
    return mDao.getRankPost()