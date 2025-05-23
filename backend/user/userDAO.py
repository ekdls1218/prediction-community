from DainLibrary.dbManager import dBManager
from fastapi.responses import JSONResponse


class UserDAO:
    def __init__(self):
        self.h = {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
        }

    def checkNick(self, nick):
        try:
            con, cur = dBManager.makeConCur("localhost", "root", "root", "prediction_community")
            sql = (
                "select count(*) from pc_user where nick='%s'" % nick
            )
            cur.execute(sql)

            for i in cur:
                print(i)
                if i[0] == 1:
                    return JSONResponse({"result": "존재하는 닉네임"}, headers=self.h)
            return JSONResponse({"result": "사용 가능한 닉네임"}, headers=self.h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "DB문제 발생"}, headers=self.h)
        finally:
            dBManager.closeConCur(con, cur)

    def checkId(self, id):
        try:
            con, cur = dBManager.makeConCur("localhost", "root", "root", "prediction_community")
            sql = (
                "select count(*) from pc_user where id='%s'" % id
            )
            cur.execute(sql)

            for i in cur:
                if i[0] == 1:
                    return JSONResponse({"result": "존재하는 ID"}, headers=self.h)
            return JSONResponse({"result": "사용 가능한 ID"}, headers=self.h)
        except Exception as e:
            print(e)
            return JSONResponse({"result": "DB문제 발생"}, headers=self.h)
        finally:
            dBManager.closeConCur(con, cur)

    def signUp(self):
        pass