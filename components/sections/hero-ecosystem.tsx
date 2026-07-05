"use client";



import { useCallback, useEffect, useRef, useState } from "react";

import { motion, type MotionValue } from "framer-motion";

import { useBreakpoint } from "@/hooks/use-breakpoint";

import { HeroNetworkMesh } from "@/components/sections/hero-network";

import { HeroPortraitDisplay } from "@/components/sections/hero-portrait-display";

import { HeroTechOrbit } from "@/components/sections/hero-tech-orbit";

import {

  HeroAiPanel,

  HeroApiPanel,

  HeroBackendPanel,

  HeroCodePanel,

  HeroCodePanelB,

  HeroDatabasePanel,

  HeroDeployPanel,

  HeroGitHubPanel,

  HeroTechChip,

  HeroTerminalPanel,

} from "@/components/sections/hero-floating-panels";



const LEFT_TECH = ["ASP.NET Core", "C#", "Azure", "Docker", "Redis"];

const RIGHT_TECH = ["React", "Next.js", "OpenAI", "TypeScript", "SignalR"];



const TABLET_WIDGETS = [

  HeroTerminalPanel,

  HeroApiPanel,

  HeroBackendPanel,

  HeroDatabasePanel,

  HeroDeployPanel,

  HeroGitHubPanel,

];



function WidgetCell({

  children,

  duration = 6,

  delay = 0,

  parallax,

  depth = 1,

  parallaxScale = 1,

  className = "w-full max-w-[158px]",

  visible = true,

}: {

  children: React.ReactNode;

  duration?: number;

  delay?: number;

  parallax: { x: number; y: number };

  depth?: number;

  parallaxScale?: number;

  className?: string;

  visible?: boolean;

}) {

  const px = (parallax.x - 0.5) * (8 + depth * 4) * parallaxScale;

  const py = (parallax.y - 0.5) * (8 + depth * 4) * parallaxScale;

  const tiltX = (parallax.y - 0.5) * -3 * parallaxScale;

  const tiltY = (parallax.x - 0.5) * 3 * parallaxScale;

  const floatY = parallaxScale > 0 ? -5 : -2;



  return (

    <motion.div

      initial={{ opacity: 0, y: 22, scale: 0.88, filter: "blur(8px)" }}

      animate={

        visible

          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", x: px }

          : { opacity: 0, y: 22, scale: 0.88, filter: "blur(8px)" }

      }

      style={{ y: py }}

      transition={{ type: "spring", stiffness: 95, damping: 18, delay }}

      className={className}

    >

      <motion.div

        animate={{ y: [0, floatY, 0] }}

        transition={{

          y: { duration, repeat: Infinity, ease: "easeInOut", delay },

        }}

        style={{ rotateX: tiltX * 0.6, rotateY: tiltY * 0.6, transformPerspective: 900 }}

        whileHover={{ scale: 1.04, y: -3 }}

        className="hero-widget-shell will-change-transform"

      >

        {children}

      </motion.div>

    </motion.div>

  );

}



