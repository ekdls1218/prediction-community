from fastapi import HTTPException, Header
import jwt
from DainLibrary.dbManager import DBManager
from datetime import datetime
from DainLibrary.fileManager import FileManager
import os

class MyDAO:
    def __init__(self):
        self.db_host = os.getenv("DB_HOST")
        self.db_user = os.getenv("DB_USER")
        self.db_pass = os.getenv("DB_PASS")
        self.db_name = os.getenv("DB_NAME")
        self.jwtKey = os.getenv("JWT_SECRET")
        self.jwtAlgorithm = os.getenv("JWT_ALGO")
        self.filePath = "./user/psaFolder/"
        self.capacity = 30 * 1024 * 1024

    def getAllStat(self, userId):
        try:
            con, cur = DBManager.makeConCur(
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql = "select sum(correct_count) as all_correct_count, sum(total_count) as all_total_count,"
            sql += " round(ifnull(SUM(correct_count) / nullif(SUM(total_count), 0) * 100, 0), 2) as all_accuracy_rate"
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
                self.db_host, self.db_user, self.db_pass, self.db_name
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
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql = "select p.id, p.title, p.deadline, v.pick, r.result, c.name"
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
                        "deadline": r[2],
                        "pick": bool(r[3]),
                        "result": (bool(r[4]) if r[4] is not None else None),
                        "category_name": r[5],
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
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql = "select p.id, p.title, p.deadline, r.result, c.name"
            sql += " from pc_post as p"
            sql += " join pc_result as r on p.id = r.post_id"
            sql += " join pc_category as c on p.category_id = c.id"
            sql += " where p.user_id = %s"
            sql += " order by p.deadline desc;"

            cur.execute(sql, (userId,))
            rows = cur.fetchall()
            # print(rows)

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

            # print(myPosts)
            return myPosts

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def addResult(self, postId, result):
        try:
            con, cur = DBManager.makeConCur(
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql_result = "update pc_result set result = %s where post_id = %s"
            cur.execute(sql_result, (result, postId,))

            if cur.rowcount != 1:
                raise ValueError("result update failed")
            
            con.commit()
            return {"result": "성공"}

        except Exception as e:
            if con :
                con.rollback()
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def updateAccuracy(self, userId):
        print(f"🔥 updateStats 실행됨: {userId}")
        try:
            con, cur = DBManager.makeConCur(
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql_compare = "select v.pick, r.result, v.user_id, p.category_id, p.id"
            sql_compare += " from pc_post as p"
            sql_compare += " join pc_vote as v on p.id = v.post_id"
            sql_compare += " join pc_result as r on p.id = r.post_id"
            sql_compare += " where v.user_id = %s and v.is_reflected = 0 and r.result IS NOT NULL and p.deadline < NOW();"

            sql_get_correct_count = "select correct_count from pc_stats where user_id = %s and category_id = %s"

            sql_get_reflected_count = "select count(*) as reflected_count from pc_vote where user_id = %s AND is_reflected = 1;"

            sql_update = "update pc_stats"
            sql_update += " set correct_count = %s, accuracy_rate = %s"
            sql_update += " where user_id = %s and category_id = %s"

            sql_is_update = "update pc_vote"
            sql_is_update += " set is_reflected = 1"
            sql_is_update += " where user_id = %s and post_id = %s"

            cur.execute(sql_compare, (userId,))
            rows = cur.fetchall()

            if not rows:
                return
            
            stats = {}

            for pick, result, uid, cid, pid in rows:
                # 유저별 + 카테고리별 키 생성
                key = (uid, cid)
                if key not in stats:
                    stats[key] = {"correct": 0, "postIds": []}

                if pick == result:
                    stats[key]["correct"] += 1
                
                stats[key]["postIds"].append(pid)


            # 누적된 결과 확인
            for (uid, cid), v in stats.items():
                # print(f"{uid} / {cid} => {v}")

                cur.execute(sql_get_correct_count, (uid, cid),)
                current_correct = cur.fetchone()[0]

                cur.execute(sql_get_reflected_count, (uid,),)
                reflected_count = cur.fetchone()[0]
                # print(f"current_correct:{current_correct} reflected_count:{reflected_count}")

                if v["correct"] >= 1 :
                    total_correct = current_correct + v["correct"]
                    total_reflected = len(v["postIds"]) + reflected_count
                    accuracy = round(total_correct / total_reflected * 100, 2)
                    # print(f"total_correct:{total_correct} total_reflected:{total_reflected} accuracy:{accuracy}")


                    cur.execute(sql_update, (total_correct, accuracy, uid, cid,))

                    if cur.rowcount < 1 :
                        raise ValueError("stats update failed")

                for updatePid in v["postIds"]:
                    # print(f"updatePid: {updatePid}")
                    cur.execute(sql_is_update, (uid, updatePid))    

                    if cur.rowcount < 1 :
                        raise ValueError("is_reflected update failed")    
                    
            con.commit()

        except Exception as e:
            if con:
                con.rollback()
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getMyInfo(self, userId):
        try:
            con, cur = DBManager.makeConCur(
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql = "select nick, birth, gender, addr, psa from pc_user where id= %s"
            cur.execute(sql, (userId,))
            row = cur.fetchone()

            if row:
                dbNick, dbBirth, dbGender, dbAddr, dbPsa = row
                dbAddr = dbAddr.split("!")
                r = {
                    "nick": dbNick,
                    "birth": datetime.strftime(dbBirth, "%Y-%m-%d"),
                    "gender": dbGender,
                    "addr1": dbAddr[2],
                    "addr2": dbAddr[0],
                    "addr3": dbAddr[1],
                    "psa": dbPsa,
                }
                
                return r
            else:
                return {"result": "로그인 실패(아이디)"}
        except Exception as e:
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    async def updateMyInfo(self, id, nick, birth, gender, addr1, addr2, addr3, psa):
        fileName = psa
        if psa != None:
            try:
                content = await psa.read()
                if len(content) > self.capacity:
                    raise
                fileName = FileManager.changeName(fileName.filename)
                FileManager.writeFile(self.filePath, fileName, content)

            except Exception as e:
                return {"result": id + "님 정보 수정 실패(파일)"}

        try:
            addr = addr2 + "!" + addr3 + "!" + addr1
            con, cur = DBManager.makeConCur(
                self.db_host, self.db_user, self.db_pass, self.db_name
            )
            sql_user = "update pc_user set nick=%s, birth=%s, gender=%s, addr=%s, psa=%s where id=%s"
            cur.execute(sql_user, (nick, birth, gender, addr, fileName, id))
            
            if cur.rowcount != 1:
                raise ValueError("user info update failed")
            
            con.commit()
            return {"result": id + "님 정보 수정 성공"}
        except Exception as e:
            if con:
                con.rollback()
            return {"result": id + "님 정보 수정 실패(DB)"}
        finally:
            DBManager.closeConCur(con, cur)

    def getRankUser(self):
        try:
            con, cur = DBManager.makeConCur(
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql = "select u.nick, sum(s.total_count)"
            sql += " from pc_stats as s" 
            sql += " join pc_user as u on s.user_id = u.id"
            sql += " group by s.user_id"
            sql += " order by sum(s.total_count) DESC"
            sql += " limit 3;"

            cur.execute(sql)
            row = cur.fetchall()
            print(row)

            rank = []
            if row:
                for nick, total in row:
                    rank.append({"nick": nick, "total_count": total})
            
            print(rank)
            return rank

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)

    def getRankPost(self):
        try:
            con, cur = DBManager.makeConCur(
                self.db_host, self.db_user, self.db_pass, self.db_name
            )

            sql = "select p.title"
            sql += " from pc_vote as v"
            sql += " join pc_post as p on v.post_id = p.id"
            sql += " group by v.post_id"
            sql += " order by count(v.post_id) DESC"
            sql += " limit 3;"

            cur.execute(sql)
            row = cur.fetchall()

            rank = []
            if row:
                for title in row:
                    rank.append({"title": title})
            
            # print(rank)
            return rank

        except Exception as e:
            print(e)
            return {"result": "DB문제 발생"}
        finally:
            DBManager.closeConCur(con, cur)