#include <WiFi.h>
#include <PubSubClient.h>

// Replace the next variables with your SSID/Password combination
const char* ssid = "<Your SSID>";
const char* password = "<Your Password>";

// Add your MQTT Broker IP address, example:
const char* mqtt_server = "<Your Raspberry's IP>";

WiFiClient espClient;
PubSubClient client(espClient);

char buf[50], buf1[25],clientName[25];
String topic_1, topic_2, topic_3, topic_4, topic_5, cl_name;


enum MODE {COOL, FAN, DRY, HEAT,AUTO};
enum FAN_SPEED {LOW_F, MEDIUM_F, HIGH_F, AUTO_F};

MODE Des_Mode = COOL;
FAN_SPEED Des_Fan = LOW_F;
byte Des_Temperature = 0x24, Act_Temperature = 0x50;
int Des_OnOff = 0, Des_Sensor = 0;
String strMode = "COOL", strFan = "LOW";

byte frame[12];

void BuildTxFrame(byte *frame,MODE mode_, FAN_SPEED fan,byte desiredTemp,byte actualTemp, int on_off, int sensor);
void BuildTxFrame(byte *frame,MODE mode_, FAN_SPEED fan,int desiredTemp,int actualTemp, int on_off, int sensor);
byte CalcCheckSum(byte * frame);
void WriteAll(byte *frame);

byte dTemperatureCreate(int temp);
byte arr[12];

void setup() {
  Serial.begin(115200);
  Serial2.begin(1200, SERIAL_8E1);
    
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  topic_1 = "Astair/"+ String(GetChipID()) + "/AC/CONF/SET/PWR";
  topic_2 = "Astair/"+ String(GetChipID()) + "/AC/CONF/SET/FAN";
  topic_3 = "Astair/"+ String(GetChipID()) + "/AC/CONF/SET/MODE";
  topic_4 = "Astair/"+ String(GetChipID()) + "/AC/CONF/SET/TEMP";
  topic_5 = "Astair/"+ String(GetChipID()) + "/AC/CONF/GET";
  
  
  cl_name = "ESP32_" + String(GetChipID());
  cl_name.toCharArray(clientName,25);


  BuildTxFrame(arr,COOL, HIGH_F, (byte)0x50, (byte)0x26, 0, 0);
 }
 
byte tempArray[12];
byte byteArray[12];
byte charRead=0x00;

int readState = 0;
int writeState = 0;

