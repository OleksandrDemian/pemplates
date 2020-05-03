<script>
	import { createEventDispatcher } from "svelte";
	export let template;

	const dispatch = createEventDispatcher();

	const onCreateProject = () => dispatch("createProject");
	const onRemove = () => dispatch("removeTemplate");
	const onPublishTemplate = () => dispatch("publishTemplate");
</script>

<div>
	<h3>{template.name}</h3>
	{ #if template.description }
		<p>{template.description}</p>
	{ /if }

	<button on:click={onCreateProject}>Create project</button>
	<button on:click={onPublishTemplate}>Publish template on Github</button>
	<button on:click={onRemove}>Remove template</button>
</div>