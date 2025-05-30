from fastapi import HTTPException, Header
from fastapi.responses import JSONResponse
from DainLibrary.dbManager import DBManager
import jwt


class PredictionDAO:
    def __init__(self):
        self.jwtKey = "qwerasdfzxcv"
        self.jwtAlgorithm = "HS256"

    def getUserId2(self, authorization: str = Header(None)):
        if not authorization:
            raise HTTPException(status_code=401, detail="No token provided")
        token = authorization.split(" ")[1]  # "Bearer xxx" → "xxx"
        try:
            payload = jwt.decode(token, self.jwtKey, self.jwtAlgorithm)
            return payload["id"]
        except jwt.ExpiredSignatureError:
            return {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            return {"result": "만든 적 없음"}

    def getUserId(self, userInfo):
        try:
            user = jwt.decode(userInfo, self.jwtKey, self.jwtAlgorithm)
            return user["id"]
        except jwt.ExpiredSignatureError:
            return {"result": "만료됨"}
        except jwt.exceptions.DecodeError:
            return {"result": "만든 적 없음"}

    async def createPrediction(self, category, title, deadline, userInfo):
        userId = self.getUserId(userInfo)

        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql_post = (
                "insert into pc_post (title, deadline, category_id, user_id) values('%s', '%s', '%d', '%s')"
                % (title, deadline, category, userId)
            )

            cur.execute(sql_post)

            if cur.rowcount == 1:
                post_id = cur.lastrowid
                print(post_id)
                sql_result = "insert into pc_result (post_id) values(%s)"
                cur.execute(sql_result, (post_id,))

                if cur.rowcount == 1:
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

            sql = "select * from pc_category order by id"

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

            sql = "select * from pc_post where deadline >= NOW() order by id desc"

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

    async def addVote(self, vote, userInfo, postId, categoryId):
        userId = self.getUserId(userInfo)

        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql_vote = "insert into pc_vote (pick, user_id, post_id) values ('%d', '%s', '%d')" % (
                vote,
                userId,
                postId,
            )

            cur.execute(sql_vote)

            if cur.rowcount == 1:
                sql_stats = "update pc_stats set total_count = total_count + 1 where user_id = %s and category_id = %s"
                cur.execute(sql_stats, (userId, categoryId))
                
                if cur.rowcount >= 1:
                    con.commit()

                    return {"result": "성공"}

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getVote(self, postId):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select count(*) as total_vote, SUM(pick = TRUE) AS true_votes, SUM(pick = FALSE) AS false_votes,"
            sql += " ROUND(SUM(pick = TRUE) / COUNT(*) * 100, 1) AS true_rate, ROUND(SUM(pick = FALSE) / COUNT(*) * 100, 1) AS false_rate "
            sql += "FROM pc_vote WHERE post_id = %s" %(postId)

            cur.execute(sql)

            voteInfo = {}
            for total_vote, true_votes, false_votes, true_rate, false_rate in cur: 
                voteInfo["total_vote"] = total_vote
                voteInfo["true_votes"] = true_votes
                voteInfo["false_votes"] = false_votes
                voteInfo["true_rate"] = true_rate
                voteInfo["false_rate"] = false_rate

            return voteInfo

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getUserVotes(self, userId):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select post_id, pick from pc_vote where user_id = '%s';" %(userId)

            cur.execute(sql)
            
            userVotes = []
            for v_post_id, v_pick in cur:
                userVotes.append({"post_id" : v_post_id, "pick": v_pick})
            return userVotes

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)
