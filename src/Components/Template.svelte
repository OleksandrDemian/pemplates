<script>
	import TemplatesRepo from "../stores/templatesRepo";
	import ProjectsRepo from "../stores/projectsRepo";
	import {createProjectFromTemplate} from "../utils/projectsManager";
	import {removeTemplate} from "../utils/templatesManager";
	import {notify} from "power-notifier";
	import {createRepository, pushRepository} from "../utils/gitUtils";
	import Container from "./Container.svelte";

	export let template;

	const createProject = async () => {
		const project = await createProjectFromTemplate({id: template.id});
		await ProjectsRepo.addProject(project);
	};

	const publishTemplate = async () => {
		//abfcff 7624 ced918 722729 e722 dc37d 107f 03368
		const response = await createRepository({name: "test3", authToken: "abfcff7624ced918722729e722dc37d107f03368"});
		const repoUrl = response["html_url"];
		// const repoUrl = "https://github.com/OleksandrDemian/test3";

		await pushRepository({repoUrl, cwd: template.path});
		notify({
			title: "WHAAAAAAT!!!!♥♥♥"
		});
	};

	const updateTemplateRepo = () => alert("Nt implemented yet♥");

	const remove = async () => {
		await removeTemplate({path: template.path});
		await TemplatesRepo.removeTemplate(template.id);

		notify({
			title: "Template removed",
			message: "Template " + template.name + " was successfully removed",
			applyStyle: "warn",
			timeout: 5000
		});
	};
</script>

<Container>
	<p><b>{template.name}:</b> {template.id}</p>
	<p><b>{template.remote ? "Remote" : "Local"}:</b> {template.originalPath}</p>
	<button on:click={createProject}>Create project</button>

	{ #if template.remote }
		<button on:click={updateTemplateRepo}>Update template from repository</button>
	{:else}
		<button on:click={publishTemplate}>Publish template</button>
	{/if}

	<button on:click={remove}>Remove template</button>
</Container>