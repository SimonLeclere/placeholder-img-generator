const Canvas = require('canvas');

module.exports = async (options) => {

    let width = options && options.width ? options.width : 1184;
    let height = options && options.height ? options.height : 506;
    let opacity = options && options.opacity ? options.opacity : .4;
    
    let canvas = Canvas.createCanvas(width, height);
    let ctx = canvas.getContext('2d');
    
    let number;
    
    for ( x = 0; x < canvas.width; x++ ) {
        for ( y = 0; y < canvas.height; y++ ) {
            number = Math.floor( Math.random() * 60 );
    
            ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
            ctx.fillRect(x, y, 1, 1);
        }
    }
    
    return canvas.toBuffer()
}