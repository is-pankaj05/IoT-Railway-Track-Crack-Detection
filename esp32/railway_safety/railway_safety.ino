#include <WiFi.h>
#include <WebServer.h>
#include <NewPing.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>
#include <LittleFS.h>

// ================= WIFI =================
const char* ssid = "Railway_Safety";
const char* password = "12345678";

WebServer server(80);

// ================= MOTOR =================
#define IN1 27
#define IN2 26
#define IN3 25
#define IN4 33
#define ENA 14
#define ENB 12

// ================= BUZZER =================
#define BUZZER 13

// ================= ULTRASONIC =================
#define TRIG1 5
#define ECHO1 18
#define TRIG2 19
#define ECHO2 21

NewPing sonar1(TRIG1, ECHO1, 200);
NewPing sonar2(TRIG2, ECHO2, 200);

// ================= GPS =================
TinyGPSPlus gps;
HardwareSerial gpsSerial(1);

// ================= VARIABLES =================
float lat = 0;
float lon = 0;
int d1 = 0;
int d2 = 0;
String statusMsg = "Track Normal";

// ================= MOTOR =================
void forward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void backward() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void stopMotor() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

// ================= WEB FILES =================
String contentTypeFor(const String& path) {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".ico")) return "image/x-icon";
  if (path.endsWith(".woff2")) return "font/woff2";
  return "application/octet-stream";
}

void handleWebFile() {
  if (server.method() != HTTP_GET) {
    server.send(405, "text/plain", "Method Not Allowed");
    return;
  }

  String path = server.uri();
  if (path.indexOf("..") >= 0) {
    server.send(400, "text/plain", "Invalid path");
    return;
  }
  if (path == "/") path = "/index.html";

  File file = LittleFS.open(path, "r");
  if (!file || file.isDirectory()) {
    server.send(404, "text/plain", "File not found");
    return;
  }

  server.sendHeader(
    "Cache-Control",
    path == "/index.html" ? "no-cache" : "public, max-age=31536000, immutable"
  );
  server.streamFile(file, contentTypeFor(path));
  file.close();
}

// ================= API ROUTES =================
void handleData() {
  String json = "{\"status\":\"" + statusMsg +
                "\",\"lat\":" + String(lat, 6) +
                ",\"lon\":" + String(lon, 6) +
                ",\"d1\":" + String(d1) +
                ",\"d2\":" + String(d2) + "}";
  server.send(200, "application/json", json);
}

void handleForward() {
  forward();
  server.send(200, "text/plain", "F");
}

void handleBackward() {
  backward();
  server.send(200, "text/plain", "B");
}

void handleStop() {
  stopMotor();
  server.send(200, "text/plain", "S");
}

// ================= SETUP =================
void setup() {
  Serial.begin(115200);

  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(ENB, OUTPUT);
  pinMode(BUZZER, OUTPUT);

  digitalWrite(ENA, HIGH);
  digitalWrite(ENB, HIGH);
  digitalWrite(BUZZER, LOW);
  stopMotor();

  gpsSerial.begin(9600, SERIAL_8N1, 16, 17);

  if (!LittleFS.begin()) {
    Serial.println("LittleFS mount failed. Upload the web files to LittleFS.");
    while (true) delay(1000);
  }

  WiFi.softAP(ssid, password);
  Serial.print("Connect to Wi-Fi: ");
  Serial.println(ssid);
  Serial.print("Dashboard address: http://");
  Serial.println(WiFi.softAPIP());

  server.on("/data", HTTP_GET, handleData);
  server.on("/forward", HTTP_GET, handleForward);
  server.on("/backward", HTTP_GET, handleBackward);
  server.on("/stop", HTTP_GET, handleStop);
  server.onNotFound(handleWebFile);
  server.begin();
}

// ================= LOOP =================
void loop() {
  server.handleClient();

  while (gpsSerial.available()) {
    gps.encode(gpsSerial.read());
  }

  if (gps.location.isValid()) {
    lat = gps.location.lat();
    lon = gps.location.lng();
  }

  d1 = sonar1.ping_cm();
  d2 = sonar2.ping_cm();

  if ((d1 > 20 || d1 == 0) && (d2 > 20 || d2 == 0)) {
    statusMsg = "WARNING: Track Damage Detected";
    stopMotor();
    digitalWrite(BUZZER, HIGH);
  } else {
    statusMsg = "Track Normal";
    digitalWrite(BUZZER, LOW);
  }

  delay(200);
}
