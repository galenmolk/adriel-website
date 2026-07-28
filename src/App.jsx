import { useEffect, useRef, useState } from 'react';

import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import ServiceSection from './components/ServiceSection';
import ServiceTabs from './components/ServiceTabs';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import { SERVICES } from './content';
import { scrollToId } from './lib/scroll';
import { applyGround } from './theme';

export default function App() {
  // 'all' or a service slug. The tabs filter which service sections render.
  const [active, setActive] = useState('all');
  // The contact form's subject. Lifted here because narrowing to a service —
  // by tab, by header shortcut, or by an "Ask about …" button — should leave the
  // form already pointed at it. The one piece of cross-section state.
  const [topic, setTopic] = useState('Landscaping');

  const pendingScroll = useRef(null);

  useEffect(() => {
    applyGround();
  }, []);

  // Runs after the newly selected section has been committed to the DOM, which
  // is why picking a tab and scrolling cannot happen in one step.
  useEffect(() => {
    if (!pendingScroll.current) return;
    scrollToId(pendingScroll.current);
    pendingScroll.current = null;
  });

  // Narrowing to one service also aims the contact form at it. 'Everything'
  // says nothing about intent, so it leaves the topic alone.
  function selectService(slug) {
    setActive(slug);
    const service = SERVICES.find((s) => s.slug === slug);
    if (service) setTopic(service.name);
  }

  function pickService(slug) {
    selectService(slug);
    pendingScroll.current = slug;
  }

  function askAbout(serviceName) {
    setTopic(serviceName);
    scrollToId('contact');
  }

  const shown = SERVICES.filter((s) => active === 'all' || active === s.slug);

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader onPickService={pickService} />

      <main id="main">
        <Hero />

        <section className="offerings" aria-label="Services">
          <h2 className="offerings-title" id="offerings">
            Offerings
          </h2>
        </section>

        <ServiceTabs active={active} onSelect={selectService} />

        {shown.map((service) => (
          <ServiceSection key={service.slug} service={service} onAsk={askAbout} />
        ))}

        <About />

        <Contact topic={topic} onTopicChange={setTopic} />
      </main>

      <SiteFooter />
    </div>
  );
}
