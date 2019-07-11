import pmvModel
import voteBasedModel
import schedule
import time
from database_helper import DatabaseConnector

def receiveTempParameters(db):
    pass

def receiveVoteParameters(db):
    db.get_last_survey_results()
    pass

def receivePMVParameters(db):
    pass

def decisionModel(db):

    #receiveTempParameters()
    sensor_data = db.get_last_sensor_data()
    print(sensor_data)
    temperature = sensor_data[4][0]
    humidity = sensor_data[4][1]

    airTemp = 27
    newMeanTemp = 26
    oldMeanTemp = 23.5
    
    if(abs(newMeanTemp - oldMeanTemp) < 2):
        #receivePMVParameters()
        velocity = 0.2
        rh = 60
        met = 1.2
        clo = 0.3
        pmv, ppd = pmvModel.pmv(airTemp,newMeanTemp, velocity, rh, met, clo)
        #pmvModel.display(pmv, ppd, airTemp)
        #pmvModel.writeFile(pmv, ppd, airTemp)
    else:
        (cold, good, hot) = db.get_last_survey_results()
        degree = voteBasedModel.voteBaseModel(hot, good, cold, temperature)
        print("Currently it is {} degree and humidity is {}%. A/C should be set to {} degree.".format(temperature, humidity, degree))

def start():
    
    db = DatabaseConnector()
    db.connect_db()

    decisionModel(db)

    # # After every 10mins work() is called.
    # schedule.every(3).seconds.do(decisionModel, db = db)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)

start()