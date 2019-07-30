import paho.mqtt.client as mqtt #import the client1
import time

def on_data(topic,message):
    print(topic, message)

class AC:
    def __init__(self, topic, IP):
        print("Connecting to PI...")
        self.topic = topic
        self.broker = IP
        self.client = mqtt.Client("P1") #create new instance
        # self.client.on_message=self.on_message #attach function to callback
        self.client.connect(self.broker) #connect to broker
        print("Connected to PI successfully.")

    def create_config_string(self, id = "-", mode = "-", fan = "-", temp = "-", power = "-" ):
        return str(id) + "," + str(mode) + "," + str(fan) + "," + str(temp) + "," + str(power)

    def start(self):
        self.client.loop_forever() #start the loop

    def set_fan_speed(self, id, speed):
        if speed == "HIGH" or speed == "MEDIUM" or speed == "LOW":
            #print(self.create_config_string(id = id, fan = speed))
            self.client.publish("Astair/MODEL/AC",self.create_config_string(id = id, fan = speed))
        else :
            print("Invalid fan speed. (LOW, MEDIUM, HIGH)")

    def power_on(self, id):
        print(self.create_config_string(id = id, power = "ON"))
        self.client.publish("Astair/MODEL/AC",self.create_config_string(id = id, power = "ON"))
    
    def power_off(self, id):
        #print(self.create_config_string(id = id, power = "0"))
        self.client.publish("Astair/MODEL/AC",self.create_config_string(id = id, power = "OFF"))

    def set_temp(self, id, temp):
        if 16 <= temp and temp <= 30:
            print(self.create_config_string(id=id, temp=temp))
            self.client.publish("Astair/MODEL/AC", self.create_config_string(id = id, temp = temp))
            print("AC is set to ", temp)
        else:
            print("Invalid temperature value. (16-30)")

    def set_mode(self, id, mode):
        #print( self.create_config_string(id = id, mode = mode))
        if mode == "COOL" or mode == "FAN" or mode == "DRY" or mode == "HEAT" or mode == "AUTO":
            self.client.publish("Astair/MODEL/AC", self.create_config_string(id = id, mode = mode))
        else:
            print("Invalid mode. (COOL, FAN, DRY, HEAT, AUTO)")

    def set_all(self, id, mode = "-", speed = "-", temp = "-", power = "-"):
        if not (mode == "-" or mode == "COOL" or mode == "FAN" or mode == "DRY" or mode == "HEAT" or mode == "AUTO"):
            print("Invalid mode. (COOL, FAN, DRY, HEAT, AUTO)")
        elif not (temp == "-" or (16 <= temp and temp <= 30)):
            print("Invalid temperature value. (16-30)")
        elif not (power == "-" or power == "ON" or power == "OFF"):
            print("Invalid power value. (ON-OFF)")
        elif not (speed == "-" or speed == "LOW" or speed == "MEDIUM" or speed == "HIGH"):
            print("Invalid fan speed. (LOW, MEDIUM, HIGH)")
        else:
            #print(self.create_config_string(id = id, mode = mode, fan = speed, temp = temp, power = power))
            self.client.publish("Astair/MODEL/AC",self.create_config_string(id = id, mode = mode, fan = speed, temp = temp, power = power))

    def test(self):
        self.client.publish("Astair/MODEL/AC", "1,COOL,HIGH,19,OFF")
