<script>
	import templates from "src/stores/templatesRepo";
	import Template from "src/UI/Components/Template.svelte";
</script>

<div id="templatesList">
	{ #if $templates.length > 0 }
		{#each $templates as template}
			<Template template={template} />
		{/each}
	{:else}
		<h3>There are no templates</h3>
		<p>Drop folder here to create a template</p>
	{ /if }
</div>