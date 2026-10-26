<script>
	import { SITE } from '$lib/site.js';
</script>

<footer class="column">
	<div class="footer">
		<a href="mailto:{SITE.email}" class="u">{SITE.email}</a>
		<nav aria-label="Elsewhere">
			<a class="u" href={SITE.links.github} rel="me">GitHub</a>
			<a class="u" href={SITE.links.x} rel="me">X</a>
			<a class="u" href={SITE.links.linkedin} rel="me">LinkedIn</a>
			<a class="u" href="/rss.xml">RSS</a>
		</nav>
	</div>
</footer>

<style>
	footer {
		padding-bottom: 48px;
	}
	.footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		padding-top: 20px;
		border-top: 1px solid var(--line);
		color: var(--muted);
		font-size: 13px;
	}
	nav {
		display: flex;
		gap: 18px;
	}
	a:hover {
		color: var(--ink);
	}
</style>
