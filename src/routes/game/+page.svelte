<script>
	import Game from '$lib/Game.svelte';
</script>

<div>
	<h1>Compost Kid</h1>
	<p>Use the arrow keys to move!</p>
	<Game />
</div>

<style>
	h1 {
		margin-bottom: 0;
	}

	p {
		color: black;
	}
	div {
		height: 90vh;
		min-height: 90vh;
		max-height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
