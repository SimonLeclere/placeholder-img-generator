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

    var circles = [];
    var minRadius = 2;
    var maxRadius = 100;
    var totalCircles = 500;

    var createCircleAttempts = 500;

    function doesCircleHaveACollision(circle) {
        for(var i = 0; i < circles.length; i++) {
            var otherCircle = circles[i];
            var a = circle.radius + otherCircle.radius;
            var x = circle.x - otherCircle.x;
            var y = circle.y - otherCircle.y;

            if (a >= Math.sqrt((x*x) + (y*y))) {
                return true;
            }
        }

        if (circle.x + circle.radius >= width || circle.x - circle.radius <= 0) {
            return true;
        }

        if (circle.y + circle.radius >= height || circle.y-circle.radius <= 0) {
            return true;
        }

        return false;
    }

    function createAndDrawCircle() {

        var newCircle;
        var circleSafeToDraw = false;
        for(var tries = 0; tries < createCircleAttempts; tries++) {
            newCircle = {
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height),
                radius: minRadius
            }

            if(doesCircleHaveACollision(newCircle)) {
                continue;
            } else {
                circleSafeToDraw = true;
                break;
            }
        }

        if(!circleSafeToDraw) {
            return;
        }

        for(var radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
            newCircle.radius = radiusSize;
            if(doesCircleHaveACollision(newCircle)){
            newCircle.radius--
            break;
            } 
        }

        circles.push(newCircle);
        ctx.beginPath();
        ctx.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2*Math.PI);
        ctx.stroke(); 
    }

    for( var i = 0; i < totalCircles; i++ ) {  
        createAndDrawCircle();
    }


    return canvas.toBuffer()
}