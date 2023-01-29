import * as PIXI from 'pixi.js';

export default class Menu {
	constructor() {
		this.container = new PIXI.Container();
		this.background = PIXI.Sprite.from('images/menu_background.png');
		this.background.x = 512 / 2 - this.background.width / 2;
		this.background.y = 512 / 2 - this.background.height / 2;
		this.container.addChild(this.background);
		this.button = PIXI.Sprite.from('images/start.png');
		this.background.addChild(this.button);
		this.button.width *= 3;
		this.button.height *= 3;
		this.button.x = this.background.width / 2 - this.button.width / 2;
		this.button.y = this.background.height / 2 - this.button.height / 2;
	}
}
