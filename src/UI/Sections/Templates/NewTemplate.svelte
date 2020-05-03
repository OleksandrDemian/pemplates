<script>
	import {createTemplate} from "../../../utils/templatesManager";
	import {notify} from "power-notifier";
	import Loading from "../../Components/Loading.svelte";
	import { createEventDispatcher } from "svelte";

	export let templateName;
	export let templatePath;
	export let templateDescription;

	let creating = false;

	let dispatcher = createEventDispatcher();

	const onCreateTemplate = async () => {
		dispatcher("startCreating");
		creating = true;
		try {
			await createTemplate({
				name: templateName,
				path: templatePath,
				description: templateDescription
			});

			notify({
				title: "Template created successfully",
				message: templateName + " was added to your templates",
				timeout: 2500
			});

			templateName = null;
			templatePath = null;
			templateDescription = null;
		} catch (e) {
			console.error(e);
			notify({
				title: "Error",
				message: "Something went wrong",
				applyStyle: "error"
			});
		}

		dispatcher("created");
		creating = false;
	};
</script>

{#if creating}
	<Loading message="Creating {templateName}" />
{:else}
	<input bind:value={templateName} placeholder="Template name" />
	<input bind:value={templatePath} placeholder="Drop folder or write/copy url/path fo a project to use as template" />
	<textarea bind:value={templateDescription} placeholder="*(optional) Insert description"></textarea>
	<button on:click={onCreateTemplate}>Create</button>
{/if}

<style>
	input, textarea {
		width: 100%;
	}
</style>