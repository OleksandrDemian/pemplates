<script>
	import Container from "../../Components/Container.svelte";
	import NewTemplate from "../Templates/NewTemplate.svelte";

	export let result;
	let showCreation = false;
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
		<button on:click={() => showCreation = true}>Download template</button>
<!--		<button on:click={() => alert("Not implemented yet♥")}>Create project</button>-->
	{ /if }
</Container>