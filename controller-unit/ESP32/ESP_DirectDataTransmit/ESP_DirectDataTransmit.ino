#include <WiFi.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <EEPROM.h>
#include <rom/rtc.h>

#define uS_TO_S_FACTOR 1000000  /* Conversion factor for micro seconds to seconds */
#define Ledpin 13
#define SCREEN_WIDTH 128 // OLED display width, in pixels
#define SCREEN_HEIGHT 64 // OLED display height, in pixels

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)
#define OLED_RESET     4 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

#define NUMFLAKES     10 // Number of snowflakes in the animation example

// Replace the next variables with your SSID/Password combination
const char* ssid = "";
const char* password = "";

// Add your MQTT Broker IP address
const char* mqtt_server = "";

WiFiClient espClient;
PubSubClient client(espClient);

char buf[50], buf1[25], clientName[25];
String topic_1, topic_2, topic_3, topic_4, topic_5, cl_name;


enum MODE {COOL, FAN, DRY, HEAT, AUTO};
enum FAN_SPEED {LOW_F, MEDIUM_F, HIGH_F, AUTO_F};

MODE Des_Mode = COOL;
FAN_SPEED Des_Fan = LOW_F;
byte Des_Temperature = 0x24, Act_Temperature = 0x50;
int Des_OnOff = 0, Des_Sensor = 0;
String strMode = "COOL", strFan = "LOW";

byte frame[12];

void BuildTxFrame(byte *frame, MODE mode_, FAN_SPEED fan, byte desiredTemp, byte actualTemp, int on_off, int sensor);
void BuildTxFrame(byte *frame, MODE mode_, FAN_SPEED fan, int desiredTemp, int actualTemp, int on_off, int sensor);
byte CalcCheckSum(byte * frame);
void WriteAll(byte *frame);
void Intro(String Trademark);
void drawchar(String text, int size_);
void DrawDisplay(String Trademark, String Temperature, String State, String Mode, String Fan, String Err);
void Except(byte Trademark);
void Except(String errorcode, String content);
void Morse(int i);
void MorseLong();
void MorseShort();

byte dTemperatureCreate(int temp);
byte arr[12];
String MAC;

String except[3];
byte exceptERR;


void setup() {
  Serial.begin(115200);
  Serial2.begin(1200, SERIAL_8E1);

  pinMode(Ledpin, OUTPUT);

  // SSD1306_SWITCHCAPVCC = generate display voltage from 3.3V internally
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3D for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for (;;); // Don't proceed, loop forever
  }

  except[0] = "Connection Error Occured";
  except[1] = "Restart Error Occured";
  except[2] = "Mqtt Error Occured";

  print_reset_reason(rtc_get_reset_reason(0));
  print_reset_reason(rtc_get_reset_reason(1));

  cl_name = "ESP32_" + String(GetChipID());
  cl_name.toCharArray(clientName, 25);
  setup_wifi();

  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  MAC = String(GetChipID());

  topic_1 = "Astair/" + MAC + "/AC/CONF/SET/PWR";
  topic_2 = "Astair/" + MAC + "/AC/CONF/SET/FAN";
  topic_3 = "Astair/" + MAC + "/AC/CONF/SET/MODE";
  topic_4 = "Astair/" + MAC + "/AC/CONF/SET/TEMP";

  topic_5 = "Astair/" + String(GetChipID()) + "/AC/CONF/GET";



  BuildTxFrame(arr, COOL, HIGH_F, (byte)0x50, (byte)0x26, 0, 0);

  Intro("Astair");
  DrawDisplay("Astair", "--", "---", "-", "-", "--");
}

byte tempArray[12];
byte byteArray[12];
byte charRead = 0x00;


