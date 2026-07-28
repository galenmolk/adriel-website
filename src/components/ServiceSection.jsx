import Photo from './Photo';
import { TreeIcon } from './icons';

export default function ServiceSection({ service, onAsk }) {
  return (
    <section className="service" id={service.slug}>
      <div className="service-grid">
        <div>
          <p className="kicker">
            <TreeIcon />
            {service.kicker}
          </p>
          <h2 className="service-title">{service.name}</h2>
          <p className="service-body">{service.body}</p>
          {service.tags.length > 0 && (
            <ul className="taglist">
              {service.tags.map((tag, i) => (
                <li key={`${tag}-${i}`} className="tag-chip">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <a
            className="btn btn-secondary btn-ask"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onAsk(service.name);
            }}
          >
            Ask about {service.name.toLowerCase()}
          </a>
        </div>
        <div className="service-media">
          <div className="media-main">
            <Photo photo={service.photos.main} />
          </div>
          <div className="media-circle">
            <div className="media-circle-shape">
              <Photo photo={service.photos.detail} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
