# Adriel Molk — personal business site

A single-page site for Adriel Molk of Corvallis, Oregon: landscaping, caregiving,
hair art & braiding, and folkdance instruction. Create React App, React 18, plain
CSS — no build-tool changes needed.

```bash
npm install
npm start      # http://localhost:3000
npm test       # component + behaviour tests
npm run build  # production bundle
npm run deploy # builds, then publishes build/ to the gh-pages branch
```

## Layout of the code

```
src/
  App.jsx              the page: tab filter state + the contact form's topic
  content.js           ALL copy and photo wiring — this is the file to edit
  theme.js             the "ground" palette (page bg, panels, hairlines)
  components/          one file per section of the page
  lib/season.js        picks the hero greeting from the visitor's date
  lib/scroll.js        smooth scroll that clears the sticky header
  styles/fonts.css     self-hosted @font-face rules
  styles/organic.css   the Organic design system — tokens and component classes
  styles/site.css      page styles, built from those tokens
  fonts/               Caprasimo + Figtree woff2
  img/                 optimised, correctly-cropped derivatives
photos-original/       full-resolution originals — never imported, never shipped
```

`styles/organic.css` is the design system's own file and the source of truth for
colour, type, radius and shadow. Retune it there rather than hard-coding hexes;
`site.css` only ever references its tokens.

## Adding Adriel's copy

Everything in `[square brackets]` in `src/content.js` is a placeholder waiting on
Adriel's own words: the opening paragraph, the four service paragraphs, all the
tag chips, both About paragraphs, and the contact intro. Each placeholder names
its slot and roughly how long it wants to be and nothing more — what goes in it
is his call. Replace the strings and leave the surrounding structure alone.

## Adding photographs

There are nine slots — a 4:3 photo and a 1:1 circle for each of the four
services, plus the About portrait. Three are filled; the rest fall back to a
neutral placeholder.

**Never import a camera original.** A phone photo is 2–4 MB, and this site gets
opened on rural cell signal. Keep the original in `photos-original/` and import a
cropped, resized derivative from `src/img`.

Target sizes, which are twice the largest size each slot is ever displayed at, so
they stay sharp on retina screens and no bigger:

| slot | dimensions | roughly |
| --- | --- | --- |
| service 4:3 photo | 1020 × 765 | 70–120 KB |
| service circle | 400 × 400 | 25–35 KB |
| About portrait | 640 × 640 | 70–90 KB |
| `public/og-image.jpg` | 1200 × 630 | social preview only, not loaded by visitors |

Ship **both** a `.webp` and a `.jpg` of each — `Photo.jsx` serves WebP to browsers
that support it and JPEG to those that don't. WebP at quality ~78 and JPEG at
quality ~80 (progressive) is the sweet spot; past that you add bytes without
adding visible detail.

