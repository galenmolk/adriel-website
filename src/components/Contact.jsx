import { CONTACT_LEDE, CONTACT_TITLE, NEXTDOOR_URL } from '../content';
import ContactForm from './ContactForm';
import { TreeIcon } from './icons';

export default function Contact({ topic, onTopicChange }) {
  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <div>
          <p className="kicker">
            <TreeIcon />
            Contact
          </p>
          <h2 className="service-title">{CONTACT_TITLE}</h2>
          <p className="contact-lede">{CONTACT_LEDE}</p>
        </div>
        <div>
          <div className="form-panel">
            <ContactForm topic={topic} onTopicChange={onTopicChange} />
          </div>
          <p className="contact-elsewhere">
            <a href={NEXTDOOR_URL} target="_blank" rel="noopener noreferrer">
              Find me on Nextdoor
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
