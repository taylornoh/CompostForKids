<script>
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';
	import { init } from '$lib/Game.js';
	let canvas;

	onMount(async () => {
		await init(canvas);
	});
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		height: 90vh;
		min-width: 90vh;
		max-width: 90vh;
		border: 10px solid black;
		border-radius: 8px;
	}
</style>