unsigned int schuler = 0;
int e = 0;
void loop() {
  Serial.println(client.connected());
  Serial.println("Serial.println(client.connected())");
  reconnect();
  Serial.println("reconnect();");
  if (!client.connected()) {
    reconnect();
    Serial.println("reconnect();");
  }

  client.loop();


  int i = 0;
  while (Serial2.available() > 0)
  {
    tempArray[i % 12] = byteArray[i % 12];
    Serial.print(".");
    charRead     = Serial2.read();
    delay(10);
    byteArray[i % 12] = (byte)charRead;
    i++;
  }
  Act_Temperature = byteArray[9];
  arr[4] = Act_Temperature;
  Serial.println("\nAct_Temperature:: " + String(Act_Temperature, HEX));

  //debug
  Serial.println("\n");
  for (int i = 0; i < 12 ; i++)
    Serial.print(String(byteArray[i], HEX) + " ");
  Serial.println("\t::RX\n");

  for (int i = 0; i < 16 ; i++)
  {
    if (tempArray[3] != byteArray[3] || tempArray[8] != byteArray[8]) {
      break;
    }
    //Serial.print(String((((byte)i)<< 4)^ 0xf, HEX) + " -- ");
    byte asd = (((byte)i) << 4), asd2 = arr[10] & 0x0f;
    //Serial.print(String(asd, HEX) + " ");
    arr[10] = asd | asd2;

    //Serial.print(String(arr[10], HEX) + " ");
    arr[11] = CalcCheckSum(arr);

    for (int ii = 0; ii < 12 ; ii++)
      Serial.print(String(arr[ii], HEX) + " ");
    Serial.println(" ");
    Serial2.write(arr, 12);
    delay(50);
  }

  if (schuler % 50 == 0) {
    float temperat = ((int)Act_Temperature - 32) / 1.8;

    String Data = strMode + "," + String(Des_Temperature, HEX) + "," + strFan +
                  "," + String(Des_OnOff);
    Serial.println("DATA:::: " + Data + " asd: " + String(temperat));

    memset(buf, 0, 50);
    topic_5.toCharArray(buf, 50);
    Data.toCharArray(buf1, 25);
    client.publish(buf, buf1);
    delay(50);

    String state = Des_OnOff > 0 ? "ON" : "OFF";
    DrawDisplay("Astair", String(Des_Temperature, HEX), state, String(strMode[0]), String(strFan[0]), "NE");

  }
  schuler++;

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


  // Changes the output state according to the message
  if (String(topic) == "Astair/" + MAC + "/AC/CONF/SET/PWR") {
    Serial.print("Changing output to ");
    if (messageTemp == "ON") {
      Serial.println("PWR:: ON");
      Des_OnOff = 1;
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if (messageTemp == "OFF") {
      Serial.println("PWR:: OFF");
      Des_OnOff = 0;
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
  }
  else if (String(topic) == "Astair/" + MAC + "/AC/CONF/SET/MODE") {
    Serial.print("Changing output to ");
    if (messageTemp == "COOL") {
      Serial.println("MODE:: COOL");
      Des_Mode = COOL;
      strMode = "COOL";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if (messageTemp == "DRY") {
      Serial.println("MODE:: DRY");
      Des_Mode = DRY;
      strMode = "DRY";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if (messageTemp == "FAN") {
      Serial.println("MODE:: FAN");
      Des_Mode = FAN;
      strMode = "FAN";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if (messageTemp == "HEAT") {
      Serial.println("MODE:: HEAT");
      Des_Mode = HEAT;
      strMode = "HEAT";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if (messageTemp == "AUTO") {
      Serial.println("MODE:: AUTO");
      Des_Mode = AUTO;
      strMode = "AUTO";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
  }
  else if (String(topic) == "Astair/" + MAC + "/AC/CONF/SET/FAN") {
    Serial.print("Changing output to ");
    if (messageTemp == "LOW") {
      Serial.println("FAN:: LOW");
      Des_Fan = LOW_F;
      strFan = "LOW";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if (messageTemp == "MEDIUM") {
      Serial.println("FAN:: MEDIUM");
      Des_Fan = MEDIUM_F;
      strFan = "MEDIUM";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if (messageTemp == "HIGH") {
      Serial.println("FAN:: HIGH");
      Des_Fan = HIGH_F;
      strFan = "HIGH";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
    else if (messageTemp == "AUTO") {
      Serial.println("FAN:: AUTO");
      Des_Fan = AUTO_F;
      strFan = "AUTO";
      BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
    }
  }
  else if (String(topic) == "Astair/" + MAC + "/AC/CONF/SET/TEMP") {
    //messageTemp.toInt();
    Des_Temperature = dTemperatureCreate(messageTemp.toInt());
    BuildTxFrame(arr, Des_Mode, Des_Fan, Des_Temperature, Act_Temperature, Des_OnOff, Des_Sensor);
  }

  String state = Des_OnOff > 0 ? "ON" : "OFF";
  DrawDisplay("Astair", String(Des_Temperature, HEX), state, String(strMode[0]), String(strFan[0]), "NE");

}

byte CalcCheckSum(byte * frame) {
  byte  tmp = 0x00;
  for (int i = 0; i < 11; i++) {
    tmp ^= *(frame + i);
  }
  return tmp;
}

byte dTemperatureCreate(int temp) {
  int b2 = (temp / 10) * 16 + temp % 10;
  return (byte)b2;
}

byte aTemperatureCreate(int temp) {
  int b2 = (temp - 2) * 1.8 + 32;
  return (byte)b2;
}

void BuildTxFrame(byte *frame, MODE mode_, FAN_SPEED fan, byte dtempHex, byte atempHex, int on_off, int sensor) {

  *(frame + 0) = 0x55;
  *(frame + 1) = 0x00;
  *(frame + 2) = 0x55;


  *(frame + 4) = atempHex;
  *(frame + 5) = 0x00;
  *(frame + 6) = 0x18;
  *(frame + 7) = 0x00;

  //actual temperature (base 16)
  *(frame + 8) = dtempHex;

  //if A/C ON --> on_off>0
  if (on_off > 0) {
    *(frame + 9) = 0x08;
  }
  else {
    *(frame + 9) = 0x0c;
  }

  byte mm = 0xff;
  switch (mode_) {
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

  switch (fan) {
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

  if (mm & 0x14)
    mm &= 0x24;

  *(frame + 3) = mm;

  byte ds = 0xff;
  if (sensor > 0)
    ds &= 0xf3;
  else
    ds &= 0xf2;

  byte tmp = 0x00;
  for (int i = 0; i < 10; i++) {
    tmp += *(frame + i);
  }
  tmp = (tmp % 0x10 + 0x01) << 4;
  tmp += 0x0f;
  tmp &= ds;

  *(frame + 10) = tmp;

  tmp = 0x00;
  for (int i = 0; i < 11; i++) {
    tmp ^= *(frame + i);
  }
  *(frame + 11) = tmp;

}

void BuildTxFrame(byte *frame, MODE mode_, FAN_SPEED fan, int dtempHex, int atempHex, int on_off, int sensor) {

  *(frame + 0) = 0x55;
  *(frame + 1) = 0x00;
  *(frame + 2) = 0x55;


  *(frame + 4) = aTemperatureCreate(dtempHex);
  *(frame + 5) = 0x00;
  *(frame + 6) = 0x18;
  *(frame + 7) = 0x00;

  //actual temperature (base 16)
  *(frame + 8) = dTemperatureCreate(atempHex);

  //if A/C ON --> on_off>0
  if (on_off > 0) {
    *(frame + 9) = 0x08;
  }
  else {
    *(frame + 9) = 0x0c;
  }

  byte mm = 0xff;
  switch (mode_) {
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

  switch (fan) {
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

  if (mm & 0x14)
    mm &= 0x24;



  *(frame + 3) = mm;

  byte ds = 0xff;
  if (sensor > 0)
    ds &= 0xf3;
  else
    ds &= 0xf2;

  byte tmp = 0x00;
  for (int i = 0; i < 10; i++) {
    tmp += *(frame + i);
  }
  tmp = (tmp % 0x10 + 0x01) << 4;
  tmp += 0x0f;
  tmp &= ds;

  *(frame + 10) = tmp;

  tmp = 0x00;
  for (int i = 0; i < 11; i++) {
    tmp ^= *(frame + i);
  }
  *(frame + 11) = tmp;

}
void Morse(int i) {
  switch (i) {
    case 0:
      MorseLong();
      MorseLong();
      MorseLong();
      MorseLong();
      MorseLong();
      break;
    case 1:
      MorseShort();
      MorseLong();
      MorseLong();
      MorseLong();
      MorseLong();
      break;
    case 2:
      MorseShort();
      MorseShort();
      MorseLong();
      MorseLong();
      MorseLong();
      break;
    case 3:
      MorseShort();
      MorseShort();
      MorseShort();
      MorseLong();
      MorseLong();
      break;
    case 4:
      MorseShort();
      MorseShort();
      MorseShort();
      MorseShort();
      MorseLong();
      break;
    case 5:
      MorseShort();
      MorseShort();
      MorseShort();
      MorseShort();
      MorseShort();
      break;
    case 6:
      MorseLong();
      MorseShort();
      MorseShort();
      MorseShort();
      MorseShort();
      break;
    case 7:
      MorseLong();
      MorseLong();
      MorseShort();
      MorseShort();
      MorseShort();
      break;
    case 8:
      MorseLong();
      MorseLong();
      MorseLong();
      MorseShort();
      MorseShort();
      break;
    case 9:
      MorseLong();
      MorseLong();
      MorseLong();
      MorseLong();
      MorseShort();
      break;
    default:
      while (i > 0) {
        int j = i % 10;
        i = i / 10;
        Morse(j);
      }

  }
}
void MorseLong() {
  digitalWrite(Ledpin, HIGH);
  delay(600);
  digitalWrite(Ledpin, LOW);
  delay(200);
}
void MorseShort() {
  digitalWrite(Ledpin, HIGH);
  delay(300);
  digitalWrite(Ledpin, LOW);
  delay(200);
}
void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  if (WiFi.status() != WL_CONNECTED)
    WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {

    exceptERR = 0xE0;
    Except(exceptERR);
    Morse(0);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


void reconnect() {
  // Loop until we're reconnected
  if (!client.connected()) {
    Serial.println(except[0] + " " + String(exceptERR, HEX));
    Serial.print("Attempting MQTT connection...");

    // Attempt to connect
    setup_wifi();
    if (client.connect(clientName)) {

      Serial.println("connected");

      memset(buf, 0, 50);
      topic_1.toCharArray(buf, 50);
      client.subscribe(buf);

      memset(buf, 0, 50);
      topic_2.toCharArray(buf, 50);
      client.subscribe(buf);

      memset(buf, 0, 50);
      topic_3.toCharArray(buf, 50);
      client.subscribe(buf);

      memset(buf, 0, 50);
      topic_4.toCharArray(buf, 50);
      client.subscribe(buf);

    }
    else {
      Serial.print("failed, rc=");
      Serial.print("Client State: " + client.state());
    }
  }
}

String GetChipID() {
  uint64_t chipid;
  chipid = ESP.getEfuseMac(); //The chip ID is essentially its MAC address(length: 6 bytes).
  unsigned long l1 = (uint16_t)(chipid >> 32);
  unsigned long l2 = (unsigned long)chipid;
  String result = String(l1, HEX) + String(l2, HEX), rr = "";
  result.toUpperCase();
  Serial.println(rr + "\n");
  Serial.println(result);
  return result;
}

void DrawDisplay(String Trademark, String Temperature, String State, String Mode, String Fan, String Err) {
  // Clear the buffer
  display.clearDisplay();
  display.setCursor(0, 0);
  //String Trademark = "Astair", String Temperature = "--", String State = "OFF", String Mode = "-", String Fan = "-", String Err = "--"

  drawchar(Trademark, 1);    // Draw characters of the default font
  drawchar("\n", 1);
  delay(2000);
  display.startscrollleft(0x00, 0x00);

  //display.stopscroll();
  drawchar(Temperature, 3);
  drawchar("o", 1);
  drawchar("C", 3);
  drawchar("  ", 2);
  drawchar(State, 2);
  drawchar("\n\n\n.....................", 1);

  drawchar("\n", 2);
  drawchar(Mode, 2);
  drawchar(" ", 2);
  drawchar(Fan, 2);
  drawchar("     ", 2);
  drawchar(Err, 2);

  display.display();

}

void Intro(String Trademark) {
  display.clearDisplay();

  display.setCursor(0, 0);
  drawchar("\n", 3);
  drawchar(Trademark, 3);
  drawchar("\n", 3);
  display.display();
  delay(1000);
  display.startscrollleft(0x00, 0x0F);
  delay(7500);
  display.stopscroll();
  delay(2000);
}
void Except(byte errorcode) {
  String err = String(errorcode, HEX);
  err.toUpperCase();
  String indis = err.substring(err.length() - 1);
  Serial.println("\n" + indis);
  int i = indis.toInt();
  String content = except[i];
  Except("ERROR" + indis, content);
}


void Except(String errorcode, String content) {

  display.clearDisplay();
  display.setCursor(0, 0);

  drawchar("Astair", 1);    // Draw characters of the default font
  drawchar("\n\n", 1);
  delay(2000);
  display.startscrollleft(0x00, 0x00);

  drawchar(errorcode, 2);
  drawchar("\n\n.....................", 1);

  drawchar("\n", 1);

  drawchar(content, 1);    // Draw characters of the default font
  delay(2000);

  display.display();
  delay(1000);
}

void drawchar(String text, int size_) {
  display.setTextSize(size_);      // Normal 1:1 pixel scale
  display.setTextColor(WHITE); // Draw white text
  //display.setCursor(0, 0);     // Start at top-left corner
  display.cp437(true);         // Use full 256 char 'Code Page 437' font

  display.print(text);
}


void print_reset_reason(RESET_REASON reason) {

  switch (reason)
  {
    case 1 : Serial.println ("POWERON_RESET");
      Except("ERROR:1", "POWERON_RESET\nVbat power on reset");
      break;
    /**<1,  Vbat power on reset*/
    case 3 : Serial.println ("SW_RESET");
      Except("ERROR:3", "SW_RESET\nSoftware reset digital core"); break;             /**<3,  Software reset digital core*/
    case 4 : Serial.println ("OWDT_RESET");
      Except("ERROR:4", "OWDT_RESET\nLegacy watch dog reset digital core"); break;           /**<4,  Legacy watch dog reset digital core*/
    case 5 : Serial.println ("DEEPSLEEP_RESET");
      Except("ERROR:5", "DEEPSLEEP_RESET\nDeep Sleep reset digital core"); break;      /**<5,  Deep Sleep reset digital core*/
    case 6 : Serial.println ("SDIO_RESET");
      Except("ERROR:6", "SDIO_RESET\nReset by SLC module, reset digital core"); break;           /**<6,  Reset by SLC module, reset digital core*/
    case 7 : Serial.println ("TG0WDT_SYS_RESET");
      Except("ERROR:7", "TG0WDT_SYS_RESET\nTimer Group0 Watch dog reset digital core"); break;     /**<7,  Timer Group0 Watch dog reset digital core*/
    case 8 : Serial.println ("TG1WDT_SYS_RESET");
      Except("ERROR:8", "TG1WDT_SYS_RESET\nTimer Group1 Watch dog reset digital core"); break;     /**<8,  Timer Group1 Watch dog reset digital core*/
    case 9 : Serial.println ("RTCWDT_SYS_RESET");
      Except("ERROR:9", "RTCWDT_SYS_RESET\nRTC Watch dog Reset digital core"); break;     /**<9,  RTC Watch dog Reset digital core*/
    case 10 : Serial.println ("INTRUSION_RESET");
      Except("ERROR:10", "INTRUSION_RESET\nInstrusion tested to reset CPU"); break;     /**<10, Instrusion tested to reset CPU*/
    case 11 : Serial.println ("TGWDT_CPU_RESET");
      Except("ERROR:11", "TGWDT_CPU_RESET\nTime Group reset CPU"); break;     /**<11, Time Group reset CPU*/
    case 12 : Serial.println ("SW_CPU_RESET");
      Except("ERROR:12", "SW_CPU_RESET\nSoftware reset CPU"); break;        /**<12, Software reset CPU*/
    case 13 : Serial.println ("RTCWDT_CPU_RESET");
      Except("ERROR:13", "RTCWDT_CPU_RESET\nRTC Watch dog Reset CPU"); break;    /**<13, RTC Watch dog Reset CPU*/
    case 14 : Serial.println ("EXT_CPU_RESET");
      Except("ERROR:14", "EXT_CPU_RESET\nfor APP CPU, reseted by PRO CPU"); break;       /**<14, for APP CPU, reseted by PRO CPU*/
    case 15 : Serial.println ("RTCWDT_BROWN_OUT_RESET");
      Except("ERROR:15", "RTCWDT_BROWN_OUT_RESET\nReset when the vdd voltage is not stable"); break; /**<15, Reset when the vdd voltage is not stable*/
    case 16 : Serial.println ("RTCWDT_RTC_RESET");
      Except("ERROR:16", "RTCWDT_RTC_RESET\nRTC Watch dog reset digital core and rtc module"); break;    /**<16, RTC Watch dog reset digital core and rtc module*/
    default : Serial.println ("NO_MEAN");
      Except("ERROR:17", "NO_MEAN\nUnknown Reset Reason");
  }
  Morse(reason);
}
