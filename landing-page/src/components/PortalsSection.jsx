import React from 'react';

const PORTALS = [
  {
    role: 'Student',
    color: '#38bdf8',
    softColor: 'rgba(56, 189, 248, 0.12)',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    badge: 'Academics & Life',
    title: 'Student Portal',
    subcopy: 'Everything a student needs to stay on schedule, submit work, and launch their career.',
    bullets: [
      'Live personalized timetable with lecture halls, subjects, and timing.',
      'Daily attendance tracking with automatic alerts when falling below the 75% threshold.',
      'Assignment submissions, syllabus repository, and transparent continuous grading.',
      'Curated E-Library, past year question papers (PYQs), and verified student marketplace.',
    ],
  },
  {
    role: 'Professor',
    color: '#f472b6',
    softColor: 'rgba(244, 114, 182, 0.12)',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    badge: 'Teaching & Grading',
    title: 'Professor Portal',
    subcopy: 'Effortless classroom management without spreadsheets, lost paperwork, or manual tallies.',
    bullets: [
      'One-tap roll call attendance marking scoped strictly to assigned teaching classes.',
      'Digital assignment distribution with strict deadlines and quick grading workflows.',
      'Secure gradebook management with audit trails and 15-day re-evaluation windows.',
      'Direct announcements and lecture notes broadcast straight to your enrolled students.',
    ],
  },
  {
    role: 'Placement',
    color: '#34d399',
    softColor: 'rgba(52, 211, 153, 0.12)',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    badge: 'Career & Drives',
    title: 'Placement Cell (TPO)',
    subcopy: 'Coordinate recruitment drives, company profiles, and shortlists with zero administrative friction.',
    bullets: [
      'Manage on-campus and virtual hiring drives, schedules, and job descriptions in one place.',
      'Instant eligibility filtering by academic branch, CGPA, backlogs, and graduation year.',
      'Multi-round progression tracking with real-time shortlist publishing to applicants.',
      'Placement rate analytics, offer letter verification, and institutional CTC reports.',
    ],
  },
  {
    role: 'Admin',
    color: '#6366f1',
    softColor: 'rgba(99, 102, 241, 0.12)',
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    badge: 'Governance & Security',
    title: 'Administration Portal',
    subcopy: 'Central command for departments, student rosters, faculty assignments, and institutional controls.',
    bullets: [
      'Multi-tenant college partitioning — your institution’s records remain completely isolated.',
      'Bulk roll number CSV imports with format validation for instant student verification.',
      'Department and academic branch creation with faculty class-assignment mapping.',
      'College-wide announcements, role auditing, and institutional settings management.',
    ],
  },
];

export default function PortalsSection() {
  return (
    <section id="portals" className="section-wrapper section-alt" aria-labelledby="portals-title">
      <div className="container">
        <div className="section-header scroll-reveal">
          <span className="section-tag">Dedicated Workspaces</span>
          <h2 id="portals-title" className="section-title">
            A portal for each person on campus
          </h2>
          <p className="section-subcopy">
            No bloated all-in-one views. Each stakeholder gets a clean, fast dashboard focused entirely
            on their daily responsibilities.
          </p>
        </div>

        <div className="role-cards-grid">
          {PORTALS.map((portal) => (
            <article
              key={portal.role}
              className="role-card scroll-reveal"
              style={{
                '--card-role-color': portal.color,
                '--card-role-soft': portal.softColor,
              }}
              aria-label={`${portal.title} overview`}
            >
              <div className="role-card-header">
                <div className="role-icon-wrap" aria-hidden="true">
                  {portal.icon}
                </div>
                <span className="role-badge">{portal.badge}</span>
              </div>

              <div className="role-card-titles">
                <h3 className="role-card-title">{portal.title}</h3>
                <p className="role-card-subcopy">{portal.subcopy}</p>
              </div>

              <ul className="role-bullet-list" role="list">
                {portal.bullets.map((bullet, idx) => (
                  <li key={idx} className="role-bullet-item">
                    <svg
                      className="role-bullet-check"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
