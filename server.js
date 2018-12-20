const express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');


const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const createRegistration = 'create table if not exists registration (id integer primary key, name varchar, pk varchar, address varchar, isReviewed bit, isAccepted bit)';
const insertRegistration = 'insert into registration values(?, ?, ?, ?, ?, ?)';
const getTopIndex = 'select max(id) top from registration';
registrationTracker = 0;

// create db
var db = new sqlite3.Database('./build/evoting.db');

db.serialize(() => {
    db.run(createRegistration);
    db.all(getTopIndex, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            registrationTracker = row.top + 1;
            console.log("Current at: " + row.top);
        });
    });
});

db.close();


// listeners

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.post('/register', function (req, res) {

    var name = req.body.name;
    var pk = req.body.pk;
    var address = req.body.address;

    console.log({name: name, address: address});

    if (name && pk && address) {
        var db = new sqlite3.Database('./build/evoting.db');

        db.serialize(() => {
            var stmt = db.prepare(insertRegistration);

            stmt.run(registrationTracker++, name, pk, address, 0, 0);

            stmt.finalize();
        });

        db.close();

        res.send({success: true});
    } else {
        res.send({success: false, error: "Name, Public Key or sender must be provided."});
    }
});

app.get('/register', function (req, res) {
    var db = new sqlite3.Database('./build/evoting.db');

    let sql = `select * from registration where isReviewed = 0`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });

        res.send(rows);
    });

    db.close();
});

app.get('/delete/:id', function (req, res) {

    var id = req.params.id;

    if (!id) {
        res.send({success: false, error: 'Id not received'});
    }

    var db = new sqlite3.Database('./build/evoting.db');

    let sql = `update registration set isReviewed = 1, isAccepted = 0 where id = ?`;

    db.serialize(() => {
        var stmt = db.prepare(sql);

        stmt.run(id);

        stmt.finalize(function() {
            console.log('Verified!');
            res.send({success: true});
        });
    });

    console.log('Rejected ' + id + '!!');

    db.close();
});

app.get('/verify/:id', function (req, res) {

    var id = req.params.id;

    if (!id) {
        res.send({success: false, error: 'Id not received'});
    }

    var db = new sqlite3.Database('./build/evoting.db');

    let sql = `update registration set isReviewed = 1, isAccepted = 1 where id = ?`;

    db.serialize(() => {
        var stmt = db.prepare(sql);

        stmt.run(id);

        stmt.finalize(function() {
            console.log('Verified!');
            res.send({success: true});
        });
    });

    db.close();
});

var server = app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
        var host = server.address().address;
        var port = server.address().port;

        console.log("Server listening at http://%s:%s", host, port)
    }
})
