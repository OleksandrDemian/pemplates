<script>
	import editors from "../../stores/editorsRepo";

	export let value = null;
</script>

{ #if $editors.length > 0 }
	<select bind:value={value}>
		<option value={null}>Select Editor</option>
		{#each $editors as editor}
			<option value={editor.id}>{editor.name}</option>
		{/each}
	</select>
{:else}
	<select disabled>
		<option>There are no editors</option>
	</select>
{ /if }