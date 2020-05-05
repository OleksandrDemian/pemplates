<script>
	import Projects from "./UI/Views/Projects.svelte";
	import Templates from "./UI/Views/Templates.svelte";
	import Search from "./UI/Views/Search.svelte";
	import NewTemplate from "./UI/Views/New.svelte";

	import {onMount, onDestroy} from "svelte";
	import {addListener, removeListener} from "./utils/dropListener";
	import Settings from "./UI/Views/Settings.svelte";
	import Container from "./UI/Components/Container.svelte";

	let activeTab = "search";
	let name = null;
	let path = null;
	let filter = null;

	const dropListener = (e) => {
		activeTab = "new";
		name = e.name;
		path = e.path;
	};

	const navigate = (tab) => {
		activeTab = tab;
		name = null;
		path = null;
		filter = null;
	};

	const showTemplate = (e) => {
		filter = e.detail.name;
		activeTab = "templates";
	};

	onMount(() => addListener(dropListener));
	onDestroy(() => removeListener(dropListener));
</script>

<div id="navigation">
	<h1>Menu</h1>
	<h3 class="cursor" on:click={() => navigate("search")}><u>Search</u></h3>
	<h3 class="cursor" on:click={() => navigate("new")}><u>New template</u></h3>
	<h3 class="cursor" on:click={() => navigate("projects")}><u>Projects</u></h3>
	<h3 class="cursor" on:click={() => navigate("templates")}><u>Templates</u></h3>
	<h3 class="cursor" on:click={() => navigate("settings")}><u>Settings</u></h3>
</div>

<div id="content">
	{#if activeTab === "projects" }
		<h1>Projects</h1>
		<Projects />
	{:else if activeTab === "templates"}
		<h1>Templates</h1>
		<Templates filterValue={filter} />
	{:else if activeTab === "search"}
		<h1>Search</h1>
		<Search on:showTemplate={showTemplate} />
	{:else if activeTab === "new"}
		<h1>New Template</h1>
		<NewTemplate templateName={name} templatePath={path} />
	{:else if activeTab === "settings"}
		<h1>Settings</h1>
		<Settings />
	{/if}
</div>

<style>
	h3 {
		display: table;
	}

	#navigation {
		display: inline-block;
		vertical-align: top;
		padding: 10px;
		width: 25%;
		min-width: 200px;
	}

	#content {
		display: inline-block;
		padding: 10px;
		width: 50%;
		min-width: 500px;
	}

</style>