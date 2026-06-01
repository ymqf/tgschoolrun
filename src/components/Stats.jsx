import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { number: 100000, suffix: '+', label: '活跃用户', description: '全国高校学生信赖之选', accent: '#c8ff00' },
  { number: 500, suffix: '万', label: '累计打卡', description: '帮助学生完成跑步任务', accent: '#ff3d5a' },
  { number: 99.9, suffix: '%', label: '成功率', description: '打卡成功几乎零失误', accent: '#2563eb' },
  { number: 3, suffix: '分钟', label: '极速上手', description: '从安装到使用仅需3分钟', accent: '#c8ff00' },
];

function AnimatedNumber({ value, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = value % 1 !== 0;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {typeof count === 'number' && count >= 1000
        ? (count / 10000).toFixed(count >= 10000 ? 0 : 1) + '万'
        : count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-light to-midnight" />

      {/* Mesh accents */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200, 255, 0, 0.06) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255, 61, 90, 0.05) 0%, transparent 70%)' }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 18, repeat: Infinity }}
      />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(200,255,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-6 inline-flex">数据说话</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice mt-6 tracking-tight">
            校园跑助手已服务
            <br />
            <span className="neon-text">全国百万学子</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-midnight p-8 lg:p-10 text-center group hover:bg-midnight-light transition-colors duration-300"
            >
              {/* Accent dot */}
              <div className="w-2 h-2 mx-auto mb-4" style={{ backgroundColor: stat.accent }} />

              {/* Number */}
              <div className="stat-number mb-3" style={{ color: stat.accent }}>
                <AnimatedNumber value={stat.number} suffix={stat.suffix} inView={inView} />
              </div>

              <div className="font-display text-lg font-bold text-ice mb-1">{stat.label}</div>
              <div className="text-xs text-fog/40">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
