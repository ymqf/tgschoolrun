import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';

// 懒加载非首屏组件
const Hero = lazy(() => import('./components/Hero'));
const Features = lazy(() => import('./components/Features'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Stats = lazy(() => import('./components/Stats'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const DownloadSection = lazy(() => import('./components/DownloadSection'));
const Footer = lazy(() => import('./components/Footer'));

// 加载占位组件
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon"></div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <FAQ />
        <DownloadSection />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
