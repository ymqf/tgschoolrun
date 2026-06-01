import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Mail, Globe, MessageCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const footerLinks = {
  产品: ['功能介绍', '下载页面', '更新日志', '路线图'],
  支持: ['帮助中心', '常见问题', '联系我们', '提交反馈'],
  法律: ['隐私政策', '用户协议', '免责声明'],
};

const socialLinks = [
  { icon: Globe, label: '官网', href: '#' },
  { icon: MessageCircle, label: '微信', href: '#' },
  { icon: Mail, label: '邮箱', href: 'mailto:support@campusrun.com' },
];

export default function Footer() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const socialRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Grid items stagger
      if (gridRef.current) {
        const cols = gridRef.current.querySelectorAll('.footer-col');
        cols.forEach((col, i) => {
          gsap.fromTo(col,
            { opacity: 0, y: 40, filter: 'blur(4px)' },
            {
              opacity: 1, y: 0, filter: 'blur(0px)',
              duration: 0.7,
              delay: i * 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: col,
                start: 'top 92%',
                toggleActions: 'play none none none',
                id: 'footer',
              },
            }
          );
        });

        // Link items stagger within each column
        cols.forEach((col) => {
          const links = col.querySelectorAll('li');
          links.forEach((link, j) => {
            gsap.fromTo(link,
              { opacity: 0, x: -15 },
              {
                opacity: 1, x: 0,
                duration: 0.4,
                delay: 0.3 + j * 0.06,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: col,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                  id: 'footer',
                },
              }
            );
          });
        });
      }

      // Social icons
      if (socialRef.current) {
        const icons = socialRef.current.querySelectorAll('a');
        icons.forEach((icon, i) => {
          gsap.fromTo(icon,
            { opacity: 0, scale: 0, rotation: -20 },
            {
              opacity: 1, scale: 1, rotation: 0,
              duration: 0.5,
              delay: 0.5 + i * 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: socialRef.current,
                start: 'top 95%',
                toggleActions: 'play none none none',
                id: 'footer',
              },
            }
          );
        });
      }

      // Copyright
      if (copyRef.current) {
        gsap.fromTo(copyRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: copyRef.current,
              start: 'top 98%',
              toggleActions: 'play none none none',
              id: 'footer',
            },
          }
        );
      }

      // Divider draw
      const divider = sectionRef.current.querySelector('[data-gsap-divider]');
      if (divider) {
        gsap.fromTo(divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              id: 'footer',
            },
          }
        );
      }

      // Background glow parallax
      const glow = sectionRef.current.querySelector('[data-gsap="glow"]');
      if (glow) {
        gsap.to(glow, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
            id: 'footer',
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} className="relative pt-24 pb-8 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div
        data-gsap="glow"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,255,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top divider */}
        <div
          data-gsap-divider
          className="h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent mb-16 origin-center"
          style={{ scaleX: 0 }}
        />

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand column */}
          <div className="footer-col opacity-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-neon flex items-center justify-center">
                <Zap className="w-4 h-4 text-midnight" />
              </div>
              <span className="font-display font-bold text-ice text-lg">CAMPUSRUN</span>
            </div>
            <p className="text-sm text-fog/50 leading-relaxed mb-6">
              智能校园跑步解决方案，让运动变得简单高效。
            </p>
            <div ref={socialRef} className="flex gap-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-fog/50 hover:text-neon hover:border-neon/30 transition-all duration-300 opacity-0"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <div key={category} className="footer-col opacity-0">
              <h4 className="font-display font-bold text-ice mb-4 text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-fog/50 hover:text-neon transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          ref={copyRef}
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 opacity-0"
        >
          <div className="text-sm text-fog/30 font-mono">
            © 2026 CampusRun. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-xs text-fog/30 font-mono">
            <a href="#" className="hover:text-neon/60 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-neon/60 transition-colors">用户协议</a>
            <a href="#" className="hover:text-neon/60 transition-colors">免责声明</a>
          </div>
          <div className="text-xs text-fog/20 font-mono flex items-center gap-2">
            <Zap className="w-3 h-3 text-neon/40" />
            Made with passion
          </div>
        </div>

      </div>
    </footer>
  );
}
