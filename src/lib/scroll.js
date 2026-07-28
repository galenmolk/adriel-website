// Enough offset to clear the sticky header. Sections also carry
// scroll-margin-top for plain hash navigation.
const HEADER_OFFSET = 76;

// Deferred a frame: a tab change may have just added the target section to the
// DOM, and scrollIntoView cannot take the header offset into account.
export function scrollToId(id) {
  window.requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (!el || typeof window.scrollTo !== 'function') return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      behavior: 'smooth',
    });
  });
}
