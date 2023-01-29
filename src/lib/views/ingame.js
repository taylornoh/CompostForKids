import * as PIXI from 'pixi.js';
import FontFaceObserver from 'fontfaceobserver';
import { State, changeState } from '$lib/Game.js';
import * as Player from '$lib/entities/Player.js';

export let container;
export let score = 0;

export const init = async () => {
	container = new PIXI.Container();
	await PIXI.Assets.load('/images/ingame_background.png');
	const background = PIXI.Sprite.from('/images/ingame_background.png');
	container.addChild(background);
	await Player.init();
	container.addChild(Player.sprite);
	let font = new FontFaceObserver('Press Start 2P', {});
	await font.load();
	const style = new PIXI.TextStyle({
		fontFamily: 'Press Start 2P',
		fontSize: 16
	});
	const scoreText = new PIXI.Text('Score: 0', style);
	scoreText.x = 12;
	scoreText.y = 12;
	container.addChild(scoreText);
};

export const start = () => {
	Player.start();
};

export const stop = () => {
	Player.start();
};
