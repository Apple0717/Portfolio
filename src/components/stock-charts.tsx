import { useEffect, useRef, useState } from "react";
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

function StockLoadingBar() {
  const [value, setValue] = useState(6);

  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(92, Math.round(6 + (1 - Math.exp(-(now - started) / 1400)) * 86));
      setValue(next);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="stock-load-row">
      <div
        className="stock-load"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading stock quotes"
      >
        <span className="stock-load-fill" style={{ width: `calc((100% - 4px) * ${value / 100})` }}>
          <span className="stock-load-head" />
        </span>
      </div>
      <span className="stock-load-value">{value}%</span>
    </div>
  );
}

function QuoteCard({
  quote,
  range,
  loading,
  onRange,
}: {
  quote: StockQuote;
  range: ChartRange;
  loading: boolean;
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
      {loading ? (
        <div className="grid min-h-52 place-items-center">
          <StockLoadingBar />
        </div>
      ) : quote.error ? (
        <p className="mt-8 text-sm text-neutral-500">{quote.error}</p>
      ) : (
        <QuoteChart quote={quote} />
      )}
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
  const [loadingSymbols, setLoadingSymbols] = useState<Array<keyof RangeMap>>(["BTCS", "UPWK"]);
  const [error, setError] = useState("");
  const previousRanges = useRef<RangeMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    let pulling = false;
    const previous = previousRanges.current;
    const importing = (Object.keys(ranges) as Array<keyof RangeMap>).filter(
      (symbol) => !previous || previous[symbol] !== ranges[symbol],
    );
    previousRanges.current = ranges;

    const pull = async (showBar: boolean) => {
      if (pulling) return;
      pulling = true;
      if (showBar) setLoadingSymbols(importing);
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
        if (!cancelled && showBar) setLoadingSymbols([]);
      }
    };

    void pull(true);
    const timer = window.setInterval(() => void pull(false), 5 * 60 * 1000);
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
                loading={loadingSymbols.includes(quote.symbol as keyof RangeMap)}
                range={ranges[quote.symbol as keyof RangeMap] ?? quote.range}
                onRange={(range) => setRanges((current) => ({ ...current, [quote.symbol]: range }))}
              />
            ))
          : ["Bitcoin Stocks Inc", "Upwork Stocks Inc"].map((title) => (
              <article key={title} className="quote-card grid min-h-80 place-items-center gap-8 px-4 py-6">
                <h2 className="font-sans text-2xl font-semibold tracking-tight">{title}</h2>
                <StockLoadingBar />
              </article>
            ))}
      </div>
    </section>
  );
}
