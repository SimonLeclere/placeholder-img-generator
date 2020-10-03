const Canvas = require('canvas');
const Colors = require('nice-color-palettes');

module.exports = async (options) => {

    let width = options && options.width ? options.width : 1184;
	let height = options && options.height ? options.height : 506;
	let color = options && options.color ? options.color : Colors[Math.floor(Math.random() * Colors.length)].map(color => color.substring(1))[Math.floor(Math.random() * 5)];
    
    let canvas = Canvas.createCanvas(width, height);
	let ctx = canvas.getContext('2d');

    ctx.fillStyle = `#${color}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas.toBuffer()

}