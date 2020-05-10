<script>
	import SearchResult from "../Sections/Search/SearchResult.svelte";
	import {notify} from "power-notifier";
	import Loading from "../Components/Loading.svelte";
	import {createEventDispatcher} from "svelte";
	import SearchTopicSelect from "../Components/SearchTopicSelect.svelte";

	/*
	use search value to bind input and filter to show in case of null result
	 */
	let search_value = null;
	let filter_value = null;
	let selectedTopic = null;
	let result = null;
	let dispatcher = createEventDispatcher();

	let isSearching = false;

	const onKeyUp = (e) => {
		//enter -> 13
		if (e.keyCode === 13) {
			search();
		}
	};

	const search = async () => {
		//todo: topic:boilerplate+topic:starter-kit
		isSearching = true;
		filter_value = search_value;
		try {
			// const url = `https://api.github.com/search/repositories?q=${search_value}+topic:template&sort=stars`;
			const url = `https://api.github.com/search/repositories?q=${search_value}+topic:${selectedTopic}&sort=stars`;
			const response = (await fetch(url));
			const data = await response.json();
			result = data.items;
		} catch (e) {
			console.error(e);
			notify({
				title: "Error",
				message: "Be sure you have internet connection",
				applyStyle: "error"
			});
		}

		isSearching = false;
	}
</script>

<input type="text" placeholder="Search for templates on GitHub" bind:value={search_value} on:keyup={onKeyUp} />
<SearchTopicSelect bind:topicValue={selectedTopic} />
<button on:click={search}>Search</button>

<div id="searchResult">
    {#if isSearching}
        <Loading message="Searching" />
    {:else}
        { #if result != null }
            { #if result.length > 0 }
                {#each result as searchResult (searchResult.full_name)}
                    <SearchResult
							result={searchResult}
							on:showTemplate
					/>
                {/each}
            {:else}
                <h3>There are no project templates for <b>"{filter_value}"</b></h3>
                <p>
                    If you are sure there are, please let know to it's owner to mark it as template.
                    Meanwhile, you can import it manually from "New" section.
                </p>
            { /if }
        {/if}
    {/if}
</div>

<style>
    input {
        width: 100%;
    }
</style>