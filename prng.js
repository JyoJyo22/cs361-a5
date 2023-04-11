const fs = require('fs');

console.log('PRNG service active');

function listenFile() {
    console.log('in PRNG.js');
    fs.readFile("./prng.txt", 'utf8', (err, data) => {         // read prng.txt
        if (err) console.err(err);
        if (data === "run") {
            let randNum = (Math.floor(Math.random() * 6)) + 1;     //  generate randNum btw 1 and 6
            randNum = randNum.toString();
            fs.writeFile("./prng.txt", randNum, (err) => {      // write a randNum to the file
                if (err) console.err(err);
            });
            console.log("Here is your random number: ", randNum);
        }
    });
    return;
}


setInterval(() => {
    listenFile();
}, 5000);