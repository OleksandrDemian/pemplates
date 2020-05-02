<script>
	import Projects from "./Views/Projects.svelte";
	import Templates from "./Views/Templates.svelte";
	import Search from "./Views/Search.svelte";
	import NewTemplate from "./Views/NewTemplate.svelte";

	import {onMount, onDestroy} from "svelte";
	import {addListener, removeListener} from "./utils/dropListener";
	import Settings from "./Views/Settings.svelte";
	import {createRepository, pushRepository} from "./utils/gitUtils";
	import {notify} from "power-notifier";

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
		<Projects />
	{:else if activeTab === "templates"}
		<Templates />
	{:else if activeTab === "search"}
		<Search />
	{:else if activeTab === "new"}
		<NewTemplate projectName={name} projectPath={path} />
	{:else if activeTab === "settings"}
		<Settings />
	{/if}
</div>

<style>

	#navigation {
		display: inline-block;
		vertical-align: top;
		padding-top: 10px;
		width: 25%;
		min-width: max-content;
	}

	button {
		width: 50%;
		border-radius: unset;
	}

	#content {
		display: inline-block;
		padding: 10px;
		width: 50%;
	}

</style>