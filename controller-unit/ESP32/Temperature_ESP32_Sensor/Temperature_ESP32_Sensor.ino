#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define uS_TO_S_FACTOR 1000000  /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP  30        /* Time ESP32 will go to sleep (in seconds) */

// Data wire is connected to GPIO13
#define ONE_WIRE_BUS 13

// Setup a oneWire instance to communicate with a OneWire device
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

//DeviceAddress sensor = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };   //#1
//DeviceAddress sensor = { <Your Device Address> };     //#2
//DeviceAddress sensor = { <Your Device Address> };   //#3
DeviceAddress sensor = { <Your Device Address> };   //#4



// Replace the next variables with your SSID/Password combination
const char* ssid = "<Your SSID>";
const char* password = "<Your Password>";

// Add your MQTT Broker IP address, example:
const char* mqtt_server = "<Raspberry's IP Address>";

WiFiClient espClient;
PubSubClient client(espClient);
char temperature[8];

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
  client.setCallback(callback);
  
  pinMode(5, OUTPUT);

  //Print the wakeup reason for ESP32
  print_wakeup_reason();

  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  Serial.println("Setup ESP32 to sleep for every " + String(TIME_TO_SLEEP) + " Seconds");

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

void callback(char* topic, byte* message, unsigned int length) {

}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    
    // Attempt to connect
    if (client.connect("ESP8266Client_1")) {
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
  
  client.publish("esp32/temperature_1",temperature);
  
  Serial.println("Going to sleep now");
  Serial.flush(); 
  esp_deep_sleep_start();  
}
