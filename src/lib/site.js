export const SITE = {
	name: 'Yao Ke',
	url: 'https://yaoke.pro',
	description: 'Yao Ke builds tools for AI agents and writes about being human.',
	email: 'hello@yaoke.pro',
	links: {
		github: 'https://github.com/yail259',
		x: 'https://x.com/yail259',
		linkedin: 'https://au.linkedin.com/in/yao-ke-505085247'
	}
};

/** The name of the writing (the old How to Be Human blog plus engineering posts). */
export const WRITING_NAME = 'Second Thoughts';

export const TAGS = {
	human: 'Being human',
	engineering: 'Engineering'
};

/** The two things I'm building now. */
export const FEATURED = [
	{
		name: 'Restless',
		slug: 'restless',
		year: '2026',
		line: 'A busy day. 1 decision.',
		href: 'https://restless.run',
		cover: {
			src: '/images/projects/restless.webp',
			small: '/images/projects/restless-600.webp',
			alt: 'Winslow Homer, The Blue Boat (1892): two men paddling a blue canoe on a still river. Public domain.'
		}
	},
	{
		name: 'FrankenSurf',
		slug: 'frankensurf',
		year: '2026',
		stars: 101,
		line: 'One call that gets your agent through any site, stitched from 28 browsing tools.',
		href: 'https://github.com/yail259/frankensurf',
		cover: {
			src: '/images/projects/frankensurf.webp',
			small: '/images/projects/frankensurf-600.webp',
			alt: "Winslow Homer, Prout's Neck, Surf on Rocks (1895): waves breaking on dark rocks under a red evening sky. Public domain."
		}
	}
];

/** Projects that got traction, stars or are worth thinking about. */
export const SELECTED = [
	{
		name: 'Markdown UI',
		line: 'A micro-spec for embedding interactive UI widgets in Markdown, for LLMs.',
		meta: '★ 500+',
		href: 'https://markdown-ui.yaoke.pro'
	},
	{
		name: 'Playertwo',
		line: 'Multiplayer without networking.',
		meta: '★ 30',
		href: 'https://github.com/yail259/playertwo'
	},
	{
		name: 'Ptero',
		line: 'Docusaurus for Svelte.',
		meta: '★ 16',
		href: 'https://github.com/yail259/ptero'
	},
	{
		name: 'Overnight',
		line: 'Queue Claude Code tasks, run them overnight, wake up to results.',
		meta: '★ 12',
		href: 'https://github.com/yail259/overnight'
	},
	{
		name: 'Hoist',
		line: 'A safe, functional DSL for LLM orchestration.',
		meta: 'DSL',
		href: 'https://github.com/yail259/Hoist'
	}
];

/** Toys and learning projects. */
export const TOYS = [
	{ name: 'Prompt Injector', line: 'Generates multi-turn prompt injection conversations to test AI systems.', href: 'https://github.com/BlueprintLabIO/prompt-injector' },
	{ name: 'Theory of Mind AI', line: 'Agents that track what the person they are talking to is thinking.', href: 'https://github.com/BlueprintLabIO/theory-of-mind-ai' },
	{ name: 'Time AI', line: 'Time-aware utilities for LLM apps: natural dates, temporal context.', href: 'https://github.com/BlueprintLabIO/time-ai' },
	{ name: 'Waiting on you', line: 'How long did your AI agents wait on you? Reads Claude Code and Codex logs locally.', href: 'https://github.com/yail259/waiting-on-you' },
	{ name: 'LunarLink', line: 'Compare answers from OpenAI, Google and Anthropic side by side.', href: 'https://lunarlinkai.com' },
	{ name: 'Design Analyser', line: 'Extracts a design system from any website.', href: 'https://design-analyser.blueprintlab.io/' },
	{ name: 'AI Impersonator', line: 'Role-play prompts for famous programmers.', href: 'https://ai-impersonator.blueprintlab.io/' },
	{ name: 'C4-Flow', line: 'An LLM-friendly, human-readable code architecture modelling tool.', href: 'https://github.com/yail259/C4-Flow' },
	{ name: 'PostDoc', line: 'A command-line wizard for generating documentation.', href: 'https://github.com/yail259/PostDoc' },
	{ name: 'OpenRealtime', line: 'Open-source voice AI on Cloudflare’s edge network.', href: 'https://github.com/yail259/OpenRealtime' },
	{ name: 'Tipos', line: 'A 3D multiplayer creature game in Rust and Bevy.', href: null },
	{ name: 'Thymelake', line: 'QR code ordering for a local café, with Square and SMS.', href: 'https://app.thymelake.com/shop/S0VPARWD9H4RV/customer' }
];
