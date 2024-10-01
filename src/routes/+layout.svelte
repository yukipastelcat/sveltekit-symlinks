<script>
    import Header from '$lib/components/Header.svelte';
</script>

<style>
    :global(h1) {
        color: #e5805f;
        text-transform: uppercase;
        font-size: 2em;
    }

    main {
        padding: 1em;
        max-width: 100rem;
        margin: 0 auto;
    }
</style>

<Header />
<main>
    <slot />
</main>
