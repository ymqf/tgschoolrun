import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Zap, ArrowRight, Play, Sparkles, Shield } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer, DrawSVGPlugin, ScrambleTextPlugin);
}

// ==================== Mesh Background Blobs ====================
function MeshBlobs() {
  const blob1 = useRef(null);
  const blob2 = useRef(null);
  const blob3 = useRef(null);

  useEffect(() => {
    if (!blob1.current) return;
    gsap.to(blob1.current, { scale: 1.3, x: 30, y: -20, duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(blob2.current, { scale: 1.2, x: -20, y: 30, duration: 25, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(blob3.current, { scale: 1.2, rotation: 360, duration: 30, repeat: -1, yoyo: true, ease: 'none' });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div ref={blob1} className="absolute w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.12) 0%, transparent 70%)', top: '-10%', left: '-5%' }}
      />
      <div ref={blob2} className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,61,90,0.08) 0%, transparent 70%)', bottom: '-5%', right: '-5%' }}
      />
      <div ref={blob3} className="absolute w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)', top: '40%', right: '20%' }}
      />
    </div>
  );
}

// ==================== Geometric Shapes ====================
function GeoShapes() {
  const crossRef = useRef(null);
  const circleRef = useRef(null);
  const triRef = useRef(null);

  useEffect(() => {
    if (!crossRef.current) return;
    gsap.to(crossRef.current, { rotation: 90, scale: 1.2, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(circleRef.current, { y: -20, opacity: 0.3, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(triRef.current, { rotation: 180, y: -15, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagGsap" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="#c8ff00" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagGsap)" />
      </svg>

      {/* Floating cross */}
      <div ref={crossRef} className="absolute top-[20%] right-[15%] text-neon/20">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="17" y="0" width="6" height="40" fill="currentColor" />
          <rect x="0" y="17" width="40" height="6" fill="currentColor" />
        </svg>
      </div>

      {/* Floating circle */}
      <div ref={circleRef} className="absolute bottom-[30%] left-[10%]">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="28" stroke="#ff3d5a" strokeWidth="2" opacity="0.3" />
        </svg>
      </div>

      {/* Floating triangle */}
      <div ref={triRef} className="absolute top-[60%] right-[25%]">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <polygon points="15,2 28,28 2,28" stroke="#c8ff00" strokeWidth="1.5" fill="none" opacity="0.2" />
        </svg>
      </div>
    </div>
  );
}

// ==================== Ticker Bar ====================
function TickerBar() {
  const tickerRef = useRef(null);

  useEffect(() => {
    if (!tickerRef.current) return;
    const inner = tickerRef.current.querySelector('.ticker-inner');
    if (inner) {
      gsap.to(inner, { x: '-50%', duration: 30, repeat: -1, ease: 'none' });
    }
  }, []);

  const items = ['自动打卡', '智能轨迹', '安全可靠', '极速上手', '多平台支持', '数据统计'];

  return (
    <div className="py-4 border-y border-white/5 overflow-hidden">
      <div ref={tickerRef} className="flex whitespace-nowrap">
        <div className="ticker-inner flex">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-mono text-fog/40 tracking-widest uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-neon/40 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== Hero Section ====================
export default function Hero() {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const phoneRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const phoneScreenRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Kill old ScrollTriggers for this context
      const oldTriggers = ScrollTrigger.getAll().filter(st => st.vars?.id === 'hero');
      oldTriggers.forEach(st => st.kill());

      // ========== Master Entrance Timeline ==========
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        id: 'hero',
      });

      // Badge entrance
      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      );

      // Heading lines stagger
      const headingLines = headingRef.current?.querySelectorAll('[data-hero-text]');
      if (headingLines) {
        tl.fromTo(headingLines,
          { opacity: 0, y: 60, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.12 },
          '-=0.3'
        );
      }

      // Subtitle
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      );

      // CTA buttons
      const ctaBtns = ctaRef.current?.querySelectorAll('a');
      if (ctaBtns) {
        tl.fromTo(ctaBtns,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1 },
          '-=0.3'
        );
      }

      // Phone mockup
      tl.fromTo(phoneRef.current,
        { opacity: 0, x: 80, rotateY: -15, scale: 0.9 },
        { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.2, ease: 'expo.out' },
        '-=0.6'
      );

      // Floating badges
      tl.fromTo([badge1Ref.current, badge2Ref.current],
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15 },
        '-=0.3'
      );

      // ========== Phone Screen Animations ==========
      // Progress bar
      const progressBar = phoneScreenRef.current?.querySelector('[data-progress]');
      if (progressBar) {
        gsap.to(progressBar, {
          width: '75%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: phoneRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            id: 'hero',
          },
        });
      }

      // Counter animation
      const kmEl = phoneScreenRef.current?.querySelector('[data-counter="km"]');
      if (kmEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 2.5,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => { kmEl.textContent = obj.val.toFixed(1); },
          scrollTrigger: {
            trigger: phoneRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            id: 'hero',
          },
        });
      }

      // SVG path draw
      const svgPath = phoneScreenRef.current?.querySelector('[data-svg-path]');
      if (svgPath) {
        gsap.fromTo(svgPath,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 3,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: phoneRef.current,
              start: 'top 75%',
              id: 'hero',
            },
          }
        );
      }

      // ========== Parallax on Scroll ==========
      gsap.to(headingRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          id: 'hero',
        },
      });

      // ========== Floating Animation for Phone ==========
      gsap.to(phoneRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // ========== Floating Badges ==========
      gsap.to(badge1Ref.current, {
        y: -12,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(badge2Ref.current, {
        y: 10,
        rotation: -1.5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3D Tilt for phone
  const handleMouseMove = useCallback((e) => {
    const el = phoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateY: x * 12, rotateX: -y * 8, duration: 0.5, ease: 'power2.out' });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(phoneRef.current, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden hero-bg">
      <MeshBlobs />
      <GeoShapes />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

          {/* Left Content */}
          <div>

            {/* Badge */}
            <div ref={badgeRef} className="mb-8 opacity-0">
              <span className="section-label">
                <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                v2.5 — 全新升级
              </span>
            </div>

            {/* Heading */}
            <h1 ref={headingRef} className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold leading-[0.9] mb-8 tracking-tight opacity-0">
              <span data-hero-text className="block text-ice/40 text-2xl sm:text-3xl font-body font-normal tracking-normal mb-4">
                智能校园跑步解决方案
              </span>
              <span data-hero-text className="block text-ice">
                让校园跑
              </span>
              <span data-hero-text className="block gradient-text-hero mt-2">
                自动完成
              </span>
              <span data-hero-text className="block text-ice/60 text-3xl sm:text-4xl lg:text-5xl mt-4 font-light">
                轻松达标<span className="neon-text">_</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p ref={subtitleRef} className="text-lg text-fog max-w-lg mb-10 leading-relaxed opacity-0">
              智能识别运动轨迹，自动记录跑步数据。
              <br />
              <span className="text-fog/50">一键设置，省时省力，学业运动两不误。</span>
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-12 opacity-0">
              <a href="#download" className="btn-neon">
                <Zap className="w-5 h-5" />
                立即下载
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how-it-works" className="btn-outline">
                <Play className="w-5 h-5" />
                了解更多
              </a>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-8 text-sm text-fog/50 opacity-0">
              {[
                { icon: Shield, text: '本地运行' },
                { icon: Zap, text: '3分钟设置' },
                { icon: Sparkles, text: '10万+用户' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="w-4 h-4 text-neon/60" />
                  {badge.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Phone Mockup */}
          <div
            ref={phoneRef}
            className="relative flex justify-center opacity-0"
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Floating badge 1 */}
            <div ref={badge1Ref} className="floating-badge top-8 -left-4 lg:left-4 opacity-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <div className="text-[10px] text-fog/50 uppercase tracking-wider">今日</div>
                  <div className="text-sm font-bold text-ice">2.5 公里</div>
                </div>
              </div>
            </div>

            {/* Floating badge 2 */}
            <div ref={badge2Ref} className="floating-badge bottom-32 -right-4 lg:right-0 opacity-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success-400/20 flex items-center justify-center">
                  <span className="text-success-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <div className="text-[10px] text-fog/50 uppercase tracking-wider">状态</div>
                  <div className="text-sm font-bold text-success-400">已打卡</div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="phone-mockup w-[280px] sm:w-[300px]">
              <div ref={phoneScreenRef} className="phone-screen p-5 flex flex-col">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-6 pt-1">
                  <span className="text-ice/40 text-xs font-mono">9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-3.5 h-2 border border-ice/30 rounded-[2px]">
                      <div className="h-full bg-neon rounded-[1px]" style={{ width: '75%' }} />
                    </div>
                  </div>
                </div>

                {/* App header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-neon/20 flex items-center justify-center"
                    style={{ animation: 'spin 10s linear infinite' }}
                  >
                    <Zap className="w-5 h-5 text-neon" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-ice font-display">校园跑助手</div>
                    <div className="text-[10px] text-fog/40">Smart Campus Runner</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 flex-1">
                  {/* Progress bar */}
                  <div className="bg-white/5 p-3 border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-fog/50 uppercase tracking-wider">今日进度</span>
                      <span className="text-xs font-mono text-neon">75%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 overflow-hidden">
                      <div data-progress className="h-full bg-gradient-to-r from-neon to-success-400" style={{ width: '0%' }} />
                    </div>
                  </div>

                  {/* Stat grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 border border-white/5 text-center"
                      style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}
                    >
                      <div className="text-xl font-bold text-neon font-display" data-counter="km">0.0</div>
                      <div className="text-[9px] text-fog/40 uppercase tracking-wider mt-0.5">公里</div>
                    </div>
                    <div className="bg-white/5 p-3 border border-white/5 text-center"
                      style={{ animation: 'float 3s ease-in-out infinite 1s' }}
                    >
                      <div className="text-xl font-bold text-ice font-display">18:30</div>
                      <div className="text-[9px] text-fog/40 uppercase tracking-wider mt-0.5">用时</div>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="bg-neon/10 border border-neon/20 p-3 text-center">
                    <div className="text-xs font-bold text-neon font-display uppercase tracking-wider">
                      ✓ 自动打卡完成
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div className="bg-white/5 border border-white/5 p-4 flex-1 min-h-[80px] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <svg width="100%" height="100%" viewBox="0 0 200 100">
                        <path d="M10,80 Q50,20 100,50 T190,30" fill="none" stroke="#c8ff00" strokeWidth="2"
                          data-svg-path
                        />
                      </svg>
                    </div>
                    <div className="text-[10px] text-fog/30 uppercase tracking-wider">运动轨迹</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker bar at bottom */}
      <TickerBar />
    </section>
  );
}
