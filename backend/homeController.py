from fastapi import FastAPI
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
async def signUp(nick):
    return await uDao.signUp(nick)