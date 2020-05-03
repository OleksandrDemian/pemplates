<script>
	import { createEventDispatcher } from "svelte";
	export let template;

	const dispatch = createEventDispatcher();

	const createProject = () => dispatch("createProject");
	const updateTemplateRepo = () => dispatch("updateTemplateRepo");
	const remove = () => dispatch("removeTemplate");
</script>

<div>
	<h3>{template.name}</h3>
    { #if template.description }
		<p>{template.description}</p>
    { /if }
	<p><b>Remote:</b> <a href={template.originalPath} target="_blank">{template.originalPath}</a></p>

	<button on:click={createProject}>Create project</button>
	<button on:click={updateTemplateRepo}>Update template from repository</button>
	<button on:click={remove}>Remove template</button>
</div>