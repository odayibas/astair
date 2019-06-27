from classes.database_connector import DatabaseConnector
import argparse


parser = argparse.ArgumentParser(description='Set the values.')
parser.add_argument("-o", "--occupancy", type=int, help='Set Occupancy')
parser.add_argument("-m", "--male_count", type=int, help='Set Male')
parser.add_argument("-f", "--female_count", type=int, help='Set Female')

args = vars(parser.parse_args())


connection, cursor = None, None
connector = DatabaseConnector(connection, cursor)
connector.connect_db()

latest_row = connector.select_latest_row()
latest_time = latest_row[0]

# update latest numbers here
connector.update_table(latest_time, args["occupancy"], args["male_count"], args["female_count"])



