#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#include "DHT.h"


#define uS_TO_S_FACTOR 1000000  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  10        /* Time ESP32 will go to sleep (in seconds) */


#define ONE_WIRE_BUS 13 // Data wire is connected to GPIO13

#define DHTPIN 15
#define DHTTYPE DHT22 //our sensor is DHT22 type


DHT dht(DHTPIN, DHTTYPE); //create an instance of DHT sensor

// Setup a oneWire instance to communicate with a OneWire device
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

DeviceAddress sensor;

// Replace the next variables with your SSID/Password combination
const char* ssid = "<Your SSID>";
const char* password = "<Your Password>";

// Add your MQTT Broker IP address, example:
const char* mqtt_server = "<Raspberry's IP Address>";

WiFiClient espClient;
PubSubClient client(espClient);
char temperature[8];
char h[8], t[8];    // for dht22

//RTC_DATA_ATTR unsigned long milis_interval;
//RTC_DATA_ATTR int pushCount = 0;

char buf[50], clientName[25];
  
String topic_1;
String topic_2;
String topic_3;
String cl_name;

/*
Method to print the reason by which ESP32
has been awaken from sleep
*/
void print_wakeup_reason(){
  esp_sleep_wakeup_cause_t wakeup_reason;

  wakeup_reason = esp_sleep_get_wakeup_cause();

  switch(wakeup_reason)
  {
    case ESP_SLEEP_WAKEUP_EXT0 : Serial.println("Wakeup caused by external signal using RTC_IO"); break;
    case ESP_SLEEP_WAKEUP_EXT1 : Serial.println("Wakeup caused by external signal using RTC_CNTL"); break;
    case ESP_SLEEP_WAKEUP_TIMER : Serial.println("Wakeup caused by timer"); break;
    case ESP_SLEEP_WAKEUP_TOUCHPAD : Serial.println("Wakeup caused by touchpad"); break;
    case ESP_SLEEP_WAKEUP_ULP : Serial.println("Wakeup caused by ULP program"); break;
    default : Serial.printf("Wakeup was not caused by deep sleep: %d\n",wakeup_reason); break;
  }
}

void setup(){
  Serial.begin(115200);
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  
  dht.begin();  //call begin to start sensor

  while(!oneWire.search(sensor)){
    oneWire.reset_search();
    delay(200);  
  }

  for (int i = 0; i < 8; i++) {
    Serial.print(sensor[i], HEX);
    Serial.write(' ');
  }
  
  pinMode(5, OUTPUT);
  
  //Print the wakeup reason for ESP32
  print_wakeup_reason();

  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.println("Setup ESP32 to sleep for every " + String(TIME_TO_SLEEP) + " Seconds");
  
  topic_1 = "Astair/"+ String(GetChipID()) + "/temp/0";
  topic_2 = "Astair/"+ String(GetChipID()) + "/temp/1";
  topic_3 = "Astair/"+ String(GetChipID()) + "/hum0/0";
  cl_name = "ESP32_" + String(GetChipID());

  cl_name.toCharArray(clientName,25);
 }

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    // Attempt to connect
    if (client.connect(clientName)) {
      Serial.println("connected");
      
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

String GetChipID(){
  uint64_t chipid;
  chipid=ESP.getEfuseMac();//The chip ID is essentially its MAC address(length: 6 bytes).
  unsigned long l1 = (uint16_t)(chipid>>32);
  unsigned long l2 = (unsigned long)chipid;
  String result = String(l1, HEX) + String(l2,HEX),rr = "";  
  result.toUpperCase();
 /* for(int i = 10; i >= 0 ; i+=2){
      rr += result.substring(i,i+2);
  }*/
  //result = result.substring(10) + result.substring(0,10);
  Serial.println(rr + "\n");
  Serial.println(result);
  return result;
}

void loop(){
    
  //This is not going to be called
  if (!client.connected()) {
    digitalWrite(5, HIGH);   
    delay(1000);                       
    digitalWrite(5, LOW);    
    delay(1000);  
    
    reconnect();
  }
  client.loop();

  sensors.requestTemperatures();
  Serial.print("Sensor(*C): ");
  
  dtostrf(sensors.getTempC(sensor), 2, 2, temperature);
  Serial.println(temperature);
  
  //use the functions which are supplied by library.
  float h_r = dht.readHumidity(); 
  delay(20);
  float t_r = dht.readTemperature();
  delay(20);
  
  /*
  if (isnan(h_r) || isnan(t_r)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }*/
    
  dtostrf(h_r, 2, 2, h);
  dtostrf(t_r, 2, 2, t);
  
  Serial.print("Humidity: DHT");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperature: DHT");
  Serial.print(t);
  Serial.println(" *C ");
  
  memset(buf,0,50);
  topic_1.toCharArray(buf,50);
  client.publish(buf,t);

  memset(buf,0,50);
  topic_2.toCharArray(buf,50);
  client.publish(buf,temperature);

  memset(buf,0,50);
  topic_3.toCharArray(buf,50);
  client.publish(buf,h);

  //client.publish("Astair/#/temp/#",t);  

  
  Serial.println("Going to sleep now");
  Serial.flush(); 
  delay(2000);
  esp_deep_sleep_start();  
}
