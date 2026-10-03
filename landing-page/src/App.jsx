import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortalsSection from './components/PortalsSection';
import MultiTenantSteps from './components/MultiTenantSteps';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Clean any unwanted inline background styles on body
    document.body.style.backgroundColor = '';

    const checkReveal = () => {
      document.querySelectorAll('.scroll-reveal:not(.is-revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.95 && rect.bottom >= -100) {
          el.classList.add('is-revealed');
        }
      });
    };

    // Run check immediately
    checkReveal();

    // IntersectionObserver for modern performant reveal
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '100px 0px 100px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('resize', checkReveal, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkReveal);
      window.removeEventListener('resize', checkReveal);
    };
  }, []);

  return (
    <div className="landing-wrap">
      <Navbar />
      <main id="main-content">
        <Hero />
        <PortalsSection />
        <MultiTenantSteps />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
