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

	const onCreateTemplate = async () => {
		creating = true;
		try {
			const success = await createProjectFromTemplate({
				name: projectName,
				templateId,
				description: projectDescription
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