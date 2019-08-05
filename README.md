# HTTP-Response Generator for Webpage Performance Tests

[![Build Status](https://travis-ci.org/thomd/httpgen.png)](https://travis-ci.org/thomd/httpgen)
[![Known Vulnerabilities](https://snyk.io/test/github/thomd/httpgen/badge.svg)](https://snyk.io/test/github/thomd/httpgen)

Generate dummy webpage resources like CSS, javascript and images for testing webpage performance patterns.

## Install on Heroku

    heroku login
    heroku create
    git push heroku master
    heroku open

or use

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/thomd/httpgen)

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

`<color>`: color of the image in hex-code (without `#`) or prefix with `random`

### QR-code Image

    /qr/<delay>?/<content|request-header>.png

`<delay>`: response time in seconds

`<content>`: content of the QR-code

`<request-header>`: request header as content of the QR-code (for example: `referer`)

### Timeout for simulating a single point of failure (SPOF)

    /spof

### JSON

Return clients IP address.

    /json/<delay>?/<size>?/<name>.json

`<delay>`: response time in seconds

`<size>`: size of document in kilo-bytes

`<name>`: name for the resource to identify easily in the developer-tools network waterfall

