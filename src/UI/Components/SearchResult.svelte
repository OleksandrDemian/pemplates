<script>
	import Container from "src/UI/Components/Container.svelte";
	import NewTemplate from "src/UI/Views/NewTemplate.svelte";

	export let result;
	let showCreation = false;
</script>
<Container>
	{ #if showCreation }
		<NewTemplate
			projectName={result.full_name}
			projectPath={result.html_url + ".git"}
			projectDescription={result.description}
		/>
		<button on:click={() => showCreation = false}>Cancel</button>
	{ :else }
		<h3>
			<a href="{result.html_url}" target="_blank">{result.full_name}</a>
			by
			<span class="secondary-color">{result.owner.login}</span>
		</h3>
		<p>{result.description}</p>
		<button on:click={() => showCreation = true}>Download template</button>
		<button on:click={() => alert("Not implemented yet♥")}>Create project</button>
	{ /if }
</Container>