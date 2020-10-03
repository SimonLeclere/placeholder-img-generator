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

	let step = Math.floor(Math.random() * 11) + 15;

	function draw(x, y, width, height) {
		let leftToRight = Math.random() >= 0.5;

		if( leftToRight ) {
			ctx.moveTo(x, y);
			ctx.lineTo(x + width, y + height);    
		} else {
			ctx.moveTo(x + width, y);
			ctx.lineTo(x, y + height);
		}

		ctx.stroke();
	}

	for( var x = 0; x < width; x += step) {
		for( var y = 0; y < height; y+= step ) {
			draw(x, y, step, step);
		}
	}


	return canvas.toBuffer();
}