<script>
	import ProjectsRepo from "../../../stores/projectsRepo";
	import EditorsRepo from "../../../stores/editorsRepo";
	import EditorsSelect from "../../Components/EditorsSelect.svelte";
	import Container from "../../Components/Container.svelte";
	import {removeProject} from "../../../utils/projectsManager";
	import {execShellCommand, openFileExplorer} from "../../../utils/shellUtils";
	import {notify} from "power-notifier";

	export let project = null;
	export let selectedEditorId = project ? project.editorId : null;

	const remove = async () => {
		if(confirm(`Are you sure you want to delete ${project.name} and all of it's files from your system?`)){
			await removeProject({ path: project.path });
			await ProjectsRepo.removeProject(project.id);
		}
	};

	const openFolder = () => {
		openFileExplorer(project.path);
	};

	const open = async () => {
		project.editorId = selectedEditorId;
		await ProjectsRepo.updateProject(project.id, project);
		const editor = EditorsRepo.getEditor(selectedEditorId);
		if(editor != null){
			await execShellCommand(`"${editor.path}" "${project.path}"`);
		} else {
			notify({
				title: "Select IDE",
				timeout: 3000,
				applyStyle: "error"
			});
		}
	};
</script>

<Container>
	<p><b>{project.name}:</b> {project.id}</p>
	<p>{project.path}</p>
	{ #if project.description }
		<p>{project.description}</p>
	{ /if }

	<button on:click={remove}>Remove</button>
	<button on:click={openFolder}>Open in explorer</button>
	<button on:click={open}>Open in editor</button>
	<EditorsSelect bind:value={selectedEditorId} />
</Container>