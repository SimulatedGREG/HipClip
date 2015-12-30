# HipClip [BETA]
A minimal clipboard history app built with electron.

![screenshot](http://g.recordit.co/feqH0FIh8g.gif)

##### Current Status
HipClip is known to work on OS X 10.11.2 using ```electron-prebuilt``` with Electron v0.36.1. Only plain text & still images are supported at the moment. Testing has not been done on Windows or Linux as of yet.

## Install
```
git clone https://github.com/SimulatedGREG/HipClip.git
npm install
npm start
```

### How to Use
Open HipClip with the global hot key!
```
ctrl+alt(option)+h
```
Use ```up/down arrow``` keys to selected a clipboard item and hit ```enter``` to recopy to clipboard. Use ```escape``` to close.

## TODO:
 1. Settings panel
    * Set expiration time for copies
    * Custom highlight color
    * Dark theme
 2. Fix arrow scrolling issues
 3. Make app launch on start up
 4. Test on other platforms
 5. ~~Remove FontAwesome dependency (literally only using one icon, lol)~~
 6. Make better gif
 7. Parse Urls and grab meta data for rich data
 8. Make hipster logo
