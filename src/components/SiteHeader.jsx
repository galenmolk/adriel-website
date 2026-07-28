import { NAV_LINKS } from '../content';

export default function SiteHeader({ onPickService }) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Sections">
        <a className="nav-brand" href="#top">
          Adriel&nbsp;Molk
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.slug}
              className="nav-link"
              href={`#${link.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onPickService(link.slug);
              }}
            >
              {link.label}
            </a>
          ))}
          <a className="nav-link" href="#about">
            About
          </a>
        </div>
        <a className="btn btn-primary nav-cta" href="#contact">
          Let’s talk
        </a>
      </nav>
    </header>
  );
}
