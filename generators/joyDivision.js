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
  
    var step = Math.floor(Math.random() * 12) + 8;
    var startStep = 40;
    var lines = [];
  
    // Create the lines
    for( var i = step; i <= height - step; i += step) {
  
      var line = [];
      for( var j = startStep; j <= height - step; j+= step ) {
        var distanceToCenter = Math.abs(j - height / 2);
        var variance = Math.max(height / 2 - 50 - distanceToCenter, 0);
        
        var random = Math.random() * variance / 2 * -1;
        var point = {x: j+width/2-height/2, y: i + random};
        line.push(point)
      } 
      lines.push(line);
    }
  
    // Do the drawing
    for(var i = step; i < lines.length; i++) {
  
      ctx.beginPath();
      ctx.moveTo(lines[i][0].x, lines[i][0].y)
      for( var j = 0; j < lines[i].length - 2; j++) {
        var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
        var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
        ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
      }
  
      ctx.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
      ctx.fill();
  
      ctx.stroke();
    }
  
    
    return canvas.toBuffer();
}