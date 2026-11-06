import { createServerFn } from "@tanstack/react-start";

export type StockPoint = { t: number; v: number };

export const CHART_RANGES = ["1D", "1W", "1M", "3M", "YTD", "1Y", "5Y", "ALL"] as const;

export type ChartRange = (typeof CHART_RANGES)[number];

export const PERIOD_LABEL: Record<ChartRange, string> = {
  "1D": "Today",
  "1W": "Past week",
  "1M": "Past month",
  "3M": "Past 3 months",
  YTD: "Year to date",
  "1Y": "Past year",
  "5Y": "Past 5 years",
  ALL: "All time",
};

export type StockQuote = {
  symbol: string;
  title: string;
  range: ChartRange;
  periodLabel: string;
  price: number;
  priceText: string;
  change: number;
  changeText: string;
  changePercent: number;
  percentText: string;
  direction: "up" | "down" | "flat";
  points: StockPoint[];
  error?: string;
};

const WATCH = [
  { symbol: "BTCS", title: "Bitcoin Stocks Inc" },
  { symbol: "UPWK", title: "Upwork Stocks Inc" },
] as const;

const RH_HEADERS = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
};

const RANGE_QUERY: Record<ChartRange, { span: string; interval: string }> = {
  "1D": { span: "day", interval: "5minute" },
  "1W": { span: "week", interval: "10minute" },
  "1M": { span: "month", interval: "hour" },
  "3M": { span: "3month", interval: "day" },
  YTD: { span: "year", interval: "day" },
  "1Y": { span: "year", interval: "day" },
  "5Y": { span: "5year", interval: "week" },
  ALL: { span: "5year", interval: "week" },
};

type RhQuote = {
  last_trade_price?: string;
  last_extended_hours_trade_price?: string | null;
  previous_close?: string;
  updated_at?: string;
};

type RhBar = { begins_at: string; open_price: string; close_price: string };

type RhHistoricals = { historicals?: RhBar[] };

function parseNumber(value: string | undefined) {
  if (!value) return Number.NaN;
  const parsed = Number(value.replace(/[^0-9.+-]/g, ""));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function easternMinutes(timestamp: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(timestamp));
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    weekday: read("weekday"),
    minutes: Number(read("hour")) * 60 + Number(read("minute")),
  };
}

function marketIsOpen(now = Date.now()) {
  const { weekday, minutes } = easternMinutes(now);
  if (weekday === "Sat" || weekday === "Sun") return false;
  return minutes >= 9 * 60 + 30 && minutes < 16 * 60;
}

function isoDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(timestamp);
}

function isChartRange(value: unknown): value is ChartRange {
  return typeof value === "string" && (CHART_RANGES as readonly string[]).includes(value);
}

function roundQuote(value: number) {
  const digits = Math.abs(value) >= 1 ? 2 : 4;
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function formatPrice(value: number) {
  const digits = Math.abs(value) >= 1 ? 2 : 4;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  });
}

function formatSignedMoney(value: number) {
  const digits = Math.abs(value) > 0 && Math.abs(value) < 1 ? 4 : 2;
  const text = Math.abs(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Math.min(2, digits),
    maximumFractionDigits: digits,
  });
  if (value > 0) return `+${text}`;
  if (value < 0) return `-${text}`;
  return text;
}

function formatSignedPercent(value: number) {
  const text = Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (value > 0) return `+${text}%`;
  if (value < 0) return `-${text}%`;
  return `${text}%`;
}

async function rhJson<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.robinhood.com${path}`, {
    headers: RH_HEADERS,
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`Quote feed returned ${response.status}`);
  return (await response.json()) as T;
}

function headlinePrice(quote: RhQuote) {
  const last = parseNumber(quote.last_trade_price);
  const extended = parseNumber(quote.last_extended_hours_trade_price ?? undefined);
  if (!marketIsOpen() && Number.isFinite(extended) && extended > 0) return extended;
  return last;
}

async function loadQuote(symbol: string, title: string, range: ChartRange): Promise<StockQuote> {
  const empty: StockQuote = {
    symbol,
    title,
    range,
    periodLabel: PERIOD_LABEL[range],
    price: 0,
    priceText: "—",
    change: 0,
    changeText: "",
    changePercent: 0,
    percentText: "",
    direction: "flat",
    points: [],
  };

  try {
    const query = RANGE_QUERY[range];
    const [quote, series, daily] = await Promise.all([
      rhJson<RhQuote>(`/quotes/${symbol}/`),
      rhJson<RhHistoricals>(`/marketdata/historicals/${symbol}/?bounds=regular&interval=${query.interval}&span=${query.span}`),
      range === "1D"
        ? Promise.resolve(null)
        : rhJson<RhHistoricals>(`/marketdata/historicals/${symbol}/?bounds=regular&interval=day&span=5year`),
    ]);

    const price = roundQuote(headlinePrice(quote));
    if (!Number.isFinite(price)) return { ...empty, error: `${symbol} quote is empty right now.` };

    const yearStart = `${isoDate(Date.now()).slice(0, 4)}-01-01`;
    const bars = (series.historicals ?? []).filter((bar) => range !== "YTD" || bar.begins_at.slice(0, 10) >= yearStart);
    const points = bars.flatMap((bar) => {
      const value = parseNumber(bar.close_price);
      const time = Date.parse(bar.begins_at);
      return Number.isFinite(value) && Number.isFinite(time) ? [{ t: time, v: value }] : [];
    });
    const last = points[points.length - 1];
    if (last && Math.abs(last.v - price) > 0.0001) {
      points.push({ t: Date.parse(quote.updated_at ?? "") || Date.now(), v: price });
    }

    const firstDay = bars[0]?.begins_at.slice(0, 10) ?? "";
    const prior = daily?.historicals?.filter((bar) => bar.begins_at.slice(0, 10) < firstDay).at(-1);
    const baseline = roundQuote(
      range === "1D" ? parseNumber(quote.previous_close) : parseNumber(prior?.close_price ?? bars[0]?.open_price),
    );
    const change = roundQuote(price - baseline);
    const changePercent = baseline ? (change / baseline) * 100 : 0;
    const direction = change > 0 ? "up" : change < 0 ? "down" : "flat";

    return {
      symbol,
      title,
      range,
      periodLabel: PERIOD_LABEL[range],
      price,
      priceText: formatPrice(price),
      change,
      changeText: formatSignedMoney(change),
      changePercent,
      percentText: formatSignedPercent(changePercent),
      direction,
      points,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Quote request failed.";
    return { ...empty, error: message };
  }
}

export const getStockQuotes = createServerFn({ method: "GET" })
  .validator((input: { ranges?: Partial<Record<(typeof WATCH)[number]["symbol"], ChartRange>> } | undefined) => {
    const ranges = { BTCS: "1D" as ChartRange, UPWK: "1D" as ChartRange };
    for (const item of WATCH) {
      const requested = input?.ranges?.[item.symbol];
      if (isChartRange(requested)) ranges[item.symbol] = requested;
    }
    return { ranges };
  })
  .handler(async ({ data }) => {
    const quotes = await Promise.all(WATCH.map((item) => loadQuote(item.symbol, item.title, data.ranges[item.symbol])));
    return { quotes, fetchedAt: Date.now() };
  });
