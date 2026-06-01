import { motion } from 'framer-motion';
import { Zap, Mail, Globe, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: MessageCircle, label: 'QQ群' },
  { icon: Mail, label: '邮箱' },
  { icon: Globe, label: '官网' },
];

const footerLinks = {
  产品: ['功能特色', '使用方式', '下载安装', '常见问题'],
  支持: ['帮助中心', '意见反馈', '联系客服', 'QQ群交流'],
  法律: ['用户协议', '隐私政策', '免责声明'],
};

export default function Footer() {
  return (
    <footer className="bg-midnight border-t border-white/5 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-neon flex items-center justify-center">
                <Zap className="w-5 h-5 text-midnight" />
              </div>
              <span className="text-lg font-display font-bold text-ice tracking-tight">
                CAMPUS<span className="text-neon">RUN</span>
              </span>
            </a>
            <p className="text-sm text-fog/40 leading-relaxed mb-6">
              智能校园跑步解决方案，<br />
              让运动变得更加轻松高效。
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-neon/30 hover:bg-neon/5 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-fog/40" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + colIndex * 0.1 }}
            >
              <h4 className="font-display font-bold text-ice text-sm mb-4 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-fog/40 hover:text-neon transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-fog/30 font-mono">
            © 2026 CAMPUSRUN. ALL RIGHTS RESERVED.
          </p>
          <p className="text-xs text-fog/20">
            仅供学习交流使用，请遵守学校相关规定
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