export function HeroEcosystem({

  visible,

  scrollScale,

}: {

  visible: boolean;

  scrollScale?: MotionValue<number>;

}) {

  const containerRef = useRef<HTMLDivElement>(null);

  const [parallax, setParallax] = useState({ x: 0.5, y: 0.5 });

  const [size, setSize] = useState({ w: 0, h: 0 });

  const { isMobile, isTablet, reduceMotion } = useBreakpoint();

  const parallaxScale = reduceMotion ? 0 : isMobile ? 0.3 : isTablet ? 0.35 : 1;



  const onMove = useCallback(

    (clientX: number, clientY: number) => {

      const el = containerRef.current;

      if (!el) return;

      const rect = el.getBoundingClientRect();

      setParallax({

        x: (clientX - rect.left) / rect.width,

        y: (clientY - rect.top) / rect.height,

      });

    },

    [],

  );



  const onMouseMove = useCallback(

    (e: React.MouseEvent) => {

      if (isMobile) return;

      onMove(e.clientX, e.clientY);

    },

    [isMobile, onMove],

  );



  const onTouchMove = useCallback(

    (e: React.TouchEvent) => {

      if (!isMobile || reduceMotion) return;

      const touch = e.touches[0];

      if (!touch) return;

      onMove(touch.clientX, touch.clientY);

    },

    [isMobile, reduceMotion, onMove],

  );



  const onTouchEnd = useCallback(() => {

    if (!isMobile) return;

    setParallax({ x: 0.5, y: 0.5 });

  }, [isMobile]);



  useEffect(() => {

    const el = containerRef.current;

    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {

      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });

    });

    ro.observe(el);

    return () => ro.disconnect();

  }, []);



  const portraitX = (parallax.x - 0.5) * (isMobile ? 14 : 8) * parallaxScale;

  const portraitY = (parallax.y - 0.5) * (isMobile ? 14 : 8) * parallaxScale;

  const glowIntensity = 0.4 + Math.abs(parallax.x - 0.5) + Math.abs(parallax.y - 0.5);



  return (

    <div

      ref={containerRef}

      onMouseMove={onMouseMove}

      onTouchMove={onTouchMove}

      onTouchEnd={onTouchEnd}

      onTouchCancel={onTouchEnd}

      className="relative w-full min-w-0 overflow-hidden"

    >

      <HeroNetworkMesh width={size.w} height={size.h} visible={visible} />



      <div className="grid w-full min-w-0 items-stretch justify-items-center gap-2 sm:gap-3 lg:grid-cols-[minmax(120px,158px)_minmax(200px,1fr)_minmax(120px,158px)] lg:gap-x-2 xl:gap-x-4">

        {/* LEFT widgets */}

        <div className="hidden min-h-[clamp(420px,52vh,560px)] flex-col items-end justify-evenly lg:flex">

          {visible && (

            <>

              <WidgetCell duration={6} delay={0.05} parallax={parallax} depth={1.2} parallaxScale={parallaxScale} visible={visible}>

                <HeroTerminalPanel />

              </WidgetCell>

              <WidgetCell duration={8} delay={0.12} parallax={parallax} depth={1.4} parallaxScale={parallaxScale} visible={visible}>

                <HeroBackendPanel />

              </WidgetCell>

              <WidgetCell duration={7} delay={0.18} parallax={parallax} depth={1.1} parallaxScale={parallaxScale} visible={visible}>

                <HeroDatabasePanel />

              </WidgetCell>

              <WidgetCell duration={8} delay={0.24} parallax={parallax} depth={1.3} parallaxScale={parallaxScale} visible={visible}>

                <HeroDeployPanel />

              </WidgetCell>

              <div className="flex max-w-[158px] flex-wrap justify-end gap-1">

                {LEFT_TECH.map((t, i) => (

                  <HeroTechChip key={t} label={t} index={i} />

                ))}

              </div>

            </>

          )}

        </div>



        {/* CENTER — portrait */}

        <div className="relative flex w-full min-w-0 min-h-[clamp(280px,42vh,560px)] items-center justify-center self-center">

          <HeroTechOrbit visible={visible} />

          <HeroPortraitDisplay

            visible={visible}

            parallaxX={portraitX}

            parallaxY={portraitY}

            glowIntensity={glowIntensity}

            scrollScale={scrollScale}

          />

        </div>



        {/* RIGHT widgets */}

        <div className="hidden min-h-[clamp(420px,52vh,560px)] flex-col items-start justify-evenly lg:flex">

          {visible && (

            <>

              <WidgetCell duration={7} delay={0.08} parallax={parallax} depth={1.1} parallaxScale={parallaxScale} visible={visible}>

                <HeroApiPanel />

              </WidgetCell>

              <WidgetCell duration={4} delay={0.14} parallax={parallax} depth={1.5} parallaxScale={parallaxScale} visible={visible}>

                <HeroGitHubPanel />

              </WidgetCell>

              <WidgetCell duration={6} delay={0.2} parallax={parallax} depth={1.2} parallaxScale={parallaxScale} visible={visible}>

                <HeroCodePanel />

              </WidgetCell>

              <WidgetCell duration={5} delay={0.22} parallax={parallax} depth={0.9} parallaxScale={parallaxScale} visible={visible}>

                <HeroCodePanelB />

              </WidgetCell>

              <WidgetCell duration={5} delay={0.26} parallax={parallax} depth={0.8} parallaxScale={parallaxScale} visible={visible}>

                <HeroAiPanel />

              </WidgetCell>

              <div className="flex max-w-[158px] flex-wrap gap-1">

                {RIGHT_TECH.map((t, i) => (

                  <HeroTechChip key={t} label={t} index={i} />

                ))}

              </div>

            </>

          )}

        </div>

      </div>



      {/* Tablet — compact widget grid below portrait */}

      {visible && (

        <div className="mt-5 hidden min-w-0 md:grid md:grid-cols-3 md:gap-2 md:px-2 lg:hidden">

          {TABLET_WIDGETS.map((Panel, i) => (

            <WidgetCell

              key={i}

              duration={5 + i}

              delay={i * 0.06}

              parallax={parallax}

              depth={0.8}

              parallaxScale={parallaxScale}

              visible={visible}

              className="mx-auto w-full max-w-[140px] scale-[0.92]"

            >

              <Panel />

            </WidgetCell>

          ))}

          <div className="col-span-3 mt-1 flex flex-wrap justify-center gap-1">

            {[...LEFT_TECH.slice(0, 3), ...RIGHT_TECH.slice(0, 3)].map((t) => (

              <HeroTechChip key={t} label={t} />

            ))}

          </div>

        </div>

      )}

    </div>

  );

}


