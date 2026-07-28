// Every word and picture on the page lives here.
//
// Anything starting [PLACEHOLDER] is draft copy, written from Adriel's own
// Nextdoor posts to sound like him, and waiting on his approval. Every fact in
// it came from something he actually wrote. Once he signs off, delete the
// [PLACEHOLDER] prefix; if he rewrites it, even better.
//
// Photos set to `null` fall back to a neutral placeholder image; to add a real
// one, drop the file in src/img, import it at the top of this file, and give it
// real alt text.

import portraitJpg from './img/adriel-portrait.jpg';
import portraitWebp from './img/adriel-portrait.webp';
import hairJpg from './img/hair-braiding.jpg';
import hairWebp from './img/hair-braiding.webp';
import hairDetailJpg from './img/hair-detail.jpg';
import hairDetailWebp from './img/hair-detail.webp';

export const NEXTDOOR_URL = 'https://nextdoor.com/profile/01w8TZFJpHQtq75K2/';

// Listed west to east, and placed roughly where they actually sit: Philomath is
// about six miles west of Corvallis, Albany about eleven to the north-east. So
// the little map runs south-west to north-east, and the line drawn between them
// is a real relationship rather than decoration. x/y are percentages of the map
// box; consecutive entries get joined by a line.
export const SERVICE_AREA = [
  { name: 'Philomath', x: 21, y: 85 },
  { name: 'Corvallis', x: 42, y: 50 },
  { name: 'Albany', x: 66, y: 15 },
];

export const HERO_LEDE =
  '[PLACEHOLDER] I’m your neighbor here in Corvallis. I do yard work, caregiving, hair art and folkdance lessons. I’m happy to provide references upon request.';

export const ABOUT = {
  title: 'Hi, I’m Adriel',
  paragraphs: [
    '[PLACEHOLDER] I’ve lived in Corvallis for about 31 years. I also spent a year and a half working and travelling, mostly in Bulgaria, Finland, Germany, Australia, New Zealand and Costa Rica. I enjoy meeting all kinds of people.',
    '[PLACEHOLDER] The rest of me: singing, language learning, board games, Renaissance fairs, hiking and camping in the Cascades, volunteering at the library and with Habitat for Humanity. I’ve done a few seasons of wildland firefighting too.',
  ],
  portrait: {
    src: portraitJpg,
    webp: portraitWebp,
    width: 640,
    height: 640,
    alt: 'Adriel Molk smiling outdoors in a knit cap, fir trees behind him.',
  },
};

export const CONTACT_TITLE = 'How can I help you out?';

export const CONTACT_LEDE =
  '[PLACEHOLDER] Tell me what you need done and roughly when. I read these myself and I’ll get back to you as soon as I can.';

