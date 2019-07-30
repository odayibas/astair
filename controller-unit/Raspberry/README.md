## Experiences
    *Database connection should be done in a controlled manner.
    *Each time you enter the database, you must exit the database.
    *Client names connecting to Mqtt Broker must be different.
    *You need to be a member to get data with Mqtt Broker.
    *It is based on communication via brokers.
    *You need to subscribe to receive data with Mqtt Broker.
    *With Topic you can send or receive the desired message.
    *Sensors must be assigned ID based on their MAC address.
    *A new None must be added to the "mem" array for each new sensor.
    *The MAC address of the new sensor and the new A/C must be registered in the MacFinder function.
    *For each new air conditioner, the MAC address must be registered in the idFinder function.
### Communication Scheme:
  All sensors, air conditioners and the database need to be communicated with each other. This need was met with Mqtt Broker. Topicals and messages were transferred with Mqtt Broker. Raspberry Pi serves as a gateway here. Data from sensors and air conditioner were transferred to Raspberry Pi with Mqtt Broker. The transferred data was written to the database with Raspberry Pi. The communication scheme is shown in Figure 1.
![alt text](Communication-diagram.png)
###### Figure 1: Comminication Scheme
