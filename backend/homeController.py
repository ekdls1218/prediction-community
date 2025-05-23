from typing import Optional
from fastapi import FastAPI, Form, UploadFile, File
from user.userDAO import UserDAO

# uvicorn homeController:app --host=localhost --port=8000 --reload
app = FastAPI()
uDao = UserDAO()

@app.get("/auth/check-nick")
def checkNick(nick):
    return uDao.checkNick(nick)

@app.get("/auth/check-id")
def checkId(id):
    return uDao.checkId(id)

@app.post("/auth/signup")
async def signUp(psa: Optional[UploadFile] = File(None),
    id: str = Form(),
    pw: str = Form(),
    nick: str = Form(),
    birth: str = Form(),
    gender: str = Form(),
    addr1: str = Form(),
    addr2: str = Form(),
    addr3: str = Form()):
    return await uDao.signUp(id, pw, nick, birth, gender, addr1, addr2, addr3, psa)