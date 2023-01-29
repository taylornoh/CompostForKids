import * as PIXI from 'pixi.js';
import * as Menu from '$lib/views/menu.js';
import * as InGame from '$lib/views/ingame.js';
import * as Input from '$lib/input.js';

//enum
export const State = {
	MENU: 0,
	IN_GAME: 1,
	PAUSE: 2
};

export let state;
export let app;
let screens;

export const init = async (canvas) => {
	app = new PIXI.Application({
		view: canvas,
		backgroundColor: 0x000000,
		width: 512,
		height: 512
	});

	Input.init();

	state = State.MENU;
	await Menu.init();
	await InGame.init();
	screens = [Menu, InGame, Menu];

	app.stage.addChild(screens[state].container);
};

export const changeState = (newState) => {
	let before = screens[state];
	let after = screens[newState];
	before.stop && before.stop();
	app.stage.removeChild(before.container);
	after.start && after.start();
	app.stage.addChild(after.container);
};
