import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { MapPin, Brain, BarChart3, Shield, Clock, Smartphone } from 'lucide-react';

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
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], reduce ? [0, 0] : [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], reduce ? [0, 0] : [-5, 5]), { stiffness: 300, damping: 30 });

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="feature-card group"
    >
      {/* Number */}
      <div className="flex items-start justify-between mb-6">
        <motion.div
          className="w-12 h-12 flex items-center justify-center border border-white/10"
          style={{ backgroundColor: `${feature.accent}10` }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Icon className="w-6 h-6" style={{ color: feature.accent }} />
        </motion.div>
        <span className="font-mono text-xs text-fog/30 tracking-widest">{feature.number}</span>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-bold text-ice mb-3 tracking-tight">
        {feature.title}
      </h3>
      <p className="text-sm text-fog/60 leading-relaxed">{feature.description}</p>

      {/* Accent line — animated on hover via CSS */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: feature.accent }}
      />
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative mesh-section">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — asymmetric layout */}
        <div className="mb-16 lg:mb-24">
          <motion.span
            className="section-label mb-6 inline-flex"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            功能特色
          </motion.span>
          <div className="grid lg:grid-cols-12 gap-6 items-end">
            <motion.h2
              className="lg:col-span-8 text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              为什么选择
              <br />
              <span className="gradient-text-hero">校园跑助手</span>
            </motion.h2>
            <motion.p
              className="lg:col-span-4 text-fog/60 text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              全方位的校园跑步解决方案，让运动变得更加简单高效。
            </motion.p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5" style={{ perspective: 1000 }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
