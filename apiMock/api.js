var express = require('express');
var app = express();
const {promisify} = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const path = require('path');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

async function loadPhotoInBase64(filePath) {
    const data = await readFileAsync(filePath);
    const base64Image = new Buffer(data, 'binary').toString('base64');    
    const extensionName = path.extname(filePath);
    return `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
}


app.get('/stream', function (req, res) {
    const { photos } = require('./db.json');
    Promise.all(
        photos.map(async photo => {
            const photoPath = `./photos/${photo.photo}`;
            return {
                photoId: photo.id,
                base64Photo: await loadPhotoInBase64(photoPath),
            };
        })
    )
        .then(response => res.send(JSON.stringify({ photos: response })))
        .catch(e => res.status(500).send(JSON.stringify({ error: e.toString()})));
});

app.get('/profiles', function (req, res) {
    const { profiles } = require('./db.json');
    Promise.all(
        profiles.map(async profile => {
            const photoPath = `./photos/${profile.photo}`;
            return {
                profileId: profile.id,
                base64Photo: await loadPhotoInBase64(photoPath),
                name: profile.name
            };
        })
    )
        .then(response => res.send(JSON.stringify({ profiles: response })))
        .catch(e => res.status(500).send(JSON.stringify({ error: e.toString()})));
});

app.get('/cardAliases', function (req, res) {
    const { cardAliases } = require('./db.json');
    res.send(JSON.stringify({ cardAliases }));
});

app.post('/pay', function(req, res) {
    res.send(JSON.stringify({ "status": "created" }));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
