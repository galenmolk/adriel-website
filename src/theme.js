// The page "ground" — background, panels and hairlines. These sit outside the
// Organic design system (which ships a cream default); the client chose the
// light green. App.jsx pushes the active ground onto :root as CSS custom
// properties, so styles/site.css can read them as var(--ground-*).

export const GROUNDS = {
  green: {
    bg: '#e9f0dd', // page background (also painted on <body>)
    card: '#f4f8ec', // About panel
    navBg: 'rgba(233,240,221,0.88)', // sticky header, behind a 10px blur
    line: 'rgba(32,30,29,0.11)', // hairline borders
    soft: '#d9e6c4', // decorative circle behind the hero
    chipHover: 'rgba(32,30,29,0.06)', // service tag chips
    formBg: '#eff5e4', // contact form panel (sage-leaning)
    formLine: 'rgba(86,99,63,0.22)',
  },
  cream: {
    bg: '#f5ead8',
    card: '#fdf7ec',
    navBg: 'rgba(245,234,216,0.88)',
    line: 'rgba(32,30,29,0.11)',
    soft: '#e1eecc',
    chipHover: 'rgba(32,30,29,0.06)',
    formBg: '#f2f5e6',
    formLine: 'rgba(86,99,63,0.22)',
  },
};

export const DEFAULT_GROUND = 'green';

const CSS_VAR = {
  bg: '--ground-bg',
  card: '--ground-card',
  navBg: '--ground-nav',
  line: '--ground-line',
  soft: '--ground-soft',
  chipHover: '--ground-chip',
  formBg: '--ground-form-bg',
  formLine: '--ground-form-line',
};

export function applyGround(name = DEFAULT_GROUND) {
  const ground = GROUNDS[name] || GROUNDS[DEFAULT_GROUND];
  const root = document.documentElement;
  Object.entries(CSS_VAR).forEach(([key, cssVar]) => {
    root.style.setProperty(cssVar, ground[key]);
  });
  return ground;
}
