import pmvModel
import voteBasedModel
from database_helper import DatabaseConnector
from ac_control import AC

def decisionModel(data, ac_id):

    survey_data = (data[1])[ac_id]
    sensor_data = (data[0])[ac_id]
    print(sensor_data)
    temperature = sensor_data[0]
    humidity = sensor_data[1]
    cold = survey_data[0]
    good = survey_data[1]
    hot = survey_data[2]

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
        degree = voteBasedModel.voteBaseModel(hot, good, cold, temperature)
        print("Currently it is {} degree and humidity is {}%. A/C should be set to {} degree.".format(temperature, humidity, degree))
        return degree

def gather_data(db):
    sensor_data = db.get_last_sensor_data()
    survey_data = db.get_last_survey_results()
    ac_data = db.get_ac_situation()
    outdoor_data = db.get_outdoor_weather()
    print(sensor_data, survey_data, ac_data, outdoor_data, sep="\n" + 40 * "*" + "\n")
    return (sensor_data, survey_data, ac_data, outdoor_data)

def start():

    ac = AC("Astair/+/+/#", "10.154.3.45")

    db = DatabaseConnector()
    if db.connect_db() == 1:
        return

    newDegree = int(decisionModel(gather_data(db), ac_id = 4))
    ac.test(newDegree)

    # # After every 10mins work() is called.
    # schedule.every(3).minutes.do(decisionModel, db = db)
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)

start()