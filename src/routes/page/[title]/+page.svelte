<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from "$app/stores";

	async function loadPage(): Promise<void> {
		const pageRes = await fetch('/api/page', {
			method: 'POST',
			body: JSON.stringify({ title: $page.params.title })
		});

		(document.getElementById('page') as HTMLDivElement).innerHTML = await pageRes.json();
	}

	onMount(() => {
		loadPage();
	});
</script>

<div id='page'></div>
