<script>
	import { createTemplate } from "./../utils/templatesManager";

	export let projectName;
	export let projectPath;
	export let projectDescription;

	let creating = false;

	const onCreateTemplate = async () => {
		creating = true;
		await createTemplate({
			name: projectName,
			path: projectPath,
			description: projectDescription
		});
		creating = false
	};
</script>

{#if creating}
	<h1>Creating {projectName}</h1>
{:else}
	<input bind:value={projectName} placeholder="Template name" />
	<input bind:value={projectPath} placeholder="Drop folder or write/copy url/path fo a project to use as template" />
	<textarea bind:value={projectDescription} placeholder="*(optional) Insert description"></textarea>
	<button on:click={onCreateTemplate}>Create</button>
{/if}

<style>
	input, textarea {
		width: 100%;
	}
</style>