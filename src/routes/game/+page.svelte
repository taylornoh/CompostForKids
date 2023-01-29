<script>
	import Game from '$lib/Game.svelte';
</script>

<div class="contain">
  <div class="rcorners">
    <h1 >Compost Kid</h1>
    <p>Use the arrow keys to move!</p>
    <p>Earn points to grow your <a href="/garden">garden</a>!</p>
  </div>
	<Game />
</div>

<style>
  .rcorners {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 50px;
    margin-top: 150px;
		border-radius: 25px;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 10px;
	}

	h1 {
		margin-bottom: 0;
	}

	p {
		color: black;
	}
	.contain {
		height: 90vh;
		min-height: 90vh;
		max-height: 90vh;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
    margin-bottom: 175px;
	}
</style>
