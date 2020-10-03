const fs = require('fs')
const generator = require('./index.js');

console.time();

generator.hypnoticSquares({width: 1184, height: 300}).then((buffer) => {

    console.timeEnd();

    fs.writeFile(`./examples images/hypnoticSquares.png`, buffer, () => {
        console.log('finished generating!')
    });

})