void loop() {  
  if (!client.connected()) {
    digitalWrite(5, HIGH);   
    delay(1000);                       
    digitalWrite(5, LOW);    
    delay(1000);  
    
    reconnect();
  }
  client.loop();
  
 
  int i=0;
   while(Serial2.available() > 0)
   {
      tempArray[i%12]=byteArray[i%12];
      Serial.print(".");
      charRead     = Serial2.read();
      delay(10);
      byteArray[i%12] = (byte)charRead;
      i++;
   }
   Act_Temperature = byteArray[9];
   arr[4] = Act_Temperature;
   Serial.println("\nAct_Temperature:: " + String(Act_Temperature, HEX));
   
   //debug
   Serial.println("\n");
   for(int i = 0; i<12 ; i++)
       Serial.print(String(byteArray[i], HEX) + " ");
   Serial.println("\t::RX\n");
  
   for(int i = 0; i<16 ; i++)
   {
     if(tempArray[3] != byteArray[3] || tempArray[8] != byteArray[8]){
       break;
     }
     //Serial.print(String((((byte)i)<< 4)^ 0xf, HEX) + " -- ");
     byte asd = (((byte)i)<< 4), asd2 = arr[10]&0x0f;
     //Serial.print(String(asd, HEX) + " ");
     arr[10] = asd|asd2;
  
     //Serial.print(String(arr[10], HEX) + " ");
     arr[11] = CalcCheckSum(arr);
  
     for(int ii = 0; ii<12 ; ii++)
       Serial.print(String(arr[ii], HEX) + " ");
     Serial.println(" ");
     Serial2.write(arr,12);
     delay(50);
   }

    float temperat = ((int)Act_Temperature - 32)/1.8;
    
    String Data = strMode+","+ strFan+
                  ","+String(Des_Temperature,HEX)+","+
                  String(temperat)+","+ String(Des_OnOff);
    Serial.println("DATA:::: " + Data + " Temperature: " + String(temperat));
                 
    memset(buf,0,50);
    topic_5.toCharArray(buf,50);
    Data.toCharArray(buf1,25);
    client.publish(buf,buf1);
    delay(2000);
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  if (String(topic) == "Astair/Test/AC/PWR") {
    Serial.print("Changing output to ");
    if(messageTemp == "ON"){
      Serial.println("PWR:: ON");
      Des_OnOff = 1;
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if(messageTemp == "OFF"){
      Serial.println("PWR:: OFF");
      Des_OnOff = 0;
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
  }
  else if (String(topic) == "Astair/Test/AC/MODE") {
    Serial.print("Changing output to ");
    if(messageTemp == "COOL"){
      Serial.println("MODE:: COOL");
      Des_Mode = COOL;
      strMode = "COOL";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if(messageTemp == "DRY"){
      Serial.println("MODE:: DRY");
      Des_Mode = DRY;
      strMode = "DRY";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if(messageTemp == "FAN"){
      Serial.println("MODE:: FAN");
      Des_Mode = FAN;
      strMode = "FAN";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if(messageTemp == "HEAT"){
      Serial.println("MODE:: HEAT");
      Des_Mode = HEAT;
      strMode = "HEAT";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if(messageTemp == "AUTO"){
      Serial.println("MODE:: AUTO");
      Des_Mode = AUTO;
      strMode = "AUTO";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
  }
  else if (String(topic) == "Astair/Test/AC/FAN") {
    Serial.print("Changing output to ");
    if(messageTemp == "LOW"){
      Serial.println("FAN:: LOW");
      Des_Fan = LOW_F;
      strFan = "LOW";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if(messageTemp == "MEDIUM"){
      Serial.println("FAN:: MEDIUM");
      Des_Fan = MEDIUM_F;
      strFan = "MEDIUM";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if(messageTemp == "HIGH"){
      Serial.println("FAN:: HIGH");
      Des_Fan = HIGH_F;
      strFan = "HIGH";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if(messageTemp == "AUTO"){
      Serial.println("FAN:: AUTO");
      Des_Fan = AUTO_F;
      strFan = "AUTO";
      BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
  }
  else if(String(topic) == "Astair/Test/AC/TEMP"){
    //messageTemp.toInt();
    Des_Temperature = dTemperatureCreate(messageTemp.toInt());
    BuildTxFrame(arr,Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
  }
  
}

 byte CalcCheckSum(byte * frame){  
  byte  tmp = 0x00;
  for(int i = 0; i<11; i++){
      tmp ^= *(frame+i);
  }
  return tmp;   
 }

 byte dTemperatureCreate(int temp){
  int b2 = (temp/10)*16 + temp%10;
  return (byte)b2;  
 }

 byte aTemperatureCreate(int temp){
  int b2 = (temp - 2)*1.8 + 32;
  return (byte)b2;  
 }

 void BuildTxFrame(byte *frame, MODE mode_, FAN_SPEED fan, byte dtempHex, byte atempHex, int on_off, int sensor){
  
  *(frame+0) = 0x55;
  *(frame+1) = 0x00;
  *(frame+2) = 0x55;


  *(frame+4) = atempHex;
  *(frame+5) = 0x00;
  *(frame+6) = 0x18;
  *(frame+7) = 0x00;

  //actual temperature (base 16)
  *(frame+8) = dtempHex;
    
  //if A/C ON --> on_off>0
  if(on_off > 0){
    *(frame+9) = 0x08;  
  }
  else{
    *(frame+9) = 0x0c;  
  }
  
  byte mm = 0xff;  
  switch(mode_){
    case COOL:
      mm &= 0xf2;
      break;
    case FAN:
      mm &= 0xf4;
      break;
    case DRY:
      mm &= 0xf1;
      break;
    case HEAT:
      mm &= 0xf8;
      break;
    case AUTO:
      mm &= 0xfa;
      break;
    default:
      mm &= 0xf2;
      break;
  }

  switch(fan){
    case LOW_F:
      mm &= 0x8f;
      break;
    case MEDIUM_F:
      mm &= 0x4f;
      break;
    case HIGH_F:
      mm &= 0x2f;
      break;
    case AUTO_F:
      mm &= 0x1f;
      break;
    default:
      mm &= 0x8f;
      break;
  }

  if(mm&0x14)
    mm &= 0x24;

  *(frame+3) = mm;

  byte ds = 0xff;
  if(sensor>0)
    ds &= 0xf3;
  else
    ds &= 0xf2;

  byte tmp = 0x00;
  for(int i = 0; i<10; i++){
      tmp += *(frame+i);
  }
  tmp = (tmp%0x10+0x01) << 4;
  tmp += 0x0f;
  tmp &= ds;

  *(frame+10) = tmp;
  
  tmp = 0x00;
  for(int i = 0; i<11; i++){
      tmp ^= *(frame+i);
  }
  *(frame+11) = tmp;

}

void BuildTxFrame(byte *frame, MODE mode_, FAN_SPEED fan, int dtempHex, int atempHex, int on_off, int sensor){
  
  *(frame+0) = 0x55;
  *(frame+1) = 0x00;
  *(frame+2) = 0x55;


  *(frame+4) = aTemperatureCreate(dtempHex);
  *(frame+5) = 0x00;
  *(frame+6) = 0x18;
  *(frame+7) = 0x00;

  //actual temperature (base 16)
  *(frame+8) = dTemperatureCreate(atempHex);
    
  //if A/C ON --> on_off>0
  if(on_off > 0){
    *(frame+9) = 0x08;  
  }
  else{
    *(frame+9) = 0x0c;  
  }
  
  byte mm = 0xff;  
  switch(mode_){
    case COOL:
      mm &= 0xf2;
      break;
    case FAN:
      mm &= 0xf4;
      break;
    case DRY:
      mm &= 0xf1;
      break;
    case HEAT:
      mm &= 0xf8;
      break;
    case AUTO:
      mm &= 0xfa;
      break;
    default:
      mm &= 0xf2;
      break;
  }

  switch(fan){
    case LOW_F:
      mm &= 0x8f;
      break;
    case MEDIUM_F:
      mm &= 0x4f;
      break;
    case HIGH_F:
      mm &= 0x2f;
      break;
    case AUTO_F:
      mm &= 0x1f;
      break;
    default:
      mm &= 0x8f;
      break;
  }

  if(mm&0x14)
    mm &= 0x24;



  *(frame+3) = mm;

  byte ds = 0xff;
  if(sensor>0)
    ds &= 0xf3;
  else
    ds &= 0xf2;

  byte tmp = 0x00;
  for(int i = 0; i<10; i++){
      tmp += *(frame+i);
  }
  tmp = (tmp%0x10+0x01) << 4;
  tmp += 0x0f;
  tmp &= ds;

  *(frame+10) = tmp;
  
  tmp = 0x00;
  for(int i = 0; i<11; i++){
      tmp ^= *(frame+i);
  }
  *(frame+11) = tmp;

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
      
      memset(buf,0,50);
      topic_1.toCharArray(buf,50);
      client.subscribe(buf);

      memset(buf,0,50);
      topic_2.toCharArray(buf,50);
      client.subscribe(buf);

      memset(buf,0,50);
      topic_3.toCharArray(buf,50);
      client.subscribe(buf);

      memset(buf,0,50);
      topic_4.toCharArray(buf,50);
      client.subscribe(buf);
      
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