// `tags` are the small chips under each service paragraph — a handful of short
// words each, however Adriel wants to use them.
export const SERVICES = [
  {
    slug: 'landscaping',
    num: '01',
    name: 'Landscaping',
    kicker: 'Yards, gardens and gutters',
    body: '[PLACEHOLDER] Mowing, raking, pruning, weeding, digging and hauling. Gutters and roofs too. I’ve worked as a wildland firefighter, so I have the stamina for the long jobs.',
    tags: ['Yard work', 'Gutters & roofs', 'Odd jobs'],
    photos: { main: null, detail: null },
  },
  {
    slug: 'caregiving',
    num: '02',
    name: 'Caregiving',
    kicker: 'Steady, patient company',
    body: '[PLACEHOLDER] I’ve been a part-time preschool teacher, and I look after both children and elders. With kids it’s reading, dancing, arts and crafts and creative play. Please let me know if you’d like professional references.',
    tags: ['Childcare', 'Elder care', 'Preschool'],
    photos: { main: null, detail: null },
  },
  {
    slug: 'hair',
    num: '03',
    name: 'Hair art & braiding',
    kicker: 'Braids and patterns',
    body: '[PLACEHOLDER] Braiding with a lot of different techniques. I sew in ribbons with an embroidery needle and add gemstones, beads, fresh or dried flowers, or whatever else you’d like. A big one takes about four hours.',
    tags: ['Braids', 'Ribbon work', 'Flowers'],
    photos: {
      main: {
        src: hairJpg,
        webp: hairWebp,
        width: 1020,
        height: 765,
        alt: 'Adriel tying a ribbon into a small child’s hair at an outdoor stall in the woods.',
      },
      detail: {
        src: hairDetailJpg,
        webp: hairDetailWebp,
        width: 400,
        height: 400,
        alt: 'Close-up of long hair woven with black and purple satin ribbons and pinned with dried flowers.',
      },
    },
  },
  {
    slug: 'folkdance',
    num: '04',
    name: 'Folkdance instruction',
    kicker: 'Circles, lines and music',
    body: '[PLACEHOLDER] Bulgarian, Albanian, Palestinian, Israeli, Balkan, English and Scottish traditional dances. I’ve learned hundreds of them travelling around the world. Beginners welcome.',
    // Formats rather than traditions — the paragraph already names the
    // traditions. NOT from Adriel's posts: needs his confirmation that he
    // actually offers all three.
    tags: ['Leading dances', 'Group classes', 'Private lessons'],
    photos: { main: null, detail: null },
  },
];

// Shorter labels for the header shortcut row. "Hair art" holds a non-breaking
// space so it never splits across two lines.
export const NAV_LINKS = [
  { slug: 'landscaping', label: 'Landscaping' },
  { slug: 'caregiving', label: 'Caregiving' },
  { slug: 'hair', label: 'Hair art' },
  { slug: 'folkdance', label: 'Folkdance' },
];

export const TOPICS = [
  'Landscaping',
  'Caregiving',
  'Hair art & braiding',
  'Folkdance instruction',
  'Something else',
];

// Drawn from the countries in Adriel's world-music playlists — not a generic
// list, please don't substitute one.
export const GREETINGS = [
  { text: 'Hello', lang: 'en' },
  { text: 'Hola', lang: 'es' },
  { text: 'Bonjour', lang: 'fr' },
  { text: 'Здравей', lang: 'bg' },
  { text: '你好', lang: 'zh' },
  { text: 'Hei', lang: 'fi' },
  { text: 'Γεια σου', lang: 'el' },
  { text: 'Olá', lang: 'pt' },
  { text: 'مرحبا', lang: 'ar', dir: 'rtl' },
  { text: 'Привет', lang: 'ru' },
  { text: 'Ciao', lang: 'it' },
  { text: 'Здраво', lang: 'sr' },
  { text: 'Hej', lang: 'sv' },
  { text: 'გამარჯობა', lang: 'ka' },
  { text: 'Merhaba', lang: 'tr' },
  { text: 'Cześć', lang: 'pl' },
  { text: 'नमस्ते', lang: 'hi' },
  { text: 'Bună', lang: 'ro' },
  { text: 'Բարև', lang: 'hy' },
  { text: 'Tere', lang: 'et' },
  { text: 'Përshëndetje', lang: 'sq' },
  { text: 'こんにちは', lang: 'ja' },
  { text: 'Привіт', lang: 'uk' },
  { text: 'Labas', lang: 'lt' },
  { text: 'שלום', lang: 'he', dir: 'rtl' },
  { text: 'Szia', lang: 'hu' },
  { text: 'Xin chào', lang: 'vi' },
  { text: 'Sveiki', lang: 'lv' },
  { text: 'Silav', lang: 'ku' },
  { text: '안녕하세요', lang: 'ko' },
  { text: 'Ahoj', lang: 'cs' },
  { text: 'Салам', lang: 'ky' },
  { text: 'Dia dhuit', lang: 'ga' },
  { text: 'สวัสดี', lang: 'th' },
  { text: 'Hallo', lang: 'nl' },
  { text: 'Demat', lang: 'br' },
];
