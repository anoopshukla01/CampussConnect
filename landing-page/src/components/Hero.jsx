import React from 'react';
import { APP_URL } from '../constants/config';
import AppMockWindow from './AppMockWindow';

export default function Hero() {
  return (
    <section className="hero-section" aria-label="Hero Introduction">
      {/* Background drifting blurred blobs */}
      <div className="blob-container" aria-hidden="true">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container hero-grid">
        {/* Left Column: Copy & Actions */}
        <div className="hero-content">
          <div className="hero-badge animate-enter-1">
            <span style={{ fontSize: '1rem' }} aria-hidden="true">🎓</span>
            <span>The All-In-One Higher Ed Platform</span>
          </div>

          <h1 className="hero-title animate-enter-2">
            Your whole campus, <br />
            <span className="hero-title-accent">in one app.</span>
          </h1>

          <p className="hero-subcopy animate-enter-3">
            Campus Connect brings students, professors, placement officers, and college administrators into one connected ecosystem.
            Real-time timetables, attendance tracking, placement drives, and multi-tenant security — with zero mixed-up data.
          </p>

          <div className="hero-buttons animate-enter-4">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-large"
              aria-label="Open the Campus Connect app"
            >
              <span>Open the app</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>

            <a href="#portals" className="btn-secondary btn-large">
              <span>See each portal</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Floating App Mock Window */}
        <div className="hero-visual">
          <AppMockWindow />
        </div>
      </div>
    </section>
  );
}
