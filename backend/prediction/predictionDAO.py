from fastapi.responses import JSONResponse
from DainLibrary.dbManager import DBManager
import jwt


class PredictionDAO:
    def __init__(self):
        self.jwtKey = "qwerasdfzxcv"
        self.jwtAlgorithm = "HS256"

    async def createPrediction(self, category, title, deadline, userInfo):
        try:
            user = jwt.decode(userInfo, self.jwtKey, self.jwtAlgorithm)
            userId = user["id"]
        except jwt.ExpiredSignatureError:
            return {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            return {"result": "만든 적 없음"}

        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = (
                "insert into pc_post (title, deadline, category_id, user_id) values('%s', '%s', '%d', '%s')"
                % (title, deadline, category, userId)
            )

            cur.execute(sql)

            if cur.rowcount == 1:
                print("성공")
                con.commit()

            return {"result": "성공"}

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getCategory(self):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select * from pc_category"

            cur.execute(sql)

            categories = []
            for c_id, c_name in cur:
                categories.append({"id": c_id, "name": c_name})

            return categories

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    async def getPredictions(self):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select * from pc_post"

            cur.execute(sql)

            posts = []
            for p_id, p_title, p_deadline, p_created_at, p_cate_id, p_user_id in cur:
                posts.append(
                    {
                        "id": p_id,
                        "title": p_title,
                        "deadline": p_deadline,
                        "created_at": p_created_at,
                        "category": p_cate_id,
                        "userId": p_user_id,
                    }
                )
            return posts

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)
