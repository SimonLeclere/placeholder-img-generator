const Canvas = require('canvas');
const Colors = require('nice-color-palettes');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

module.exports = async (options) => {

    let width = options && options.width ? options.width : 1184;
    let height = options && options.height ? options.height : 506;
    let colors = options && options.colors ? options.colors : shuffle(Colors[Math.floor(Math.random() * Colors.length)].map(color => color.substring(1)));
    
    let canvas = Canvas.createCanvas(width, height);
    let ctx = canvas.getContext('2d');

    ctx.lineWidth = Math.floor(Math.random() * 4) + 2;
    ctx.fillStyle = `#${colors[0]}`;
    ctx.strokeStyle = `#${colors[4]}`;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var finalSize = 3;
    var startSteps;
    var offset = 2;
    var tileStep = (width - offset * 2) / 15;
    var startSize = tileStep;
    var directions = [-1, 0, 1];

    function draw(x, y, width, height, xMovement, yMovement, steps) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
            
        if(steps >= 0) {
            var newSize = (startSize) * (steps / startSteps) + finalSize;
            var newX = x + (width - newSize) / 2
            var newY = y + (height - newSize) / 2
            newX = newX - ((x - newX) / (steps + 2)) * xMovement
            newY = newY - ((y - newY) / (steps + 2)) * yMovement
            draw(newX, newY, newSize, newSize, xMovement, yMovement, steps - 1);
        }
    }

    for( var x = offset; x < width - offset; x += tileStep) {
        for( var y = offset; y < width - offset; y += tileStep) {
            startSteps = 2 + Math.ceil(Math.random() * 3)
            var xDirection = directions[Math.floor(Math.random() * directions.length)]
            var yDirection = directions[Math.floor(Math.random() * directions.length)]
            draw(x, y, startSize, startSize, xDirection, yDirection, startSteps - 1);
        }
    }

    
    return canvas.toBuffer();
}