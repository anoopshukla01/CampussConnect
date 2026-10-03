import React from 'react';
import { APP_URL, CONTACT_EMAIL } from '../constants/config';

export default function CtaSection() {
  return (
    <section id="contact" className="cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="cta-box scroll-reveal">
          <h2 id="cta-heading" className="cta-title">
            Ready to bring your whole campus together?
          </h2>
          <p className="cta-subcopy">
            Deploy Campus Connect for your institution today. Experience seamless attendance,
            transparent evaluations, active placement drives, and verified multi-tenancy.
          </p>

          <div className="cta-actions">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white"
              aria-label="Open the Campus Connect web app"
            >
              <span>Open the app</span>
            </a>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn-outline-white"
              aria-label={`Email us at ${CONTACT_EMAIL}`}
            >
              <span>Email us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
