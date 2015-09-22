# HTTP Response Generator

Generate dummy CSS- and JavaScript-files for testing webpage performance.

## Install on Heroku

    heroku login
    heroku create
    git push heroku master
    heroku open

## Usage

### Stylesheet

    /css/<delay>?/<size>?

`<delay>`: response time in seconds

`<size>`: size of document in kilo-bytes

### Javascript

    /javascript/<delay>?/<size>?/<time>?

`<delay>`: response time in seconds

`<size>`: size of document in kilo-bytes

`<time>`: runtime of the script when running in the browser in seconds
