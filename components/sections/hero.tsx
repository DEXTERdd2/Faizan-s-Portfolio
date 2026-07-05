"use client";



import { useCallback, useRef, useState } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { scrollToSection } from "@/lib/lumora";

import { heroBadges, heroBullets, siteConfig, socialLinks } from "@/data/site-data";

import { useApp } from "@/components/lumora/app-context";

import { Reveal } from "@/components/lumora/text-reveal";

import { HoverSpring } from "@/components/lumora/hover-spring";

import { MagneticWrap } from "@/components/lumora/magnetic-wrap";

import { SocialIcon } from "@/components/lumora/social-icon";

import { HeroGradientBg } from "@/components/sections/hero-gradient-bg";

import { HeroEcosystem } from "@/components/sections/hero-ecosystem";

import { HeroCyclingTitle } from "@/components/sections/hero-cycling-title";

import { HeroScrollIndicator } from "@/components/sections/hero-scroll-indicator";

import { HeroStatsGrid } from "@/components/sections/hero-widgets";
import { useBreakpoint } from "@/hooks/use-breakpoint";



function HeroHello() {

  const text = "Hello,";

  return (

    <h1 className="text-fluid-hero font-bold tracking-tight">

      {text.split("").map((char, i) => (

        <motion.span

          key={`${char}-${i}`}

          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}

          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}

          transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}

          className="inline-block"

        >

          {char === " " ? "\u00A0" : char}

        </motion.span>

      ))}

      <motion.span

        className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-1 bg-gradient-to-b from-violet-400 to-cyan-400"

        animate={{ opacity: [0.4, 1, 0.4] }}

        transition={{ duration: 2, repeat: Infinity }}

        aria-hidden

      />

    </h1>

  );

}



function HeroSocialLink({

  link,

  index,

}: {

  link: (typeof socialLinks)[0];

  index: number;

}) {

  const [hover, setHover] = useState(false);



  return (

    <MagneticWrap strength={0.15}>

      <HoverSpring scale={1.1} rotate={hover ? 4 : 0}>

        <motion.div

          onHoverStart={() => setHover(true)}

          onHoverEnd={() => setHover(false)}

          initial={{ opacity: 0, y: 8 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.4 + index * 0.06 }}

          className="group relative"

        >

          <SocialIcon

            link={link}

            className="grid size-9 place-items-center rounded-pill border border-white/10 bg-white/[0.04] text-white/55 backdrop-blur-md transition hover:border-violet-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.35)]"

          />

          <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0a0e16]/90 px-2 py-0.5 text-[0.55rem] text-white/70 opacity-0 transition group-hover:opacity-100">

            {link.name}

          </span>

        </motion.div>

      </HoverSpring>

    </MagneticWrap>

  );

}



