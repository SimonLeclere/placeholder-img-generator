const Canvas = require('canvas');
const Colors = require('nice-color-palettes');

module.exports = async (options) => {

    let width = options && options.width ? options.width : 1184;
	let height = options && options.height ? options.height : 506;
    //let colors = options && options.colors ? options.colors : Colors[Math.floor(Math.random() * Colors.length)];
    
	let canvas = Canvas.createCanvas(width, height);
	let ctx = canvas.getContext('2d');

    function gradient(color0, color2){
        fillColor = ctx.createLinearGradient(0, 0, width, height);
        fillColor.addColorStop(0, color0);	//starting corner
        fillColor.addColorStop(1, color2);	//ending Corner
        ctx.fillStyle=fillColor;
    }
    
    var colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];
    
    //chose a number between 0 and 7
    var randomNumber = Math.floor(Math.random()*colors.length);
    var randomNumber2 = Math.floor(Math.random()*colors.length);
    
        //when the 2 random Numbers equal the same it creates another randomNumber2
    if (randomNumber === randomNumber2) {
        randomNumber2 = randomNumber+1;
    }else if(randomNumber === 7 && randomNumber2 === 7){
        randomNumber2 = randomNumber-1;
    };
    
    gradient(colors[randomNumber], colors[randomNumber2]);
    ctx.fillRect(0, 0, width, height);

    return canvas.toBuffer()
}