import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '校园跑助手安全吗？会不会被学校检测到？',
    answer: '校园跑助手采用本地运行方式，所有数据均在本地处理，不上传任何服务器。软件通过智能算法模拟真实运动轨迹和状态，与正常使用无异。我们已服务超过10万用户，从未出现过安全问题。',
  },
  {
    question: '支持哪些学校的校园跑App？',
    answer: '校园跑助手支持市面上99%的主流校园跑App，包括但不限于：步道乐跑、运动世界校园版、校园畅跑、阳光校园跑等。',
  },
  {
    question: '使用校园跑助手需要手机一直开着吗？',
    answer: '不需要。校园跑助手支持后台运行模式，设置好定时任务后，软件会在后台自动完成跑步任务。你只需要确保手机电量充足、网络正常即可。',
  },
  {
    question: '会不会消耗很多流量？',
    answer: '校园跑助手流量消耗极低，每次跑步任务仅消耗约1-2MB流量。总体来说，一个月的流量消耗不超过10MB。',
  },
  {
    question: '如何设置自动跑步任务？',
    answer: '设置非常简单：打开校园跑助手 → 选择校园跑App → 设置跑步时间和目标距离 → 开启定时任务。整个过程不超过3分钟。',
  },
  {
    question: '如果遇到问题怎么办？',
    answer: '我们提供7×24小时在线客服支持。你可以通过App内的"意见反馈"功能联系我们，也可以加入官方QQ群获取技术支持。',
  },
];

function FAQItem({ faq, index, isOpen, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`border transition-all duration-300 ${
        isOpen
          ? 'bg-midnight-light border-neon/20 shadow-lg shadow-neon/5'
          : 'bg-midnight-light/50 border-white/5 hover:border-white/10'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
      >
        <span className={`font-display font-bold text-base sm:text-lg pr-4 transition-colors ${
          isOpen ? 'text-neon' : 'text-ice group-hover:text-neon/80'
        }`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-colors ${
            isOpen ? 'text-neon' : 'text-fog/40'
          }`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <motion.div
                className="h-px bg-gradient-to-r from-neon/30 via-neon/10 to-transparent mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ transformOrigin: 'left' }}
              />
              <motion.p
                className="text-sm text-fog/60 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                {faq.answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 lg:py-32 relative mesh-section">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.span
            className="section-label mb-6 inline-flex"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            常见问题
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl font-display font-extrabold text-ice mt-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            你可能想知道的
          </motion.h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-px">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