export function Hero() {

  const { introReady, openModal } = useApp();

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const sectionRef = useRef<HTMLElement>(null);



  const { isMobile, reduceMotion } = useBreakpoint();



  const { scrollYProgress } = useScroll({

    target: sectionRef,

    offset: ["start start", "end start"],

  });



  const scrollEnd = isMobile ? 0.22 : 0.35;

  const portraitScale = useTransform(scrollYProgress, [0, scrollEnd], [1, isMobile ? 0.94 : 0.88]);

  const contentY = useTransform(scrollYProgress, [0, scrollEnd], [0, isMobile ? 20 : 40]);

  const contentOpacity = useTransform(scrollYProgress, [0, isMobile ? 0.28 : 0.4], [1, isMobile ? 0.7 : 0.55]);

  const bgBlur = useTransform(scrollYProgress, [0, scrollEnd], [0, isMobile ? 0 : 2]);
  const bgFilter = useTransform(bgBlur, (v) => `blur(${v}px)`);

  const onHeroMove = useCallback((e: React.MouseEvent<HTMLElement>) => {

    const rect = e.currentTarget.getBoundingClientRect();

    setMouse({

      x: (e.clientX - rect.left) / rect.width,

      y: (e.clientY - rect.top) / rect.height,

    });

  }, []);



  return (

    <section

      ref={sectionRef}

      id="home"

      onMouseMove={onHeroMove}

      className="relative isolate min-h-0 overflow-hidden bg-[#030712] text-white"

    >

      <motion.div style={{ filter: reduceMotion ? undefined : bgFilter }} className="absolute inset-0">
        <HeroGradientBg mouseX={mouse.x} mouseY={mouse.y} />
      </motion.div>



      <motion.div

        className="shell relative z-10 flex flex-col justify-center py-14 sm:py-16 lg:min-h-[calc(100svh-4.5rem)] lg:py-16"

        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}

      >

        <div className="grid items-center gap-y-8 lg:grid-cols-12 lg:gap-x-4 lg:gap-y-0 xl:gap-x-6">

          {/* LEFT — intro */}

          <div className="order-1 flex min-w-0 flex-col gap-3.5 sm:gap-4 lg:order-1 lg:col-span-5 lg:pr-2 xl:col-span-5">

            <Reveal requireIntro delay={60} y={8}>

              <div className="flex flex-wrap gap-2">

                {heroBadges.map((badge, i) => (

                  <motion.span

                    key={badge.label}

                    initial={{ opacity: 0, scale: 0.92 }}

                    animate={introReady ? { opacity: 1, scale: 1 } : {}}

                    transition={{ delay: 0.1 + i * 0.05 }}

                    whileHover={{ scale: 1.05, borderColor: "rgba(124,58,237,0.4)" }}

                    className={`inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-[0.65rem] font-medium backdrop-blur-sm sm:text-xs ${

                      badge.tone === "green"

                        ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"

                        : badge.tone === "accent"

                          ? "border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#c4b5fd]"

                          : "border-white/10 bg-white/[0.04] text-white/50"

                    }`}

                  >

                    {badge.tone === "green" && (

                      <span className="size-1.5 animate-pulse rounded-pill bg-emerald-400" />

                    )}

                    {badge.label}

                  </motion.span>

                ))}

              </div>

            </Reveal>



            <Reveal requireIntro delay={120} y={12}>

              {introReady ? <HeroHello /> : (

                <h1 className="text-fluid-hero font-bold tracking-tight">

                  Hello,

                </h1>

              )}

            </Reveal>



            <Reveal requireIntro delay={180} y={10}>

              <div className="space-y-1">

                <p className="text-base text-white/50 sm:text-lg">

                  I am{" "}

                  <motion.span

                    className="bg-gradient-to-r from-white via-violet-200 to-blue-300 bg-clip-text font-bold tracking-tight text-transparent"

                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}

                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}

                    style={{

                      fontSize: "clamp(1.35rem, 2.5vw + 0.5rem, 2.25rem)",

                      backgroundSize: "200% 200%",

                    }}

                  >

                    {siteConfig.name}

                  </motion.span>

                </p>

                {introReady ? <HeroCyclingTitle /> : (

                  <p className="text-sm text-white/45">{siteConfig.title}</p>

                )}

                <p className="text-xs text-white/32">{siteConfig.location}</p>

                <div className="flex gap-2 pt-2">

                  {socialLinks.map((link, i) => (

                    <HeroSocialLink key={link.name} link={link} index={i} />

                  ))}

                </div>

              </div>

            </Reveal>



            <Reveal requireIntro delay={240} y={10}>

              <p className="max-w-md text-sm leading-relaxed text-white/55 sm:text-[0.9375rem]">

                I build{" "}

                <motion.span

                  className="bg-gradient-to-r from-[#c4b5fd] to-[#93c5fd] bg-clip-text font-medium text-transparent"

                  animate={{ opacity: [0.85, 1, 0.85] }}

                  transition={{ duration: 4, repeat: Infinity }}

                >

                  enterprise-grade software

                </motion.span>{" "}

                — scalable APIs, cloud systems, and AI-powered automation for global clients.

              </p>

            </Reveal>



            <Reveal requireIntro delay={300} y={8}>

              <ul className="space-y-2">

                {heroBullets.map((item, i) => (

                  <motion.li

                    key={item}

                    initial={{ opacity: 0, x: -8 }}

                    animate={introReady ? { opacity: 1, x: 0 } : {}}

                    transition={{ delay: 0.35 + i * 0.07, type: "spring", stiffness: 120 }}

                    whileHover={{ x: 4 }}

                    className="flex items-center gap-2 text-sm text-white/72"

                  >

                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#ec4899] text-[0.5rem] text-white">

                      ✓

                    </span>

                    {item}

                  </motion.li>

                ))}

              </ul>

            </Reveal>



            <Reveal requireIntro delay={360} y={8}>

              <div className="flex flex-wrap gap-2">

                <MagneticWrap>

                  <HoverSpring scale={1.04}>

                    <button

                      type="button"

                      suppressHydrationWarning

                      onClick={openModal}

                      className="hero-btn-primary group relative overflow-hidden rounded-pill bg-gradient-to-r from-[#7C3AED] via-[#a855f7] to-[#ec4899] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/25"

                    >

                      <span className="relative z-10">Hire Me</span>

                      <span className="hero-btn-sweep pointer-events-none absolute inset-0" aria-hidden />

                    </button>

                  </HoverSpring>

                </MagneticWrap>

                <HoverSpring scale={1.03}>

                  <button

                    type="button"

                    suppressHydrationWarning

                    onClick={() => scrollToSection("works")}

                    className="hero-btn-ghost rounded-pill border border-white/12 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-md transition hover:border-violet-500/30 hover:shadow-[0_0_24px_rgba(124,58,237,0.15)]"

                  >

                    View Projects

                  </button>

                </HoverSpring>

                <HoverSpring scale={1.03}>

                  <a

                    href={siteConfig.resumeUrl}

                    className="hero-btn-ghost inline-flex items-center gap-1.5 rounded-pill border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white/75 transition hover:border-[#7C3AED]/40 hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.12)]"

                  >

                    <span className="text-white/40">◷</span> Resume

                  </a>

                </HoverSpring>

              </div>

            </Reveal>



            <Reveal requireIntro delay={420} y={8}>

              <HeroStatsGrid visible={introReady} />

            </Reveal>

          </div>



          {/* RIGHT — portrait centered between widget columns */}

          <div className="order-2 w-full min-w-0 lg:order-2 lg:col-span-7 lg:col-start-6 xl:col-span-7">

            <HeroEcosystem visible={introReady} scrollScale={portraitScale} />

          </div>

        </div>



        <Reveal requireIntro delay={700} y={0} className="mt-8 border-t border-white/[0.06] pt-4">

          <HeroScrollIndicator />

        </Reveal>

      </motion.div>



      <div className="pointer-events-none absolute -bottom-px left-0 right-0 z-20 h-12 bg-gradient-to-b from-transparent to-background" />

    </section>

  );

}


