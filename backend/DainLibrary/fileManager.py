from datetime import datetime

class FileManager:
    def changeName(fn):
        now = datetime.today()
        now = datetime.strftime(now, "%Y%m%d%H%M%S")
        type = fn[-4:]
        fileName = fn.replace(type, "")
        fileName += "_" + now + type

        return fileName
    
    def writeFile(filePath, fileName, content):
        f = open(filePath + fileName, "wb")
        f.write(content)
        f.close()