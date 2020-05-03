<script>
	import SettingsRepo from "../../../stores/settingsRepo";

	let gitToken = SettingsRepo.getGithubToken();

	const setGitToken = () => {
		SettingsRepo.setGithubToken(gitToken);
	};
</script>

<div id="githubToken">
	<h3>Git token</h3>
	<p>*This token is used to publish templates on your Github account. Be sure it has write permission</p>
	<input type="password" bind:value={gitToken} placeholder="insert git token" />
	<button on:click={setGitToken}>Save</button>
</div>