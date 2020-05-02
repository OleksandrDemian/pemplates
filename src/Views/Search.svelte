<script>
	import SearchResult from "../Components/SearchResult.svelte";

    let search_value = null;
    let result = null;
    const search = async () => {
    	//todo: topic:boilerplate+topic:starter-kit
    	const url = `https://api.github.com/search/repositories?q=${search_value}+topic:template`;
        const response = (await fetch(url));
        const data = await response.json();
        console.log(response);
		result = data.items;
		console.log(result)
    }
</script>

<input type="text" placeholder="Search for templates on GitHub" bind:value={search_value} />
<button on:click={search}>Search</button>

<div id="searchResult">
    { #if result != null }
        { #if result.length > 0 }
            {#each result as searchResult (searchResult.full_name)}
				<SearchResult result={searchResult} />
            {/each}
        {:else}
            <h3>There are no project templates for <b>"{search_value}"</b></h3>
            <p>
                If you are sure there are, please let know to it's owner to mark it as template.
                Meanwhile, you can import it manually from "New" section.
            </p>
        { /if }
    {/if}
</div>

<style>
    input {
        width: 100%;
    }
</style>