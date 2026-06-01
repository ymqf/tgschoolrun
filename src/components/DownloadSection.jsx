import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Apple, Smartphone, QrCode, ArrowRight, CheckCircle } from 'lucide-react';

const platforms = [
  {
    name: 'Android',
    icon: Smartphone,
    version: 'v2.5.0',
    size: '5.2MB',
    requirement: 'Android 8.0+',
    accent: '#c8ff00',
  },
  {
    name: 'iOS',
    icon: Apple,
    version: 'v2.5.0',
    size: '8.1MB',
    requirement: 'iOS 13.0+',
    accent: '#ff3d5a',
  },
];

export default function DownloadSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const qrY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="download" className="py-24 lg:py-32 relative overflow-hidden diagonal-cut">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-light to-midnight" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200, 255, 0, 0.06) 0%, transparent 70%)',
        }}
      />

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label mb-6 inline-flex">立即下载</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight mt-6 mb-6">
              开始你的
              <br />
              <span className="gradient-text-hero">轻松运动</span>
              之旅
            </h2>
            <p className="text-fog/60 text-lg mb-10 max-w-md leading-relaxed">
              下载校园跑助手，告别繁琐的校园跑任务，让运动回归快乐本质。
            </p>

            {/* Platform cards */}
            <div className="space-y-4 mb-10">
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 8, borderColor: `${platform.accent}40` }}
                  className="neon-card p-5 flex items-center gap-5 cursor-pointer group"
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center border"
                    style={{ borderColor: `${platform.accent}30`, backgroundColor: `${platform.accent}10` }}
                  >
                    <platform.icon className="w-6 h-6" style={{ color: platform.accent }} />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-bold text-ice text-lg">{platform.name}</div>
                    <div className="text-xs text-fog/40 font-mono">{platform.version} · {platform.size} · {platform.requirement}</div>
                  </div>
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Download className="w-5 h-5 text-fog/30 group-hover:text-neon transition-colors" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-3">
              {['完全免费', '无广告', '无Root', '持续更新'].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2 text-sm text-fog/50"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-neon/60" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — QR Code */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <motion.div
              style={{ y: qrY }}
              className="neon-card p-8 lg:p-12 text-center w-full max-w-sm relative"
            >
              {/* Scan line animation */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-6"
              >
                <QrCode className="w-14 h-14 text-neon" />
              </motion.div>
              <h3 className="font-display text-xl font-bold text-ice mb-2">扫码下载</h3>
              <p className="text-fog/50 text-sm mb-8">
                使用手机扫描二维码<br />即可快速下载安装
              </p>

              {/* QR placeholder */}
              <motion.div
                className="w-48 h-48 mx-auto bg-midnight-light border border-white/5 flex flex-col items-center justify-center mb-6 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="grid grid-cols-5 gap-1 mb-3">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-5 h-5 ${Math.random() > 0.5 ? 'bg-neon/60' : 'bg-midnight'}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.02 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-fog/30 font-mono">QR CODE</span>
              </motion.div>

              <motion.div
                className="flex items-center justify-center gap-2 text-sm text-fog/40"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
                或点击上方平台卡片直接下载
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
