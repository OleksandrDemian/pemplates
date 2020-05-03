<script>
	import { createTemplate } from "../../../utils/templatesManager";
	import {notify} from "power-notifier";

	export let projectName;
	export let projectPath;
	export let projectDescription;

	let creating = false;

	const onCreateTemplate = async () => {
		creating = true;
		try {
			await createTemplate({
				name: projectName,
				path: projectPath,
				description: projectDescription
			});

			notify({
				title: "Template created successfully",
				message: projectName + " was added to your templates",
				timeout: 2500
			});

			projectName = null;
			projectPath = null;
			projectDescription = null;
		} catch (e) {
			console.error(e);
			notify({
				title: "Error",
				message: "Something went wrong",
				applyStyle: "error"
			});
		}

		creating = false;
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