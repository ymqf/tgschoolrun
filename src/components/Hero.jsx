import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Shield, Zap } from 'lucide-react';

const spring = { type: 'spring', stiffness: 200, damping: 20 };
const smoothSpring = { type: 'spring', stiffness: 100, damping: 15 };

function TiltCard({ children, className }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], reduce ? [0, 0] : [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], reduce ? [0, 0] : [-8, 8]), { stiffness: 300, damping: 30 });

  function handleMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated mesh blobs
function MeshBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(200, 255, 0, 0.12) 0%, transparent 70%)',
          top: '-10%',
          left: '-5%',
        }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 61, 90, 0.08) 0%, transparent 70%)',
          bottom: '-5%',
          right: '-5%',
        }}
        animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
          top: '40%',
          right: '20%',
        }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

// Geometric decorations
function GeoShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diag" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="40" stroke="#c8ff00" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag)" />
      </svg>

      {/* Floating cross */}
      <motion.div
        className="absolute top-[20%] right-[15%] text-neon/20"
        animate={{ rotate: [0, 90, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect x="17" y="0" width="6" height="40" fill="currentColor" />
          <rect x="0" y="17" width="40" height="6" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Floating circle */}
      <motion.div
        className="absolute bottom-[30%] left-[10%]"
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="30" r="28" stroke="#ff3d5a" strokeWidth="2" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Floating triangle */}
      <motion.div
        className="absolute top-[60%] right-[25%]"
        animate={{ rotate: [0, 180, 360], y: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <polygon points="15,2 28,28 2,28" stroke="#c8ff00" strokeWidth="1.5" fill="none" opacity="0.2" />
        </svg>
      </motion.div>
    </div>
  );
}

// Ticker bar
function TickerBar() {
  const items = ['自动打卡', '智能轨迹', '安全可靠', '极速上手', '多平台支持', '数据统计', '定时任务', '免费使用'];
  return (
    <div className="py-4 border-y border-white/5 overflow-hidden">
      <div className="ticker">
        <div className="ticker-content">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="mx-8 text-sm font-mono text-fog/40 tracking-widest uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-neon/40 rounded-full" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col overflow-hidden hero-bg">
      <MeshBlobs />
      <GeoShapes />

      {/* Main content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8 flex-1 flex items-center"
        style={{ y: textY, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="section-label">
                <span className="w-2 h-2 bg-neon rounded-full animate-pulse" />
                v2.5 — 全新升级
              </span>
            </motion.div>

            {/* Heading — Bold, asymmetric */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold leading-[0.9] mb-8 tracking-tight"
            >
              <span className="block text-ice/40 text-2xl sm:text-3xl font-body font-normal tracking-normal mb-4">
                智能校园跑步解决方案
              </span>
              <span className="block text-ice">
                让校园跑
              </span>
              <span className="block gradient-text-hero mt-2">
                自动完成
              </span>
              <span className="block text-ice/60 text-3xl sm:text-4xl lg:text-5xl mt-4 font-light">
                轻松达标<span className="neon-text">_</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-fog max-w-lg mb-10 leading-relaxed"
            >
              智能识别运动轨迹，自动记录跑步数据。
              <br />
              <span className="text-fog/50">一键设置，省时省力，学业运动两不误。</span>
            </motion.p>

            {/* CTA Buttons — Angular cut style */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.a
                href="#download"
                className="btn-neon"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-5 h-5" />
                立即下载
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#how-it-works"
                className="btn-outline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5" />
                了解更多
              </motion.a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 text-sm text-fog/50"
            >
              {[
                { icon: Shield, text: '本地运行' },
                { icon: Zap, text: '3分钟设置' },
                { icon: Sparkles, text: '10万+用户' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2">
                  <badge.icon className="w-4 h-4 text-neon/60" />
                  {badge.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 80, y: 40, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, y: 0, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
            style={{ perspective: 1000 }}
          >
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="floating-badge top-8 -left-4 lg:left-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-neon" />
                </div>
                <div>
                  <div className="text-[10px] text-fog/50 uppercase tracking-wider">今日</div>
                  <div className="text-sm font-bold text-ice">2.5 公里</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -1.5, 1.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="floating-badge bottom-32 -right-4 lg:right-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success-400/20 flex items-center justify-center">
                  <span className="text-success-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <div className="text-[10px] text-fog/50 uppercase tracking-wider">状态</div>
                  <div className="text-sm font-bold text-success-400">已打卡</div>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <TiltCard className="phone-mockup w-[280px] sm:w-[300px]">
              <div className="phone-screen p-5 flex flex-col">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-6 pt-1">
                  <span className="text-ice/40 text-xs font-mono">9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-3.5 h-2 border border-ice/30 rounded-[2px]">
                      <motion.div
                        className="h-full bg-neon rounded-[1px]"
                        initial={{ width: '0%' }}
                        animate={{ width: '75%' }}
                        transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </div>

                {/* App header */}
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 bg-neon/20 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <Zap className="w-5 h-5 text-neon" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-bold text-ice font-display">校园跑助手</div>
                    <div className="text-[10px] text-fog/40">Smart Campus Runner</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3 flex-1">
                  {/* Progress bar */}
                  <div className="bg-white/5 p-3 border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] text-fog/50 uppercase tracking-wider">今日进度</span>
                      <span className="text-xs font-mono text-neon">75%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        transition={{ delay: 1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full bg-gradient-to-r from-neon to-success-400"
                      />
                    </div>
                  </div>

                  {/* Stat grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <motion.div
                      className="bg-white/5 p-3 border border-white/5 text-center"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    >
                      <div className="text-xl font-bold text-neon font-display">2.5</div>
                      <div className="text-[9px] text-fog/40 uppercase tracking-wider mt-0.5">公里</div>
                    </motion.div>
                    <motion.div
                      className="bg-white/5 p-3 border border-white/5 text-center"
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      <div className="text-xl font-bold text-ice font-display">18:30</div>
                      <div className="text-[9px] text-fog/40 uppercase tracking-wider mt-0.5">用时</div>
                    </motion.div>
                  </div>

                  {/* Status badge */}
                  <motion.div
                    className="bg-neon/10 border border-neon/20 p-3 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2, type: 'spring', stiffness: 200 }}
                  >
                    <div className="text-xs font-bold text-neon font-display uppercase tracking-wider">
                      ✓ 自动打卡完成
                    </div>
                  </motion.div>

                  {/* Map placeholder */}
                  <div className="bg-white/5 border border-white/5 p-4 flex-1 min-h-[80px] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <svg width="100%" height="100%" viewBox="0 0 200 100">
                        <motion.path
                          d="M10,80 Q50,20 100,50 T190,30"
                          fill="none"
                          stroke="#c8ff00"
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 3, delay: 1.5, ease: 'easeInOut' }}
                        />
                      </svg>
                    </div>
                    <div className="text-[10px] text-fog/30 uppercase tracking-wider">运动轨迹</div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Ticker bar at bottom */}
      <TickerBar />
    </section>
  );
}
