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
    <title>Joseph Houghton</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
</head>
<body>
    <section class="header-nav">
    <header class="header-name">
        <h2 class="name-en">CONFIRMATION</h2>
        <h3 class="name-ja" lang="ja">コンフルメーション</h3>
    </header>
    <nav>
        <a href="index.html">Home</a>
        <a href="contact.html">Contact</a>
        <a href="gallery.html">Projects</a>
        <a href="order.html">Products</a>
    </nav>
    </section>
    <main>
`

let htmlBottom = `
    </main>
    <footer>
        <p class="footer-p">
            &copy; JOSEPH HOUGHTON 2023
        </p>
    </footer>
</body>
</html>
`   


let imageURL = "../images/kanji.png";
let imageReady = false;


fs.writeFile('./prng.txt', '', (err) => {     // clear files at the beginning
    if (err) console.error(err);
});

fs.writeFile('./kanji-image.txt', '', (err) => {    // clear files at the beginning
    if (err) console.error(err);
});



setInterval(() => {
    fs.readFile('./prng.txt', 'utf8', (err, data) => {
        if (err) console.err(err);
        if (data !== "kanji" && data !== '') {       // if data is a random number
            //then there is a number in the file
            fs.writeFile('./prng.txt', '', (err) => {    // clear this file
                if (err) console.error(err);
            });
            console.log(data);
            fs.writeFile('./kanji-image.txt', data, (err) => {    // write the randNum to kanji-image
                if (err) console.error(err);
            });
            console.log(data);
        }
    });
    fs.readFile('./kanji-image.txt', 'utf8', (err, data) => {
        if (err) console.error(err);
        if (data[0] === ".") {
            // then the file contains an image path
            fs.writeFile('./kanji-image.txt', '', (err) => {     // clear the file
                if (err) console.error(err);
            });
            imageURL = data;     // store the image path
            imageReady = true;   // set image to ready
        }
    });

}, 3000);


function kanjiRequest() {
    console.log("initiating random number generator");
    fs.writeFile('./prng.txt', 'kanji', (err) => {
        if (err) console.error(err);
    });
};


// app.get("/", (req, res) => {
//     // res.render('image', {imageURL: imageURL});
//     res.send(`
//     <figure>
//         <img src=${imageURL}>
//         <figcaption>
//             Kanji Kanji Kanji
//         </figcaption>
//     </figure>   
//     `)
// });

app.post("/generateNum", async (req, res) => {
    // let imageReady = req.body.imageReady;
    // const kanji = req.body.kanji;
    kanjiRequest();
    const waitLoop = setInterval(() => {
        console.log(imageReady);
        if (imageReady) {
            imageReady = false;
            clearInterval(waitLoop);
            // res.render('image', {imageURL: imageURL});
       
        // setInterval(() => {
        //     // do nothing, sleep for 10 seconds
        // }, 10000);
            console.log(imageURL);
            let image =  `
                ${htmlTop}
                    <h2> Here's Your Kanji: </h2>
                    <section class="response-section">
                        <article class="response-article">
                            <figure>
                                <img src=${imageURL}>
                                <figcaption>
                                    Kanji Kanji Kanji
                                </figcaption>
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



















