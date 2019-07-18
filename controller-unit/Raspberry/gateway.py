class memory:
    def __init__(self,mac,id,temp0,temp1,hum0):
        self.mac=mac
        self.id=id
        self.temp0=temp0
        self.temp1=temp1
        self.hum0=hum0

import mq
import database

import time
from datetime import datetime

import paho.mqtt.client as mqtt #import the client1

#add 'None' to the mem[] array when a new sensor is added
mem = [None,None,None,None]
class Gate:
    def __init__(self,topic,IP):
        print("start")
        self.database=database.db()
        self.mqc = mq.MqClient(topic, IP)
        self.mqc.on_data = self.on_data
        self.mqc.start()

    #It separates messages from sensors according to the topical and writes them to the appropriate database.
    def on_data(self,topic,sensor_value):
        try:
            print("on_data : "+topic)
            if (topic.find('Astair') != -1):
                if(topic.find('temp') != -1):
                    id = self.macFinder(topic[7:19])
                    mac = topic[7:19]
                    if(topic.find("temp/0") != -1):
                        self.memoryAcces(mac,id,sensor_value,None,None)

                    elif(topic.find("temp/1") != -1):
                        self.memoryAcces(mac,id,None,sensor_value,None)
                    print("MAC: " + mac + "  ID: " + str(id) + " Degree: " + sensor_value)
                    self.mem_Join(id)

                elif(topic.find('hum0') != -1):
                    id = self.macFinder(topic[7:19])
                    mac = topic[7:19]
                    self.memoryAcces(mac,id,None,None,sensor_value)
                    print("MAC: " + mac + "  ID: " + str(id) + " Humidity: " + sensor_value)
                    self.mem_Join(id)

                elif(topic.find('AC/CONF/GET') != -1):
                    id = self.macFinder(topic[7:19])
                    mac = topic[7:19]
                    conf = sensor_value.split(',')
                    values = (str(id),conf[0],conf[1],conf[2],conf[3],str(datetime.now()))
                    print(values)
                    self.database.connectDatabase()
                    self.database.insertDatabase('ac(ac_id, ac_mode, ac_degree, ac_fan_speed, active, ac_time)',str(values))
                elif(topic.find("MODEL/AC") != -1 ):
                    conf = sensor_value.split(',')
                    mac = self.idFinder(conf[0])

                    if conf[1] != '-' :
                        print('conf1: '+ conf[1])
                        t='Astair/'+mac+'/AC/CONF/SET/MODE'
                        self.mqc.client.publish(t,conf[1])
                        print(t)
                        time.sleep(2)

                    if conf[2] != '-' :
                        print('conf2: '+ conf[2])
                        t='Astair/'+mac+'/AC/CONF/SET/FAN'
                        self.mqc.client.publish(t,conf[2])
                        print(t)
                        time.sleep(2)

                    if conf[3] != '-' :
                        print('conf3: '+ conf[3])
                        t='Astair/'+mac+'/AC/CONF/SET/TEMP'
                        self.mqc.client.publish(t,conf[3])
                        print(t)
                        time.sleep(2)

                    if conf[4] != '-' :
                        print('conf4: '+ conf[4])
                        t='Astair/'+mac+'/AC/CONF/SET/PWR'
                        self.mqc.client.publish(t,conf[4])
                        print(t)
                        time.sleep(2)
            else:
                print("none match")
        except:
            print('on_dataERROR')
    #Writes to the database by joining the data in the sensors
    def mem_Join(self,id):
        try:
            for i in range(len(mem)):
                if(mem[i] is not None ):
                    if(mem[i].temp0 is not None and mem[i].temp1 is not None and mem[i].hum0 is not None):
                        sqlQuery = """ INSERT INTO sensor (ac_id, sensor_degree, date_time, humidity) VALUES (%s, %s, %s, %s) """
                        mem[i].hum0=int(mem[i].hum0[0:2])
                        values = (str(id), mem[i].temp1, str(datetime.now()),mem[i].hum0)
                        print(values)
                        mem[i]=None
                        # print(str(id))
                        self.database.connectDatabase()
                        self.database.insertDatabase('sensor (ac_id, sensor_degree, date_time, humidity)',str(values))
        except:
            print('mem_JoinERROR')
    #Joining sensor data
    def memoryAcces(self,mac,id,temp0,temp1,hum0):
        id = int(id)
        # print(id)
        try:

            if(mem[id-1] is None):
                mem.insert(id-1, memory(mac,id,None,None,None))

            if(temp0 is not None):
                # print('if',mem[id-1])
                mem[id-1].temp0=temp0

            elif(temp1 is not None):
                mem[id-1].temp1=temp1
                # print('elif1')
            elif(hum0 is not None):
                mem[id-1].hum0=hum0
                # print('elif2')

            else:
                 print("Stg.")
        except:
            print('MemoryAccesERROR')
    #It is finds the MACs of the connected A/C and sensors, give ids to the A/C and sensors
    def macFinder(self,x):
        try:
            print("x", x)
            macDict = {
                u"98ECBBA4AE30": 1,
                u"F4EEBBA4AE30": 2,
                u"28EFBBA4AE30": 3,
                u"28F0BBA4AE30": 4,
                #ac
                u'9CEEBBA4AE30': 1,
                u'14EEBBA4AE30': 2,

            }

            #print(macDict)
            id = macDict[x]
            if id is None:
                print("mac not found")
            return id
        except:
            print('macFinderERROR')
    #It is finds the IDs of the connected A/C, give MACs to the A/C
    def idFinder(self,x):
        print("x", x)
        macDict = {
	    #ac
	    u'1' : u'9CEEBBA4AE30',
    	    u'2' : u'14EEBBA4AE30',

        }

        #print(macDict)
        mac = macDict[x]
        if mac is None:
            print("id not found")
        return mac



if "__main__" == __name__ :
    topic="Astair/+/+/#"
    IP="//INPUT IP//"
    gateway=Gate(topic,IP)



