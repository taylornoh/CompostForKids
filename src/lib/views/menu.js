import * as PIXI from 'pixi.js';
import { State, changeState } from '$lib/Game.js';
import { sound } from '@pixi/sound';

export let container;

export const init = async () => {
	// Menu container
	container = new PIXI.Container();

	// background
	await PIXI.Assets.load('/images/menu_background.png');
	const background = PIXI.Sprite.from('/images/menu_background.png');
	background.x = 512 / 2 - background.width / 2;
	background.y = 512 / 2 - background.height / 2;
	container.addChild(background);

	// Start button
	await PIXI.Assets.load('/images/menu_start_button.png');
	const button = PIXI.Sprite.from('/images/menu_start_button.png');
	button.interactive = true;
	button.x = background.width / 2 - button.width / 2;
	button.y = background.height / 2 - button.height / 2;
	background.addChild(button);

	// Start button click sound
	sound.add('click', '/sounds/click.wav');

	// Start button click event
	button.on('pointerdown', (e) => {
		sound.play('click');
		changeState(State.IN_GAME);
	});
};
