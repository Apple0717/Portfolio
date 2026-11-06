import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect, useRef } from "react";
import { ContactSection } from "@/components/contact-section";
import { Reveal } from "@/components/reveal";
import { SkillWall } from "@/components/skill-wall";
import { experience, profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WLT" },
      {
        name: "description",
        content: "William L. Todd's companies, work history, and the platforms behind each role.",
      },
      { property: "og:title", content: "WLT" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const line = lineRef.current;
    const glow = glowRef.current;
    if (!line || !glow) return;
    line.classList.add("timeline-ready");
    let frame = 0;
    const place = () => {
      frame = 0;
      const rect = line.getBoundingClientRect();
      const along = window.innerHeight / 2 - rect.top;
      const nodes = [...line.querySelectorAll<HTMLElement>("[data-node]")];
      const endNode = line.querySelector<HTMLElement>("[data-end]") ?? nodes[nodes.length - 1];
      const endBox = endNode?.getBoundingClientRect();
      const end = endBox ? endBox.top + endBox.height / 2 - rect.top : rect.height;
      const mask = line.querySelector<HTMLElement>(".beam-mask");
      if (mask) mask.style.height = `${end}px`;
      const y = Math.min(Math.max(along, 0), end);
      glow.style.height = `${y}px`;
      let nearest: HTMLElement | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;
      nodes.forEach((node) => {
        const nodeBox = node.getBoundingClientRect();
        const nodeY = nodeBox.top + nodeBox.height / 2 - rect.top;
        const distance = Math.abs(nodeY - y);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = node;
        }
        if (along + 36 >= nodeY) {
          node.parentElement?.querySelectorAll(".company-card").forEach((card) => card.classList.add("is-shown"));
        }
      });
      nodes.forEach((node) => node.classList.toggle("is-alive", node === nearest));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div data-page="home" className="pb-8">
      <section id="intro" className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-16 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:pt-24">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-primary">{profile.location}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">{profile.name}</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{profile.intro}</p>
          </Reveal>
        </div>
        <Reveal delay={180}>
          <img
            src="/california-network.png"
            alt="California connected to cities around the world"
            className="w-full"
          />
        </Reveal>
      </section>

      <section id="skills" className="mx-auto mt-40 max-w-5xl px-5 md:mt-56 md:px-8">
        <Reveal>
          <h2 className="font-display text-5xl leading-none md:text-6xl">What I do</h2>
          <p className="mt-4 max-w-xl text-sm uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
            AI and voice software engineer who builds production systems across the stack
          </p>
        </Reveal>
        <Reveal delay={120}>
          <SkillWall />
        </Reveal>
      </section>

      <section id="experience" className="mx-auto mt-16 max-w-5xl px-5 md:px-8">
        <p className="text-center text-xs uppercase tracking-[0.32em] text-primary">Companies</p>

        <div ref={lineRef} className="relative mt-10">
          <div className="beam-mask" aria-hidden="true">
            <span className="center-line" />
            <span ref={glowRef} className="line-lit" />
          </div>
          <ol>
          {experience.map((item, index) => {
            const onLeft = index % 2 === 0;
            return (
              <li key={item.id} className="relative grid grid-cols-2 py-5">
                <span data-node className="timeline-node" {...(item.id === "assort" ? { "data-end": "" } : {})} />
                <article
                  className={cn(
                    "company-card lux-panel p-5",
                    onLeft ? "from-left col-start-1 mr-8 text-right md:mr-12" : "from-right col-start-2 ml-8 md:ml-12",
                  )}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-primary">{item.period}</p>
                  <h3 className="mt-2 font-display text-2xl leading-tight md:text-3xl">{item.company}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
                  <ul className={cn("mt-4 flex flex-wrap gap-2", onLeft && "justify-end")}>
                    {item.platforms.map((platform) => (
                      <li
                        key={platform}
                        className="rounded-full border border-[oklch(0.82_0.11_85/0.45)] px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-primary"
                      >
                        {platform}
                      </li>
                    ))}
                  </ul>
                  <ul className={cn("mt-4 space-y-2", onLeft && "text-left")}>
                    {item.points.map((point) => (
                      <li key={point} className="text-sm leading-relaxed text-foreground/90">
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
          </ol>
        </div>
        <div id="contact" className="relative grid scroll-mt-24 grid-cols-2 py-5">
          <ContactSection />
        </div>
      </section>
    </div>
  );
}
