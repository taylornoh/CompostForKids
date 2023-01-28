<script>
	import * as PIXI from 'pixi.js';
	import { onMount } from 'svelte';
	let canv;
	let app;
	onMount(() => {
		app = new PIXI.Application({
			view: canv,
			backgroundColor: 0x141414
		});
		if (app == null) return;
	});
</script>

<canvas bind:this={canv} />
