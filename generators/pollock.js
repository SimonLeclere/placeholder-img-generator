const Canvas = require('canvas');
const Colors = require('nice-color-palettes');

function shade_color( color, percent ) {
    var f = parseInt( color.slice( 1 ),16 ),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return `#${( 0x1000000+( Math.round( ( t-R )*p )+R )*0x10000+( Math.round( ( t-G )*p )+G )*0x100+( Math.round( ( t-B )*p )+B ) ).toString( 16 ).slice( 1 )}`;
  }

module.exports = async (options) => {

    let width = options && options.width ? options.width : 1184;
	let height = options && options.height ? options.height : 506;
    
	let canvas = Canvas.createCanvas(width, height);
	let ctx = canvas.getContext('2d');

    var palette = Colors[Math.floor(Math.random() * Colors.length)];
  
    var color = palette[Math.floor(Math.random() * palette.length)];  
  
    ctx.strokeStyle = color;
    // ctx.fillStyle = '#fff';
    ctx.fillStyle = shade_color(color, 0.95);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    var start_position = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    },
    end_position = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    };

    ctx.lineCap='round';
    ctx.lineJoin='round';

    function make_splat(start, end, size){
        var center = {
            x: Math.floor(Math.random() * end.x) + start.x,
            y: Math.floor(Math.random() * end.y) + start.y
        },
        splat_count = Math.floor(Math.random() * 10) + 1;

        for (var i = 0; i <= splat_count; i++){
            ctx.beginPath();
            ctx.arc(
            center.x + Math.floor(Math.random() * 4),
            center.y + Math.floor(Math.random() * 4),
            Math.floor(Math.random() * 4),
            0,
            2*Math.PI);
            ctx.fill();        
        }
    }

    function make_line(start, end, size){
        if (!size){
            var speed = Math.floor(Math.random() * 100);

            if (speed < 2 ){
                size = Math.floor(Math.random() * 12)+8;
            }
            else if (speed < 4 ){
                size = Math.floor(Math.random() * 7)+6;
            }
            else if (speed < 7){
                size = Math.floor(Math.random() * 5)+4;
            }
            else if (speed < 10){
                size = Math.floor(Math.random() * 3) + 1;
            }
            else{
                size = 1;
            }
        };

        ctx.strokeStyle = shade_color(color, Math.floor(Math.random() * 100)+99);
        ctx.lineWidth = size;

        ctx.moveTo(start_position.x, start_position.y);

        if (Math.floor(Math.random() * 10) === 1){
            ctx.lineTo(end_position.x, end_position.y);
        }
        else{
            ctx.bezierCurveTo(start_position.x, start_position.y,
                            Math.floor(Math.random() * end_position.x) + start_position.x,
                            Math.floor(Math.random() * end_position.y) + start_position.y,
                            end_position.x, end_position.y);

        }
        ctx.stroke();
        make_splat(start_position, end_position);

    }

    var number_of_lines = Math.floor(Math.random() * 40) + 20

    for (var i = 0; i <= number_of_lines; i++){
        make_line(start_position.x, start_position.y);

        start_position.x = end_position.x;
        start_position.y = end_position.y;
        end_position = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };        
    }

    return canvas.toBuffer()
}