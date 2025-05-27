from fastapi.responses import JSONResponse
from DainLibrary.dbManager import DBManager

class PredictionDAO :
    def __init__(self):
        pass

    async def createPrediction(self, category, title, deadline):
        print(category, title, deadline)
        return {"result":"성공"}
    
    def getCategory(self):
        try:
            con, cur = DBManager.makeConCur("localhost", "root", "root", "prediction_community")
    
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