<script>
	import ProjectsRepo from "../../stores/projectsRepo";
	import EditorsRepo from "../../stores/editorsRepo";
	import EditorsSelect from "./EditorsSelect.svelte";
	import Container from "./Container.svelte";
	import {removeProject} from "../../utils/projectsManager";

	export let project = null;
	export let selectedEditorId = null;

	const remove = async () => {
		await removeProject({ path: project.path });
		await ProjectsRepo.removeProject(project.id);
	};

	const openFolder = () => {
		//todo: redo
		window.require("electron").shell.openItem(project.path);
	};

	const open = () => {
		//todo: redo everything
		//todo: link ide to project
		const editor = EditorsRepo.getEditor(selectedEditorId);
		const exec = window.require('child_process').exec;
		exec(`"${editor.path}" "${project.path}"`);
	};
</script>

<Container>
	<p><b>{project.name}:</b> {project.id}</p>
	<p>{project.path}</p>
	<button on:click={remove}>Remove</button>
	<button on:click={openFolder}>Open in explorer</button>
	<button on:click={open}>Open in editor</button>
	<EditorsSelect bind:value={selectedEditorId} />
</Container>