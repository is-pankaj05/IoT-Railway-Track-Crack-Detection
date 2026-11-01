# ESP32 installation

The ESP32 needs **both** the Arduino sketch and the built React website:

- Sketch: `esp32/railway_safety/railway_safety.ino`
- Website files: everything inside `esp32/railway_safety/data/`

The React source files are not uploaded directly to the ESP32.

## Prepare the website files

From the project root, run:

```bash
npm install
npm run build:esp32
```

This builds the React dashboard without minifying its JavaScript and copies
the readable bundle, source map, logo, and other production files into the
sketch's `data/` folder. Run this again after changing the frontend.

## Upload to the ESP32

1. Install the ESP32 board support in Arduino IDE.
2. Install the `NewPing` and `TinyGPSPlus` libraries from Library Manager.
   `WiFi`, `WebServer`, `HardwareSerial`, and `LittleFS` are included with the
   ESP32 board package.
3. Open `esp32/railway_safety/railway_safety.ino` and select your ESP32 board
   and serial port.
4. Install an ESP32 LittleFS filesystem uploader compatible with your Arduino
   IDE version.
5. From the `esp32/railway_safety/` sketch folder, upload its `data/` folder to
   the board's **LittleFS** filesystem using the uploader. The filesystem
   should contain `/index.html` and the generated `/assets/` directory.
6. Upload the `.ino` sketch from Arduino IDE.
7. Connect a phone or computer to the `Railway_Safety` Wi-Fi network. The
   password is `12345678`.
8. Open `http://192.168.4.1` in a browser.

The sketch serves the dashboard and the existing `/data`, `/forward`,
`/backward`, and `/stop` routes from the same ESP32.
