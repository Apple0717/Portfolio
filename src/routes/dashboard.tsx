import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";
import { portfolio, profile, skills, trend } from "@/lib/portfolio-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — William L. Todd" },
      { name: "description", content: "Private studio dashboard for focus, strengths, and selected work." },
    ],
  }),
  component: DashboardPage,
});

function TrendChart() {
  const w = 520;
  const h = 200;
  const pad = 24;
  const x = (i: number) => pad + (i * (w - pad * 2)) / (trend.length - 1);
  const y = (v: number) => h - pad - (v / 100) * (h - pad * 2);
  const line = (key: "ai" | "voice" | "web") => trend.map((point, i) => `${i ? "L" : "M"}${x(i)},${y(point[key])}`).join(" ");
  const series = [
    ["ai", "var(--chart-1)", "AI / LLM"],
    ["voice", "var(--chart-2)", "Voice AI"],
    ["web", "var(--chart-3)", "Full-stack"],
  ] as const;

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {[0, 25, 50, 75, 100].map((value) => (
          <line key={value} x1={pad} x2={w - pad} y1={y(value)} y2={y(value)} stroke="oklch(0.78 0.04 230 / 0.28)" />
        ))}
        {series.map(([key, color], index) => (
          <path
            key={key}
            d={line(key)}
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            className="draw-line"
            style={{ animationDelay: `${index * 180}ms` }}
          />
        ))}
        {trend.map((point, i) => (
          <text key={point.year} x={x(i)} y={h - 4} textAnchor="middle" fontSize="10" fill="oklch(0.8 0.03 90)">
            {point.year}
          </text>
        ))}
      </svg>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
        {series.map(([key, color, label]) => (
          <span key={key} className="flex items-center gap-2">
            <span className="h-2 w-4 rounded-full" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardPage() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login" });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <p className="lux-rise text-xs uppercase tracking-[0.32em] text-primary">Opening the studio</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.32em] text-primary">Private studio</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Welcome back, {user.name.split(" ")[0]}.</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Signed in as {user.email}. This room holds the longer view of {profile.name}&apos;s practice — where the energy has gone, and what it produced.
        </p>
      </Reveal>

      <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["8+", "Years"],
          ["8", "Companies"],
          ["6", "Featured works"],
          ["3", "Clouds"],
        ].map(([value, label], index) => (
          <div key={label} className="lux-panel lux-rise p-5" style={{ animationDelay: `${index * 80}ms` }}>
            <p className="font-display text-4xl text-gradient">{value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <Reveal className="lux-panel p-6 lg:col-span-2">
          <h2 className="font-display text-3xl">Focus trend</h2>
          <p className="text-sm text-muted-foreground">Where the practice has leaned, year by year.</p>
          <div className="mt-4">
            <TrendChart />
          </div>
        </Reveal>
        <Reveal delay={120} className="lux-panel p-6">
          <h2 className="font-display text-3xl">Core strengths</h2>
          <div className="mt-5 space-y-4">
            {skills.map(([label, value], index) => (
              <div key={label}>
                <div className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span className="text-primary">{value}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[oklch(1_0_0/0.08)]">
                  <div
                    className="skill-bar h-1.5 rounded-full bg-gradient-to-r from-glow to-warm"
                    style={{ width: `${value}%`, animationDelay: `${200 + index * 100}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="lux-rise font-display text-3xl">Selected work</h2>
          <div className="mt-4 grid gap-3">
            {portfolio.map((item, index) => (
              <article
                key={item.name}
                className="lux-panel lux-rise p-4 transition duration-500 hover:-translate-y-1 hover:border-accent"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl">{item.name}</h3>
                  <span className="rounded-full border border-[oklch(0.82_0.12_210/0.45)] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent">
                    {item.tag}
                  </span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">{item.stack}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="space-y-6 lg:col-span-2">
          <Reveal className="lux-panel p-6">
            <h2 className="font-display text-3xl">Education</h2>
            <p className="mt-3 font-display text-2xl">Carrington College</p>
            <p className="text-sm text-muted-foreground">Bachelor&apos;s, Computer Science · 2015 – 2018</p>
          </Reveal>
          <Reveal delay={100} className="lux-panel p-6">
            <h2 className="font-display text-3xl">The houses</h2>
            <p className="mt-2 text-sm text-muted-foreground">Company stories live on the public floor. Open one whenever you like.</p>
            <Link to="/" hash="experience" className="gold-btn lux-btn mt-5">
              Review experience
            </Link>
          </Reveal>
          <Reveal delay={160} className="lux-panel flex items-center gap-4 p-5">
            <span className="relative grid h-12 w-12 place-items-center">
              <span className="absolute inset-0 rounded-full bg-primary/40 animate-ring-pulse" />
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
                <svg className="h-5 w-5 animate-phone-shake" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
                </svg>
              </span>
            </span>
            <a href={profile.phoneHref} className="transition hover:text-primary">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Direct line</p>
              <p className="font-display text-2xl">{profile.phone}</p>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
