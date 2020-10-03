const Canvas = require('canvas');


module.exports = async (options) => {

    let width = options && options.width ? options.width : 1184;
    let height = options && options.height ? options.height : 506;
	let bgColor = options && options.bgColor ? options.bgColor : '#000000'
	let crossingProbability = options && options.crossingProbability ? options.crossingProbability : 0.67;
	let stringThickness = options && options.stringThickness ? options.stringThickness : 12

	let canvas = Canvas.createCanvas(width, height);
    let context = canvas.getContext('2d');

	var rowHeight;
	var stringSpacing;
	var margin;
	var numStrings;
	var positiveProbability;
	var crossingAngle;
	var controlYFactor;
	var generatorsInLastRow;
	var colors;
	var gradDX, gradDY;
	
	init();
	
	function init() {
		rowHeight = 52;
		stringSpacing = 32;
		numStrings = 1 + Math.floor((width-stringThickness)/stringSpacing);
		margin = (width - (numStrings-1)*stringSpacing)/2;
		positiveProbability = 0.5;
		spacerGap = 0.5;
		
		crossingAngle = 42*Math.PI/180;
		controlYFactor = (1 - stringSpacing/rowHeight*Math.tan(crossingAngle));
		
		/*
		controlYFactor = 0.5;
		crossingAngle = Math.atan(rowHeight*(1-controlYFactor)/stringSpacing);
		*/
		
		var gradDist = 2*stringThickness;
		gradDX = gradDist*Math.cos(crossingAngle);
		gradDY = gradDist*Math.sin(crossingAngle);
		
		context.fillStyle = bgColor;
		context.fillRect(0,0,width,height);		
		
		setInitialColors();
		
		//initialize generatorsInLastRow - an array which records which braid generators appeared in the previous row.
		//I want to know this in order to avoid a braid crossing followed by its inverse.
		generatorsInLastRow = [];
		for (var k = 0; k < numStrings-1; k++) {
			generatorsInLastRow.push(0);
		}
		
		//timer = setInterval(onTimer,1000/10);
		var i = Math.floor(height/rowHeight);
		while (--i > -2) {
			fillRow((i+1)*rowHeight);	
		}
		
	}
	
	function fillRow(y0) {
		var stringNumber = 0;
		var x0;
		var temp;
		var positiveSwitch;
		var doPositive;
		var prob = 0.5; //first crossing probability at 50%, rest will be set to desired crossingProbability set above.
		while (stringNumber < numStrings - 1) {
			x0 = margin + stringNumber*stringSpacing;
			if (Math.random() < prob) {
				positiveSwitch = (Math.random() < positiveProbability);
				doPositive = (positiveSwitch && (generatorsInLastRow[stringNumber] != -1)) ||
							  ((!positiveSwitch) && (generatorsInLastRow[stringNumber] == 1));
				if (doPositive) {
					drawCrossing(x0, y0, colors[stringNumber], colors[stringNumber+1], true);
					generatorsInLastRow[stringNumber] = 1;
					generatorsInLastRow[stringNumber+1] = 0;
				}
				else {
					drawCrossing(x0, y0, colors[stringNumber], colors[stringNumber+1], false);
					generatorsInLastRow[stringNumber] = -1;
					generatorsInLastRow[stringNumber+1] = 0;
				}
				//permute colors
				temp = colors[stringNumber];
				colors[stringNumber] = colors[stringNumber+1];
				colors[stringNumber+1] = temp;
				
				//advance
				stringNumber += 2;
			}
			else {
				drawString(x0, y0, colors[stringNumber]);
				stringNumber += 1;
			}
		}
		if (stringNumber == numStrings - 1) {
			drawString(margin + stringNumber*stringSpacing, y0, colors[stringNumber]);
		}
		
		//after first crossing probability of 50%, remaining crossing probabilities set to desired amount.
		prob = crossingProbability;
		
	}
	
	function setInitialColors() {
		var i;
		var r,g,b;
		var darkR, darkG, darkB;
		var lightR, lightG, lightB;
		
		colors = [];
		
		var darkFactor = 0.33;
		var lightAdd = 20;

		
		for (i = 0; i < numStrings; i++) {
			r = 64+Math.floor(Math.random()*180);
			g = 64+Math.floor(Math.random()*180);
			b = 64+Math.floor(Math.random()*180);
						
			darkR = Math.floor(darkFactor*r);
			darkG = Math.floor(darkFactor*g);
			darkB = Math.floor(darkFactor*b);
			
			lightR = Math.min(Math.floor(r + lightAdd),255);
			lightG = Math.min(Math.floor(g + lightAdd),255);
			lightB = Math.min(Math.floor(b + lightAdd),255);
			
			var colorObj = {
				base: "rgb("+r+","+g+","+b+")",
				dark: "rgb("+darkR+","+darkG+","+darkB+")",
				light: "rgb("+lightR+","+lightG+","+lightB+")"
			}
			colors.push(colorObj);
		}
		
	}
	
	function drawString(x0,y0,color) {
		context.strokeStyle = color.base;
		context.lineWidth = stringThickness;
		context.lineCap = "butt";
		context.beginPath();
		context.moveTo(x0,y0);
		context.lineTo(x0,y0+rowHeight);
		context.stroke();
	}
	
	function drawCrossing(x0,y0,color1,color2,positive) {
		var grad;	
		var midX = x0 + stringSpacing/2;
		var midY = y0 + rowHeight/2;
		context.lineCap = "butt";
		if (positive) {
			grad = context.createLinearGradient(midX+gradDX, midY-gradDY, midX-gradDX, midY+gradDY);
			grad.addColorStop(0, color1.base);
			grad.addColorStop(0.5, color1.dark);
			grad.addColorStop(1, color1.base);
			context.strokeStyle = grad;
			drawLine1();
			
			//drawSpacer2();
			
			grad = context.createLinearGradient(midX+gradDX, midY+gradDY, midX-gradDX, midY-gradDY);
			grad.addColorStop(0, color2.base);
			grad.addColorStop(0.5, color2.light);
			grad.addColorStop(1, color2.base);
			context.strokeStyle = grad;
			drawLine2();
		}
		else {
			grad = context.createLinearGradient(midX+gradDX, midY+gradDY, midX-gradDX, midY-gradDY);
			grad.addColorStop(0, color2.base);
			grad.addColorStop(0.5, color2.dark);
			grad.addColorStop(1, color2.base);
			context.strokeStyle = grad;
			drawLine2();
			
			//drawSpacer1();
			
			grad = context.createLinearGradient(midX+gradDX, midY-gradDY, midX-gradDX, midY+gradDY);
			grad.addColorStop(0, color1.base);
			grad.addColorStop(0.5, color1.light);
			grad.addColorStop(1, color1.base);
			context.strokeStyle = grad;
			drawLine1();
		}
		
		function drawLine1() {
			context.lineWidth = stringThickness;
			context.beginPath();
			context.moveTo(x0+stringSpacing,y0);
			context.bezierCurveTo(x0+stringSpacing, y0+rowHeight*controlYFactor, 
									x0, y0+rowHeight*(1-controlYFactor), 
									x0, y0+rowHeight);
			context.stroke();
		}
		
		function drawLine2() {
			context.lineWidth = stringThickness;
			context.beginPath();
			context.moveTo(x0,y0);
			context.bezierCurveTo(x0, y0+rowHeight*controlYFactor, 
									x0+stringSpacing, y0+rowHeight*(1-controlYFactor), 
									x0+stringSpacing, y0+rowHeight);
			context.stroke();
		}
    }
    
    return canvas.toBuffer()


}