# Kiosk Pi

Electron-based drink ordering kiosk.

## Setup

```bash
git clone https://github.com/olosvas/kiosk_pi.git
cd kiosk_pi
npm install
npm start
```

For Raspberry Pi autostart, edit `/etc/xdg/lxsession/LXDE-pi/autostart` and add:

```
@xset s noblank
@xset s off
@xset -dpms
@unclutter -idle 0
@/usr/bin/npm start --prefix /home/pi/kiosk_pi
```
