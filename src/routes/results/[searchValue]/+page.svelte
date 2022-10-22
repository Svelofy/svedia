<script lang="ts">
	import { searchValue } from "../../../stores";
	import { onMount } from 'svelte';
	import { page } from "$app/stores";
	import type { SearchResult } from "src/interfaces";

    // Update searchValue according to route
    $searchValue = $page.params.searchValue;

	// Grouped search results to loop over
	const searchResults: SearchResult[] = [];

	// Indicator to start looping in UI
	let loadingFinished = false;

	async function loadResults(): Promise<void> {
		const results = await fetch('/api/results', {
			method: 'POST',
			body: JSON.stringify({ searchValue: $searchValue, limit: 10 })
		});

		// Reusable response
		const res = await results.json();

		// From official WikiPedia response
		const titles: string[] = res[1];
		const urls: string[] = res[3];

		// Loop over titles and urls
		titles.forEach((title, i) => {
			// Push to search results
			searchResults.push({
				title,
				url: urls[i]
			});

			// Check if looping is done
			if(searchResults.length == titles.length) {
				loadingFinished = true;
			}
		});
	}

	onMount(() => {
		loadResults();
	});
</script>

<h1>Results for {$searchValue}</h1>

{#if loadingFinished}

	{#each searchResults as { title, url }}
		<div>
			<a href={url}>{title}</a>
		</div>
	{/each}

{/if}