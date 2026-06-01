import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqs = [
  {
    q: '校园跑助手真的能自动完成打卡吗？',
    a: '是的！校园跑助手通过智能轨迹识别和AI算法，可以真实模拟跑步运动状态，自动完成校园跑打卡任务。我们已经帮助超过10万同学顺利完成校园跑。',
    accent: '#c8ff00',
  },
  {
    q: '使用校园跑助手会被检测到吗？',
    a: '我们的智能算法会模拟真实的运动状态，包括速度变化、轨迹偏移、暂停等真实跑步特征，让每次打卡都符合学校要求的标准。目前为止零封号记录。',
    accent: '#ff3d5a',
  },
  {
    q: '支持哪些校园跑平台？',
    a: '我们支持目前市面上99%的校园跑平台，包括知到、步道、体侧、运动世界校园等主流App，覆盖全国超过100所高校。',
    accent: '#2563eb',
  },
  {
    q: '需要root或越狱手机吗？',
    a: '完全不需要！校园跑助手不需要root或越狱，不影响手机保修，不获取敏感权限，安全无忧。',
    accent: '#4ade80',
  },
  {
    q: '如何保证我的隐私安全？',
    a: '校园跑助手完全本地运行，不上传任何个人数据到服务器。我们严格遵守隐私保护原则，你的所有信息只保存在你的设备上。',
    accent: '#c8ff00',
  },
  {
    q: '如果打卡失败怎么办？',
    a: '我们有7天无理由退款保障。如果因为软件原因导致打卡失败，我们承诺全额退款。同时提供全程技术支持，确保你的问题得到及时解决。',
    accent: '#ff3d5a',
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  const itemRef = useRef(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      // Item entrance
      gsap.fromTo(itemRef.current,
        { opacity: 0, y: 40, x: index % 2 === 0 ? -20 : 20 },
        {
          opacity: 1, y: 0, x: 0,
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

      // Border line draw
      const lineEl = itemRef.current.querySelector('[data-gsap-line]');
      if (lineEl) {
        gsap.fromTo(lineEl,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            delay: 0.3 + index * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: itemRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
              id: 'faq',
            },
          }
        );
      }

    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: -10, height: 0 },
        { opacity: 1, y: 0, height: 'auto', duration: 0.4, ease: 'power2.out' }
      );
      gsap.to(iconRef.current, { rotation: 45, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(contentRef.current,
        { opacity: 0, y: -10, height: 0, duration: 0.3, ease: 'power2.in' }
      );
      gsap.to(iconRef.current, { rotation: 0, duration: 0.3, ease: 'power2.out' });
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="neon-card overflow-hidden opacity-0"
      style={{ transformPerspective: 1000 }}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left"
        onClick={onToggle}
      >
        <span className="font-display font-bold text-ice text-lg pr-4">{faq.q}</span>
        <div
          ref={iconRef}
          className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-white/10"
          style={{ backgroundColor: `${faq.accent}10` }}
        >
          <span className="text-lg font-bold" style={{ color: faq.accent }}>+</span>
        </div>
      </button>

      <div ref={contentRef} className="overflow-hidden h-0">
        <div className="px-6 pb-6 pt-0">
          <p className="text-sm text-fog/60 leading-relaxed">{faq.a}</p>
        </div>
      </div>

      {/* Animated bottom line */}
      <div className="h-px bg-white/5">
        <div
          data-gsap-line
          className="h-full origin-left"
          style={{ backgroundColor: faq.accent, scaleX: 0 }}
        />
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(0 50% 0 50%)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0 0% 0 0%)',
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
              id: 'faq',
            },
          }
        );
      }

      // Background orbs parallax
      const orbs = sectionRef.current.querySelectorAll('[data-gsap="orb"]');
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: -50 - i * 20,
          x: i % 2 === 0 ? 15 : -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
            id: 'faq',
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background orbs */}
        <div data-gsap="orb" className="absolute top-[5%] left-[8%] w-[250px] h-[250px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)' }} />
        <div data-gsap="orb" className="absolute bottom-[5%] right-[8%] w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,61,90,0.03) 0%, transparent 70%)' }} />

        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center">
          <span data-gsap="label" className="section-label mb-6 inline-flex opacity-0">
            常见问题
          </span>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight opacity-0"
          >
            还有<span className="gradient-text-hero">疑问？</span>
            <br />
            看这里
          </h2>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
