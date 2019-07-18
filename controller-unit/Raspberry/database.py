import psycopg2
from datetime import datetime
#connects to the database.
class db:
    def __init__(self):
        print('database')

    def connectDatabase(self):
        try:
            self.connection = psycopg2.connect("/DATABASE_CONNECT/")
            self.cursor = self.connection.cursor()
            print('Database Connection : OK')
        except (Exception, psycopg2.Error) as error :
            print ("Error while connecting to PostgreSQL", error)
        #print('Connected :)')

    def insertDatabase(self,table,values):
        sqlQuery="INSERT INTO "+table+" VALUES"+values
        try:
            self.cursor.execute(sqlQuery, values)
            print('debug out')
            self.connection.commit()
            self.cursor.close()
        except (Exception, psycopg2.Error) as error :
            print ("Error while connecting to PostgreSQL", error)
