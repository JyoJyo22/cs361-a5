'use strict';

const fs = require('fs');
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.use(express.json());


let imageURL = "./images/romaji.png";
let imageReady = false;


fs.writeFile('./prng.txt', '', (err) => {
    if (err) console.error(err);
});

fs.writeFile('./kanji-image.txt', '', (err) => {
    if (err) console.error(err);
});


setInterval(() => {
    fs.readFile('./prng.txt', 'utf8', (err, data) => {
        if (err) console.err(err);
        if (data !== "go" && data !== '') {
            //then there is a number in the file
            fs.writeFile('./prng.txt', '', (err) => {
                if (err) console.error(err);
            });
            fs.writeFile('./kanji-image.txt', data, (err) => {
                if (err) console.error(err);
            });
        }
    });
    fs.readFile('./kanji-image.txt', 'utf8', (err, data) => {
        if (err) console.error(err);
        if (data[0] === ".") {
            // then the file contains a file path
            fs.writeFile('./kanji-image.txt', '', (err) => {
                if (err) console.error(err);
            });
            imageURL = data;
            imageReady = true;
        }
    });

}, 3000);



function initiateKanjiRequest() {
    console.log("initiating random number generator");
    fs.writeFile('./prng.txt', 'go', (err) => {
        if (err) console.error(err);
    });
}


app.get("/", (req, res) => {
    res.render('image', {imageURL: imageURL});
});

app.post("/generateNum", (req, res) => {
    imageReady = req.body.imageReady;
    initiateKanjiRequest();
    const waitLoop = setInterval(() => {
        console.log(imageReady);
        if (imageReady) {
            imageReady = false;
            clearInterval(waitLoop);
            // res.render('image', {imageURL: imageURL});
            res.send(imageURL);
        }
    console.log("end of FUNC");
    }, 100);
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});



















