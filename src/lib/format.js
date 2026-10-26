const TZ = 'Australia/Sydney';

const short = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', timeZone: TZ });
const long = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ });
const yearOnly = new Intl.DateTimeFormat('en-AU', { year: 'numeric', timeZone: TZ });

/** "25 Oct" */
export const shortDate = (iso) => short.format(new Date(iso));
/** "25 October 2026" */
export const longDate = (iso) => long.format(new Date(iso));
/** "2026" */
export const year = (iso) => yearOnly.format(new Date(iso));
