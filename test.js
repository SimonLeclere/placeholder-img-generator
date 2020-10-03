const fs = require('fs')
const generator = require('./index.js');

console.time();

generator.braids({width: 1184, height: 300}).then((buffer) => {

    console.timeEnd();

    fs.writeFile(`./test.png`, buffer, () => {
        console.log('finished generating!')
    });

})