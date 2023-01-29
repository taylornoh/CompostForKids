import * as PIXI from 'pixi.js';
import Menu from '$lib/views/menu.js';
/* import InGame from '$lib/views/ingame.js' */
/* import Pause from '$lib/views/pause.js' */
/* import Player from '$lib/entities/player.js' */
/* import Item from '$lib/entities/item.js' */
/* import Bin from '$lib/entities/bin.js' */

//enum
export const State = {
	MENU: 0,
	IN_GAME: 1,
	PAUSE: 2
};

export let state = State.MENU;
export let app;

export const init = (canvas) => {
	app = new PIXI.Application({
		view: canvas,
		backgroundColor: 0x000000,
		width: 512,
		height: 512
	});

  const menu_screen = new Menu().container;
  const screens = [menu_screen];

	app.stage.addChild(menu_screen);
};

export const changeState = (newState) => {
	app.state.removeChild(screens[state]);
	app.state.addChild(screens[newState]);
};

// app.ticker.add((delta) => {
// 	elapsed += delta;
// });
