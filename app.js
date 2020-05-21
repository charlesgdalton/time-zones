// Implement an HTTP server with a single endpoint that allows the client to request
// the wall-clock time on the server.

const express = require('express');
const app = express();
const port = 3000;

const moment = require('moment-timezone');

const timezones = require('./tz_database');


app.get('/time', (req, res) => {
    let currentTime = moment().format('HH:mm:ss');

    res.send(currentTime);
});

app.get('/time/:group/:region', (req, res) => {
    let group = req.params.group;
    let region = req.params.region;

    if (timezoneIsValid(group, region)) {
        let currentTime = moment().tz(`${group}/${region}`).format('HH:mm:ss');

        res.send(currentTime);
    } else {
        res.status(400).send('Invalid timezone');
    }
});

const timezoneIsValid = (group, region) => {
    try {
        let groupArray = timezones.find(obj => obj.group.toLowerCase() == group.toLowerCase()).zones;
        let regionObject = groupArray.find(obj => obj.value.toLowerCase() == `${group}/${region}`.toLowerCase());

        if(regionObject) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
};

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
