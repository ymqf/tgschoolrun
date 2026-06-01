import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Settings, Zap, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Download,
    title: '下载安装',
    description: '在本站免费下载校园跑助手，支持Android和iOS双平台，安装包仅5MB。',
    accent: '#c8ff00',
    details: ['支持 Android 8.0+', '支持 iOS 13.0+', '安装包仅 5MB'],
  },
  {
    step: '02',
    icon: Settings,
    title: '简单设置',
    description: '选择校园跑平台，设置跑步时间和目标距离，整个过程不超过3分钟。',
    accent: '#ff3d5a',
    details: ['适配主流校园跑App', '自定义跑步参数', '3分钟极速配置'],
  },
  {
    step: '03',
    icon: Zap,
    title: '自动运行',
    description: '到设定时间自动开始运行，智能模拟运动状态，完成后自动打卡。',
    accent: '#2563eb',
    details: ['定时自动启动', '智能运动模拟', '自动完成打卡'],
  },
];

function ConnectorLine({ inView }) {
  return (
    <div className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-px">
      <motion.div
        className="w-full h-full bg-gradient-to-r from-neon/30 via-coral/20 to-primary-500/30"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
      />
      {/* Animated dot */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-neon"
        initial={{ left: '0%' }}
        animate={inView ? { left: ['0%', '100%', '100%'] } : { left: '0%' }}
        transition={{ duration: 2.5, delay: 0.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 4 }}
      />
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden striped-bg">
      {/* Background accents */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200, 255, 0, 0.06) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div ref={sectionRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.span
            className="section-label mb-6 inline-flex"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            使用方式
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            三步即可
            <span className="gradient-text-hero"> 轻松完成</span>
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 relative">
          <ConnectorLine inView={inView} />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="neon-card p-8 relative group"
            >
              {/* Step number */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-14 h-14 flex items-center justify-center border"
                  style={{
                    borderColor: `${step.accent}30`,
                    backgroundColor: `${step.accent}10`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <step.icon className="w-6 h-6" style={{ color: step.accent }} />
                </motion.div>
                <span className="font-mono text-xs text-fog/30 tracking-widest">STEP {step.step}</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-ice mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm text-fog/60 leading-relaxed mb-6">{step.description}</p>

              <ul className="space-y-2">
                {step.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-2 text-sm text-fog/50"
                  >
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: step.accent }} />
                    {detail}
                  </motion.li>
                ))}
              </ul>

              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-8 h-8 opacity-20"
                style={{
                  background: `linear-gradient(135deg, transparent 50%, ${step.accent} 50%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
