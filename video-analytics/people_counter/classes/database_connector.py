import psycopg2
import datetime

class DatabaseConnector:
    def __init__(self, connection, cursor):
        self.connection = connection
        self.cursor = cursor

    # Connecting to the PostgreSQL database
    def connect_db(self):
        print('\nConnecting to the PostgreSQL database...')
        self.connection = psycopg2.connect(
            "postgres://ieeqrnduqiqxzh:1a73349164864823f58c9ffed9cffb5ef95a7461d4407637cde89dafff352020@ec2"
            "-46-137-113-157.eu-west-1.compute.amazonaws.com:5432/d879gk0v4thape")
        self.cursor = self.connection.cursor()  # create a cursor

    def select_from_table(self):
        postgreSQL_select_Query = "select * from computerVision"
        self.cursor.execute(postgreSQL_select_Query)
        print("Selecting rows from computerVision table using cursor.fetchall")
        computerVision_records = self.cursor.fetchall()

        print("Print each row and it's columns values")
        for row in computerVision_records:
            print("Time = ", row[0], )
            print("Action id = ", row[1])
            print("Occupancy = ", row[2])
            print("Male count = ", row[3])
            print("Female count = ", row[4], "\n")

    def select_latest_row(self):
        postgreSQL_select_Query = "select * from computerVision order by data_time desc limit 1"
        self.cursor.execute(postgreSQL_select_Query)
        computerVision_records = self.cursor.fetchall()
        row = None
        for row in computerVision_records:
            continue
        return row

    def insert_table(self, data_time, action_id, occupancy, male_count, female_count):
        postgres_insert_query = """INSERT INTO computerVision (data_time, action_id, occupancy, male_count, female_count) VALUES (%s,%s,
        %s,%s,%s) """
        record_to_insert = (data_time, action_id, occupancy, male_count, female_count)
        self.cursor.execute(postgres_insert_query, record_to_insert)
        self.connection.commit()
        print("Inserted successfully")

    def update_table(self, data_time, occupancy, male_count, female_count, action_id='sysAdmin'):
        try:
            print("Table Before updating record ")
            sql_select_query = """select * from computerVision where data_time = %s"""
            self.cursor.execute(sql_select_query, (data_time,))
            record = self.cursor.fetchone()
            print(record)

            # Update single record now
            sql_update_query = """Update computerVision set action_id = %s, occupancy = %s, male_count = %s ,
            female_count = %s where data_time = %s"""
            self.cursor.execute(sql_update_query, (action_id, occupancy, male_count, female_count, data_time))
            self.connection.commit()
            count = self.cursor.rowcount
            print(count, "Record Updated successfully ")
            print("Table After updating record ")
            sql_select_query = """select * from computerVision where data_time = %s"""
            self.cursor.execute(sql_select_query, (data_time,))
            record = self.cursor.fetchone()
            print(record)
        except (Exception, psycopg2.Error) as error:
            print("Error in update operation", error)

    def delete_from_table(self, data_time):
        try:
            # Update single record now
            sql_delete_query = """Delete from computerVision where data_time = %s"""
            self.cursor.execute(sql_delete_query, (data_time,))
            self.connection.commit()
            count = self.cursor.rowcount
            print(count, "record deleted successfully ")  # shows how many rows deleted

        except (Exception, psycopg2.Error) as error:
            print("Error in delete operation", error)

    def delete_all_rows(self):
        try:
            # Update single record now
            sql_delete_query = """Delete from computerVision"""
            self.cursor.execute(sql_delete_query)
            self.connection.commit()
            count = self.cursor.rowcount
            print(count, "record deleted successfully ")  # shows how many rows deleted

        except (Exception, psycopg2.Error) as error:
            print("Error in delete operation", error)

    def disconnect_db(self):
        if self.connection is not None:
            self.cursor.close()
            self.connection.close()
            print('Database connection closed.')
