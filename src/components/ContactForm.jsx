import { useState } from 'react';
import { TOPICS } from '../content';
import { ChevronDownIcon } from './icons';

// Where the form posts. Set REACT_APP_FORM_ENDPOINT in .env.local (or in the
// deploy environment) to a Formspree / Basin / Netlify Forms URL, or to your
// own function that forwards to Resend/Postmark. See README.md.
const ENDPOINT = process.env.REACT_APP_FORM_ENDPOINT || '';

// Deliberately never rendered as visible text — the client asked that no
// address appear on the page for scrapers to pick up.
const FALLBACK_ADDRESS = 'molkadriel@gmail.com';

const ERROR_MESSAGE = `That did not go through. Please try again, or email ${FALLBACK_ADDRESS} directly.`;

function mailtoFallback(data) {
  const body = [
    `From: ${data.name || ''}`,
    `Email: ${data.email || ''}`,
    `Phone: ${data.phone || ''}`,
    `About: ${data.topic || ''}`,
    '',
    data.message || '',
  ].join('\n');
  const subject = `Website enquiry — ${data.topic || ''}`;
  window.location.href = `mailto:${FALLBACK_ADDRESS}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({ topic, onTopicChange }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Honeypot: a bot fills every field it finds, a person never sees this one.
    if (formData.get('company')) {
      setSent(true);
      return;
    }

    setSending(true);
    setError('');

    if (/^https?:\/\//.test(ENDPOINT)) {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });
        if (!res.ok) throw new Error(`endpoint returned ${res.status}`);
        setSent(true);
      } catch (err) {
        setError(ERROR_MESSAGE);
      } finally {
        setSending(false);
      }
      return;
    }

    // No endpoint configured yet: hand off to the visitor's mail client so the
    // form is never a dead end. Configure REACT_APP_FORM_ENDPOINT before launch
    // — the client asked that messages send without a mail-app detour.
    console.warn(
      'REACT_APP_FORM_ENDPOINT is not set — falling back to a mailto: handoff.'
    );
    mailtoFallback(Object.fromEntries(formData.entries()));
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="sent">
        <span className="sent-check" aria-hidden="true">
          ✓
        </span>
        <h3 className="sent-title">Message on its way</h3>
        <p className="sent-body">
          Thanks for writing. Adriel reads these himself and will get back to you as
          soon as he can.
        </p>
        <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value={`Website enquiry — ${topic}`} />
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="af-company">Company</label>
        <input id="af-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="af-name">Your name</label>
        <input
          className="input"
          id="af-name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="af-email">Email</label>
        <input
          className="input"
          id="af-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="af-phone">
          Phone <span className="field-optional">(optional)</span>
        </label>
        <input className="input" id="af-phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="field">
        <label htmlFor="af-topic">What is this about?</label>
        <div className="select-wrap">
          <select
            className="input"
            id="af-topic"
            name="topic"
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
          >
            {TOPICS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="select-chevron" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="af-message">Message</label>
        <textarea className="input" id="af-message" name="message" rows="5" required />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn btn-block btn-submit" disabled={sending}>
        {sending ? 'Sending…' : 'Let me know'}
      </button>
    </form>
  );
}
