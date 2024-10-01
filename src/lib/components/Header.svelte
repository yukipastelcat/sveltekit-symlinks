<script>
    import { page } from '$app/stores';

    const modules = [
        { title: 'Getting Started', href: '/' },
        { title: 'Users (sample)', href: '/users/list/1' }
    ];
</script>

<style>
    header {
        background-color: rgb(231, 241, 244);
        padding: 1rem;
    }

    .links {
        display: inline-grid;
        grid-auto-flow: column;
        gap: var(--space-2x);
    }

    .nav-link {
        text-decoration: none;

        &.active {
            color: #e5805f;
        }
    }
</style>

<header>
    <nav class="links">
        {#each modules as module}
            <a href={module.href} class="nav-link" class:active={$page.url.pathname === module.href}>{module.title}</a>
        {/each}
    </nav>
</header>
