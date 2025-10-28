from fastapi import HTTPException, Header
import jwt
from DainLibrary.dbManager import DBManager
import os

class CommentDAO:
    def __init__(self):
        self.db_host = os.getenv("DB_HOST")
        self.db_user = os.getenv("DB_USER")
        self.db_pass = os.getenv("DB_PASS")
        self.db_name = os.getenv("DB_NAME")
        self.jwtKey = os.getenv("JWT_SECRET")
        self.jwtAlgorithm = os.getenv("JWT_ALGO")

    async def addComment(self, content, userId, postId):
        try:
            con, cur = DBManager.makeConCur(
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql = (
                "insert into pc_comment (content, user_id, post_id) values(%s, %s, %s)"
            )

            cur.execute(sql, (content, userId, postId,))

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
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql = "select * from pc_comment where post_id=%s order by id" %(postId)

            cur.execute(sql, (postId,))

            comments = []
            for id, content, user_id, post_id in cur :  
                comments.append({"id":id, "content":content, "userId":user_id, "postId":post_id})

            return comments

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)
