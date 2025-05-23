import mysql.connector

class DBManager:
    @staticmethod
    def makeConCur(host, user, password, database):
        con = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database,
            port=3306
        )
        cur = con.cursor()
        return con, cur

    @staticmethod
    def closeConCur(con, cur):
        cur.close()
        con.close()
