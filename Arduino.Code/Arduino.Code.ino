
/*
  Tech Vegan - Sensor Monitoring Free API Service
  Designed by Ashish Vegan | www.ashishvegan.com
*/
#include <ESP8266HTTPClient.h>
#include<ESP8266WiFi.h>
int wifi = D0;
const char* ssid = "OnePlus";
const char* password = "12345678";
String value;
const int led = D1;
void setup()
{
  Serial.begin(9600);
  pinMode(wifi, OUTPUT);
  pinMode(led, OUTPUT);
  digitalWrite(wifi, HIGH);
  Serial.println("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    digitalWrite(wifi, LOW);
    delay(500);
    digitalWrite(wifi, HIGH);
    delay(500);
  }
  digitalWrite(wifi, LOW);
  Serial.println("Connected to Wi-Fi");
  delay(2000);
}
void loop()
{
  // Cloud Communication
  HTTPClient http; // Create Object  
  http.begin("http://192.168.183.79:5000/api/read");
  int httpCode = http.GET();
  if (httpCode > 0)
  {
    value = http.getString();
    if(value[0] == '1')
    {
        Serial.println("LED ON");
        digitalWrite(led, HIGH);
    }
    else if(value[0] == '0')
    {
        Serial.println("LED OFF");
        digitalWrite(led, LOW);
    }
    Serial.print(value);
  }
  else
  {
    Serial.print("NO INTERNET");
    delay(1000);
  }
  http.end();
  delay(1000);
}
