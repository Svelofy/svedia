<script lang="ts">
	import { searchValue } from "../stores";
    import { onMount, onDestroy } from 'svelte';
	import { goto } from "$app/navigation";

    function keyListener(ev: KeyboardEvent): void {
        if(ev.ctrlKey || ev.altKey) return;

        if(ev.key == 'Enter') {
            // TODO
            goto('results');
            return;
        }

        (document.getElementById('search-input') as HTMLInputElement).focus();
    }

    onMount(() => {
        document.addEventListener('keydown', keyListener);
    });

    onDestroy(() => {
        document.removeEventListener('keydown', keyListener);
    });
</script>

<div class='container'>
    <h1 id='logo'>Svedia</h1>

    <input id='search-input' bind:value={$searchValue} />

    <h1 id='hint'>Start typing then press <kbd>Enter</kbd> to search</h1>
</div>

<style>
    .container {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: max-content;
        height: max-content;
        text-align: center;
    }

    .container #logo {
        font-size: 3rem;
        margin: 0;
        margin-bottom: 10px;
    }

    .container #search-input {
        font-size: 2.1rem;
    }

    .container #hint {
        font-size: 1.8rem;
    }

    .container #hint kbd {
        padding: 5px;
        font-size: 1.8rem;
        background: #eee;
        border-radius: 10px;
        box-shadow: 0 0 5px black;
    }
</style>
