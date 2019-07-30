import pmvModel
import voteBasedModel
from database_helper import DatabaseConnector
from ac_control import AC
from q_learning import QModel
import time
from state_generator import TempModel

# Table for calculating apparent temperature by using temperature and humidity

temp_table = [[25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27],  # 25 C (%5 - %95)
              [25, 25, 25, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 28, 28, 28, 28, 29],  # 26 C (%5 - %95)
              [26, 26, 26, 26, 26, 27, 27, 27, 27, 28, 28, 28, 29, 29, 30, 30, 31, 31, 32],  # 27 C (%5 - %95)
              [26, 26, 26, 27, 27, 27, 27, 27, 28, 28, 29, 29, 30, 30, 31, 32, 32, 33, 34],  # 28 C (%5 - %95)
              [27, 27, 27, 27, 28, 28, 28, 28, 29, 30, 30, 31, 32, 32, 33, 34, 36, 37, 38],  # 29 C (%5 - %95)
              [28, 28, 28, 28, 28, 29, 29, 30, 30, 31, 32, 33, 34, 35, 36, 38, 39, 41, 42]]  # 30 C (%5 - %95)

# Calculate apparent temperature according to the table above.
def apparent_temperature(temp, hum):
    if temp < 25:
        return temp
    temp -= 25
    hum = (hum // 5) - 1
    return temp_table[temp][hum]


def run_model(data, ac_id, model):

    print("DATA => ", data)                         # If there is no temperature data, do not run the model.
    if data[0] == {}:
        return -1
    if data[1] == {} or ac_id not in (data[1]):     # If there is no survey results
        sensor_data = (data[0])[ac_id]
        ac_data = (data[2])[ac_id]
        # model.state = model.get_state_from_temp(sensor_data[0])
        model.state = model.get_state_from_temp(ac_data[1])
        # act = model.get_greedy_action(sensor_data[0])
        act = model.get_greedy_action(ac_data[1])           # Take greedy action
        print("Greedy action => ", act, end=" ")
        return ac_data[1] + act

    survey_data = (data[1])[ac_id]
    sensor_data = (data[0])[ac_id]
    ac_data = (data[2])[ac_id]
    print("Sensor data => ", sensor_data)
    # temperature = sensor_data[0]                  # Normally this has to be working.
    temperature = ac_data[1]                        # This is for testing.
    humidity = sensor_data[1]



    apparent_temp = apparent_temperature(temperature, humidity)
    print("Apparent Temperature => ", apparent_temp)
    action = model.forward(apparent_temp, survey_data)      # Finally, run the model

    return ac_data[1] + action                              # Return desired temperature.


    # The part below is about rule based model.


    # airTemp = 27
    # newMeanTemp = 26
    # oldMeanTemp = 23.5
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
    sensor_data = db.get_last_sensor_data()                       # Fetch data from database and group them.
    survey_data = db.get_last_survey_results()
    ac_data = db.get_ac_situation()
    outdoor_data = db.get_outdoor_weather()
    # print(sensor_data, survey_data, ac_data, outdoor_data, sep="\n" + 40 * "*" + "\n")
    return (sensor_data, survey_data, ac_data, outdoor_data)


# Main method of the whole model.
def start():

    ac_list = {3: AC("Astair/+/+/#", "10.154.3.45")}            # Connect to A/C. The list contains all the A/C s

    db = DatabaseConnector()                                    # Database helper class
    if db.connect_db() == 1:
        return

    q_model = QModel()                                          # Load our model.

    episode = 0
    while True:
        print("EPISODE => ", episode)
        data = gather_data(db)                                  # Fetch data

        for id in ac_list:
            ac = ac_list[id]
            new_ac_conf = run_model(data, id, q_model)          # Run model
            ac.set_temp(id, new_ac_conf)                        # Change A/C settings.

        print("#"*40 + "\n")
        episode += 1
        time.sleep(4)                                           # Wait time.


start()
