<script>
	// ⌘K / Ctrl+K: jump to any page, post or project.
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';

	let { items = [] } = $props();

	let dialog;
	let input;
	let query = $state('');
	let active = $state(0);

	const normal = (s) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s]/g, '');

	let results = $derived.by(() => {
		const q = normal(query).trim();
		if (!q) return items.slice(0, 12);
		const words = q.split(/\s+/);
		return items.filter((item) => words.every((w) => normal(`${item.title} ${item.kind}`).includes(w))).slice(0, 20);
	});

	$effect(() => {
		query;
		active = 0;
	});

	export async function open() {
		query = '';
		dialog.showModal();
		await tick();
		input.focus();
	}

	function close() {
		dialog.close();
	}

	function choose(item) {
		close();
		if (item.href.startsWith('http')) window.open(item.href, '_blank', 'noopener');
		else goto(item.href);
	}

	function onkeydown(event) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			active = Math.min(results.length - 1, active + 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			active = Math.max(0, active - 1);
		} else if (event.key === 'Enter' && results[active]) {
			event.preventDefault();
			choose(results[active]);
		}
	}

	onMount(() => {
		const shortcut = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				dialog.open ? close() : open();
			}
		};
		addEventListener('keydown', shortcut);
		return () => removeEventListener('keydown', shortcut);
	});
</script>

<dialog
	bind:this={dialog}
	class="palette"
	aria-label="Search"
	onclick={(e) => e.target === dialog && close()}
>
	<div class="box">
		<label class="sr-only" for="palette-input">Search posts and projects</label>
		<input
			id="palette-input"
			bind:this={input}
			bind:value={query}
			{onkeydown}
			placeholder="Search posts and projects…"
			autocomplete="off"
			spellcheck="false"
			role="combobox"
			aria-expanded="true"
			aria-controls="palette-results"
			aria-activedescendant={results[active] ? `palette-${active}` : undefined}
		/>
		<ul id="palette-results" role="listbox">
			{#each results as item, i (item.href)}
				<!-- Keyboard selection is handled by the search input (arrows + Enter). -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li
					id="palette-{i}"
					role="option"
					aria-selected={i === active}
					class:active={i === active}
					onmousemove={() => (active = i)}
					onclick={() => choose(item)}
				>
					<span class="title">{item.title}</span>
					<span class="kind">{item.kind}</span>
				</li>
			{:else}
				<li class="empty">Nothing matches “{query}”.</li>
			{/each}
		</ul>
	</div>
</dialog>

<style>
	.palette {
		width: min(560px, calc(100vw - 32px));
		max-height: min(520px, calc(100vh - 120px));
		margin: 12vh auto auto;
		padding: 0;
		border: 1px solid var(--line-strong);
		border-radius: 14px;
		background: var(--surface);
		color: var(--ink);
		box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.35);
		overflow: hidden;
	}
	.palette[open] {
		animation: pop 0.18s var(--ease);
	}
	.palette::backdrop {
		background: rgba(10, 10, 10, 0.28);
		backdrop-filter: blur(2px);
	}
	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(6px) scale(0.985);
		}
	}
	.box {
		display: flex;
		flex-direction: column;
		max-height: inherit;
	}
	input {
		width: 100%;
		border: 0;
		border-bottom: 1px solid var(--line);
		background: transparent;
		color: var(--ink);
		font: inherit;
		font-size: 16px;
		padding: 16px 18px;
		outline: none;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 6px;
		overflow-y: auto;
	}
	li {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 10px 12px;
		border-radius: 8px;
		cursor: pointer;
	}
	li.active {
		background: var(--wash);
	}
	.title {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.kind {
		flex: none;
		font-size: 12px;
		color: var(--muted);
	}
	.empty {
		color: var(--muted);
		cursor: default;
	}
</style>
