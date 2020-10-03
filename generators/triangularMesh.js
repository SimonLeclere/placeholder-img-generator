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
    let gap = options && options.gap ? options.gap : width / Math.floor(Math.random() * 20) + 10;
	let colors = options && options.colors ? options.colors : shuffle(Colors[Math.floor(Math.random() * Colors.length)].map(color => color.substring(1)));
	let canvas = Canvas.createCanvas(width, height);
	let ctx = canvas.getContext('2d');
  
    ctx.lineWidth = 1;
    ctx.fillStyle = `#${colors[0]}`;
    ctx.strokeStyle = `#${colors[1]}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    var line, dot,
        odd = false, 
        lines = [];
  
    for (var y = -2 * gap / 2; y <= 2 * height; y+= gap) {
      odd = !odd
      line = []
      for (var x = -2 * gap / 4; x <= 2 * width; x+= gap) {
        line.push({
          x: x + (Math.random()*.8 - .4) * gap  + (odd ? gap/2 : 0),
          y: y + (Math.random()*.8 - .4) * gap,
        })
      }
      lines.push(line)
    }
  
    function drawTriangle(pointA, pointB, pointC) {
      ctx.beginPath();
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.lineTo(pointC.x, pointC.y);
      ctx.lineTo(pointA.x, pointA.y);
      ctx.closePath();
      ctx.fillStyle = '#' + colors[Math.floor(Math.random()*colors.length)]; ; 
      ctx.fill();
      ctx.stroke();
    }
  
    var dotLine;
    odd = true;
  
    for (var y = 0; y < lines.length - 1; y++) {
      odd = !odd
      dotLine = []
      for (var i = 0; i < lines[y].length; i++) {
        dotLine.push(odd ? lines[y][i]   : lines[y+1][i])
        dotLine.push(odd ? lines[y+1][i] : lines[y][i])
      }
      for (var i = 0; i < dotLine.length - 2; i++) {
        drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2])
      }
    }
  

    return canvas.toBuffer();

}