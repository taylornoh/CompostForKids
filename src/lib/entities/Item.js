import * as PIXI from 'pixi.js';
import * as InGame from '$lib/views/ingame.js';

const trash_imgs = [
	'/images/trash/battery.png',
	'/images/trash/diaper.png',
	'/images/trash/plastic_bag.png',
	'/images/trash/plastic_bag_2.png',
	'/images/trash/straw.png',
	'/images/trash/styrofoam_cup.png',
	'/images/trash/tv.png'
];
const compost_imgs = [
	'/images/compost/apple.png',
	'/images/compost/banana.png',
	'/images/compost/bread.png',
	'/images/compost/bread_2.png',
	'/images/compost/cucumber.png',
	'/images/compost/eggs.png',
	'/images/compost/leaves.png',
	'/images/compost/orange.png',
	'/images/compost/potato.png',
	'/images/compost/strawberry.png',
	'/images/compost/tea_bag.png'
];

const recycle_imgs = [
	'/images/recycle/aluminum_can.png',
	'/images/recycle/bottle.png',
	'/images/recycle/glass_jar.png',
	'/images/recycle/milk.png',
	'/images/recycle/paper_box.png',
	'/images/recycle/paper_plate.png',
	'/images/recycle/paper_towels.png',
	'/images/recycle/takeout_box.png',
	'/images/recycle/toilet_paper.png',
	'/images/recycle/water_bottle.png'
];

export let item_container;

export const init = () => {
	item_container = new PIXI.Container();
	for (const sprite of trash_imgs) PIXI.Assets.load(sprite);
	for (const sprite of compost_imgs) PIXI.Assets.load(sprite);
	for (const sprite of recycle_imgs) PIXI.Assets.load(sprite);
	InGame.container.addChild(item_container);
};

const imgs = [trash_imgs, compost_imgs, recycle_imgs];

export const generateItem = () => {
	const type = Math.floor(Math.random() * 3);
	const item = Math.floor(Math.random() * imgs[type].length);
	const img = imgs[type][item];
	const sprite = PIXI.Sprite.from(img);
	sprite.x = Math.floor(Math.random() * (512 - 64));
	sprite.y = Math.floor(Math.random() * (292 - 64)) + 220;
	sprite.width = Math.max(22, 64 * ((sprite.y - 208) / 304));
	sprite.height = Math.max(22, 64 * ((sprite.y - 208) / 304));
	item_container.addChild(sprite);
};

export const stop = () => {
	item_container.removeChildren();
};
