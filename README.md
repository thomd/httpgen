# HTTP Response Generator

Generate dummy webpage resources like CSS, javascript and images for testing webpage performance patterns.

## Test

    npm start
    npm test

## Install on Heroku

    heroku login
    heroku create
    git push heroku master
    heroku open
    heroku logs --tail

## Usage

### CSS

    /css/<delay>?/<size>?/<name>.css

`<delay>`: response time in seconds

`<size>`: size of document in kilo-bytes

`<name>`: name for the resource to identify easily in the developer-tools network waterfall

### Javascript

    /javascript/<delay>?/<size>?/<time>?/<name>.js

`<delay>`: response time in seconds

`<size>`: size of document in kilo-bytes

`<time>`: runtime of the script when running in the browser in seconds

`<name>`: name for the resource to identify easily in the developer-tools network waterfall

### PNG Image

    /image/<delay>?/<width>?/<height>?/<color>.png

`<delay>`: response time in seconds

`<width>`: width of the image in pixel

`<height>`: height of the image in pixel

`<color>`: color of the image in hex-code (without `#`)
