<script>
  import { onMount } from 'svelte';
    let app = {};
    onMount(() => {
        let app = new PIXI.Application({ width: 640, height: 360 });
      })
</script>

<canvas bind:this={app.view} />


