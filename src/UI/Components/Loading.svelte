<script>

	import {onMount, onDestroy} from "svelte";

	export let message = "Loading";
	let indicator = "";
	let intervalId = null;
	let cycle = 0;

	onMount(() => {
		intervalId = setInterval(() => {
			if(cycle > 4){
				cycle = 0;
				indicator = "";
			} else {
				cycle ++;
				indicator += ".";
			}
		}, 250);
	});

	onDestroy(() => clearInterval(intervalId));
</script>

<h3>{message} {indicator}</h3>