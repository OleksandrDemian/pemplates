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

		const name = templateName;

		dispatcher("startCreating");
		creating = true;

		try {
			await createTemplate({
				name,
				path: templatePath,
				description: templateDescription,
				creationTimestamp: Date.now()
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

		dispatcher("created", { name });
		creating = false;
	};
</script>

{#if creating}
	<Loading message="Creating {templateName}" />
{:else}

	<label>
		Template path/url:
		<input bind:value={templatePath} placeholder="Template path/url" />
	</label>
	<label>
		Template name:
		<input bind:value={templateName} placeholder="Template name" />
	</label>
	<label>
		Description:
		<textarea bind:value={templateDescription} placeholder="*(optional) Insert description"></textarea>
	</label>
	<button on:click={onCreateTemplate}>Create</button>
{/if}

<style>
	input, textarea {
		width: 100%;
	}
</style>