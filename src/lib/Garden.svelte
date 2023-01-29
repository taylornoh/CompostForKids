<script>
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';
	import { init } from '$lib/Garden.js';
	let canvas;

	onMount(async () => {
		await init(canvas);
	});
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		width: 90vh;
		min-width: 90vh;
		max-width: 90vh;
		border: 10px solid #6b788f;
		border-radius: 8px;
	}
</style>
