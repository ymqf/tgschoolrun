import { useRef, useEffect, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

// Safe plugin registration — handles HMR and SSR
const pluginsRegistered = { current: false };
function registerPlugins() {
  if (pluginsRegistered.current) return;
  if (typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, Observer, DrawSVGPlugin, ScrambleTextPlugin);
  pluginsRegistered.current = true;
}
registerPlugins();

/**
 * Safely get GSAP context — works in SSR and HMR
 */
export function useGSAPContext(deps = []) {
  const scope = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    registerPlugins();
    ctx.current = gsap.context(() => {}, scope.current);
    return () => ctx.current?.revert();
  }, deps);

  return { scope, ctx };
}

/**
 * Stagger animation with GSAP — more reliable than Framer Motion
 * @param {string|Element[]} targets - CSS selector or element array
 * @param {object} vars - GSAP vars
 * @param {object} options - { scope, stagger, scrollTrigger }
 */
export function staggerEntrance(targets, vars, options = {}) {
  const els = typeof targets === 'string'
    ? options.scope?.querySelectorAll?.(targets) ?? document.querySelectorAll(targets)
    : targets;

  return gsap.fromTo(els,
    { opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)', ...vars.from },
    {
      opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power3.out',
      stagger: options.stagger ?? 0.08,
      ...vars,
      ...(options.scrollTrigger && {
        scrollTrigger: {
          trigger: options.scrollTrigger.trigger ?? els[0]?.parentElement,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...options.scrollTrigger,
        },
      }),
    }
  );
}

/**
 * Counter animation — animates number from 0 to target
 * Uses GSAP's built-in ticker for smooth 60fps updates
 */
export function animateCounter(el, target, options = {}) {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration: options.duration ?? 2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = Math.floor(obj.val).toLocaleString() + (options.suffix ?? '');
    },
    ...(options.scrollTrigger && {
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }),
  });
}

/**
 * Magnetic tilt effect — follows mouse with GSAP spring
 */
export function useMagneticTilt(ref, options = {}) {
  const { strength = 0.3, spring = 0.4, damping = 0.7 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let xTo, yTo;
    const onEnter = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      if (!xTo) xTo = gsap.quickTo(el, 'x', { duration: spring, ease: 'power2.out' });
      if (!yTo) yTo = gsap.quickTo(el, 'y', { duration: spring, ease: 'power2.out' });
      xTo(x * strength);
      yTo(y * strength);
    };
    const onLeave = () => {
      if (xTo) xTo(0);
      if (yTo) yTo(0);
    };

    el.addEventListener('mousemove', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength, spring]);
}

/**
 * 3D tilt with GSAP — more performant than Framer Motion useSpring
 */
export function useTilt3D(ref, options = {}) {
  const { maxTilt = 8, perspective = 800, scale = 1.02 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el, { transformPerspective: perspective });

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * maxTilt * 2,
        rotateX: -y * maxTilt * 2,
        scale,
        duration: 0.5,
        ease: 'power2.out',
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, maxTilt, perspective, scale]);
}

/**
 * Parallax with GSAP ScrollTrigger — silky smooth
 */
export function useParallax(ref, options = {}) {
  const { speed = 0.5, direction = 'y' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerPlugins();

    const prop = direction === 'y' ? 'y' : 'x';
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    tl.to(el, { [prop]: () => `${speed * 100}%`, ease: 'none' }, 0);
    return () => {
      tl.kill();
      ScrollTrigger.getById(tl.scrollTrigger?.id)?.kill();
    };
  }, [ref, speed, direction]);
}

/**
 * Draw SVG line animation — perfect for process flows
 */
export function animateSVGDraw(pathEl, options = {}) {
  return gsap.fromTo(pathEl,
    { drawSVG: '0% 0%' },
    {
      drawSVG: '0% 100%',
      duration: options.duration ?? 1.5,
      ease: 'power2.inOut',
      ...(options.scrollTrigger && {
        scrollTrigger: {
          trigger: pathEl,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          ...options.scrollTrigger,
        },
      }),
    }
  );
}

/**
 * Text scramble effect — cyberpunk style
 */
export function scrambleText(el, finalText, options = {}) {
  return gsap.to(el, {
    duration: options.duration ?? 1.5,
    scrambleText: {
      text: finalText,
      chars: options.chars ?? '.:|/<>[]{}()=+-*#@!',
      revealDelay: options.revealDelay ?? 0.3,
      ...options.scrambleOptions,
    },
    ease: 'none',
    ...(options.scrollTrigger && {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }),
  });
}

/**
 * Hero entrance timeline — cinematic sequence
 */
export function heroEntranceTimeline(scopeEl) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(
    `${scopeEl} [data-hero="badge"]`,
    { opacity: 0, y: 30, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6 }
  )
    .fromTo(
      `${scopeEl} [data-hero="heading"]`,
      { opacity: 0, y: 50, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
      '-=0.3'
    )
    .fromTo(
      `${scopeEl} [data-hero="subtitle"]`,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.4'
    )
    .fromTo(
      `${scopeEl} [data-hero="cta"]`,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 },
      '-=0.3'
    )
    .fromTo(
      `${scopeEl} [data-hero="phone"]`,
      { opacity: 0, x: 80, rotateY: -15, scale: 0.9 },
      { opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.0, ease: 'expo.out' },
      '-=0.6'
    )
    .fromTo(
      `${scopeEl} [data-hero="floating-badge"]`,
      { opacity: 0, scale: 0.5, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.15 },
      '-=0.3'
    );

  return tl;
}

/**
 * Cleanup helper — call in useEffect cleanup
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach(st => st.kill());
}

export { gsap, ScrollTrigger, Observer, DrawSVGPlugin, ScrambleTextPlugin };
