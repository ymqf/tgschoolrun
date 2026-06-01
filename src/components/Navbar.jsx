import { useState, useEffect, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Download, Zap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { label: '功能特色', href: '#features' },
  { label: '使用方式', href: '#how-it-works' },
  { label: '用户评价', href: '#testimonials' },
  { label: '常见问题', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const ctaRef = useRef(null);
  const mobileBtnRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle scroll for background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      // Navbar entrance
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );

      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(logoRef.current,
          { opacity: 0, scale: 0.8, rotation: -10 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.6, delay: 0.3, ease: 'back.out(1.7)' }
        );

        // Logo hover
        const logoEl = logoRef.current;
        const logoIcon = logoEl.querySelector('[data-logo-icon]');
        if (logoIcon) {
          logoEl.addEventListener('mouseenter', () => {
            gsap.to(logoIcon, { rotation: 360, duration: 0.8, ease: 'power2.out' });
          });
        }
      }

      // Desktop nav links stagger
      linksRef.current.forEach((link, i) => {
        if (!link) return;
        gsap.fromTo(link,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.4 + i * 0.06, ease: 'power3.out' }
        );

        // Underline hover animation
        const underline = link.querySelector('[data-underline]');
        if (underline) {
          link.addEventListener('mouseenter', () => {
            gsap.to(underline, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
          });
          link.addEventListener('mouseleave', () => {
            gsap.to(underline, { scaleX: 0, duration: 0.3, ease: 'power2.out' });
          });
        }
      });

      // CTA button
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, delay: 0.7, ease: 'back.out(1.7)' }
        );
      }

      // Mobile button
      if (mobileBtnRef.current) {
        gsap.fromTo(mobileBtnRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, delay: 0.5, ease: 'power3.out' }
        );
      }

      // Scroll background change
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top -20',
        onEnter: () => setIsScrolled(true),
        onLeaveBack: () => setIsScrolled(false),
        id: 'navbar',
      });

    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, height: 0 },
        { opacity: 1, height: 'auto', duration: 0.4, ease: 'power3.out' }
      );
      // Menu items stagger
      const items = mobileMenuRef.current.querySelectorAll('a');
      gsap.fromTo(items,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power3.out' }
      );
      // Hamburger to X icon rotation
      const iconContainer = mobileBtnRef.current?.querySelector('[data-menu-icon]');
      if (iconContainer) {
        gsap.to(iconContainer.children, { rotation: 90, duration: 0.3, ease: 'power2.out' });
      }
    } else {
      gsap.to(mobileMenuRef.current, { opacity: 0, height: 0, duration: 0.3, ease: 'power3.in' });
      const iconContainer = mobileBtnRef.current?.querySelector('[data-menu-icon]');
      if (iconContainer) {
        gsap.to(iconContainer.children, { rotation: 0, duration: 0.3, ease: 'power2.out' });
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-midnight/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
      style={{ y: -100, opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" ref={logoRef} style={{ opacity: 0 }}>
            <div data-logo-icon className="w-9 h-9 bg-neon flex items-center justify-center transition-transform">
              <Zap className="w-5 h-5 text-midnight" />
            </div>
            <span className="text-lg font-display font-bold text-ice tracking-tight">
              CAMPUS<span className="text-neon">RUN</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-fog/60 hover:text-neon transition-colors relative group"
                ref={el => linksRef.current[index] = el}
                style={{ opacity: 0 }}
              >
                {link.label}
                <span
                  data-underline
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-neon origin-center"
                  style={{ scaleX: 0 }}
                />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center" ref={ctaRef} style={{ opacity: 0 }}>
            <a
              href="#download"
              className="btn-neon !py-2.5 !px-5 !text-sm"
            >
              <Download className="w-4 h-4" />
              下载
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            ref={mobileBtnRef}
            className="md:hidden p-2 text-ice"
            onClick={toggleMobileMenu}
            style={{ opacity: 0 }}
            aria-label="Toggle menu"
          >
            <div data-menu-icon className="relative w-5 h-5">
              <span className="absolute inset-0 flex items-center justify-center">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden bg-midnight/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
        style={{ opacity: 0, height: 0 }}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-fog/60 hover:text-neon transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#download"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block mt-2"
          >
            <span className="btn-neon w-full text-center">立即下载</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
