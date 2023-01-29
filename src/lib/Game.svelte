<script>
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';
	import { init } from '$lib/state.js';
	let canvas;
	let app;

	onMount(() => {
		init(canvas);
	});
</script>

<canvas bind:this={canvas} />