[Squoosh](https://squoosh.app) does all of this in the browser with no upload —
pick Resize on the right, then MozJPEG for the `.jpg` and WebP for the `.webp`.
If you have Python with Pillow handy, cropping precisely is easier in a few lines
than by hand.

Then import both files at the top of `src/content.js` and fill in the slot:

```js
{ src: theJpg, webp: theWebp, width: 1020, height: 765, alt: 'a real description' }
```

Alt text is not optional — describe what is happening in the picture. Crop the
photo so the subject is where you want it rather than reaching for CSS
`object-position`; a baked crop also means fewer wasted bytes.

The design system asks for every content photo to go through its `.washed`
filter. It drained Adriel's photos, so `components/Photo.jsx` renders them
straight. Add the `washed` class back there if that call is ever revisited.

## The contact form

The form posts to whatever URL is in `REACT_APP_FORM_ENDPOINT`. Create
`.env.local` (git-ignored) for local work and set the same variable in the deploy
environment:

```
REACT_APP_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Any endpoint that accepts a `multipart/form-data` POST works — Formspree, Basin,
Netlify Forms, or your own function forwarding to Resend/Postmark/SES. Keep the
recipient address server-side.

**Until that variable is set the form falls back to a `mailto:` handoff**, which
opens the visitor's mail app. That is a stopgap so the form is never a dead end;
Adriel asked for messages that send without the detour, so configure the endpoint
before launch.

A honeypot field (`company`) is already in place — submissions that fill it are
silently dropped. If spam gets through anyway, add Turnstile or a rate limit at
the endpoint.

No email address is rendered anywhere on the page; that is a deliberate
anti-scraping requirement, and a test enforces it.

## SEO

This is **local service SEO**, not content marketing. Nobody searches "Adriel
Molk" except people who already know him. The searches that matter are
"landscaper corvallis", "hair braiding corvallis oregon", "in-home caregiver
philomath" — and for those, Google leans on the local map pack and on signals
that mostly live *off* this site.

What is wired up here:

- `<title>`, meta description, canonical URL
- Open Graph + Twitter card, so the link shows a photo and a summary when it is
  pasted into Nextdoor, Facebook or a text message
- `og-image.jpg` (1200×630, cropped from Adriel's portrait)
- JSON-LD `ProfessionalService` with `areaServed` for the three cities, the four
  services as an offer catalog, and the Nextdoor profile as `sameAs`
- `robots.txt` and `sitemap.xml`
- Semantic structure: one `h1`, an `h2` per service, real `<label for>` on every
  form control, alt text on the photos that exist

The `<title>` names only Corvallis. Titles have roughly sixty usable characters,
and listing three towns there reads as keyword stuffing and dilutes all three.
Philomath and Albany are carried by the meta description, by `areaServed` in the
structured data, and by the service-area block on the page itself — which is what
Google actually reads to work out his radius.

If the site moves to its own domain, update the URL in four places: `homepage` in
`package.json`, `canonical` and `og:url` in `public/index.html`, and `sitemap.xml`.

**Do not fabricate anything in the JSON-LD.** No invented phone number, hours,
address or reviews. Fake review markup is the one SEO mistake that gets a small
site penalised rather than ignored.

### What actually moves the needle, in order

1. **A Google Business Profile.** Free, and it is the single biggest factor for
   every search above. It is also the only way to appear in the map pack, which
   sits above the normal results.
2. **Real copy.** Every service paragraph is still a placeholder. Search engines
   have nothing to index and no reason to rank the page. No meta tag substitutes
   for words on the page.
3. **A real domain.** `galenmolk.github.io/adriel-website` reads as a hobby
   project to both people and search engines, and it cannot be listed
   consistently across directories.
4. **Consistent name and contact details** everywhere he is listed — Google,
   Nextdoor, anywhere else. Mismatches split his identity across profiles.

## Things that look like mistakes but are not

- Headings carry a `-0.028em` left margin. It is an optical-alignment nudge.
- The service-area city labels use a 10px radius while everything else is a pill.
  Pills on this page are clickable; those are labels.
- Buttons use the 700/800 steps of the terracotta ramp, never base `--color-accent`,
  which fails contrast at button label sizes on this background.
- There is exactly one media query, and it only hides the header's section
  shortcuts below 861px, where the row starts getting clipped. Every other
  breakpoint is `clamp()`, an `auto-fit` grid, or `flex-wrap`. Keep it that way.
- `body { overflow-x: clip }` lets the decorative hero circle bleed off the right
  edge without creating a horizontal scrollbar.

## Weight

A first visit is about **276 KB** in total, and only ~108 KB of that has to
arrive before the page is readable:

| | |
| --- | --- |
| HTML + JS + CSS (gzip) | 58 KB |
| fonts (woff2) | 50 KB |
| photos (WebP, lazy-loaded) | 168 KB |

Fonts are self-hosted, so the page makes **no third-party requests at all** — no
Google Fonts handshake before text can paint. If you add fonts or weights, put
the files in `src/fonts` and the `@font-face` rules in `src/styles/fonts.css`.
Figtree is a variable font: one file per subset covers 400 through 700, which is
why its weight descriptor is a range.

## Deploying

`npm run deploy` publishes to GitHub Pages at the URL in `package.json`'s
`homepage` field. If the site moves to a custom domain, update that field.
