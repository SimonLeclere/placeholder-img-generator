const Canvas = require('canvas');

module.exports = async (options) => {

    let width = options && options.width ? options.width : 1184;
    let height = options && options.height ? options.height : 506;
    
    let canvas = Canvas.createCanvas(width, height);
    let ctx = canvas.getContext('2d');
    

    var yPositions = Array(300).join(0).split('');
    
    for(let i=0;i<height/5;i++) {
        ctx.fillStyle = 'rgba(0,0,0,.05)';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#0f0';
        ctx.font = '10px Georgia';
        yPositions.map(function(y, index){
            text = String.fromCharCode(1e2 + Math.random() * 33);
            x = (index * 10) + 10;
            ctx.fillText(text, x, y);
            if (y > 100 + Math.random() * 1e4) {
                yPositions[index] = 0;
            } else {
                yPositions[index] = y + 10;
            }
        })
    }

    return canvas.toBuffer()
}