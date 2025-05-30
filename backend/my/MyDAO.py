from fastapi import HTTPException, Header
import jwt
from DainLibrary.dbManager import DBManager


class MyDAO:
    def __init__(self):
        self.jwtKey = "qwerasdfzxcv"
        self.jwtAlgorithm = "HS256"

    def getUserId(self, authorization: str = Header(None)):
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

    def getAllStat(self, userId):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select sum(correct_count) as all_correct_count, sum(total_count) as all_total_count,"
            sql += " round(sum(correct_count) / sum(total_count) * 100, 2) as all_accuracy_rate"
            sql += " from pc_stats"
            sql += " where user_id = %s"
            sql += " group by user_id;"

            cur.execute(sql, (userId,))
            row = cur.fetchone()

            if row:
                return {
                    "allCorrect": int(row[0]),
                    "allTotal": int(row[1]),
                    "allAccuracy": int(row[2]),
                }

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getCategoryStat(self, userId):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select name, accuracy_rate"
            sql += " from pc_stats as pc_s, pc_category pc_c"
            sql += " where pc_s.user_id = %s and pc_s.category_id = pc_c.id"
            sql += " order by pc_s.category_id;"

            cur.execute(sql, (userId,))
            rows = cur.fetchall()

            categoryStats = []
            for row in rows:
                categoryStats.append({"name": row[0], "value": int(row[1])})

            return categoryStats

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getVotePosts(self, userId):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select p.id, p.title, v.pick, r.result, c.name"
            sql += " from pc_post as p"
            sql += " join pc_vote as v on p.id = v.post_id"
            sql += " left join pc_result as r on v.post_id = r.post_id"
            sql += " join pc_category as c on p.category_id = c.id"
            sql += " where v.user_id = %s"
            sql += " order by p.deadline desc;"

            cur.execute(sql, (userId,))
            rows = cur.fetchall()
            # print(rows)

            votePosts = []
            for r in rows:
                votePosts.append(
                    {
                        "post_id": r[0],
                        "title": r[1],
                        "pick": bool(r[2]),
                        "result": (bool(r[3]) if r[3] is not None else None),
                        "category_name": r[4],
                    }
                )

            # print(votePosts)
            return votePosts

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getMyPosts(self, userId):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "select p.id, p.title, p.deadline, r.result, c.name"
            sql += " from pc_post as p"
            sql += " join pc_result as r on p.id = r.post_id"
            sql += " join pc_category as c on p.category_id = c.id"
            sql += " where p.user_id = %s"
            sql += " order by p.deadline desc;"

            cur.execute(sql, (userId,))
            rows = cur.fetchall()
            print(rows)

            myPosts = []
            for r in rows:
                myPosts.append(
                    {
                        "post_id": r[0],
                        "title": r[1],
                        "deadline": str(r[2]),
                        "result": (bool(r[3]) if r[3] is not None else None),
                        "category_name": r[4],
                    }
                )

            print(myPosts)
            return myPosts

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def addResult(self, postId, result):
        try:
            con, cur = DBManager.makeConCur(
                "localhost", "root", "root", "prediction_community"
            )

            sql = "update pc_result set result = %s where post_id = %s"

            cur.execute(sql, (result, postId,))
            if cur.rowcount == 1:
                print("성공")
                con.commit()

            return {"result": "성공"}

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)
