#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>


// Data wire is connected to GPIO13
#define ONE_WIRE_BUS 13

// Setup a oneWire instance to communicate with a OneWire device
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);

// Pass your Device Address..
//DeviceAddress sensor = { 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 };     //#1
//DeviceAddress sensor = { <Your Device Address> };     //#2
DeviceAddress sensor   = { <Your Device Address> };     //#3
//DeviceAddress sensor = { <Your Device Address> };     //#4



// Replace the next variables with your SSID/Password combination
const char* ssid = "<your ssid>";
const char* password = "<your password>";

// Add your MQTT Broker IP address, example:
const char* mqtt_server = "<Raspberry's IP Address>";

WiFiClient espClient;
PubSubClient client(espClient);
char temperature[8];

void setup() {
  Serial.begin(115200);
  sensors.begin();
  
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  
  pinMode(5, OUTPUT);
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
    if (client.connect()) {
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

void loop() {
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
  delay(5000);
    
}
