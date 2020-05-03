<script>
	import Projects from "./UI/Views/Projects.svelte";
	import Templates from "./UI/Views/Templates.svelte";
	import Search from "./UI/Views/Search.svelte";
	import NewTemplate from "./UI/Views/New.svelte";

	import {onMount, onDestroy} from "svelte";
	import {addListener, removeListener} from "./utils/dropListener";
	import Settings from "./UI/Views/Settings.svelte";

	let activeTab = "search";
	let name = null;
	let path = null;

	const dropListener = (e) => {
		activeTab = "new";
		name = e.name;
		path = e.path;
	};

	const navigate = (tab) => {
		activeTab = tab;
		name = null;
		path = null;
	};

	onMount(() => addListener(dropListener));
	onDestroy(() => removeListener(dropListener));
</script>

<div id="navigation">
	<h1 style="padding-left: 10px">Menu</h1>
	<button on:click={() => navigate("projects")}>Projects</button><br/>
	<button on:click={() => navigate("templates")}>Templates</button><br/>
	<button on:click={() => navigate("search")}>Search</button><br/>
	<button on:click={() => navigate("new")}>New</button><br/>
	<button on:click={() => navigate("settings")}>Settings</button><br/>
</div>

<div id="content">
	{#if activeTab === "projects" }
		<h1>Projects</h1>
		<Projects />
	{:else if activeTab === "templates"}
		<h1>Templates</h1>
		<Templates />
	{:else if activeTab === "search"}
		<h1>Search</h1>
		<Search />
	{:else if activeTab === "new"}
		<h1>New Template</h1>
		<NewTemplate projectName={name} projectPath={path} />
	{:else if activeTab === "settings"}
		<h1>Settings</h1>
		<Settings />
	{/if}
</div>

<style>

	#navigation {
		display: inline-block;
		vertical-align: top;
		padding-top: 10px;
		width: 25%;
		min-width: 250px;
	}

	button {
		width: 50%;
		border-radius: unset;
	}

	#content {
		display: inline-block;
		padding: 10px;
		width: 50%;
		min-width: 500px;
	}

</style>