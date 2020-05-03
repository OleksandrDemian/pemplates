<script>
	import projectsRepo from "../../stores/projectsRepo";
	import Project from "../Sections/Project/Project.svelte";

	let arr = [];

	$: {
		arr = [...$projectsRepo];
		arr.reverse();
    }
</script>

<div id="projectsList">
    {#each arr as project}
        <Project project={project} />
    {:else}
        <h3>There are no projects</h3>
    {/each}
</div>