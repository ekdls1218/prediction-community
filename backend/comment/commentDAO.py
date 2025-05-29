from fastapi import HTTPException, Header
import jwt
from DainLibrary.dbManager import DBManager

class CommentDAO:
    def __init__(self):
        self.jwtKey = "qwerasdfzxcv"
        self.jwtAlgorithm = "HS256"

    def getUserId(self, authorization: str = Header(None)):
        if not authorization:
            raise HTTPException(status_code=401, detail="No token provided")
        token = authorization.split(" ")[1] 
        try:
            payload = jwt.decode(token, self.jwtKey, self.jwtAlgorithm)
            return payload["id"]
        except jwt.ExpiredSignatureError:
            return {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            return {"result": "만든 적 없음"}

    def getUserId2(self, userInfo):
        try:
            user = jwt.decode(userInfo, self.jwtKey, self.jwtAlgorithm)
            return user["id"]
        except jwt.ExpiredSignatureError:
            return {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            return {"result": "만든 적 없음"}


    async def addComment(self, content, userInfo, postId):
        userId = self.getUserId2(userInfo)
        print(content, userId, postId)
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = (
                "insert into pc_comment (content, user_id, post_id) values('%s', '%s', '%d')" % (content, userId, postId)
            )

            cur.execute(sql)

            if cur.rowcount == 1:
                # print("성공")
                con.commit()

            return {"result": "성공"}

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getComment(self, postId):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select * from pc_comment where post_id='%d' order by id" %(postId)

            cur.execute(sql)

            comments = []
            for id, content, user_id, post_id in cur :  
                comments.append({"id":id, "content":content, "userId":user_id, "postId":post_id})

            return comments

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)
