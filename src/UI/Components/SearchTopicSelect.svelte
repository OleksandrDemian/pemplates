<script>
	import {onMount} from "svelte";

	export let topicValue = null;

	onMount(() => {
		if(topicValue == null){
			topicValue = "template";
		}
	});
</script>

<select bind:value={topicValue}>
	<option value="template">Templates</option>
	<option value="boilerplate">Boilerplate</option>
	<option value="starter-kit">Starter-kit</option>
<!--	<option value="any">Anywhere</option>-->
</select>