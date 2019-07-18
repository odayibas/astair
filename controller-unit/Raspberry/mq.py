import paho.mqtt.client as mqtt #import the client1
import time

#The comminication between sensors and rasberry
class MqClient:
    def __init__(self, topic, IP):
        self.topic = topic
        self.broker = IP

        print('MqClient')

    def start(self):

        try:
            self.client = mqtt.Client("P1") #create new instance
            self.client.on_message=self.on_message #attach function to callback
            self.client.connect(self.broker) #connect to broker
            self.client.subscribe(self.topic)
            self.client.loop_forever() #start the loop

        except:
            print("MqttERROR")
    def on_message(self, client, userdata, message):
        print("on_message : "+message.topic)
        if self.on_data:
            self.on_data(message.topic, str(message.payload.decode("utf-8")))
        else:
            print("no handler installed")

