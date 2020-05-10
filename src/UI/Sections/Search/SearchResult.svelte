<script>
	import Container from "../../Components/Container.svelte";
	import NewTemplate from "../Templates/NewTemplate.svelte";
	import TemplatesRepo from "../../../stores/templatesRepo";
	import {createEventDispatcher} from "svelte";
	import {notify} from "power-notifier";

	export let result;

	let dispatcher = createEventDispatcher();
	let template = TemplatesRepo.getGitTemplate(result.html_url + ".git");
	let showCreation = false;

	const onShowTemplate = () => {
		dispatcher("showTemplate", {
			name: template.name,
			id: template.id
		});
	};

	const onCreated = () => {
		showCreation = false;
		template = TemplatesRepo.getGitTemplate(result.html_url + ".git");

		notify({
			title: "Template created successfully",
			message: template.name + " was added to your templates",
			timeout: 2500,
			buttons: [
				{ text: "Show template", action: "showTemplate" }
			],
			onStateUpdate: function (action) {
				if(action === "showTemplate"){
					onShowTemplate();
				}
			}
		});
	}
</script>

<Container>
	{ #if showCreation }
		<NewTemplate
			templateName={result.full_name}
			templatePath={result.html_url + ".git"}
			templateDescription={result.description}
			on:created={onCreated}
		/>
		<button on:click={() => showCreation = false}>Cancel</button>
	{ :else }
		<h3>
			<a href="{result.html_url}" target="_blank">{result.name}</a>
			by
			<span class="secondary-color">{result.owner.login}</span>
		</h3>
		<p>{result.description}</p>

		{#if template != null}
			<button on:click={() => showCreation = true}>Download again</button>
			<button on:click={onShowTemplate}>Show template</button>
		{:else}
			<button on:click={() => showCreation = true}>Download template</button>
		{/if}
<!--		<button on:click={() => alert("Not implemented yet♥")}>Create project</button>-->
	{ /if }
</Container>