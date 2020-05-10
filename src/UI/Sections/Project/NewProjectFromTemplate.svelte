<script>
	import {createProjectFromTemplate} from "../../../utils/projectsManager";
	import {createEventDispatcher} from "svelte";
	import {notify} from "power-notifier";
	import Loading from "../../Components/Loading.svelte";

	export let templateId = null;

	export let projectName = null;
	export let projectDescription = null;

	const dispatcher = createEventDispatcher();
	let creating = false;

	const checkParams = () => {
		if(projectName == null || projectName.length < 1){
			notify({
				title: "Name is required",
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

		creating = true;
		try {
			const success = await createProjectFromTemplate({
				name: projectName,
				templateId,
				description: projectDescription,
				creationTimestamp: Date.now()
			});

			if (success) {
				notify({
					title: "New project created",
					timeout: 2500
				});

				dispatcher("created");
			}
		} catch (e) {
			console.error(e);
			notify({
				title: "Error",
				applyStyle: "error",
				timeout: 2500
			});
		}

		creating = false;
	};

	const onCancel = () => dispatcher("cancel");
</script>

{#if creating}
	<Loading message="Creating {projectName}" />
{:else}
	<label>
		Project name:
		<input bind:value={projectName} placeholder="Project name" />
	</label>
	<label>
		Description:
		<textarea bind:value={projectDescription} placeholder="*(optional) Insert description"></textarea>
	</label>
	<button on:click={onCreateTemplate}>Create</button>
	<button on:click={onCancel}>Cancel</button>
{/if}

<style>
	input, textarea {
		width: 100%;
	}
</style>