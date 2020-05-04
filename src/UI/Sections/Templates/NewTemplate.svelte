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

	const checkParams = () => {
		if(templateName == null || templateName.length < 1){
			notify({
				title: "Template name is required",
				applyStyle: "error"
			});
			return false;
		} else if(templatePath == null || templatePath.length < 1){
			notify({
				title: "Path is required",
				applyStyle: "error"
			});
			return false;
		}

		return true;
	};

	const onCreateTemplate = async () => {
		if(!checkParams()){
			return false;
		}

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
				message: "Possible problems: git is not installed, path is wrong",
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
	<label>How to create new template:</label>
	<ul>
		<li>Drop folder</li>
		<li>Write/paste local path</li>
		<li>Write/paste Github repo (with .git)</li>
	</ul>

	<input bind:value={templatePath} placeholder="Template path/url" />
	<input bind:value={templateName} placeholder="Template name" />
	<textarea bind:value={templateDescription} placeholder="*(optional) Insert description"></textarea>
	<button on:click={onCreateTemplate}>Create</button>
{/if}

<style>
	input, textarea {
		width: 100%;
	}
</style>