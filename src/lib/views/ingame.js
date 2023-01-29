import * as PIXI from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import { State, changeState } from '$lib/Game.js';
import * as Player from '$lib/entities/Player.js';
import * as Item from '$lib/entities/Item.js';

export let container;
export let score = 0;

let style;
let scoreText;

export const updateScore = (newScore) => {
	score = newScore;
	localStorage.setItem('score', newScore);
	scoreText.text = 'Score: ' + newScore;
};

export const init = async () => {
	let store = localStorage.getItem('score');
	if (store) score = parseInt(store);
	else store = 0;
	container = new PIXI.Container();
	await PIXI.Assets.load('/images/ingame_background.png');
	const background = PIXI.Sprite.from('/images/ingame_background.png');
	container.addChild(background);
	await Player.init();
	Item.init();
	container.addChild(Player.sprite);
	let font = new FontFaceObserver('Press Start 2P', {});
	await font.load();
	style = new PIXI.TextStyle({
		fontFamily: 'Press Start 2P',
		fontSize: 16
	});
	scoreText = new PIXI.Text('Score: ' + score, style);
	scoreText.x = 12;
	scoreText.y = 12;
	container.addChild(scoreText);
};

export const start = () => {
	Player.start();
	for (let i = 0; i < 10; i++) {
		Item.generateItem();
	}
};

export const stop = () => {
	Player.start();
};
