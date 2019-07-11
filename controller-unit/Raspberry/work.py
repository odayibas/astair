import time
import paho.mqtt.client as paho

import psycopg2
from datetime import datetime
import threading

broker = "localhost"
topic = "Astair/+/+/#"
IP = ""
#add 'None' to the mem[] array when a new sensor is added
mem = [None,None,None,None]

class db:
    def __init__(self):
        self.connection = psycopg2.connect("")
        self.cursor = self.connection.cursor()
    #It separates messages from sensors according to the topical and writes them to the appropriate database.
    def addDB(self, topic, sensor_value):
        print("\n")
        print(topic)
        if (topic.find('Astair') != -1):
            if(topic.find('temp') != -1):
                id = self.macFinder(topic[7:19])
                mac = topic[7:19]
                if(topic.find("temp/0") != -1):
                    self.memoryAcces(mac,id,sensor_value,None,None)
                elif(topic.find("temp/1") != -1):
                    self.memoryAcces(mac,id,None,sensor_value,None)
                print("MAC: " + mac + "  ID: " + str(id) + " Degree: " + sensor_value)
            elif(topic.find('hum0') != -1):
                id = self.macFinder(topic[7:19])
                mac = topic[7:19]
                self.memoryAcces(mac,id,None,None,sensor_value)
                print("MAC: " + mac + "  ID: " + str(id) + " Humidity: " + sensor_value)
            elif(topic.find('AC/CONF/GET') != -1):
                id = self.macFinder(topic[7:19])
                mac = topic[7:19]
                conf = sensor_value.split(',')
                print(id)
                print(sensor_value[0:])
                print(conf[0:])
                values = (str(id),conf[0],conf[1],conf[2],conf[3],str(datetime.now()))
                print(values)
                sqlQuery = """INSERT INTO ac(ac_id, ac_mode, ac_degree, ac_fan_speed, active, ac_time) VALUES (%s, %s, %s, %s, %s, %s)"""
                print(sqlQuery%values)
                self.cursor.execute(sqlQuery, values)
                print('debug out')
                self.connection.commit()
                self.cursor.close()

        elif (topic.find('gyro') != -1):
            #sqlQuery = """ INSERT INTO sensor (ac_id, sensor_degree, date_time) VALUES (%s, %s, %s) """
            #values = (topic[-1], sensor_value, datetime.now())
            print("Gyro - Degree: " + sensor_value)

        elif (topic.find('ds1820') != -1):
            #sqlQuery = """ INSERT INTO sensor (ac_id, sensor_degree, date_time) VALUES (%s, %s, %s) """
            #values = (topic[-1], sensor_value, datetime.now())
            print("DS1820 - Degree: " + sensor_value)

        else:
            print("none match")
        #Writes to the database by joining the data in the sensors.
        for i in range(len(mem)):
            if(mem[i] is not None ):
                if(mem[i].temp0 is not None and mem[i].temp1 is not None and mem[i].hum0 is not None):
                    sqlQuery = """ INSERT INTO sensor (ac_id, sensor_degree, date_time, humidity) VALUES (%s, %s, %s, %s) """
                    mem[i].hum0=int(mem[i].hum0[0:2])
                    values = (str(id), mem[i].temp1, datetime.now(),mem[i].hum0)
                    print(values)
                    mem[i]=None
                        self.cursor.execute(sqlQuery, values)
                        self.connection.commit()
                        self.cursor.close()
    #Joining sensor data
    def memoryAcces(self,mac,id,temp0,temp1,hum0):
        id = int(id)
        print(id)
        if(mem[id-1] is None):
            mem.insert(id-1, memory(mac,id,None,None,None))
        if(temp0 is not None):
            mem[id-1].temp0=temp0
        elif(temp1 is not None):
            mem[id-1].temp1=temp1
        elif(hum0 is not None):
            mem[id-1].hum0=hum0
        else:
            print("Stg.")
    #Find the IPs of the connected sensors and give ids to the sensors
    def macFinder(self,x):
        print("x", x)
        macDict = {
            u"<Sensor MAC>": 1,
            u"<Sensor MAC>": 2,
            u"<Sensor MAC>": 3,
            u"<Sensor MAC>": 4,
		    #ac
		    u'<AC MAC>': 1,
            u'<AC MAC>': 2,
        }

        #print(macDict)
        id = macDict[x]
        if id is None:
            print("mac not found")
        return id
#Create class to joining sensors data
class memory:
    def __init__(self,mac,id,temp0,temp1,hum0):
        self.mac=mac
        self.id=id
        self.temp0=temp0
        self.temp1=temp1
        self.hum0=hum0
#The comminication between sensors and rasberry
class SubscribeMqtt:
    def __init__(self, topic, IP):
        self.topic = topic
        self.broker = IP

    def subscribe(self):
        def on_message(client, userdata, message):
            m = message.payload.decode("utf-8")
            dbconn = db()
            dbconn.addDB(message.topic, m)
            #self.bus.sendMessage(str(message.payload.decode("utf-8")))
        client = paho.Client("client-001")
        client.on_message = on_message
        client.connect(self.broker)
        client.loop_start()
        print("Connected!")

        while True:
            client.subscribe(self.topic,2)
            time.sleep(0.001)

def start():
    mqtt = SubscribeMqtt(topic, IP)
    mqtt.subscribe()

if "__main__" == __name__ :
    	start()
