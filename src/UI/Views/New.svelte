<script>
	import NewTemplate from "../Sections/Templates/NewTemplate.svelte";
	import Container from "../Components/Container.svelte";

	export let templateName;
	export let templatePath;
</script>

<Container>
	<label>How to create new template:</label>
	<ul>
		<li>Drop folder</li>
		<li>Write/paste local path</li>
		<li>Write/paste Github repo (with .git)</li>
	</ul>
</Container>

<Container>
	<NewTemplate
			templateName={templateName}
			templatePath={templatePath}
	/>
</Container>