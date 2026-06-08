import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

const faqs = [
  {
    q: 'TG校园跑助手5.0 需要ROOT权限吗？',
    a: '完全不需要ROOT权限。我们采用系统级辅助功能实现自动操作，无需获取ROOT权限，不会破坏手机保修，安全无忧。',
  },
  {
    q: '支持哪些校园跑App？',
    a: '目前支持市面上99%的校园跑App，包括：步道、悦跑圈、咕咚、Keep等主流运动App。后续将持续增加支持范围。',
  },
  {
    q: '会被检测出来吗？',
    a: '我们采用AI智能模拟算法，每次运动参数都会随机微调，完全模拟真人运动模式，极大降低被检测风险。但请合理使用，避免过度频繁。',
  },
  {
    q: '如何自定义规划路线？',
    a: '在App的设置页面中，你可以自由绘制或选择预设路线。5.0版本支持导入GPX轨迹文件，一键规划专属路线。',
  },
  // "7天无理由退款保障" 已移除
];

function FaqItem({ item, index, isActive, onClick }) {
  const itemRef = useRef(null);
  const answerRef = useRef(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(itemRef.current,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.7,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
            id: 'faq',
          },
        }
      );

      // Answer reveal animation
      if (isActive && answerRef.current) {
        gsap.fromTo(answerRef.current,
          { opacity: 0, y: -10, scaleY: 0.95 },
          {
            opacity: 1, y: 0, scaleY: 1,
            duration: 0.5,
            ease: 'power3.out',
          }
        );
      }

      // Chevron rotation
      const chevron = itemRef.current.querySelector('[data-chevron]');
      if (chevron) {
        gsap.to(chevron, {
          rotation: isActive ? 180 : 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // Accent line draw
      const line = itemRef.current.querySelector('[data-faq-line]');
      if (line && isActive) {
        gsap.fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: 'power2.out' }
        );
      } else if (line) {
        gsap.to(line, { scaleX: 0, duration: 0.3, ease: 'power2.in' });
      }

    }, itemRef);

    return () => ctx.revert();
  }, [isActive, index]);

  return (
    <div
      ref={itemRef}
      className={`neon-card p-6 cursor-pointer group opacity-0 ${isActive ? 'border-neon/30' : ''}`}
      onClick={onClick}
      style={{ transformPerspective: 1000 }}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-bold text-ice leading-tight pr-4">
          <span className="text-neon/60 font-mono text-sm mr-3">0{index + 1}</span>
          {item.q}
        </h3>
        <div
          data-chevron
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-neon/30 transition-colors"
          style={{ transform: 'rotate(0deg)' }}
        >
          <ChevronDown className="w-4 h-4 text-fog/50 group-hover:text-neon transition-colors" />
        </div>
      </div>

      {/* Answer */}
      <div
        ref={answerRef}
        className={`overflow-hidden transition-all duration-500 ${isActive ? 'max-h-96 mt-4' : 'max-h-0'}`}
      >
        <div className="relative pl-6">
          {/* Vertical accent line */}
          <div
            data-faq-line
            className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-neon to-success-400 origin-top"
            style={{ scaleX: 0 }}
          />
          <p className="text-fog/60 leading-relaxed text-sm">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);

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
            id: 'faq',
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
            id: 'faq',
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
              start: 'top 92%',
              toggleActions: 'play none none none',
              id: 'faq',
            },
          }
        );
      }

      // Background mesh parallax
      const mesh = sectionRef.current.querySelector('[data-gsap="bg-mesh"]');
      if (mesh) {
        gsap.to(mesh, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            id: 'faq',
          },
        });
      }

      // Shockwave on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          const wave = document.createElement('div');
          wave.style.cssText = `
            position: absolute; top: 50%; left: 50%;
            width: 10px; height: 10px;
            border: 1px solid rgba(200,255,0,0.3);
            border-radius: 50%; border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            pointer-events: none; z-index: 0;
          `;
          sectionRef.current.appendChild(wave);
          gsap.to(wave, {
            scale: 20, opacity: 0, duration: 1.5, ease: 'power2.out',
            onComplete: () => wave.remove()
          });
        },
        id: 'faq',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Background mesh */}
        <div data-gsap="bg-mesh" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)' }}
          />
        </div>

        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span data-gsap="section-label" className="section-label mb-6 inline-flex opacity-0">
            <span className="w-2 h-2 bg-neon rounded-full animate-pulse mr-2" />
            常见问题
          </span>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight mb-4 opacity-0"
          >
            还有疑问？
            <br />
            <span className="gradient-text-hero">我们来解答</span>
          </h2>
          <p
            ref={subRef}
            className="text-fog/50 max-w-lg text-base opacity-0"
          >
            以下是用户最常提出的问题。
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
