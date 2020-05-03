<script>
	import NewTemplate from "../Sections/Templates/NewTemplate.svelte";

	export let templateName;
	export let templatePath;
</script>

<NewTemplate
	templateName={templateName}
	templatePath={templatePath}
/>