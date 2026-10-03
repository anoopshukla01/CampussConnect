import React, { useState, useEffect, useRef } from 'react';

const STEPS = [
  {
    number: '1',
    title: 'Admin imports roll numbers',
    description:
      'College administration uploads verified student roll numbers, branches, and faculty rosters via a standard CSV template.',
  },
  {
    number: '2',
    title: 'Student verifies with OTP & code',
    description:
      'Students sign up using their official college code, roll number, and phone/email OTP to instantly validate their enrollment.',
  },
  {
    number: '3',
    title: 'Account active, zero mixed-up data',
    description:
      'The portal unlocks immediately with role-specific permissions and complete multi-tenant database isolation.',
  },
];

const FACTS = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Strict Multi-Tenant Isolation',
    desc: 'Each college functions as an independent tenant. Academic records, attendance registries, and faculty data are isolated at the database and JWT claim level.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Zero Cross-Campus Leakage',
    desc: 'Backend gates cryptographically enforce college ID matching on every request. A student or faculty member can never view or query records from another campus.',
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Instant Institutional Onboarding',
    desc: 'Zero software to host or maintain. Institutions set up their academic branches, distribute their verification code, and launch their campus in under 30 minutes.',
  },
];

export default function MultiTenantSteps() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress between entering viewport and leaving top
      const start = windowHeight * 0.75;
      const end = windowHeight * 0.2;

      if (rect.top <= start && rect.bottom >= end) {
        const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
        setScrollProgress(progress);
      } else if (rect.top > start) {
        setScrollProgress(0);
      } else if (rect.bottom < end) {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="section-wrapper" aria-labelledby="architecture-title">
      <div className="container">
        <div className="section-header scroll-reveal">
          <span className="section-tag">Campus Multi-Tenancy</span>
          <h2 id="architecture-title" className="section-title">
            Many colleges, one platform, no mixed-up data
          </h2>
          <p className="section-subcopy">
            Engineered specifically for institutional security. Multiple universities and colleges operate
            autonomously with zero overlap or cross-contamination.
          </p>
        </div>

        {/* 3 Numbered Steps with Progress Line */}
        <div className="steps-timeline-wrap scroll-reveal">
          <div
            className="steps-line-track"
            style={{ '--line-progress': `${Math.max(scrollProgress * 100, 15)}%` }}
            aria-hidden="true"
          >
            <div className="steps-line-progress" />
          </div>

          <div className="steps-grid" role="list">
            {STEPS.map((step, idx) => {
              const isActive = scrollProgress >= (idx / (STEPS.length - 1)) * 0.75;
              return (
                <div
                  key={step.number}
                  className={`step-card ${isActive ? 'active-step' : ''}`}
                  role="listitem"
                >
                  <div className="step-number-circle" aria-hidden="true">
                    {step.number}
                  </div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Fact Blocks */}
        <div className="facts-grid scroll-reveal">
          {FACTS.map((fact, idx) => (
            <article key={idx} className="fact-block">
              <div className="fact-icon-wrap" aria-hidden="true">
                {fact.icon}
              </div>
              <h3 className="fact-title">{fact.title}</h3>
              <p className="fact-desc">{fact.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
