from DainLibrary.dbManager import DBManager
from DainLibrary.fileManager import FileManager
from fastapi.responses import JSONResponse


class UserDAO:
    def __init__(self):
        self.h = {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
        }
        self.filePath = "./user/psaFolder/"
        self.capacity = 30 * 1024 * 1024

    def checkNick(self, nick):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )
            sql = "select count(*) from pc_user where nick='%s'" % nick
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
            print(e)
            return JSONResponse({"result": "DB문제 발생"}, headers=self.h)
        finally:
            DBManager.closeConCur(con, cur)

    async def signUp(self, id, pw, nick, birth, gender, addr1, addr2, addr3, psa):
        # print(id, pw, nick, birth, gender, addr1, addr2, addr3, psa)
        fileName = psa
        if psa != None:
            try:
                content = await psa.read()
                if len(content) > self.capacity:
                    raise
                fileName = FileManager.changeName(fileName.filename)
                print(fileName)
                FileManager.writeFile(self.filePath, fileName, content)

            except Exception as e:
                # print(e)
                return JSONResponse(
                    {"result": id + "님 가입 실패(파일)"}, headers=self.h
                )
        print(id, pw, nick, birth, gender, addr1, addr2, addr3, fileName)
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
            print(cur.rowcount)
            if cur.rowcount == 1:
                print("성공")
                con.commit()
                return JSONResponse({"result": id + "님 가입 성공"}, headers=self.h)
        except Exception as e:
            # print(e)
            return JSONResponse({"result": id + "님 가입 실패(DB)"}, headers=self.h)
        finally:
            DBManager.closeConCur(con, cur)
