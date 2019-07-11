import psycopg2
from datetime import datetime

class DatabaseConnector:

    def __init__ (self):
        self.connection = None
        self.cursor = None
    
    # Establishing database connection
    def connect_db(self):
        print("Connecting to the database...")
        self.connection = psycopg2.connect(
            "postgres://ieeqrnduqiqxzh:1a73349164864823f58c9ffed9cffb5ef95a7461d4407637cde89dafff352020@ec2"
            "-46-137-113-157.eu-west-1.compute.amazonaws.com:5432/d879gk0v4thape")
        self.cursor = self.connection.cursor()
        print("Connected to the database successfully.")

    def get_table(self, tablename):
        query = "select * from " + tablename + ";"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def display_table(self, tablename):
        table = self.get_table(tablename)
        if len(table) <= 0:
            print("No content.")
        else:
            width = len(table[0])
            for r in table:
                for i in range(width):
                    print(r[i], end = " ")
                print("")
    
    def get_column_names(self, tablename):
        query = "select * from " + tablename + " limit 0;"
        self.cursor.execute(query)
        return [desc[0] for desc in self.cursor.description]
    
    def display_column_names(self, tablename):
        column_names = self.get_column_names(tablename)
        result = ""
        for c in column_names:
            result += c + " | "
        print(result[:-3])

    def get_column_map(self, tablename):
        map = {}
        columns = self.get_column_names(tablename)
        index = 0
        for c in columns:
            map[c] = index
            index += 1
        return map

    def get_last_row(self, tablename):
        query = "select * from " + tablename +  " order by id desc limit 1;"
        self.cursor.execute(query)
        result = self.cursor.fetchall()
        return result

    def get_last_survey_results(self):
        result = ()
        survey_table = "survey"
        vote_table = "weatherpoll"
        q = "select * from survey order by id desc limit 1;" 
        self.cursor.execute(q)
        vote_id = self.cursor.fetchone()[0]
        votes = ["Soguk", "Guzel", "Sicak"]
        for v in votes:
            q = "select count(id) from " + vote_table + " where vote_id = '" + str(vote_id) + "' and vote = '" + v + "';"
            self.cursor.execute(q)
            result += self.cursor.fetchall()[0]
        return result

    def get_last_sensor_data(self):
        result = {}
        sensor_table = "sensor"
        sensor_count = 4
        map = self.get_column_map(sensor_table)
        i = 1
        for _ in range(sensor_count):
            q = "select * from " + sensor_table + " where ac_id = '" + str(i) + "' order by date_time desc limit 1;"
            self.cursor.execute(q)
            r = self.cursor.fetchall()
            if len(r) == 0:
                continue
            r = r[0]
            result[i] = (r[map["sensor_degree"]], r[map["humidity"]])
            i += 1
        return result

    def get_ac_situation(self, id):
        ac_table = "ac"
        q = "select * from " + ac_table + " ac_id = " + str(id) + " order by id desc limit 1;"
        self.cursor.execute(q)
        map = self.get_column_map(ac_table)
        r = self.cursor.fetchone()[0]
        return (r[map["ac_mode"]], r[map["ac_degree"]], r[map["ac_fan_speed"]], r[map["active"]])
        