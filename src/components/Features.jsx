import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Brain, BarChart3, Shield, Clock, Smartphone } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: MapPin,
    title: '智能轨迹识别',
    description: '高精度GPS定位技术，智能识别校园跑步轨迹，自动匹配学校要求的跑步路线。',
    accent: '#c8ff00',
    number: '01',
  },
  {
    icon: Brain,
    title: 'AI自动打卡',
    description: '基于AI算法自动完成打卡任务，智能模拟真实运动状态，每次打卡准确无误。',
    accent: '#ff3d5a',
    number: '02',
  },
  {
    icon: BarChart3,
    title: '数据统计分析',
    description: '详细记录跑步数据，包括距离、配速、时间等，生成可视化运动报告。',
    accent: '#2563eb',
    number: '03',
  },
  {
    icon: Shield,
    title: '安全保障',
    description: '本地运行不上传个人数据，不获取敏感权限，保护你的隐私安全。',
    accent: '#c8ff00',
    number: '04',
  },
  {
    icon: Clock,
    title: '定时任务',
    description: '设置自动运行时间，到点自动开始跑步任务，再也不用手动操作。',
    accent: '#ff3d5a',
    number: '05',
  },
  {
    icon: Smartphone,
    title: '多平台支持',
    description: '支持Android和iOS双平台，适配市面上99%的校园跑App。',
    accent: '#2563eb',
    number: '06',
  },
];

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Entrance animation
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          id: 'features',
        },
      }
    );

    // 3D tilt on mouse move
    const card = cardRef.current;
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    const handleMouseLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Icon hover animation
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: 5,
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          id: 'features',
        },
      });
    }

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getById('features')?.kill();
    };
  }, [index]);

  const Icon = feature.icon;

  return (
    <div
      ref={cardRef}
      className="feature-card group"
      style={{ transformPerspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {/* Number */}
      <div className="flex items-start justify-between mb-6">
        <div
          ref={iconRef}
          className="w-12 h-12 flex items-center justify-center border border-white/10"
          style={{ backgroundColor: `${feature.accent}10` }}
        >
          <Icon className="w-6 h-6" style={{ color: feature.accent }} />
        </div>
        <span className="font-mono text-xs text-fog/30 tracking-widest">{feature.number}</span>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-bold text-ice mb-3 tracking-tight">
        {feature.title}
      </h3>
      <p className="text-sm text-fog/60 leading-relaxed">{feature.description}</p>

      {/* Acsent line — animated on hover via CSS */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: feature.accent }}
      />
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, x: -20 },
        {
          opacity: 1, y: 0, x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            id: 'features',
          },
        }
      );

      // Subtext animation
      gsap.fromTo(subtextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: subtextRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            id: 'features',
          },
        }
      );

      // Section label animation
      const label = sectionRef.current.querySelector('[data-gsap="section-label"]');
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
              id: 'features',
            },
          }
        );
      }

      // Parallax background
      const bgMesh = sectionRef.current.querySelector('[data-gsap="bg-mesh"]');
      if (bgMesh) {
        gsap.to(bgMesh, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            id: 'features',
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 lg:py-32 relative mesh-section">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background mesh */}
        <div data-gsap="bg-mesh" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.05) 0%, transparent 70%)' }}
          />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,61,90,0.04) 0%, transparent 70%)' }}
          />
        </div>

        {/* Section Header — asymmetric layout */}
        <div className="mb-16 lg:mb-24">
          <span data-gsap="section-label" className="section-label mb-6 inline-flex opacity-0">
            功能特色
          </span>
          <div className="grid lg:grid-cols-12 gap-6 items-end">
            <h2
              ref={headingRef}
              className="lg:col-span-8 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight opacity-0"
            >
              为什么选择
              <br />
              <span className="gradient-text-hero">校园跑助手</span>
            </h2>
            <p
              ref={subtextRef}
              className="lg:col-span-4 text-fog/60 text-base leading-relaxed opacity-0"
            >
              全方位的校园跑步解决方案，让运动变得更加简单高效。
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
