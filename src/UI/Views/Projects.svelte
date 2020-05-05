<script>
	import projectsRepo from "../../stores/projectsRepo";
	import Project from "../Sections/Project/Project.svelte";

	let arr = [];
	let filterValue = "";

	$: {
		arr = [...$projectsRepo];
		arr.reverse();

		//todo: same as Templates
		if(filterValue && filterValue.length > 0){
			let lower = filterValue.toLowerCase();
			arr = arr.filter(project => {
				if(project.name.toLowerCase().includes(lower)){
					return true;
                } else if(project.description){
					return project.description.toLowerCase().includes(lower);
                }

				return false;
            });
        }
    }
</script>

<div id="projectsList">
    <input bind:value={filterValue} placeholder="Filter projects" />
    {#each arr as project}
        <Project project={project} />
    {:else}
        { #if filterValue && filterValue.length > 0 }
            <h3>There is no match with {filterValue}</h3>
        {:else}
			<h3>There are no projects</h3>
        {/if}
    {/each}
</div>

<style>
    input {
        width: 100%;
    }
</style>