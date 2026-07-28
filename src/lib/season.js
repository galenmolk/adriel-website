// The hero greeting follows the season on the visitor's own clock.
// Northern-hemisphere dates; computed at render, never cached.

// Each greeting is a list of lines, broken by hand rather than left to wrap —
// the h1 is set to a 15ch measure and an unlucky break reads badly at that size.
const SEASONS = {
  spring: ['Happy, healthy', 'spring to you!'],
  summer: ['Happy summer', 'to you!'],
  autumn: ['Happy, golden', 'autumn to you!'],
  winter: ['Happy, cozy', 'winter to you!'],
};

export function seasonNow(date = new Date()) {
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  if (md >= 320 && md <= 620) return 'spring';
  if (md >= 621 && md <= 921) return 'summer';
  if (md >= 922 && md <= 1220) return 'autumn';
  return 'winter';
}

export function seasonalGreeting(date = new Date()) {
  return SEASONS[seasonNow(date)];
}
