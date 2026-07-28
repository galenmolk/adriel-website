import { useRef } from 'react';
import { SERVICE_AREA } from '../content';
import { MapPinIcon } from './icons';

// Nominal size of the map box, in the SVG's own units. The SVG stretches to
// whatever the box actually is (preserveAspectRatio="none"), which is what lets
// the box keep a fixed height while its width flexes. The towns and the trail
// stay glued together because both are placed as percentages of that same box.
const MAP_W = 340;
const MAP_H = 142;

// How hard a town leans toward the cursor, and how far it will ever go. The
// clamp is what makes the cursor eventually slide off: the town stops chasing,
// the pointer keeps going, and the pill springs home.
const PULL = 0.32;
const MAX_OFFSET = 10;

const point = (city) => ({ x: (city.x / 100) * MAP_W, y: (city.y / 100) * MAP_H });

// A wandering trail rather than a ruled line. Each leg is a cubic whose two
// control points are thrown to *opposite* sides of it, so the leg snakes rather
// than bowing once, and the throw alternates between legs. The result reads
// hand-drawn — a route someone traced, not a line something ruled.
function meanderPath(cities, bow = 16) {
  const pts = cities.map(point);
  const n = (v) => v.toFixed(1);
  return pts.slice(1).reduce((d, b, i) => {
    const a = pts[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const side = i % 2 === 0 ? 1 : -1;
    const px = (-dy / len) * bow * side; // perpendicular to this leg
    const py = (dx / len) * bow * side;
    const c1 = { x: a.x + dx * 0.3 + px, y: a.y + dy * 0.3 + py };
    const c2 = { x: a.x + dx * 0.7 - px, y: a.y + dy * 0.7 - py };
    return `${d} C ${n(c1.x)} ${n(c1.y)} ${n(c2.x)} ${n(c2.y)} ${n(b.x)} ${n(b.y)}`;
  }, `M ${n(pts[0].x)} ${n(pts[0].y)}`);
}

const wantsMotion = () =>
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function TownNode({ city }) {
  const ref = useRef(null);

  function follow(e) {
    const el = ref.current;
    const map = el && el.offsetParent;
    if (!map || !wantsMotion()) return;

    // Measure from the pill's resting place, via layout values the transform
    // cannot touch. getBoundingClientRect would report the position mid-
    // transition, and subtracting the *target* offset from an *in-flight* one
    // feeds the pull back into itself — the pill drifts even when the cursor is
    // perfectly still. offsetLeft/offsetTop are exactly the resting centre,
    // since translate(-50%, -50%) parks the centre on that point.
    const box = map.getBoundingClientRect();
    const originX = box.left + el.offsetLeft;
    const originY = box.top + el.offsetTop;

    let dx = (e.clientX - originX) * PULL;
    let dy = (e.clientY - originY) * PULL;
    const dist = Math.hypot(dx, dy);
    if (dist > MAX_OFFSET) {
      dx = (dx / dist) * MAX_OFFSET;
      dy = (dy / dist) * MAX_OFFSET;
    }

    el.style.setProperty('--mx', `${dx.toFixed(2)}px`);
    el.style.setProperty('--my', `${dy.toFixed(2)}px`);
  }

  function release() {
    const el = ref.current;
    if (!el) return;
    // Dropping the class hands the reset back to the springy transition.
    el.classList.remove('is-following');
    el.style.setProperty('--mx', '0px');
    el.style.setProperty('--my', '0px');
  }

  return (
    <li
      ref={ref}
      className="area-node"
      style={{ left: `${city.x}%`, top: `${city.y}%` }}
      onMouseEnter={() => wantsMotion() && ref.current?.classList.add('is-following')}
      onMouseMove={follow}
      onMouseLeave={release}
    >
      {city.name}
    </li>
  );
}

export default function ServiceArea() {
  return (
    <div className="area">
      <p className="area-label">
        <MapPinIcon />
        Available within 30 miles of
      </p>
      <div className="area-map">
        <svg
          className="area-lines"
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path className="area-trail" d={meanderPath(SERVICE_AREA)} />
        </svg>
        <ul className="area-list">
          {SERVICE_AREA.map((city) => (
            <TownNode key={city.name} city={city} />
          ))}
        </ul>
      </div>
    </div>
  );
}
