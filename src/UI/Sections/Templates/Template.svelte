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
	import Loading from "../../Components/Loading.svelte";

	const NONE = 0;
	const CREATING = 1;
	const PUBLISHING = 2;

	export let template;
	let state = NONE;

	const publishTemplate = async () => {
		const token = SettingsRepo.getGithubToken();
		state = PUBLISHING;
		if (!token) {
			notify({
				title: "Token is not defined",
				message: "In order to publish your template on github you need to provide a token with write permission in Settings > Git Token",
				applyStyle: "warn"
			});
			return false;
		}

		try {
			const response = await createRepository({
				name: template.name,
				description: template.description,
				authToken: token
			});
			const data = await response.json();
			const repoUrl = data["html_url"];

			await updateTopics({
				owner: data.owner.login,
				repo: data.name,
				authToken: token
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
		state = NONE;
	};

	const updateTemplateRepo = () => alert("Not implemented yet♥");

	const remove = async () => {
		if (!confirm(`Are you sure you want to delete ${template.name} and all of it's files from your system?`)) {
			return false;
		}

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
	{#if state === CREATING}
		<NewProject
			projectName={template.name}
			projectDescription={template.description}
			templateId={template.id}
			on:created={() => state = NONE}
			on:cancel={() => state = NONE}
			on:showProject
		/>
	{:else if state === PUBLISHING}
		<Loading message="Publishing {template.name} to GitHub" />
	{:else}
		{ #if template.remote }
			<RemoteTemplate
				template={template}
				on:createProject={() => state = CREATING}
				on:updateTemplateRepo={updateTemplateRepo}
				on:removeTemplate={remove}
			/>
		{:else}
			<LocalTemplate
				template={template}
				on:createProject={ () => state = CREATING }
				on:publishTemplate={publishTemplate}
				on:removeTemplate={remove}
			/>
		{/if}
	{/if}
</Container>