from datetime import datetime, timedelta, timezone
from DainLibrary.dbManager import DBManager
from DainLibrary.fileManager import FileManager
from fastapi.responses import JSONResponse
import jwt


class UserDAO:
    def __init__(self):
        self.h = {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
        }
        self.filePath = "./user/psaFolder/"
        self.capacity = 30 * 1024 * 1024
        self.jwtKey = "qwerasdfzxcv"
        self.jwtAlgorithm = "HS256"

    def checkNick(self, nick):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )
            sql = "select count(*) from pc_user where nick='%s'" % nick
            cur.execute(sql)

            for i in cur:
                if i[0] == 1:
                    return JSONResponse({"result": "존재하는 닉네임"}, headers=self.h)
            return JSONResponse({"result": "사용 가능한 닉네임"}, headers=self.h)
        except Exception as e:
            return JSONResponse({"result": "DB문제 발생"}, headers=self.h)
        finally:
            DBManager.closeConCur(con, cur)

    def checkId(self, id):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )
            sql = "select count(*) from pc_user where id='%s'" % id
            cur.execute(sql)

            for i in cur:
                if i[0] == 1:
                    return JSONResponse({"result": "존재하는 ID"}, headers=self.h)
            return JSONResponse({"result": "사용 가능한 ID"}, headers=self.h)
        except Exception as e:
            return JSONResponse({"result": "DB문제 발생"}, headers=self.h)
        finally:
            DBManager.closeConCur(con, cur)

    def login(self, id, pw):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )
            sql = "select * from pc_user where id='%s'" % id
            cur.execute(sql)
            row = cur.fetchone()

            if row:
                dbId, dbPw, dbNick, dbBirth, dbGender, dbAddr, dbPsa = row
                if dbPw == pw:
                    r = {
                        "id": dbId,
                        "pw": dbPw,
                        "nickName": dbNick,
                        "birth": datetime.strftime(dbBirth, "%Y-%m-%d"),
                        "gender": dbGender,
                        "addr": dbAddr,
                        "psa": dbPsa,
                        "exp": datetime.now(timezone.utc) + timedelta(seconds=36000),
                    }
                    jwtR = jwt.encode(r, self.jwtKey, self.jwtAlgorithm)
                    return JSONResponse(
                        {"result": "로그인 성공", "user": jwtR}, headers=self.h
                    )
                else:
                    return JSONResponse(
                        {"result": "로그인 실패(비밀번호)"}, headers=self.h
                    )
            else:
                return JSONResponse({"result": "로그인 실패(아이디)"}, headers=self.h)
        except Exception as e:
            return JSONResponse({"result": "DB문제 발생"}, headers=self.h)
        finally:
            DBManager.closeConCur(con, cur)

    async def signUp(self, id, pw, nick, birth, gender, addr1, addr2, addr3, psa):
        fileName = psa
        if psa != None:
            try:
                content = await psa.read()
                if len(content) > self.capacity:
                    raise
                fileName = FileManager.changeName(fileName.filename)
                FileManager.writeFile(self.filePath, fileName, content)

            except Exception as e:
                return JSONResponse(
                    {"result": id + "님 가입 실패(파일)"}, headers=self.h
                )

        try:
            addr = addr2 + "!" + addr3 + "!" + addr1
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )
            sql = (
                "insert into pc_user values ('%s', '%s','%s', '%s' ,'%s','%s','%s')"
                % (id, pw, nick, birth, gender, addr, fileName)
            )
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return JSONResponse({"result": id + "님 가입 성공"}, headers=self.h)
        except Exception as e:
            return JSONResponse({"result": id + "님 가입 실패(DB)"}, headers=self.h)
        finally:
            DBManager.closeConCur(con, cur)
