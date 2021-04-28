let soothing = [];
let common = [];
let selected = [];
let nested = [];

let circles = [];

let nestDrawn = false;

let colors = {
	black: "#505168",
	dark: "#597068",
	medium: "#73856F",
	light: "#A6BD85",
	white: "#E9EED2"
}

function preload() {
	soothing = loadStrings("comforting.txt");
	soothing.pop();
	common = loadStrings("common.txt");
	common.pop();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textAlign(CENTER, CENTER);
	textFont("Courier");
	textSize(14);

	createCircles();
	selectWords();

	playAudio();
}

function draw() {

	background(colors.light);

	if (!nestDrawn) {
		drawNest();
		loadPixels();
		set(get());
		updatePixels()
		nestDrawn = true;
	} else {
		updatePixels();
	}

	// for (i in circles) {
	// 	circles[i].display();
	// }

	if (nested.length == 0) {
		drawHint();
	}
	let buttonColor = "#777";
	buttonColor = buttonHover();
	drawButton(width / 4, height - 40, buttonColor);

	sortWords();
	drawWords();
	mouseOver();
}

function selectWords() {

	for (let i = 0; i < 5; i++) {
		newWord(random(soothing));
	}
	for (let i = 2; i < 300; i++) {
		newWord(random(common));
	}
}

function refreshWords() {

	circles = [];
	createCircles();
	selected = [];
	selectWords();
}

function newWord(word) {

	let x = random(width)/4 + width/8;
	let y = random(height)/2 + height/4;

	for (i in selected) {

		if (dist(x, y, selected[i].x, selected[i].y) < 45) {
			return;
		}
	}
	let inCircle = false;

	for (i in circles) {

		if (dist(x, y, circles[i].x, circles[i]. y) < circles[i].r/2) {
			inCircle = true;
		}
	}
	if (!inCircle) {
		return;
	}
	return selected.push(new Word(word, x, y));
}

function drawHint() {

	textStyle(NORMAL);
	fill(colors.white);
	text("drag and drop words\nto arrange your nest", width/4*3, height/2);
}

function drawButton(x, y, color) {

	let w = 150;
	let h = 40;

	textStyle(NORMAL);
	fill(color)
	noStroke();
	rect(x - w/2, y - h/2, w, h, 5);
	fill(colors.white);
	textSize(16);
	text("wander", x, y);
	textSize(14);
}

function buttonHover() {

	if (mouseX > width/4 - 150/2 && mouseX < width/4 + 150/2 && mouseY > height - 40 - 40/2 && mouseY < height - 40 + 40/2) {
		return colors.medium;
	} else {
		return colors.dark;
	}
}

function mouseClicked() {

	if (mouseX > width/4 - 150/2 && mouseX < width/4 + 150/2 && mouseY > height - 40 - 40/2 && mouseY < height - 40 + 40/2) {
		refreshWords();
	}
}

function sortWords() {

	for (i in selected) {

		let shift;

		if (selected[i].x > width/2) {
			shift = selected.splice(i, 1);
			nested.push(shift[0]);
		}
	}
	for (i in nested) {

		let shift;

		if (nested[i].x <= width/2) {
			shift = nested.splice(i, 1);
			selected.push(shift[0]);
		}
	}
}

function drawWords() {

	for (let i = 0; i < selected.length; i++) {
		selected[i].display();
	}
	for (let i = 0; i < nested.length; i++) {
		nested[i].display();
	}
}


function createCircles() {

	for (let i = 0; i < 10; i++) {
		circles.push(new Circle(random(width)/4 + width/8, random(height/2) + height/4, random(height/4)));
	}
}

function mouseOver() {

	for (i in selected) {

		if (selected[i].intersect(mouseX, mouseY)) {
			selected[i].highlight();
		} else {
			selected[i].lowlight();
		}
	}
	for (i in nested) {

		if (nested[i].intersect(mouseX, mouseY)) {
			nested[i].highlight();
		} else {
			nested[i].lowlight();
		}
	}
}

function mousePressed() {

	for (i in selected) {

		if (selected[i].intersect(mouseX, mouseY)) {
			selected[i].drag = true;
		} else {
			selected[i].drag = false;
		}
	}
	for (i in nested) {

		if (nested[i].intersect(mouseX, mouseY)) {
			nested[i].drag = true;
		} else {
			nested[i].drag = false;
		}
	}
}

function mouseReleased() {

	for (i in selected) {
		selected[i].drag = false;
	}
	for (i in nested) {
		nested[i].drag = false;
	}
}

function mouseDragged() {

	for (i in selected) {
		if (selected[i].drag) {
			selected[i].x = mouseX;
			selected[i].y = mouseY;
		}
	}
	for (i in nested) {
		if (nested[i].drag) {
			nested[i].x = mouseX;
			nested[i].y = mouseY;
		}
	}
}

function drawNest() {

	drawLines(colors.black);
	drawLines(colors.dark);
	drawLines(colors.medium);
	drawLines(colors.white);
	drawLines(colors.light);
	drawLines(colors.light);
	drawLines(colors.light);
	drawLines(colors.light);
	drawLines(colors.light);
}

function drawLines(color) {

	let pad = 20;

	for (let i = 0; i < 500; i++) {
		stroke(color);
		line(random(width/2 + 20, width - pad), random(pad, height - pad), random(width/2 + 20, width - pad), random(pad, height - pad));
	}
}

function playAudio() {

	var audio = new Audio("susurration.ogg");
	audio.loop = true;
	audio.play();
}
