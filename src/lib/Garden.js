import * as PIXI from 'pixi.js';

export let app;

const HEIGHT = 256;
const WIDTH = 512;

const PLANT_SPACING = 25;

const DIRT_HEIGHT = 25;
const GRASS_HEIGHT = 5;

const STEM_THICKNESS = 7;
const FLOWER_SIZE = 20;
const INNER_FLOWER_SIZE = 10;

const GROUND_LEVEL = HEIGHT - DIRT_HEIGHT - GRASS_HEIGHT;

let scoreLeft;
let num_plants;
let drawer;

const stems = [];

function normal() {
	let u = 0,
		v = 0;
	while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
	while (v === 0) v = Math.random();
	let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
	num = num / 10.0 + 0.5; // Translate to 0 -> 1
	if (num > 1 || num < 0) return normal(); // resample between 0 and 1
	return num;
}

const Q = [];

let curr;
const grow = (point) => {
	while (Q.length > 0) {
		// base case
		if (scoreLeft <= 0) break;
		point = Q.pop(0);
		point.x = Math.min(Math.max(0, point.x), WIDTH);
		console.log('Point', point);
		drawer.drawRect(point.x, point.y, STEM_THICKNESS, STEM_THICKNESS);
		scoreLeft--;
		if (point.y < HEIGHT / 3 && scoreLeft > 20 && Math.random() > 0.8) {
			console.log('pickPoint');
			pickPoint();
		}
		if (Math.random() < 1 - Math.abs(point.bias / 4)) {
			console.log('Up Stem');
			let newBias = point.bias + normal() * 2 - 1;
			Q.push({ x: point.x, y: point.y - 5, bias: newBias });
		}
		if (Math.random() < 0.2 + Math.min(point.bias / 4, 0.25)) {
			console.log('Left Branch');
			let newBias = point.bias + normal() * 5 - 3;
			Q.push({ x: point.x - 5 + newBias, y: point.y, bias: newBias });
		}
		if (Math.random() < 0.2 + Math.min(point.bias / 4, 0.25)) {
			console.log('Right Branch');
			let newBias = point.bias + normal() * 5 - 2;
			Q.push({ x: point.x + 5 + newBias, y: point.y, bias: newBias });
		}
		if (Math.abs(point.bias) > Math.random() * 10 + 5) {
			console.log('Leaf');
			drawer.drawRect(point.x, point.y, STEM_THICKNESS * 3, STEM_THICKNESS * 2);
			scoreLeft--;
			continue;
		}
		if (point.y < HEIGHT / 2 && Math.random() > 0.95) {
			console.log('Flower');
			drawer.beginFill(Math.round(0xffffff * Math.random()));
			drawer.drawCircle(point.x, point.y, Math.floor(Math.random() * FLOWER_SIZE + 10));
			drawer.beginFill(Math.round(0xffffff * Math.random()));
			drawer.drawCircle(point.x, point.y, Math.floor(Math.random() * INNER_FLOWER_SIZE + 3));
			drawer.beginFill(0x35b31e);
			scoreLeft--;
			continue;
		}
	}
};

const pickPoint = () => {
	console.log('pickPoint');
	let rx;
	for (let i = 0; i < 20; i++) {
		rx = Math.max(Math.min(Math.floor(normal() * WIDTH), WIDTH - 10), 5);
		let good = true;
		console.log('Stems:', stems.length);
		for (let stem of stems) {
			if (Math.abs(rx - stem) < PLANT_SPACING) {
				good = false;
				break;
			}
		}
		if (good) break;
	}
	stems.push(rx);
	drawer.beginFill(0x35b31e);
	Q.push({ x: rx, y: GROUND_LEVEL - 1, bias: 0 });
};

const createGround = () => {
	const dirt = new PIXI.Graphics();
	dirt.beginFill(0x755416);
	dirt.drawRect(0, HEIGHT - DIRT_HEIGHT, WIDTH, DIRT_HEIGHT);
	const grass = new PIXI.Graphics();
	grass.beginFill(0x74c965);
	grass.drawRect(0, HEIGHT - DIRT_HEIGHT - GRASS_HEIGHT, WIDTH, GRASS_HEIGHT);

	app.stage.addChild(grass);
	app.stage.addChild(dirt);
};

export const init = async (canvas) => {
	app = new PIXI.Application({
		view: canvas,
		backgroundColor: 0xc9ddff,
		width: WIDTH,
		height: HEIGHT
	});

	drawer = new PIXI.Graphics();
	app.stage.addChild(drawer);

	// Get initial scoreLeft
	scoreLeft = localStorage.getItem('score');
	if (!scoreLeft) scoreLeft = 0;
	else scoreLeft = parseInt(scoreLeft) * 5;

	console.log('score:', scoreLeft);

	// Create dirt and grass
	createGround();

	for (let i = 0; scoreLeft > 10 && i < 5; i++) {
		console.log('grow');
		pickPoint();
		grow();
	}
};
