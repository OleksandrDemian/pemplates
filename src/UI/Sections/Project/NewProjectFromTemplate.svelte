<script>
	import {createProjectFromTemplate} from "../../../utils/projectsManager";
	import { createEventDispatcher } from "svelte";
	import {notify} from "power-notifier";

	export let templateId = null;

	export let projectName = null;
	export let projectDescription = null;

	const dispatcher = createEventDispatcher();
	let creating = false;

	const onCreateTemplate = async () => {
		creating = true;
		const success = await createProjectFromTemplate({
			name: projectName,
			templateId,
			description: projectDescription
		});
		creating = false;

		if(success){
			notify({
				title: "New project created",
				timeout: 2500
			});

			dispatcher("created");
		}
	};

	const onCancel = () => dispatcher("cancel");
</script>

{#if creating}
	<h1>Creating {projectName}</h1>
{:else}
	<input bind:value={projectName} placeholder="Project name" />
	<textarea bind:value={projectDescription} placeholder="*(optional) Insert description"></textarea>
	<button on:click={onCreateTemplate}>Create</button>
	<button on:click={onCancel}>Cancel</button>
{/if}

<style>
	input, textarea {
		width: 100%;
	}
</style>