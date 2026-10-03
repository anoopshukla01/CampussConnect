import React from 'react';
import { APP_URL } from '../constants/config';

export default function Navbar() {
  return (
    <header className="nav-header" role="banner">
      <div className="container nav-container">
        <a href="#" className="brand-link" aria-label="Campus Connect Home">
          <svg
            className="brand-logo-svg"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="navLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
              <linearGradient id="navLogoCap" x1="10" y1="8" x2="30" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E0E7FF" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#navLogoGrad)" />
            <rect x="2" y="2" width="36" height="36" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            <path d="M20 9L31 15L20 21L9 15L20 9Z" fill="url(#navLogoCap)" />
            <path
              d="M13 17.5V22.5C13 24.5 16.1 26 20 26C23.9 26 27 24.5 27 22.5V17.5"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M29 16.5V22.5L30.5 24"
              stroke="#FDE047"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="30" r="2.2" fill="#38BDF8" />
            <circle cx="20" cy="31.5" r="2.2" fill="#F472B6" />
            <circle cx="30" cy="30" r="2.2" fill="#34D399" />
            <path
              d="M12 29.5C14.5 28 17 27.5 20 27.5C23 27.5 25.5 28 28 29.5"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
          </svg>
          <span>Campus Connect</span>
        </a>

        <nav className="nav-actions" aria-label="Main Navigation">
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            aria-label="Open the Campus Connect web app"
          >
            <span>Open the app</span>
            <svg
              width="14"
              height="14"
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
        </nav>
      </div>
    </header>
  );
}
