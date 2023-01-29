import * as PIXI from 'pixi.js';
import * as Key from '$lib/input.js';
import { app } from '$lib/Game.js';

export let sprite;
let active = false;
const speed = 2;

const player_standing_frames = [
	'/images/player_front_1.png',
	'/images/player_front_1.png',
	'/images/player_front_1.png',
	'/images/player_front_1.png'
];

const player_front_frames = [
	'/images/player_front_1.png',
	'/images/player_front_2.png',
	'/images/player_front_3.png',
	'/images/player_front_4.png'
];

const player_back_frames = [
	'/images/player_back_1.png',
	'/images/player_back_2.png',
	'/images/player_back_3.png',
	'/images/player_back_4.png'
];

const player_left_frames = [
	'/images/player_left_1.png',
	'/images/player_left_2.png',
	'/images/player_left_3.png',
	'/images/player_left_4.png'
];

const player_right_frames = [
	'/images/player_right_1.png',
	'/images/player_right_2.png',
	'/images/player_right_3.png',
	'/images/player_right_4.png'
];

let standing_textures;
let front_textures;
let back_textures;
let right_textures;
let left_textures;
let curr_textures;

const SIZE = 64;

const load_textures = (frames) => {
	const result = [];
	for (const frame of frames) {
		const texture = PIXI.Texture.from(frame);
		result.push(texture);
	}
	return result;
};

export const init = async () => {
	standing_textures = load_textures(player_standing_frames);
	front_textures = load_textures(player_front_frames);
	back_textures = load_textures(player_back_frames);
	left_textures = load_textures(player_left_frames);
	right_textures = load_textures(player_right_frames);

	curr_textures = standing_textures;
	sprite = new PIXI.AnimatedSprite(standing_textures);
	sprite.animationSpeed = 0.1;
	sprite.position.set(256, 256); // almost bottom-left corner of the canvas
	sprite.play();

	app.ticker.add((delta) => {
		if (!active) return;
		sprite.width = SIZE * ((sprite.y * 2 - 256) / 512);
		sprite.height = SIZE * ((sprite.y * 2 - 256) / 512);
		sprite.y = Math.min(512 - sprite.height, Math.max(sprite.y, 208));
		sprite.x = Math.min(512 - sprite.width, Math.max(sprite.x, 0));
		if (Key.left.isDown) {
			sprite.x -= ((sprite.y / 0.59 - 208) / 512) * delta * speed;
			if (sprite.textures != left_textures) {
				sprite.textures = left_textures;
				sprite.play();
			}
		}
		if (Key.right.isDown) {
			sprite.x += ((sprite.y / 0.59 - 208) / 512) * delta * speed;
			if (sprite.textures != right_textures) {
				sprite.textures = right_textures;
				sprite.play();
			}
		}
		if (Key.up.isDown) {
			sprite.y -= ((sprite.y / 0.59 - 208) / 512) * delta * speed;
			if (sprite.textures != back_textures) {
				sprite.textures = back_textures;
				sprite.play();
			}
		}
		if (Key.down.isDown) {
			sprite.y += ((sprite.y / 0.59 - 208) / 512) * delta * speed;
			if (sprite.textures != front_textures) {
				sprite.textures = front_textures;
				sprite.play();
			}
		}
		if (!Key.up.isDown && !Key.left.isDown && !Key.down.isDown && !Key.right.isDown) {
			if (sprite.textures != standing_textures) {
				sprite.textures = standing_textures;
				sprite.play();
			}
		}
	});
};

export const start = () => {
	active = true;
};

export const stop = () => {
	active = false;
};
