<script>
	import {createEventDispatcher} from "svelte";
	import {cloneGitRepository} from "../../../utils/templatesManager";
	import {notify} from "power-notifier";
	import Loading from "../../Components/Loading.svelte";

	export let template;

	let updating = false;
	let creationDateLabel = new Date(template.creationTimestamp).toLocaleString();

	const dispatch = createEventDispatcher();

	const createProject = () => dispatch("createProject");
	const updateTemplateRepo = async () => {
		//	re-clone repository
		updating = true;
		await cloneGitRepository(template.originalPath, template.path);
		notify({
			title: "Template updated successfully",
			timeout: 2500
		});
		updating = false;
	};
	const remove = () => dispatch("removeTemplate");
</script>

<div>
	<h3>{template.name}</h3>
	{#if updating}
		<Loading message="Updating" />
	{:else}
		{ #if template.description }
			<p>{template.description}</p>
		{ /if }
		<p>Creation date: {creationDateLabel}</p>
		<p><b>Remote:</b> <a href={template.originalPath} target="_blank">{template.originalPath}</a></p>

		<button on:click={createProject}>Create project</button>
		<button on:click={updateTemplateRepo}>Update template from repository</button>
		<button on:click={remove}>Remove template</button>
	{/if}
</div>