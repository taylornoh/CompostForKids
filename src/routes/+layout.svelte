<script>
	import Title from '$lib/Title.svelte';
	import Footer from '$lib/Footer.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Compost4Kids</title>
</svelte:head>

<img class="background" src="/images/background.png"/>
<Title />
<main>
  <slot />
</main>
<Footer />
