const fs = require('fs');

console.log('PRNG service listening in file: prng.txt');

function listenFile() {
    fs.readFile("./prng.txt", 'utf8', (err, data) => {
        if (err) console.err(err);
        if (data === "go") {
            let randNum = Math.floor(Math.random() * 5) + 1;
            randNum = randNum.toString();
            fs.writeFile("./prng.txt", randNum, (err) => {
                if (err) console.err(err);
            });
            console.log("Here is your randNum: ", randNum);
        }
    });
    return;
}


// check for 3 seconds
setInterval(() => {
    listenFile();
}, 3000);