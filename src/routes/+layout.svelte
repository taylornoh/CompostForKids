<script>
	import Title from '$lib/Title.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Compost4Kids</title>
</svelte:head>

<Title />
<main>
  <slot />
</main>
<Footer />
