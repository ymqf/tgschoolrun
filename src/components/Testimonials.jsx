import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: '小李',
    school: '清华大学',
    avatar: '🧑‍🎓',
    rating: 5,
    content: '用了校园跑助手之后，再也不用担心下雨天还要出去跑步了。设置非常简单，打卡成功率超高！',
    tags: ['高效', '便捷'],
    accent: '#c8ff00',
  },
  {
    name: '小王',
    school: '北京大学',
    avatar: '👩‍🎓',
    rating: 5,
    content: '作为一个运动困难户，校园跑助手真的是我的救星。每天的跑步任务都能自动完成。',
    tags: ['省心', '稳定'],
    accent: '#ff3d5a',
  },
  {
    name: '小张',
    school: '浙江大学',
    avatar: '🧑‍💻',
    rating: 5,
    content: '软件很小，但功能很强大。定时功能特别好用，每天早上自动跑完，我还在睡梦中。',
    tags: ['小巧', '定时'],
    accent: '#2563eb',
  },
  {
    name: '小陈',
    school: '复旦大学',
    avatar: '👩‍🏫',
    rating: 5,
    content: '一开始还有点担心安全问题，用了之后发现完全是多虑了。本地运行，不收集个人信息。',
    tags: ['安全', '放心'],
    accent: '#c8ff00',
  },
  {
    name: '小刘',
    school: '上海交通大学',
    avatar: '🧑‍🔬',
    rating: 5,
    content: '数据统计功能做得很好，能清楚看到每天的跑步情况。支持多种校园跑App。',
    tags: ['数据全', '专业'],
    accent: '#ff3d5a',
  },
  {
    name: '小赵',
    school: '武汉大学',
    avatar: '👩‍🎨',
    rating: 5,
    content: '期末考试周太忙了，根本没时间跑步。有了校园跑助手，完全不用操心。',
    tags: ['省时间', '必备'],
    accent: '#2563eb',
  },
];

function TestimonialCard({ testimonial, index }) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="neon-card p-6 lg:p-8 relative group"
    >
      {/* Accent top line */}
      <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: `${testimonial.accent}20` }} />
      <div
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: testimonial.accent }}
      />

      {/* Quote */}
      <div className="flex items-start justify-between mb-4">
        <Quote className="w-6 h-6 opacity-20" style={{ color: testimonial.accent }} />
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 400 }}
            >
              <Star className="w-3.5 h-3.5" style={{ color: testimonial.accent, fill: testimonial.accent }} />
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-sm text-fog/70 leading-relaxed mb-6">
        "{testimonial.content}"
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {testimonial.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-mono tracking-wider uppercase border"
            style={{
              color: testimonial.accent,
              borderColor: `${testimonial.accent}30`,
              backgroundColor: `${testimonial.accent}08`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div
          className="w-10 h-10 flex items-center justify-center text-lg"
          style={{ backgroundColor: `${testimonial.accent}15` }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-display font-bold text-ice text-sm">{testimonial.name}</div>
          <div className="text-xs text-fog/40">{testimonial.school}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 lg:py-32 relative mesh-section">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.span
            className="section-label mb-6 inline-flex"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            用户评价
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-ice leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            他们都选择了
            <br />
            <span className="gradient-text-hero">校园跑助手</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5" style={{ perspective: 1000 }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
