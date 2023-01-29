import * as PIXI from 'pixi.js';
import * as Key from '$lib/input.js';
import { app, changeState, State } from '$lib/Game.js';
import { item_container } from '$lib/entities/Item.js';
import { score, updateScore } from '$lib/views/ingame.js';
import { sound } from '@pixi/sound';

export let sprite;
let active = false;
let item_to_throw = undefined;
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

let bg;
let bg2;

const SIZE = 64;

const load_textures = (frames) => {
	const result = [];
	for (const frame of frames) {
		const texture = PIXI.Texture.from(frame);
		result.push(texture);
	}
	return result;
};

const throw_to = (destination) => {
	console.log(destination);

	if (item_to_throw.texture.textureCacheIds[0].includes(destination)) {
		console.log('GOOD JOB!!');
		sound.play('correct');
		updateScore(score + 1);
	} else if (
		destination == 'compost' &&
		item_to_throw.texture.textureCacheIds[0].includes('paper')
	) {
		console.log('HALF POINTS!!!!');
		sound.play('half');
		updateScore(score + 0.5);
	} else {
		console.log('YOU SUCK!!');
		sound.play('wrong');
	}
	item_container.removeChild(bg);
	item_container.removeChild(bg2);
	item_to_throw = undefined;
	active = true;
	if (item_container.children.length == 0) {
		setTimeout(() => {
			stop();
			changeState(State.MENU);
		}, 1000);
	}
};

const distance = (s1, s2) => {
	return Math.sqrt(Math.pow(s1.x - s2.x, 2) + Math.pow(s1.y - s2.y, 2));
};

const throw_away_item = (item) => {
	active = false;
	item_to_throw = item;

	// background sprite
	bg = PIXI.Sprite.from('/images/throw_away_background.png');
	bg.x = 256 - bg.width / 2;
	bg.y = 256 - bg.height / 2 - 50;

	// logos background sprite
	bg2 = PIXI.Sprite.from('/images/logo_background.png');
	bg2.x = 256 - bg2.width / 2;
	bg2.y = 512 - bg2.height - 10;

	// logos sprite
	const logos = PIXI.Sprite.from('/images/logos.jpg');
	logos.height = 75;
	logos.width = 225;
	logos.x = bg2.width / 2 - logos.width / 2;
	logos.y = bg2.height / 2 - logos.height / 2;

	item.width = 100;
	item.height = 100;
	item.x = bg.width / 2 - item.width / 2;
	item.y = bg.height / 2 - item.height / 2;
	bg.addChild(item);
	const style = new PIXI.TextStyle({
		fontFamily: 'Press Start 2P',
		fontSize: 16
	});
	const text = new PIXI.Text('Toss it, Kid!', style);
	text.x = bg.width / 2 - text.width / 2;
	text.y = text.height + 30;
	bg.addChild(text);
	item_container.addChild(bg2);
	bg2.addChild(logos);
	item_container.addChild(bg);
};

export const init = async () => {
	standing_textures = load_textures(player_standing_frames);
	front_textures = load_textures(player_front_frames);
	back_textures = load_textures(player_back_frames);
	left_textures = load_textures(player_left_frames);
	right_textures = load_textures(player_right_frames);

	sound.add('walk', '/sounds/walk.wav');
	sound.add('wrong', '/sounds/wrong.wav');
	sound.add('correct', '/sounds/correct.wav');
	sound.add('half', '/sounds/half.wav');
	sound.find('walk').volume = 0.3;

	PIXI.Assets.load('/images/throw_away_background.png');
	PIXI.Assets.load('/images/logo_background.png');
	PIXI.Assets.load('/images/logos.jpg');

	curr_textures = standing_textures;
	sprite = new PIXI.AnimatedSprite(standing_textures);
	sprite.animationSpeed = 0.1;
	sprite.position.set(256, 256); // almost bottom-left corner of the canvas
	sprite.play();

	app.ticker.add((delta) => {
		if (!active && !item_to_throw) return;
		sprite.width = SIZE * ((sprite.y * 2 - 256) / 512);
		sprite.height = SIZE * ((sprite.y * 2 - 256) / 512);
		sprite.y = Math.min(512 - sprite.height, Math.max(sprite.y, 208));
		sprite.x = Math.min(512 - sprite.width, Math.max(sprite.x, 0));
		if (active) {
			for (let item of item_container.children) {
				if (distance(sprite, item) < 20) {
					throw_away_item(item);
				}
			}
		} else {
			if (item_to_throw.y > 270) {
				if (item_to_throw.x >= 100 - 50 && item_to_throw.x < 164 - 50) throw_to('recycle');
				else if (item_to_throw.x >= 164 - 50 && item_to_throw.x < 238 - 50) throw_to('compost');
				else if (item_to_throw.x >= 238 - 50 && item_to_throw.x < 307 - 50) throw_to('trash');
			}
		}
		if (Key.left.isDown) {
			if (item_to_throw) item_to_throw.x -= delta * speed;
			else {
				sprite.x -= ((sprite.y / 0.59 - 208) / 512) * delta * speed;
				if (!sound.find('walk').isPlaying) sound.play('walk');
				if (sprite.textures != left_textures) {
					sprite.textures = left_textures;
					sprite.play();
				}
			}
		}
		if (Key.right.isDown) {
			if (item_to_throw) item_to_throw.x += delta * speed;
			else {
				sprite.x += ((sprite.y / 0.59 - 208) / 512) * delta * speed;
				if (!sound.find('walk').isPlaying) sound.play('walk');
				if (sprite.textures != right_textures) {
					sprite.textures = right_textures;
					sprite.play();
				}
			}
		}
		if (Key.up.isDown) {
			if (item_to_throw) item_to_throw.y -= delta * speed;
			else {
				sprite.y -= ((sprite.y / 0.59 - 208) / 512) * delta * speed;
				if (!sound.find('walk').isPlaying) sound.play('walk');
				if (sprite.textures != back_textures) {
					sprite.textures = back_textures;
					sprite.play();
				}
			}
		}
		if (Key.down.isDown) {
			if (item_to_throw) item_to_throw.y += delta * speed;
			else {
				sprite.y += ((sprite.y / 0.59 - 208) / 512) * delta * speed;
				if (!sound.find('walk').isPlaying) sound.play('walk');
				if (sprite.textures != front_textures) {
					sprite.textures = front_textures;
					sprite.play();
				}
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
