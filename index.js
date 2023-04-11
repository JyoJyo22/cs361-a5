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



let htmlTop = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Kanji</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
</head>
<body>
    <section class="header-nav">
        <header class="header-name">
            <h2 class="title" >Kanji Generator</h2>
        </header>
        <nav>
            <a href="index.html">
                <p>
                    Home
                </p>
            </a>
        </nav>
    </section>
    <main>
`

let htmlBottom = `
    </main>
</body>
</html>
`   


let imageURL = "";
let imageReady = false;


// clear files before starting
fs.writeFile('./prng.txt', '', (err) => {    
    if (err) console.error(err);
});

fs.writeFile('./kanji-image.txt', '', (err) => {    
    if (err) console.error(err);
});



setInterval(() => {
    fs.readFile('./prng.txt', 'utf8', (err, data) => {
        if (err) console.err(err);
        if (data !== "run" && data !== '') {          // if data is a random number
            fs.writeFile('./prng.txt', '', (err) => {      // clear this file
                if (err) console.error(err);
            });
            fs.writeFile('./kanji-image.txt', data, (err) => {      // write the randNum to kanji-image.txt 
                if (err) console.error(err);
            });
            console.log(data);
        }
    });
    fs.readFile('./kanji-image.txt', 'utf8', (err, data) => {
        if (err) console.error(err);
        if (data[0] === ".") {            // if data starts with a . then it contains a file image path
            fs.writeFile('./kanji-image.txt', '', (err) => {       // clear the file
                if (err) console.error(err);
            });
            imageURL = data;        // store the image path
            imageReady = true;      // set image to ready
        }
    });

}, 5000);


function kanjiRequest() {
    console.log("beginning a random number generator");
    fs.writeFile('./prng.txt', 'run', (err) => {
        if (err) console.error(err);
    });
};


app.post("/generateNum", async (req, res) => {
    // let imageReady = req.body.imageReady;
    // const kanji = req.body.kanji;
    kanjiRequest();
    const waitLoop = setInterval(() => {
        if (imageReady) {
            imageReady = false;
            clearInterval(waitLoop);

            console.log(imageURL);
            let image =  `
                ${htmlTop}
                    <h2> Here's Your Kanji: </h2>
                    <section class="response-section">
                        <article class="response-article">
                            <figure>
                                <img src=${imageURL}>
                            </figure>
                        </article>
                    </section>
                ${htmlBottom}
            `  
            res.send(image)
        };
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});



















