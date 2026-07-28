import placeholder from '../img/photo-placeholder.svg';

// The design system wants every content photo run through its `.washed` filter
// (saturate 0.6 / contrast 0.85). It drained Adriel's photos, so we show them
// straight — add `washed` back here if that call is ever revisited.
//
// Photos he has not supplied yet fall back to a neutral placeholder, which
// carries no alt text because it says nothing about the work.
export default function Photo({ photo }) {
  if (!photo) {
    return <img className="photo" src={placeholder} alt="" loading="lazy" decoding="async" />;
  }

  // WebP with a JPEG fallback — roughly a third less data for the browsers that
  // take it, and no broken image for the ones that do not.
  return (
    <picture>
      <source srcSet={photo.webp} type="image/webp" />
      <img
        className="photo"
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}
