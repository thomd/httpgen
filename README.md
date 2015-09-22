# HTTP Response Generator

Generate dummy CSS- and JavaScript-files for testing webpage performance.

## Install on Heroku

    heroku login
    heroku create
    git push heroku master
    heroku open
    heroku logs --tail

## Usage

### Stylesheet

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
