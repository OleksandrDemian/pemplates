<script>
	import SettingsRepo from "src/stores/settingsRepo";

	let gitToken = SettingsRepo.getGithubToken();

	const setGitToken = () => {
		SettingsRepo.setGithubToken(gitToken);
	};
</script>

<div id="githubToken">
	<h3>Git token</h3>
	<input type="password" bind:value={gitToken} placeholder="insert git token" />
	<button on:click={setGitToken}>Save</button>
</div>