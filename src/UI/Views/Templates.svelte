<script>
	import templates from "../../stores/templatesRepo";
	import Template from "../Sections/Templates/Template.svelte";

	let arr = [];

	$: {
		arr = [...$templates];
		arr.reverse();
	}
</script>

<div id="templatesList">
	{#each arr as template}
		<Template template={template} />
	{:else}
		<h3>There are no templates</h3>
		<ul>
			<li>Drop folder here to create a local template</li>
			<li>Search for templates in "Search" section</li>
			<li>Create new template in "New template" section</li>
		</ul>
	{/each}
</div>