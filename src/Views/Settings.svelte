<script>
	import {generateIdFromName} from "../utils/utils";
	import EditorsRepo from "../stores/editorsRepo";

	let editorName = null;
	let editorPath = null;

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

	const onRemoveEditor = (editorId) => EditorsRepo.removeEditor(editorId);
</script>

<h1>Settings</h1>

<div id="editorsList">
	{ #if $EditorsRepo.length > 0 }
		{#each $EditorsRepo as editor}
			<p><b>{editor.name}:</b> {editor.path} <button on:click={onRemoveEditor(editor.id)}>Remove</button></p>
		{/each}
	{:else}
		<h3>There are no editors</h3>
	{ /if }
</div>

<div id="newEditor">
	<input type="text" placeholder="Editor name" bind:value={editorName} />
	<input type="text" placeholder="Executable path" bind:value={editorPath} />
	<button on:click={onAddEditor}>Add</button>
</div>