import React from 'react';
import { APP_URL, CONTACT_EMAIL } from '../constants/config';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          {/* Brand info */}
          <div className="footer-brand">
            <a href="#" className="brand-link" aria-label="Campus Connect Home">
              <svg
                className="brand-logo-svg"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="50%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="footerLogoCap" x1="10" y1="8" x2="30" y2="22" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E0E7FF" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#footerLogoGrad)" />
                <rect x="2" y="2" width="36" height="36" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <path d="M20 9L31 15L20 21L9 15L20 9Z" fill="url(#footerLogoCap)" />
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
            <p className="footer-desc">
              The unified campus operating ecosystem designed for modern universities and colleges.
              Connecting students, educators, placement officers, and leaders.
            </p>
          </div>

          {/* Links groups */}
          <div className="footer-links">
            <div className="footer-link-group">
              <span className="footer-group-title">Portals</span>
              <a href="#portals" className="footer-link">Student Portal</a>
              <a href="#portals" className="footer-link">Professor Portal</a>
              <a href="#portals" className="footer-link">Placement (TPO)</a>
              <a href="#portals" className="footer-link">Administration</a>
            </div>

            <div className="footer-link-group">
              <span className="footer-group-title">Platform</span>
              <a href="#architecture-title" className="footer-link">Multi-Tenancy</a>
              <a href="#architecture-title" className="footer-link">Security & Privacy</a>
              <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="footer-link">Web Application</a>
            </div>

            <div className="footer-link-group">
              <span className="footer-group-title">Contact</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">Support & Inquiries</a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="footer-link">{CONTACT_EMAIL}</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Campus Connect. All rights reserved.</p>
          <p>Strict multi-tenant institutional isolation guaranteed.</p>
        </div>
      </div>
    </footer>
  );
}
