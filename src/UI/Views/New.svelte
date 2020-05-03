<script>
	import NewTemplate from "../Sections/Templates/NewTemplate.svelte";

	export let projectName;
	export let projectPath;
</script>

<NewTemplate
	projectName={projectName}
	projectPath={projectPath}
/>