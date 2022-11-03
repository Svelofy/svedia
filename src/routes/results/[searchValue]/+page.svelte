<script lang="ts">
	import { searchValue } from "../../../stores";
	import { onMount } from 'svelte';
	import { page } from "$app/stores";
	import type { SearchResult } from "src/interfaces";
	import { fade } from "svelte/transition";

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
			// Get the working part of the url for our own page route
			const normalisedSplit = urls[i].split('/');

			// Push to search results
			searchResults.push({
				title,
				normalised: normalisedSplit[normalisedSplit.length - 1]
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

<h1>Results for <i>{$searchValue}</i></h1>

{#if loadingFinished}

	{#each searchResults as { title, normalised }, i}
		<div in:fade={{ duration: 500, delay: (searchResults.length + i) * 15 }}>
			<a href={`/page/${normalised}`}>{title}</a>
		</div>
	{/each}

{/if}

<style>
	h1 {
		text-align: center;
		font-size: 2.5rem;
	}

	div {
		text-align: center;
		margin-bottom: 30px;
	}

	div a {
		font-size: 1.8rem;
		background: rgb(245, 245, 245);
		padding: 10px;
		border-radius: 10px;
		text-decoration: none;
	}
</style>
