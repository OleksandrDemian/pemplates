<script>
	import {generateIdFromName} from "../utils/utils";
	import EditorsRepo from "../stores/editorsRepo";
	import SettingsRepo from "../stores/settingsRepo";

	let editorName = null;
	let editorPath = null;

	let gitToken = SettingsRepo.getGithubToken();

	const onAddEditor = async () => {
		const editor = {
			name: editorName,
			path: editorPath,
			id: generateIdFromName(editorName)
		};
		await EditorsRepo.addEditor(editor);

		editorName = null;
		editorPath = null;
	};

	const setGitToken = () => {
		SettingsRepo.setGithubToken(gitToken);
	};

	const onRemoveEditor = (editorId) => EditorsRepo.removeEditor(editorId);
</script>

<div id="newEditor">
	<h3>Editors</h3>
	<input type="text" placeholder="Editor name" bind:value={editorName} />
	<input type="text" placeholder="Executable path" bind:value={editorPath} />
	<button on:click={onAddEditor}>Add</button>

	{ #if $EditorsRepo.length > 0 }
		{#each $EditorsRepo as editor}
			<p><b>{editor.name}:</b> {editor.path} <button on:click={onRemoveEditor(editor.id)}>Remove</button></p>
		{/each}
	{ /if }
</div>

<div id="gitToken">
	<h3>Git token</h3>
	<input type="password" bind:value={gitToken} placeholder="insert git token" />
	<button on:click={setGitToken}>Set</button>
</div>