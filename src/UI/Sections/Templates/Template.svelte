<script>
	import TemplatesRepo from "../../../stores/templatesRepo";
	import SettingsRepo from "../../../stores/settingsRepo";
	import {removeTemplate} from "../../../utils/templatesManager";
	import {notify} from "power-notifier";
	import {createRepository, pushRepository, updateTopics} from "../../../utils/gitUtils";
	import Container from "../../Components/Container.svelte";
	import LocalTemplate from "./LocalTemplate.svelte";
	import RemoteTemplate from "./RemoteTemplate.svelte";
	import NewProject from "../Project/NewProjectFromTemplate.svelte";

	export let template;
	let creatingProject = false;

	const publishTemplate = async () => {
		try {
			const response = await createRepository({
				name: template.name,
				description: template.description,
				authToken: SettingsRepo.getGithubToken()
			});
			const data = await response.json();
			const repoUrl = data["html_url"];

			await updateTopics({
				owner: data.owner.login,
				repo: data.name,
				authToken: SettingsRepo.getGithubToken()
			});

			await pushRepository({repoUrl, cwd: template.path});
			template.remote = true;
			template.originalPath = repoUrl;

			await TemplatesRepo.updateTemplate(template.id, template);

			notify({
				title: "Template published successfully"
			});
		} catch (e) {
			console.error(e);
			notify({
				title: "Error",
				message: "Make sure you have internet connection and git installed with PATH value defined in your OS",
				applyStyle: "error"
			});
		}
	};

	const updateTemplateRepo = () => alert("Not implemented yet♥");

	const remove = async () => {
		//save props before deleting template, as notify will refer to a new template (svelte render)
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
		<NewProject
			projectName={template.name}
			projectDescription={template.description}
			templateId={template.id}
			on:created={() => creatingProject = false}
			on:cancel={() => creatingProject = false}
		/>
	{:else}
		{ #if template.remote }
			<RemoteTemplate
				template={template}
				on:createProject={() => creatingProject = true}
				on:updateTemplateRepo={updateTemplateRepo}
				on:removeTemplate={remove}
			/>
		{:else}
			<LocalTemplate
				template={template}
				on:createProject={ () => creatingProject = true }
				on:publishTemplate={publishTemplate}
				on:removeTemplate={remove}
			/>
		{/if}
	{/if}
</Container>