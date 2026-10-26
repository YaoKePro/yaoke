<script>
	import { page } from '$app/state';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let { onsearch } = $props();

	const nav = [
		{ href: '/writing', label: 'Writing' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/about', label: 'About' }
	];

	const current = (href) => page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
</script>

<header class="column header">
	<a href="/" class="brand" aria-label="Yao Ke, home">
		<Logo size={28} />
		<span>Yao Ke</span>
	</a>
	<nav aria-label="Main">
		{#each nav as item}
			<a href={item.href} class="u" aria-current={current(item.href) ? 'page' : undefined}>{item.label}</a>
		{/each}
		<button type="button" class="search" onclick={onsearch} aria-label="Search posts and projects">
			<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"
				><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.7" /><path
					d="m16 16 4 4"
					stroke="currentColor"
					stroke-width="1.7"
					stroke-linecap="round"
				/></svg
			>
			<kbd>⌘K</kbd>
		</button>
		<ThemeToggle />
	</nav>
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: 32px;
		padding-bottom: 32px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		font-weight: 500;
		letter-spacing: -0.01em;
		margin: -6px;
		padding: 6px;
		border-radius: 8px;
	}
	nav {
		display: flex;
		align-items: center;
		gap: 20px;
		font-size: 14px;
		color: var(--muted);
	}
	nav a[aria-current='page'] {
		color: var(--ink);
	}
	nav a:hover {
		color: var(--ink);
	}
	.search {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 28px;
		padding: 0 8px;
		border: 1px solid var(--line-strong);
		border-radius: 7px;
		background: var(--wash);
		color: var(--muted);
		cursor: pointer;
		transition: border-color 0.2s ease;
	}
	.search:hover {
		border-color: var(--faint);
		color: var(--ink);
	}
	kbd {
		font-family: inherit;
		font-size: 12px;
	}
	@media (max-width: 520px) {
		.brand span {
			display: none;
		}
		nav {
			gap: 16px;
		}
		kbd {
			display: none;
		}
		.search {
			width: 34px;
			justify-content: center;
			padding: 0;
		}
	}
</style>
