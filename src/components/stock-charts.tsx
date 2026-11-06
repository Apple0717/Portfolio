import { useEffect, useState } from "react";
import { CHART_RANGES, getStockQuotes, type ChartRange, type StockPoint, type StockQuote } from "@/lib/market";

type Feed = Awaited<ReturnType<typeof getStockQuotes>>;
type RangeMap = Record<"BTCS" | "UPWK", ChartRange>;

const LINE = { up: "#00c805", down: "#ff5000", flat: "#8e8e93" };

function tone(direction: StockQuote["direction"]) {
  return LINE[direction];
}

function priceLine(coords: Array<{ x: number; y: number }>) {
  return coords.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
}

function QuoteChart({ quote }: { quote: StockQuote }) {
  const points = quote.points;
  if (points.length < 2) {
    return <p className="py-20 text-sm text-neutral-500">The chart is not available for this range yet.</p>;
  }

  const width = 640;
  const height = 260;
  const padX = 6;
  const padY = 16;
  const values = points.map((point) => point.v);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (min === max) {
    min -= 0.01;
    max += 0.01;
  }
  const cushion = (max - min) * 0.08;
  min -= cushion;
  max += cushion;

  const start = points[0].t;
  const end = points[points.length - 1].t;
  const span = end - start || 1;
  const coords = points.map((point: StockPoint) => ({
    x: padX + ((point.t - start) / span) * (width - padX * 2),
    y: padY + ((max - point.v) / (max - min)) * (height - padY * 2),
  }));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 w-full" role="img" aria-label={`${quote.title} price chart`}>
      <path d={priceLine(coords)} fill="none" stroke={tone(quote.direction)} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function QuoteCard({
  quote,
  range,
  onRange,
}: {
  quote: StockQuote;
  range: ChartRange;
  onRange: (range: ChartRange) => void;
}) {
  const color = tone(quote.direction);

  return (
    <article className="quote-card px-4 py-5 md:px-5">
      <h2 className="font-sans text-2xl font-semibold tracking-tight">{quote.title}</h2>
      <p className="mt-2 font-sans text-4xl font-medium tracking-tight">{quote.priceText || "—"}</p>
      <p className="mt-1 text-sm font-medium" style={{ color }}>
        {quote.changeText ? `${quote.changeText} (${quote.percentText}) ${quote.periodLabel}` : "Quote unavailable"}
      </p>
      {quote.error ? <p className="mt-8 text-sm text-neutral-500">{quote.error}</p> : <QuoteChart quote={quote} />}
      <div className="mt-1 flex items-end justify-between gap-1">
        {CHART_RANGES.map((item) => {
          const selected = item === range;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onRange(item)}
              className="relative min-w-0 flex-1 py-2 text-center text-[11px] font-semibold tracking-wide"
              style={{ color: selected ? "inherit" : "#8e8e93" }}
              aria-pressed={selected}
            >
              {item}
              {selected && <span className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 bg-current" />}
            </button>
          );
        })}
      </div>
    </article>
  );
}

export function StockBoard() {
  const [ranges, setRanges] = useState<RangeMap>({ BTCS: "1D", UPWK: "1D" });
  const [feed, setFeed] = useState<Feed | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let pulling = false;

    const pull = async () => {
      if (pulling) return;
      pulling = true;
      try {
        const next = await getStockQuotes({ data: { ranges } });
        if (cancelled) return;
        setFeed(next);
        setError("");
      } catch (cause) {
        if (cancelled) return;
        setError(cause instanceof Error ? cause.message : "Live quotes are unavailable.");
      } finally {
        pulling = false;
      }
    };

    void pull();
    const timer = window.setInterval(() => void pull(), 5 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [ranges]);

  return (
    <section className="mt-6">
      {error && !feed && <p className="mb-4 text-sm text-destructive">{error}</p>}
      <div className="grid gap-6 lg:grid-cols-2">
        {feed
          ? feed.quotes.map((quote) => (
              <QuoteCard
                key={quote.symbol}
                quote={quote}
                range={ranges[quote.symbol as keyof RangeMap] ?? quote.range}
                onRange={(range) => setRanges((current) => ({ ...current, [quote.symbol]: range }))}
              />
            ))
          : ["Bitcoin Stocks Inc", "Upwork Stocks Inc"].map((title) => (
              <article key={title} className="quote-card grid min-h-80 place-items-center px-4 py-6">
                <p className="text-sm text-neutral-500">Loading {title}…</p>
              </article>
            ))}
      </div>
    </section>
  );
}
