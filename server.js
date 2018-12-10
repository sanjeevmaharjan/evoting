const express = require('express');
/*const path = require('path');
const open = require('open');*/

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        var host = server.address().address
        var port = server.address().port

        console.log("Server listening at http://%s:%s", host, port)
    }
})
