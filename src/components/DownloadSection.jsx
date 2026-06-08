import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

function QrCodeFrame({ accent }) {
  const qrRef = useRef(null);

  useEffect(() => {
    if (!qrRef.current) return;
    const ctx = gsap.context(() => {
      // SVG path draw animation
      const paths = qrRef.current.querySelectorAll('[data-qr-path]');
      paths.forEach((path, i) => {
        gsap.fromTo(path,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 1.5,
            delay: 0.3 + i * 0.1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: qrRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              id: 'download',
            },
          }
        );
      });

      // Scan line animation
      const scanLine = qrRef.current.querySelector('[data-scan-line]');
      if (scanLine) {
        gsap.fromTo(scanLine,
          { y: 0, opacity: 0.8 },
          {
            y: 120,
            opacity: 0,
            duration: 2,
            repeat: -1,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: qrRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              id: 'download',
            },
          }
        );
      }

      // Corner dots pulse
      const dots = qrRef.current.querySelectorAll('[data-qr-dot]');
      dots.forEach((dot, i) => {
        gsap.to(dot, {
          scale: 1.3,
          opacity: 1,
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          delay: i * 0.15,
          ease: 'sine.inOut',
        });
      });

    }, qrRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={qrRef}
      className="w-32 h-32 border p-2 relative overflow-hidden"
      style={{ borderColor: `${accent}30`, background: `${accent}05` }}
    >
      {/* Simulated QR code pattern */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        {/* Corner squares */}
        <rect x="4" y="4" width="20" height="20" stroke={accent} strokeWidth="2" fill="none" data-qr-path />
        <rect x="76" y="4" width="20" height="20" stroke={accent} strokeWidth="2" fill="none" data-qr-path />
        <rect x="4" y="76" width="20" height="20" stroke={accent} strokeWidth="2" fill="none" data-qr-path />

        {/* Corner dots */}
        <circle cx="14" cy="14" r="3" fill={accent} opacity="0.4" data-qr-dot />
        <circle cx="86" cy="14" r="3" fill={accent} opacity="0.4" data-qr-dot />
        <circle cx="14" cy="86" r="3" fill={accent} opacity="0.4" data-qr-dot />

        {/* QR pattern blocks */}
        {[...Array(6)].map((_, row) =>
          [...Array(6)].map((_, col) => (
            <rect
              key={`${row}-${col}`}
              x={30 + col * 8}
              y={10 + row * 12}
              width={(row + col) % 3 === 0 ? 5 : 3}
              height={(row + col) % 3 === 0 ? 5 : 3}
              fill={accent}
              opacity={((row * col) % 2 === 0) ? 0.5 : 0.25}
            />
          ))
        )}

        {/* Scan line */}
        <rect x="4" y="4" width="92" height="2" fill={accent} opacity="0.8" data-scan-line />

        {/* Center logo area */}
        <rect x="38" y="38" width="24" height="24" fill={`${accent}10`} rx="2" />
        <text x="50" y="53" textAnchor="middle" fontSize="10" fill={accent} fontWeight="bold">TG</text>
      </svg>

      {/* Scan line overlay */}
      <div className="absolute inset-x-0 h-0.5 opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, top: '4%' }} data-scan-line />
    </div>
  );
}

function DownloadCard({ platform, icon, title, subtitle, accent, index }) {
  const cardRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.9,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
            id: 'download',
          },
        }
      );

      // Button shine animation
      if (btnRef.current) {
        gsap.to(btnRef.current, {
          backgroundPosition: ['200% center', '-200% center'],
          duration: 3,
          repeat: -1,
          ease: 'none',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            id: 'download',
          },
        });
      }

      // Parallax on scroll
      gsap.to(cardRef.current, {
        y: index % 2 === 0 ? -20 : 20,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          id: 'download',
        },
      });

    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const IconComp = icon;

  return (
    <div
      ref={cardRef}
      className="neon-card p-8 flex flex-col items-center text-center group relative overflow-hidden opacity-0"
      style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {/* Platform icon */}
      <div
        className="w-16 h-16 flex items-center justify-center mb-6 border relative"
        style={{ borderColor: `${accent}30`, backgroundColor: `${accent}10` }}
      >
        <IconComp className="w-8 h-8" style={{ color: accent }} />
        {/* Glow pulse */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)` }}
        />
      </div>

      <h3 className="font-display text-xl font-bold text-ice mb-2">{title}</h3>
      <p className="text-sm text-fog/50 mb-6">{subtitle}</p>

      {/* QR Code */}
      <QrCodeFrame accent={accent} />

      <div className="mt-4 text-[10px] text-fog/30 font-mono uppercase tracking-widest">
        扫码下载
      </div>

      {/* CTA Button */}
      <button
        ref={btnRef}
        className="mt-6 px-6 py-3 text-sm font-bold uppercase tracking-wider border relative overflow-hidden opacity-0"
        style={{
          borderColor: accent,
          color: accent,
          background: `linear-gradient(90deg, transparent 0%, ${accent}10 25%, transparent 50%, ${accent}10 75%, transparent 100%)`,
          backgroundSize: '200% 100%',
        }}
      >
        <span className="relative z-10">立即下载 5.0</span>
        {/* Hover fill */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `${accent}15` }}
        />
      </button>

      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 100% 0%, ${accent}40 0%, transparent 70%)` }}
      />
    </div>
  );
}

