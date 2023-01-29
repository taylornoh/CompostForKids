<script>
	import Garden from '$lib/Garden.svelte';
</script>

<div>
	<h1>The Garden ^_^</h1>
	<p>
		The more points you earn playing <a href="/game">Kid Compost</a>, the bigger your garden will
		be!
	</p>
	<Garden />
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
