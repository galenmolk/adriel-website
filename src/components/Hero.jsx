import { GREETINGS, HERO_LEDE } from '../content';
import { seasonalGreeting } from '../lib/season';
import ServiceArea from './ServiceArea';

// One word shows at a time, roughly 1.15s each, on a ~58s loop. The whole
// stack is absolutely positioned inside a fixed-height box so nothing shifts.
const STEP = 1.6;
const CYCLE = GREETINGS.length * STEP;

function GreetingCycle() {
  return (
    <span className="greet">
      <span className="greet-stack">
        {GREETINGS.map((greeting, i) => (
          <span
            key={greeting.lang}
            className="greet-word"
            lang={greeting.lang}
            dir={greeting.dir}
            style={{ animationDuration: `${CYCLE}s`, animationDelay: `${i * STEP}s` }}
          >
            {greeting.text}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const greetingLines = seasonalGreeting();

  return (
    <section className="hero" id="top">
      <div className="hero-circle" aria-hidden="true" />
      <div className="hero-inner">
        <GreetingCycle />
        <h1 className="hero-title">
          {greetingLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="hero-lede">{HERO_LEDE}</p>
        <div className="hero-actions">
          <a className="btn btn-primary btn-hero-primary" href="#contact">
            Get in touch
          </a>
          {/* Offerings, not a service section: the tab filter can unmount
              #landscaping, and an anchor to a missing element does nothing. */}
          <a className="btn btn-hero-secondary" href="#offerings">
            See the work
          </a>
        </div>
        <ServiceArea />
      </div>
    </section>
  );
}
