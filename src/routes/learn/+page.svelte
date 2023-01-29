<script>
	import compost_banana from '$lib/images/compost_banana.png';
	import compost_food from '$lib/images/compost_food.png';
	import compost_sushi from '$lib/images/compost_sushi.png';
	import compost from '$lib/images/compost.png';
	import recycle_glass_bottle from '$lib/images/recycle_glass_bottle.png';
	import recycle_milk from '$lib/images/recycle_milk.png';
	import recycle_water_bottle from '$lib/images/recycle_water_bottle.png';
	import recycle from '$lib/images/recycle.png';
	import trash_bag from '$lib/images/trash_bag.png';
	import trash_boba_cup from '$lib/images/trash_boba_cup.png';
	import trash_plastic_bag from '$lib/images/trash_plastic_bag.png';
	import trash from '$lib/images/trash.png';
</script>

<h1>Learning Tutorial</h1>

<p id="rcorners2">
	Welcome to the Compost4Kids! In this game, you will learn about the importance of composting and
	how it can benefit the environment. Your goal is to sort various trash objects into their correct
	bins: trash, compost, and recycling. Each correct sorting will help you expand and beautify your
	virtual garden. The more points you earn, the more you can upgrade your garden. Can you become the
	ultimate composting pro and help create a greener future? Let's get started and compete for the
	high score!
</p>

<h2>Trash container and objects:</h2>
<p id="rcorners2">
	<img alt="The trash container" src={trash} width="200" />
	<img alt="." src={trash_bag} />
	<img alt="." src={trash_boba_cup} />
	<img alt="." src={trash_plastic_bag} />
</p>

<h2>Recyclable container and objects:</h2>
<p id="rcorners2">
	<img alt="The trash container" src={recycle} width="200" />
	<img alt="." src={recycle_glass_bottle} />
	<img alt="." src={recycle_milk} />
	<img alt="." src={recycle_water_bottle} />
</p>

<h2>Compostable container and objects:</h2>
<p id="rcorners2">
	<img alt="The compost container" src={compost} width="200" />
	<img alt="." src={compost_banana} />
	<img alt="." src={compost_food} />
	<img alt="." src={compost_sushi} />
</p>

<style>
	#rcorners2 {
			border-radius: 25px;
			background: rgba(255, 255, 255, 0.8);
			padding: 20px;
			width: 100%;
			height: auto;
		}
</style>