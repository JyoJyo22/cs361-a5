const fs = require('fs');

console.log('PRNG service listening to file: prng.txt');

function listenFile() {
    console.log('in PRNG.js');
    fs.readFile("./prng.txt", 'utf8', (err, data) => {     // read prng.txt
        if (err) console.err(err);
        if (data === "kanji") {
            let randNum = Math.floor(Math.random() * 5) + 1;    //    % 5
            randNum = randNum.toString();
            fs.writeFile("./prng.txt", randNum, (err) => {      // write a randNum to the file
                if (err) console.err(err);
            });
            console.log("Here is your randNum: ", randNum);
        }
    });
    return;
}


// check for 3 seconds
setInterval(() => {
    console.log("listening for PRNG file");
    listenFile();
}, 3000);