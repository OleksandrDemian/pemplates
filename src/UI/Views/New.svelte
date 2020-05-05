<script>
	import NewTemplate from "../Sections/Templates/NewTemplate.svelte";

	export let templateName;
	export let templatePath;
</script>

<label>How to create new template:</label>
<ul>
	<li>Drop folder</li>
	<li>Write/paste local path</li>
	<li>Write/paste Github repo (with .git)</li>
</ul>

<NewTemplate
	templateName={templateName}
	templatePath={templatePath}
/>