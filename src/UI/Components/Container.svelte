<div class="container">
	<slot></slot>
</div>

<style>
	.container {
		padding: 20px;
		min-width: 300px;
		margin: 8px auto;
		/*box-shadow: 4px 4px var(--secondary);*/
		border: 1px solid var(--secondary);
		border-radius: 2px;
		background-color: var(--surface);
	}
</style>