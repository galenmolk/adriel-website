export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span className="footer-brand">
          <span className="footer-name">Adriel Molk</span>
          <span className="footer-note">Have a lovely day!</span>
        </span>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} Adriel Molk</span>
        </div>
      </div>
    </footer>
  );
}
