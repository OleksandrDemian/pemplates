<script>
	import projectsRepo from "src/stores/projectsRepo";
	import Project from "src/UI/Components/Project.svelte";
</script>

<div id="projectsList">
    { #if $projectsRepo.length > 0 }
        {#each $projectsRepo as project}
			<Project project={project} />
        {/each}
    {:else}
		<h3>There are no projects</h3>
    { /if }
</div>