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
    ctx.lineCap = 'round';
  
    var step = Math.floor(Math.random() * 25) + 15;;
    var aThirdOfHeight = height/3;
  
    function draw(x, y, width, height, positions) {
      ctx.save();
      ctx.translate(x + width/2, y + height/2)
      ctx.rotate(Math.random() * 5);
      ctx.translate(-width/2, -height/2)
  
      for(var i = 0; i <= positions.length; i++) {
        ctx.beginPath();
        ctx.moveTo(positions[i] * width, 0);
        ctx.lineTo(positions[i] * width, height);
        ctx.stroke();
      }
  
      ctx.restore();
    }
  
    for( var y = step; y < width - step; y += step) {
      for( var x = step; x < width - step; x+= step ) {
        if( y < aThirdOfHeight) {
          draw(x, y, step, step, [0.5]);   
        } else if ( y < aThirdOfHeight * 2) {
          draw(x, y, step, step, [0.2, 0.8]);      
        } else {
          draw(x, y, step, step, [0.1, 0.5, 0.9]);      
        }
      }
    }
  

    return canvas.toBuffer();

}
  