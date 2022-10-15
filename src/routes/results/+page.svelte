<script lang="ts">
	import { searchValue } from "../../stores";
	import { onMount } from 'svelte';

	async function loadResults(): Promise<void> {
		const results = await fetch('/api/results', {
			method: 'POST',
			body: JSON.stringify({ searchValue: $searchValue, limit: 10 })
		});

		console.log((await results.json())[1]);
	}

	onMount(() => {
		loadResults();
	});
</script>

<h1>Results for {$searchValue}</h1>