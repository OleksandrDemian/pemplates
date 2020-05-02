<script>
	import TemplatesRepo from "../stores/templatesRepo";
	import ProjectsRepo from "../stores/projectsRepo";
	import SettingsRepo from "../stores/settingsRepo";
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
		//todo: mark repo as template
		const response = await createRepository({name: template.name, authToken: SettingsRepo.getGithubToken()});
		const data = await response.json();
		const repoUrl = data["html_url"];

		await pushRepository({repoUrl, cwd: template.path});
		notify({
			title: "Template published successfully"
		});
	};

	const updateTemplateRepo = () => alert("Not implemented yet♥");

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
		<button on:click={publishTemplate}>Publish template on Github</button>
	{/if}

	<button on:click={remove}>Remove template</button>
</Container>