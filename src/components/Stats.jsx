import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
}

const stats = [
  { number: '10万+', label: '活跃用户', icon: '👥', accent: '#c8ff00' },
  { number: '500万+', label: '累计打卡', icon: '✅', accent: '#ff3d5a' },
  { number: '100+', label: '覆盖高校', icon: '🏫', accent: '#2563eb' },
  { number: '99.7%', label: '成功率', icon: '📊', accent: '#4ade80' },
];

function StatCard({ stat, index }) {
  const cardRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            id: 'stats',
          },
        }
      );

      // Number counter animation
      if (numRef.current) {
        const obj = { val: 0 };
        const target = parseFloat(stat.number) || 0;
        const suffix = stat.number.replace(/[\d.]/g, '') || '';

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
            id: 'stats',
          },
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent = Math.floor(obj.val) + suffix;
            }
          },
        });
      }

      // Floating animation
      gsap.to(cardRef.current, {
        y: -8,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1 + index * 0.2,
      });

    }, cardRef);

    return () => ctx.revert();
  }, [index, stat.number]);

  return (
    <div
      ref={cardRef}
      className="neon-card p-8 text-center relative overflow-hidden opacity-0"
      style={{ transformPerspective: 1000 }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${stat.accent}20 0%, transparent 70%)` }}
      />

      {/* Icon */}
      <div className="text-4xl mb-4 animate-[float_3s_ease-in-out_infinite]" style={{ animationDelay: `${index * 0.2}s` }}>
        {stat.icon}
      </div>

      {/* Number */}
      <div
        ref={numRef}
        className="stat-number"
        style={{ color: stat.accent, textShadow: `0 0 30px ${stat.accent}40` }}
      >
        0{stat.number.replace(/[\d.]/g, '')}
      </div>

      {/* Label */}
      <div className="text-sm text-fog/50 uppercase tracking-widest mt-2 font-mono">
        {stat.label}
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }}
      />
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            id: 'stats',
          },
        }
      );

      // Subtext
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            id: 'stats',
          },
        }
      );

      // Grid items parallax
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.neon-card');
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0,
              duration: 0.7,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
                id: 'stats',
              },
            }
          );
        });
      }

      // Background mesh parallax
      const mesh = sectionRef.current.querySelector('[data-gsap="mesh"]');
      if (mesh) {
        gsap.to(mesh, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            id: 'stats',
          },
        });
      }

      // Glow orbs floating
      const orbs = sectionRef.current.querySelectorAll('[data-gsap="orb"]');
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: `random(-30, 30)`,
          y: `random(-20, 20)`,
          scale: `random(0.9, 1.3)`,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Background mesh */}
        <div data-gsap="mesh" className="absolute inset-0 pointer-events-none">
          <div data-gsap="orb" className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)' }} />
          <div data-gsap="orb" className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,61,90,0.03) 0%, transparent 70%)' }} />
        </div>

        {/* Header */}
        <div className="text-center mb-16 lg:mb-20 relative">
          <span data-gsap="section-label" className="section-label mb-6 inline-flex opacity-0">
            数据说话
          </span>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight mb-4 opacity-0"
          >
            深受 <span className="gradient-text-hero">同学们</span> 信赖
          </h2>
          <p
            ref={subRef}
            className="text-fog/50 max-w-lg mx-auto text-base opacity-0"
          >
            真实数据，真实口碑，校园跑助手已成为数十万学生的选择
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
