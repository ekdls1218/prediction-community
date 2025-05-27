from fastapi.responses import JSONResponse

class PredictionDAO :
    def __init__(self):
        pass

    async def createPrediction(self, category, title, deadline):
        print(category, title, deadline)
        return {"result":"성공"}