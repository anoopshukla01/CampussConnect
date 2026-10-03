import React, { useState, useEffect, useRef, useCallback } from 'react';

const TABS = [
  {
    id: 'student',
    label: 'Student',
    roleColor: '#38bdf8',
    roleSoft: 'rgba(56, 189, 248, 0.12)',
    sidebarItems: [
      { name: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: 'Timetable', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { name: 'Attendance', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { name: 'E-Library', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    ],
    stats: [
      { label: 'Attendance', value: 86, isPercentage: true, hasRing: true },
      { label: 'Cumulative GPA', value: 8.94, isFloat: true, suffix: '' },
      { label: 'Pending Tasks', value: 4, suffix: ' due' },
    ],
    rows: [
      {
        title: 'Database Management Systems',
        meta: 'Room 302 • 10:00 AM',
        badge: 'Ongoing',
        badgeBg: 'rgba(56, 189, 248, 0.15)',
        badgeColor: '#0284c7',
      },
      {
        title: 'Operating Systems Assignment 2',
        meta: 'Prof. Sharma • Submission Box',
        badge: 'Due Tomorrow',
        badgeBg: 'rgba(245, 158, 11, 0.15)',
        badgeColor: '#b45309',
      },
      {
        title: 'TCS Digital Campus Drive',
        meta: 'Eligibility Verified • Batch 2025',
        badge: 'Shortlisted',
        badgeBg: 'rgba(34, 197, 94, 0.15)',
        badgeColor: '#15803d',
      },
    ],
  },
  {
    id: 'professor',
    label: 'Professor',
    roleColor: '#f472b6',
    roleSoft: 'rgba(244, 114, 182, 0.12)',
    sidebarItems: [
      { name: 'My Classes', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { name: 'Roll Call', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
      { name: 'Gradebook', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      { name: 'Announce', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    ],
    stats: [
      { label: 'Assigned Classes', value: 3, suffix: ' batches' },
      { label: 'Avg Attendance', value: 94, isPercentage: true },
      { label: 'Ungraded Papers', value: 12, suffix: ' pending' },
    ],
    rows: [
      {
        title: 'CS301: Data Structures (Sec A)',
        meta: 'Period 2 • 48 / 52 Present',
        badge: 'Submitted',
        badgeBg: 'rgba(34, 197, 94, 0.15)',
        badgeColor: '#15803d',
      },
      {
        title: 'CS402: Cloud Computing Lab',
        meta: 'Continuous Assessment 1 Graded',
        badge: 'Evaluation Done',
        badgeBg: 'rgba(244, 114, 182, 0.15)',
        badgeColor: '#db2777',
      },
      {
        title: 'Mid-Term Exam Syllabus Upload',
        meta: 'Distributed to 184 students',
        badge: 'Published',
        badgeBg: 'rgba(99, 102, 241, 0.15)',
        badgeColor: '#4f46e5',
      },
    ],
  },
  {
    id: 'placement',
    label: 'Placement',
    roleColor: '#34d399',
    roleSoft: 'rgba(52, 211, 153, 0.12)',
    sidebarItems: [
      { name: 'Live Drives', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { name: 'Companies', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
      { name: 'Eligibility', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      { name: 'Statistics', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
    ],
    stats: [
      { label: 'Active Drives', value: 28, suffix: ' live' },
      { label: 'Offers Released', value: 142, suffix: ' students' },
      { label: 'Avg Package', value: 9.8, isFloat: true, suffix: ' LPA' },
    ],
    rows: [
      {
        title: 'Microsoft India Recruitment',
        meta: 'Round 2 Technical Shortlist (24 students)',
        badge: 'Shortlist Out',
        badgeBg: 'rgba(52, 211, 153, 0.15)',
        badgeColor: '#059669',
      },
      {
        title: 'Goldman Sachs Pre-Placement Talk',
        meta: 'Main Auditorium • 11:00 AM Today',
        badge: 'Scheduled',
        badgeBg: 'rgba(56, 189, 248, 0.15)',
        badgeColor: '#0284c7',
      },
      {
        title: 'Infosys Power Programmer',
        meta: 'CSE, IT, ECE • Min 7.5 CGPA Filter',
        badge: 'Applications Open',
        badgeBg: 'rgba(99, 102, 241, 0.15)',
        badgeColor: '#4f46e5',
      },
    ],
  },
  {
    id: 'admin',
    label: 'Admin',
    roleColor: '#6366f1',
    roleSoft: 'rgba(99, 102, 241, 0.12)',
    sidebarItems: [
      { name: 'Branches', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
      { name: 'Roll Import', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
      { name: 'Faculty Roster', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
      { name: 'Tenancy', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    ],
    stats: [
      { label: 'Active Branches', value: 6, suffix: ' programs' },
      { label: 'Verified Students', value: 2450, isFormatted: true },
      { label: 'Faculty Assigned', value: 84, suffix: ' staff' },
    ],
    rows: [
      {
        title: 'Batch 2024-2028 Roll Numbers',
        meta: 'CSV Import • 720 Records Verified',
        badge: 'Completed',
        badgeBg: 'rgba(34, 197, 94, 0.15)',
        badgeColor: '#15803d',
      },
      {
        title: 'Computer Science & Engineering',
        meta: '12 Faculty Assigned to 24 Classes',
        badge: 'Configured',
        badgeBg: 'rgba(99, 102, 241, 0.15)',
        badgeColor: '#4f46e5',
      },
      {
        title: 'Institutional College Code: IEC-08',
        meta: 'Multi-Tenant Security Gate Enforced',
        badge: 'Isolated',
        badgeBg: 'rgba(56, 189, 248, 0.15)',
        badgeColor: '#0284c7',
      },
    ],
  },
];

// Helper for count-up animation using requestAnimationFrame
function CountUpNumber({ targetValue, isPercentage, isFloat, isFormatted, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 650; // ms
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * targetValue;

      if (isFloat) {
        setDisplayValue(current.toFixed(2));
      } else if (isFormatted) {
        setDisplayValue(Math.floor(current).toLocaleString());
      } else {
        setDisplayValue(Math.floor(current));
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        if (isFloat) setDisplayValue(targetValue.toFixed(2));
        else if (isFormatted) setDisplayValue(targetValue.toLocaleString());
        else setDisplayValue(targetValue);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [targetValue, isFloat, isFormatted]);

  return (
    <span>
      {displayValue}
      {isPercentage ? '%' : ''}
      {suffix}
    </span>
  );
}

export default function AppMockWindow() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const activeTab = TABS[activeTabIdx];

  const CYCLE_TIME = 4500; // 4.5 seconds

  // Handle Tab Switch
  const selectTab = useCallback((index) => {
    setActiveTabIdx(index);
    setProgress(0);
    setIsPaused(true); // Clicking a tab pauses auto-cycle per spec
  }, []);

  // Auto-cycle timer & progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50;
    const increment = (intervalTime / CYCLE_TIME) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTabIdx((current) => (current + 1) % TABS.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Attendance ring circumference calculation: r = 15, circumference = 2 * PI * 15 ≈ 94.25
  const circumference = 2 * Math.PI * 15;
  const attendanceOffset = circumference - (86 / 100) * circumference;

  return (
    <div
      className="mock-wrapper animate-enter-mock"
      style={{
        '--active-role-color': activeTab.roleColor,
        '--active-role-soft': activeTab.roleSoft,
      }}
    >
      {/* Floating Chip 1 (Top Right) */}
      <div className="floating-chip chip-top" aria-hidden="true">
        <span className="chip-icon">⚡</span>
        <div>
          <div className="chip-text-primary">Attendance 86%</div>
          <div className="chip-text-sub">Above 75% threshold</div>
        </div>
      </div>

      {/* Floating Chip 2 (Bottom Left) */}
      <div className="floating-chip chip-bottom" aria-hidden="true">
        <span className="chip-icon">💼</span>
        <div>
          <div className="chip-text-primary">28 Active Drives</div>
          <div className="chip-text-sub">142 Offers released</div>
        </div>
      </div>

      {/* Main Window */}
      <div className="mock-window">
        {/* Header */}
        <div className="mock-header">
          <div className="mock-controls" aria-hidden="true">
            <span className="mock-dot dot-red"></span>
            <span className="mock-dot dot-yellow"></span>
            <span className="mock-dot dot-green"></span>
          </div>
          <span className="mock-sample-badge">Sample data</span>
        </div>

        {/* Tab List */}
        <div className="mock-tabs-bar" role="tablist" aria-label="Campus Connect Portals Preview">
          {TABS.map((tab, idx) => {
            const isSelected = activeTabIdx === idx;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                className={`mock-tab ${isSelected ? 'active' : ''}`}
                onClick={() => selectTab(idx)}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: tab.roleColor,
                  }}
                  aria-hidden="true"
                />
                <span>{tab.label}</span>
                {isSelected && <div className="tab-indicator-bar" aria-hidden="true" />}
              </button>
            );
          })}

          {/* 4.5s Auto-cycle Progress Track */}
          {!isPaused && (
            <div className="mock-cycle-progress-track" aria-hidden="true">
              <div
                className="mock-cycle-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Tab Panel Body */}
        <div
          className="mock-body"
          role="tabpanel"
          id={`panel-${activeTab.id}`}
          aria-labelledby={`tab-${activeTab.id}`}
        >
          {/* Mock Sidebar */}
          <aside className="mock-sidebar" aria-label={`${activeTab.label} navigation`}>
            {activeTab.sidebarItems.map((item, i) => (
              <div
                key={item.name}
                className={`mock-nav-item ${i === 0 ? 'active' : ''}`}
              >
                <svg
                  className="mock-nav-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span>{item.name}</span>
              </div>
            ))}
          </aside>

          {/* Main Content Area */}
          <main className="mock-content">
            {/* 3 Stat Cards */}
            <div className="mock-stats-grid">
              {activeTab.stats.map((stat, i) => (
                <div key={i} className="mock-stat-card">
                  <span className="mock-stat-label">{stat.label}</span>
                  <div className="mock-stat-value-wrap">
                    <span className="mock-stat-value">
                      <CountUpNumber
                        key={`${activeTab.id}-${i}`}
                        targetValue={stat.value}
                        isPercentage={stat.isPercentage}
                        isFloat={stat.isFloat}
                        isFormatted={stat.isFormatted}
                        suffix={stat.suffix}
                      />
                    </span>

                    {/* Ring indicator for student attendance */}
                    {stat.hasRing && (
                      <div className="attendance-ring-wrap" aria-hidden="true">
                        <svg className="attendance-ring-svg" viewBox="0 0 38 38">
                          <circle
                            className="attendance-ring-bg"
                            cx="19"
                            cy="19"
                            r="15"
                          />
                          <circle
                            className="attendance-ring-fill"
                            cx="19"
                            cy="19"
                            r="15"
                            strokeDasharray={circumference}
                            strokeDashoffset={attendanceOffset}
                          />
                        </svg>
                        <span className="attendance-ring-text">86%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 3 Activity Rows */}
            <div className="mock-list-wrap">
              <span className="mock-list-title">Live Updates & Tasks</span>
              {activeTab.rows.map((row, i) => (
                <div key={i} className="mock-list-row">
                  <div className="mock-row-left">
                    <span
                      className="mock-row-dot"
                      style={{ backgroundColor: activeTab.roleColor }}
                      aria-hidden="true"
                    />
                    <div>
                      <div className="mock-row-primary">{row.title}</div>
                      <div className="mock-row-meta">{row.meta}</div>
                    </div>
                  </div>
                  <span
                    className="mock-row-badge"
                    style={{
                      backgroundColor: row.badgeBg,
                      color: row.badgeColor,
                    }}
                  >
                    {row.badge}
                  </span>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
