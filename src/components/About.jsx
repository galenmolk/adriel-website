import { ABOUT } from '../content';
import Photo from './Photo';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about-panel">
        <div className="about-grid">
          <div>
            <p className="kicker kicker-sage">
              <span className="kicker-dot" aria-hidden="true" />
              About
            </p>
            <h2 className="about-title">{ABOUT.title}</h2>
            {ABOUT.paragraphs.map((text, i) => (
              <p key={i} className="about-body">
                {text}
              </p>
            ))}
          </div>
          <div className="about-portrait">
            <Photo photo={ABOUT.portrait} />
          </div>
        </div>
      </div>
    </section>
  );
}
