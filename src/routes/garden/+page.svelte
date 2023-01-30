<script>
	import Garden from '$lib/Garden.svelte';
</script>

<div>
  <div class="rcorners">
    <h1>The Garden ^_^</h1>
		<p>
			The more points you earn playing <a href="/game">Compost Kid</a>, the bigger your garden will
			be!
		</p>
  </div>
	<Garden />
</div>

<style>
  .rcorners {
		border-radius: 25px;
		background: rgba(255, 255, 255, 0.8);
		padding: 20px;
		height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
	}

	h1 {
		margin-bottom: 0;
	}

	p {
		color: black;
	}

	div {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
