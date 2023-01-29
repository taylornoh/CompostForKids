<script>
	import Title from '$lib/Title.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Compost4Kids</title>
</svelte:head>

<main>
	<Title />
	<slot />
</main>
