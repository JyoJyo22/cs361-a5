const fs = require('fs');

console.log('Kanji image service listening in file: kanji-image.txt');

function listenFile() {
    fs.readFile("./kanji-image.txt", 'utf8', (err, data) => {
        if (err) console.err(err);
        if (data !== "") {           // if the file is not empty
            const kanjiLink = './images/kanji' + data + '.png';
            fs.writeFile("./kanji-image.txt", kanjiLink, (err) => {     // write the kanjiLink to this file
                if (err) console.err(err);
            });
            console.log("Here is your kanji link: ", kanjiLink);
        }
    });
    return;
}

// check for 3 seconds
setInterval(() => {
    listenFile();
}, 3000);