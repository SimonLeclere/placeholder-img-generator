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

    ctx.lineWidth = Math.floor(Math.random() * 4) + 1;
    ctx.fillStyle = `#${colors[0]}`;
    ctx.strokeStyle = `#${colors[1]}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var size = height;
    var squareSize = 40;
    var randomDisplacement = 15;
    var rotateMultiplier = 20;

    function draw(width, height) {
        ctx.beginPath();
        ctx.rect(-width/2, -height/2, width, height);
        ctx.stroke(); 
    }

    for( var i = squareSize; i <= width - squareSize; i += squareSize) {
        for( var j = squareSize; j <= height - squareSize; j+= squareSize ) {
            var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var rotateAmt = j / size * Math.PI / 180 * plusOrMinus * Math.random() * rotateMultiplier;

            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            var translateAmt = j / size * plusOrMinus * Math.random() * randomDisplacement;

            ctx.save();
            ctx.translate( i + translateAmt, j)
            ctx.rotate(rotateAmt);
            draw(squareSize, squareSize);
            ctx.restore();
        }
    }

    return canvas.toBuffer()

}