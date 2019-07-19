import pmvModel
import voteBasedModel
from database_helper import DatabaseConnector
from ac_control import AC
from q_learning import QModel

def decisionModel(data, ac_id, model):

    if data[0] == {} or data[1] == {}:
        return

    survey_data = (data[1])[ac_id]
    sensor_data = (data[0])[ac_id]
    ac_data = (data[2])[ac_id]
    print(sensor_data)
    temperature = sensor_data[0]
    humidity = sensor_data[1]
    cold = survey_data[0]
    good = survey_data[1]
    hot = survey_data[2]

    airTemp = 27
    newMeanTemp = 26
    oldMeanTemp = 23.5

    action = model.forward(cold, good, hot)
    return ac_data[1] + action

    # if(abs(newMeanTemp - oldMeanTemp) < 2):
    #     #receivePMVParameters()
    #     velocity = 0.2
    #     rh = 60
    #     met = 1.2
    #     clo = 0.3
    #     pmv, ppd = pmvModel.pmv(airTemp,newMeanTemp, velocity, rh, met, clo)
    #     #pmvModel.display(pmv, ppd, airTemp)
    #     #pmvModel.writeFile(pmv, ppd, airTemp)
    # else:
    #     degree = voteBasedModel.voteBaseModel(hot, good, cold, temperature)
    #     print("Currently it is {} degree and humidity is {}%. A/C should be set to {} degree.".format(temperature, humidity, degree))
    #     return degree

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
    model = QModel()

    if db.connect_db() == 1:
        return

    while True:
        data = gather_data(db)
        new_ac_conf = decisionModel(data, 4, model)
        ac.set_temp(4, new_ac_conf)
        print("AC is set to ", new_ac_conf)

        input()


start()