<script>
	import templates from "../../stores/templatesRepo";
	import Template from "../Sections/Templates/Template.svelte";

	export let filterValue = "";

	let arr = [];

	$: {
		arr = [...$templates];
		arr.reverse();

		//todo: same as Projects
		if(filterValue.length > 0){
			let lower = filterValue.toLowerCase();
			arr = arr.filter(template => {
				if(template.name.toLowerCase().includes(lower)){
					return true;
				} else if(template.description){
					return template.description.toLowerCase().includes(lower);
				}

				return false;
			});
		}
	}
</script>

<div id="templatesList">
	<input bind:value={filterValue} placeholder="Filter templates" />
	{#each arr as template}
		<Template template={template} />
	{:else}
		{ #if filterValue.length > 0 }
			<h3>There is no match with {filterValue}</h3>
		{:else}
			<ul>
				<li>Drop folder here to create a local template</li>
				<li>Search for templates in "Search" section</li>
				<li>Create new template in "New template" section</li>
			</ul>
		{/if}
	{/each}
</div>

<style>
	input {
		width: 100%;
	}
</style>