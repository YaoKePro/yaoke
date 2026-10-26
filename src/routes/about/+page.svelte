<script>
	import Seo from '$lib/components/Seo.svelte';
	import { SITE } from '$lib/site.js';
</script>

<Seo title="About" />

<div class="column page">
	<h1>About</h1>
	<div class="prose">
		<p>Hello, I'm Yao Ke. Developer and occasional writer. I enjoy solving problems creatively.</p>
		<p>
			Right now I'm building <a href="https://restless.run">Restless</a> and
			<a href="https://github.com/yail259/frankensurf">FrankenSurf</a>. You can see the rest on the
			<a href="/projects">projects</a> page, and read what I've been thinking about under
			<a href="/writing">writing</a>.
		</p>
		<p>Say hello at <a href="mailto:{SITE.email}">{SITE.email}</a>.</p>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 32px;
		padding-top: 24px;
	}
	h1 {
		margin: 0;
		font-family: var(--serif);
		font-weight: 400;
		font-size: 40px;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}
</style>
