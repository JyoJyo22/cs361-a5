const fs = require('fs');

console.log('Kanji image service listening in file: kanji-image.txt');

function listenFile() {
    fs.readFile("./kanji-image.txt", 'utf8', (err, data) => {
        if (err) console.err(err);
        if (data !== "") {
            const kanjiLink = './images/' + data + '.png';
            fs.writeFile("./kanji-image.txt", kanjiLink, (err) => {
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