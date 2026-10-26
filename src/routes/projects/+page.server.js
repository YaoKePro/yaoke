import mosaics from '$lib/data/mosaics.json';

export function load() {
	return { mosaics: { restless: mosaics['project:restless'], frankensurf: mosaics['project:frankensurf'] } };
}
