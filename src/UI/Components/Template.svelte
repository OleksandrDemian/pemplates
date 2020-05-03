<script>
	import TemplatesRepo from "src/stores/templatesRepo";
	import SettingsRepo from "src/stores/settingsRepo";
	import {createProjectFromTemplate} from "src/utils/projectsManager";
	import {removeTemplate} from "src/utils/templatesManager";
	import {notify} from "power-notifier";
	import {createRepository, pushRepository} from "src/utils/gitUtils";
	import Container from "src/UI/Components/Container.svelte";

	export let template;
	let creatingProject = false;

	const createProject = async () => {
		creatingProject = true;
		await createProjectFromTemplate({ name: template.name, id: template.id });
		creatingProject = false;
	};

	const publishTemplate = async () => {
		//todo: mark repo as template
		const response = await createRepository({name: template.name, authToken: SettingsRepo.getGithubToken()});
		const data = await response.json();
		const repoUrl = data["html_url"];

		await pushRepository({repoUrl, cwd: template.path});
		template.remote = true;
		template.path = repoUrl;

		//todo: test updateTemplate
		await TemplatesRepo.updateTemplate(template.id, template);

		notify({
			title: "Template published successfully"
		});
	};

	const updateTemplateRepo = () => alert("Not implemented yet♥");

	const remove = async () => {
		//save props before deleting template, as notify will refer new template (svelte render)
		const name = template.name;
		const path = template.path;
		const id = template.id;

		await removeTemplate({path});
		await TemplatesRepo.removeTemplate(id);

		notify({
			title: "Template removed",
			message: "Template " + name + " was successfully removed",
			applyStyle: "warn",
			timeout: 5000
		});
	};
</script>

<Container>
	{#if creatingProject}
		<h3>Creating project</h3>
	{:else}
		<h3>{template.name}</h3>
		{ #if template.description }
			<p>{template.description}</p>
		{ /if }

		{ #if template.remote }
			<p><b>Remote:</b> <a href={template.originalPath}>{template.originalPath}</a></p>
		{:else}
			<p><b>Local</b></p>
		{/if}

		<button on:click={createProject}>Create project</button>

		{ #if template.remote }
			<button on:click={updateTemplateRepo}>Update template from repository</button>
		{:else}
			<button on:click={publishTemplate}>Publish template on Github</button>
		{/if}

		<button on:click={remove}>Remove template</button>
	{/if}
</Container>