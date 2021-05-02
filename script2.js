var data = [];

var m = 0;
var b = 0;

function setup() {
	createCanvas(600, 600);
}

function gradientDescent() {
	var learning_rate = document.getElementById("learningrate").value / 100;

	for (var i = 0; i < data.length; i ++) {
		var x = data[i].x;
		var y = data[i].y;

		var guess = m * x + b;

		var error = y - guess;

		m += (error * x) * learning_rate;
		b += (error) * learning_rate;
	}
	
	document.getElementById("equation").innerHTML = "Regression Equation: y = "+m+" * x + "+b*600;
}

function drawLine() {
	var x1 = 0;
	var y1 = m * x1 + b;
	var x2 = 1;
	var y2 = m * x2 + b;

	x1 = map(x1, 0, 1, 0, width);
	y1 = map(y1, 0, 1, height, 0);
	x2 = map(x2, 0, 1, 0, width);
	y2 = map(y2, 0, 1, height, 0);

	stroke(0);
	strokeWeight(2);
	line(x1, y1, x2, y2);
}

function mousePressed() {
	var x = map(mouseX, 0, width, 0, 1);
	var y = map(mouseY, 0, height, 1, 0);
	var point = createVector(x, y);
	data.push(point);
}

function keyPressed() {
	if (keyCode === 27) {
		data = [];
		m = 0;
		b = 0;
		document.getElementById("equation").innerHTML = "Regression Equation: y = m * x + b";
	}
}

function draw() {
	background(100);

	for (var i = 0; i < width; i += 20) {
		stroke(0);
		strokeWeight(2);
		line(0, i, 5, i);
		line(i, height, i, height - 5);
	}

	for (var i = 0; i < data.length; i++) {
		var x = map(data[i].x, 0, 1, 0, width);
		var y = map(data[i].y, 0, 1, height, 0);
		fill(0);
		ellipse(x, y, 5, 5);
	}

	if (data.length > 0) {
		gradientDescent();
		drawLine();
	}
}