<script>
	import Container from "../../Components/Container.svelte";
	import NewTemplate from "../Templates/NewTemplate.svelte";
	import TemplatesRepo from "../../../stores/templatesRepo";
	import {createEventDispatcher} from "svelte";

	export let result;

	let dispatcher = createEventDispatcher();
	let template = TemplatesRepo.getGitTemplate(result.html_url + ".git");
	let showCreation = false;

	export const onShowTemplate = () => {
		dispatcher("showTemplate", {
			name: template.name,
			id: template.id
		});
	};
</script>

<Container>
	{ #if showCreation }
		<NewTemplate
			templateName={result.full_name}
			templatePath={result.html_url + ".git"}
			templateDescription={result.description}
			on:created={() => showCreation = false}
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