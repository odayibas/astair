## Controller Unit
TODO: write a brief description (input, output, function of the subsystem, deployment method, etc...)

### Description
In this part of the project:

	* Data will be taken from air conditioner (Airwell) and sensors(A-star sensors)
	* The read data will be saved to the database
	* Air conditioning settings will be set according to the data from the web application
	
### System Overview
TODO: Add Figure & Explain !!

### Components used
	* Raspberry pi 3 B +
	* A-Star Sensors
	* Sparkfun ESP32 Thing
	
	
### A-Star Sensor
This sensor consist of 3 component:

	1 - Sparkfun ESP32 Thing
	2 - DS18B20 Temperature Sensor
	3 - DHT22 Temperature and Humidity Sensor
	4 - 3.7V LiPo Battery 

The connection between Sparkfun ESP32 Thing and DS18B20 Temperature Sensor is given below.

![alt text](Sensor_bb.png)
###### Figure 1: Circuit Connection

### Circuit Connection between A/C and ESP32
![alt text](ConnectionESP32AC_bb.png)
###### Figure 2: Circuit Connection 



### Inputs and outputs
>	**Inputs**
>
>		1. A/C
>			* Mode (Cool/Fan/Dry/Heat/Auto)
>			* Fan Speed (Low/Medium/High/Auto)
>			* A/C Degree (16°C ~ 30°C || 60°F ~ 85°F)
>			* A/C Zone (or A/C ID)
>			* ON/OFF
>
>		2. A-Star Sensor
>			* Degree
>			* Humidity
>			* Sensor ID

>	**Outputs**
>
>		1. To A/C
>			* Mode
>			* Fan Speed
>			* A/C Degree
>			* A/C Zone (or A/C ID)
>			* ON/OFF
>
>		2. To Database
>			* A/C Data (A/C ID, Mode, Degree, Fan, On/Off, Datetime)
>			* A-Star Sensor Data (Temperature & Humidity)
