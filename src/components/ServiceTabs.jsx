import { SERVICES } from '../content';

const TABS = [{ slug: 'all', label: 'Everything' }].concat(
  SERVICES.map((s) => ({ slug: s.slug, label: s.name }))
);

export default function ServiceTabs({ active, onSelect }) {
  return (
    <section className="tabs-section" aria-label="Choose a service">
      <div className="tablist" role="tablist" aria-label="Services">
        {TABS.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            role="tab"
            className="tab"
            aria-selected={active === tab.slug}
            aria-controls={tab.slug === 'all' ? undefined : tab.slug}
            onClick={() => onSelect(tab.slug)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </section>
  );
}