export default function DownloadSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            id: 'download',
          },
        }
      );

      // Subtext
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              id: 'download',
            },
          }
        );

        // Section label
        const label = sectionRef.current.querySelector('[data-gsap="label"]');
        if (label) {
          gsap.fromTo(label,
            { opacity: 0, x: -30 },
            {
              opacity: 1, x: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: label,
                start: 'top 92%',
                toggleActions: 'play none none none',
                id: 'download',
              },
            }
          );
        }

        // Background mesh parallax
        const mesh = sectionRef.current.querySelector('[data-gsap="mesh"]');
        if (mesh) {
          gsap.to(mesh, {
            y: -60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              id: 'download',
            },
          });
        }

        // Floating orbs
        const orbs = sectionRef.current.querySelectorAll('[data-gsap="orb"]');
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            x: `random(-20, 20)`,
            y: `random(-15, 15)`,
            duration: 6 + i * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });

        // Shockwave on scroll into view
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 50%',
          onEnter: () => {
            const shock = sectionRef.current.querySelector('[data-gsap="shockwave"]');
            if (shock) {
              gsap.fromTo(shock,
                { scale: 0, opacity: 0.4 },
                { scale: 4, opacity: 0, duration: 1.2, ease: 'power2.out' }
              );
            }
          },
          id: 'download',
        });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Only Android platform - iOS removed
  const platforms = [
    {
      platform: 'android',
      icon: ({ className, style }) => (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6,2 L10,2 L11.5,4 L18,4 C19.1,4 20,4.9 20,6 L20,18 C20,19.1 19.1,20 18,20 L6,20 C4.9,20 4,19.1 4,18 L4,4 C4,2.9 4.9,2 6,2 Z M8,6 L6,6 L6,18 L18,18 L18,6 L8,6 Z M10,8 L16,8 L16,10 L10,10 Z M10,12 L14,12 L14,14 L10,14 Z" />
        </svg>
      ),
      title: 'Android 版 5.0',
      subtitle: '支持 Android 8.0 及以上 · 无需ROOT',
      accent: '#c8ff00',
    },
  ];

  return (
    <section id="download" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Background mesh */}
        <div data-gsap="mesh" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-[350px] h-[350px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 70%)' }} />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,61,90,0.04) 0%, transparent 70%)' }} />
        </div>

        {/* Floating orbs */}
        <div data-gsap="orb" className="absolute top-[20%] right-[20%] w-[100px] h-[100px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)' }} />
        <div data-gsap="orb" className="absolute bottom-[20%] left-[15%] w-[120px] h-[120px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)' }} />

        {/* Shockwave */}
        <div data-gsap="shockwave" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-neon/30 pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <span data-gsap="label" className="section-label mb-6 inline-flex opacity-0">
            <span className="w-2 h-2 bg-neon rounded-full animate-pulse mr-2" />
            立即下载
          </span>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight mb-4 opacity-0"
          >
            免费<span className="gradient-text-hero">下载</span>TG校园跑5.0
          </h2>
          <p
            ref={subRef}
            className="text-fog/50 max-w-lg mx-auto text-base opacity-0"
          >
            支持 Android 平台，无需ROOT，安装即用
          </p>
        </div>

        {/* Download Cards - single column since only Android */}
        <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
          {platforms.map((p, i) => (
            <DownloadCard key={p.platform} {...p} index={i} />
          ))}
        </div>

        {/* Version info */}
        <div className="mt-16 text-center opacity-0" data-gsap="version">
          <div className="inline-flex items-center gap-4 text-xs text-fog/30 font-mono">
            <span>v5.0.0</span>
            <span>·</span>
            <span>2026年6月</span>
            <span>·</span>
            <span>5MB</span>
            <span>·</span>
            <span className="text-neon/60">无需ROOT</span>
          </div>
        </div>

      </div>
    </section>
  );
}
