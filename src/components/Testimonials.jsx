import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
}

const testimonials = [
  {
    name: '张同学',
    school: '清华大学',
    avatar: '🎓',
    content: '太省心了！再也不用每天晚上跑去操场打卡，设置好时间就自动完成，成绩全部有效。',
    rating: 5,
    tag: '省时利器',
  },
  {
    name: '李同学',
    school: '北京大学',
    avatar: '📚',
    content: '之前每次都要跑满 2.0 公里，现在用校园跑助手，每天自动完成，太香了！',
    rating: 5,
    tag: '真实有效',
  },
  {
    name: '王同学',
    school: '浙江大学',
    avatar: '⚡',
    content: '试过好几个同类产品，只有这个真的能稳定用，不闪退，打卡 100% 成功。',
    rating: 5,
    tag: '稳定可靠',
  },
  {
    name: '刘同学',
    school: '复旦大学',
    avatar: '🔥',
    content: '界面简洁好用，设置一次之后就不用管了，每天早上自动跑，完全不用操心。',
    rating: 5,
    tag: '操作简单',
  },
  {
    name: '陈同学',
    school: '上海交通大学',
    avatar: '🏃',
    content: '之前担心会被检测出来，用了两个月完全没问题，成绩都正常录入系统了。',
    rating: 5,
    tag: '安全放心',
  },
  {
    name: '赵同学',
    school: '南京大学',
    avatar: '💯',
    content: '室友推荐的，用了之后发现真的解放了！再也不用担心漏打卡了，强烈推荐！',
    rating: 5,
    tag: '口碑之选',
  },
];

function TestimonialCard({ testimonial, index }) {
  const cardRef = useRef(null);
  const starsRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, rotateY: -8 },
        {
          opacity: 1, y: 0, rotateY: 0,
          duration: 0.9,
          delay: index * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
            id: 'testimonials',
          },
        }
      );

      // Stars draw animation
      if (starsRef.current) {
        const stars = starsRef.current.querySelectorAll('[data-star]');
        stars.forEach((star, i) => {
          gsap.fromTo(star,
            { opacity: 0, scale: 0, rotation: -45 },
            {
              opacity: 1, scale: 1, rotation: 0,
              duration: 0.3,
              delay: 0.5 + i * 0.08,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
                id: 'testimonials',
              },
            }
          );
        });
      }

      // Tag bounce
      if (tagRef.current) {
        gsap.fromTo(tagRef.current,
          { opacity: 0, scale: 0.5, y: 10 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.5,
            delay: 0.7,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              id: 'testimonials',
            },
          }
        );
      }

      // 3D tilt on hover
      const card = cardRef.current;
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 10,
          rotateX: -y * 8,
          duration: 0.4,
          ease: 'power2.out',
        });
      };
      const handleMouseLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };

    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="neon-card p-6 relative overflow-hidden opacity-0"
      style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {/* Quote mark */}
      <div className="absolute top-4 right-6 text-[3rem] font-display text-neon/5 leading-none select-none">
        "
      </div>

      {/* Stars */}
      <div ref={starsRef} className="flex gap-0.5 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} data-star className="text-neon text-sm opacity-0">★</span>
        ))}
      </div>

      {/* Content */}
      <p className="text-sm text-fog/70 leading-relaxed mb-5 italic">
        "{testimonial.content}"
      </p>

      {/* Divider - SVG draw */}
      <div className="mb-4 opacity-30">
        <svg width="100%" height="1" viewBox="0 0 100 1">
          <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#c8ff00" strokeWidth="0.5" data-gsap-draw />
        </svg>
      </div>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 flex items-center justify-center text-lg border border-white/10"
            style={{ animation: `float ${3 + index * 0.3}s ease-in-out infinite ${index * 0.5}s` }}
          >
            {testimonial.avatar}
          </div>
          <div>
            <div className="text-sm font-bold text-ice font-display">{testimonial.name}</div>
            <div className="text-[10px] text-fog/40 font-mono">{testimonial.school}</div>
          </div>
        </div>
        <span
          ref={tagRef}
          className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 border border-neon/20 text-neon/60 opacity-0"
        >
          {testimonial.tag}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalPages = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            id: 'testimonials',
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
            id: 'testimonials',
          },
        }
      );

      // Section label
      const label = sectionRef.current.querySelector('[data-gsap="label"]');
      if (label) {
        gsap.fromTo(label,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 90%',
              toggleActions: 'play none none none',
              id: 'testimonials',
            },
          }
        );
      }

      // SVG dividers draw
      const drawEls = sectionRef.current.querySelectorAll('[data-gsap-draw]');
      drawEls.forEach((el) => {
        gsap.fromTo(el,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: el.closest('section') || sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
              id: 'testimonials',
            },
          }
        );
      });

      // Background orbs parallax
      const orbs = sectionRef.current.querySelectorAll('[data-gsap="orb"]');
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: -40 - i * 15,
          x: i % 2 === 0 ? 20 : -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
            id: 'testimonials',
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const next = () => setCurrentIndex((i) => (i + 3 >= testimonials.length ? 0 : i + 3));
  const prev = () => setCurrentIndex((i) => (i - 3 < 0 ? Math.max(0, testimonials.length - 3) : i - 3));

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden mesh-section">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background orbs */}
        <div data-gsap="orb" className="absolute top-[10%] left-[5%] w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)' }} />
        <div data-gsap="orb" className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,61,90,0.03) 0%, transparent 70%)' }} />

        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center">
          <span data-gsap="label" className="section-label mb-6 inline-flex opacity-0">
            用户评价
          </span>
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight mb-4 opacity-0"
          >
            同学们的<span className="gradient-text-hero">真实反馈</span>
          </h2>
          <p
            ref={subRef}
            className="text-fog/50 max-w-lg mx-auto text-base opacity-0"
          >
            来自全国各高校同学的使用体验，真实口碑
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
