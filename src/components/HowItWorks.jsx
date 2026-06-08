import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Download, Settings, CheckCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

const steps = [
  {
    step: '01',
    icon: Download,
    title: '下载安装',
    description: '在本站免费下载TG校园跑助手5.0，支持Android 8.0及以上，安装包仅5MB。',
    accent: '#c8ff00',
    details: ['支持 Android 8.0+', '无需ROOT权限', '安装包仅 5MB'],
  },
  {
    step: '02',
    icon: Settings,
    title: '简单设置',
    description: '选择校园跑平台，自定义规划路线和跑步参数，整个过程不超过3分钟。',
    accent: '#ff3d5a',
    details: ['导入GPX轨迹文件', '自定义跑步参数', '3分钟极速配置'],
  },
  // 第3步"自动运行"已移除
];

// ==================== Connector Line with SVG Draw ====================
function ConnectorLine({ lineRef }) {
  return (
    <div ref={lineRef} className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px">
      <svg className="w-full h-8 -mt-4" viewBox="0 0 100 20">
        <line
          x1="0" y1="10" x2="100" y2="10"
          stroke="#c8ff00"
          strokeWidth="0.5"
          opacity="0.3"
          data-gsap-raw
        />
        {/* Animated dot */}
        <circle cx="0" cy="10" r="2" fill="#c8ff00" opacity="0.8" data-gsap-dot />
      </svg>
    </div>
  );
}

// ==================== Step Card ====================
function StepCard({ step, index }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const detailsRef = useRef([]);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 1,
          delay: index * 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            id: 'how-it-works',
          },
        }
      );

      // Icon pulse with glow
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.2,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        });

        // Glow effect on hover
        const card = cardRef.current;
        card.addEventListener('mouseenter', () => {
          gsap.to(iconRef.current, { rotation: 15, scale: 1.4, duration: 0.4, ease: 'back.out(2)' });
          // Add glow shadow
          gsap.to(iconRef.current, { filter: `drop-shadow(0 0 20px ${step.accent})`, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(iconRef.current, { rotation: 0, scale: 1.2, duration: 0.3, ease: 'power2.out' });
          gsap.to(iconRef.current, { filter: 'drop-shadow(0 0 0px transparent)', duration: 0.3 });
        });
      }

      // Detail items stagger
      detailsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.5,
            delay: 0.6 + i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              id: 'how-it-works',
            },
          }
        );
      });

      // SVG line draw animation
      const lineEl = document.querySelector('[data-gsap-raw]');
      if (lineEl) {
        gsap.fromTo(lineEl,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: lineEl.closest('section'),
              start: 'top 60%',
              toggleActions: 'play none none reverse',
              id: 'how-it-works',
            },
          }
        );
      }

      // Animated dot along the line
      const dotEl = document.querySelector('[data-gsap-dot]');
      if (dotEl) {
        gsap.to(dotEl, {
          attr: { cx: ['0', '100', '100'] },
          duration: 3,
          repeat: -1,
          repeatDelay: 2,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: dotEl.closest('section'),
            start: 'top 60%',
            toggleActions: 'play none none none',
            id: 'how-it-works',
          },
        });
      }

    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const Icon = step.icon;

  return (
    <div
      ref={cardRef}
      className="neon-card p-8 relative group opacity-0"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Step number */}
      <div className="flex items-center gap-4 mb-6">
        <div
          ref={iconRef}
          className="w-14 h-14 flex items-center justify-center border transition-transform"
          style={{
            borderColor: `${step.accent}30%`,
            backgroundColor: `${step.accent}10%`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color: step.accent }} />
        </div>
        <span className="font-mono text-xs text-fog/30 tracking-widest">STEP {step.step}</span>
      </div>

      <h3 className="font-display text-2xl font-bold text-ice mb-3 tracking-tight">{step.title}</h3>
      <p className="text-sm text-fog/60 leading-relaxed mb-6">{step.description}</p>

      <ul className="space-y-2">
        {step.details.map((detail, i) => (
          <li
            key={i}
            ref={el => detailsRef.current[i] = el}
            className="flex items-center gap-2 text-sm text-fog/50 opacity-0"
          >
            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: step.accent }} />
            {detail}
          </li>
        ))}
      </ul>

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-8 h-8 opacity-20"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${step.accent} 50%)`,
        }}
      />
    </div>
  );
}

// ==================== Main Section ====================
export default function HowItWorks() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(0 100% 0 0)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            id: 'how-it-works',
          },
        }
      );

      // Section label
      const label = sectionRef.current.querySelector('[data-gsap="section-label"]');
      if (label) {
        gsap.fromTo(label,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              toggleActions: 'play none none none',
              id: 'how-it-works',
            },
          }
        );
      }

      // Parallax background
      const bgAccent = sectionRef.current.querySelector('[data-gsap="bg-accent"]');
      if (bgAccent) {
        gsap.to(bgAccent, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            id: 'how-it-works',
          },
        });
      }

      // Background mesh parallax
      const mesh = sectionRef.current.querySelector('[data-gsap="mesh"]');
      if (mesh) {
        gsap.to(mesh, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
            id: 'how-it-works',
          },
        });
      }

      // Shockwave on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 50%',
        onEnter: () => {
          const shock = document.createElement('div');
          shock.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 20px; height: 20px;
            border: 1px solid rgba(200,255,0,0.3);
            border-radius: 50%; pointer-events: none; z-index: 0;
          `;
          sectionRef.current.appendChild(shock);
          gsap.fromTo(shock,
            { scale: 0, opacity: 0.5 },
            { scale: 5, opacity: 0, duration: 1.5, ease: 'power2.out',
              onComplete: () => shock.remove()
            }
          );
        },
        id: 'how-it-works',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden striped-bg">
      {/* Background accent */}
      <div
        data-gsap="bg-accent"
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)' }}
      />

      {/* Background mesh */}
      <div data-gsap="mesh" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,61,90,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span data-gsap="section-label" className="section-label mb-6 inline-flex opacity-0">
            <span className="w-2 h-2 bg-neon rounded-full animate-pulse mr-2" />
            使用方式
          </span>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight opacity-0"
          >
            三步即可
            <br />
            <span className="gradient-text-hero"> 轻松完成</span>
          </h2>
        </div>

        {/* Steps — now only 2 steps */}
        <div className="grid lg:grid-cols-2 gap-8 relative">
          <ConnectorLine lineRef={lineRef} />

          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
