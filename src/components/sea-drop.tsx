import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

type Ripple = { x: number; y: number; r: number; a: number };

export function SeaDrop() {
  const seaRef = useRef<HTMLCanvasElement>(null);
  const dropRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const sea = seaRef.current;
    const dropCanvas = dropRef.current;
    const root = sea?.parentElement;
    if (!sea || !dropCanvas || !root) return;
    const seaCtx = sea.getContext("2d");
    const dropCtx = dropCanvas.getContext("2d");
    if (!seaCtx || !dropCtx) return;

    const pointer = { x: 0, y: 0, inside: false };
    const drop = { x: 0, y: 0 };
    const ripples: Ripple[] = [];
    const loop = { active: true };
    let angle = -Math.PI / 2;
    let frame = 0;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dark = theme === "dark";

    const resize = () => {
      const width = root.clientWidth;
      const height = root.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const canvas of [sea, dropCanvas]) {
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      seaCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dropCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!pointer.inside) {
        drop.x = width * 0.72;
        drop.y = height * 0.22;
        pointer.x = drop.x;
        pointer.y = drop.y;
      }
    };

    const onPointer = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (pointer.inside) {
        pointer.x = x;
        pointer.y = y;
      }
    };

    const drawSea = (width: number, height: number, time: number) => {
      seaCtx.fillStyle = dark ? "#03101c" : "#c5ebf6";
      seaCtx.fillRect(0, 0, width, height);

      const layers = dark
        ? [
            { y: 0.02, amp: 26, len: 220, color: "#062033", foam: "rgba(180, 220, 235, 0.18)" },
            { y: 0.22, amp: 32, len: 170, color: "#0a3d5c", foam: "rgba(210, 240, 250, 0.22)" },
            { y: 0.42, amp: 28, len: 140, color: "#0d5c82", foam: "rgba(230, 248, 255, 0.28)" },
            { y: 0.62, amp: 24, len: 110, color: "#11779f", foam: "rgba(240, 252, 255, 0.34)" },
            { y: 0.8, amp: 20, len: 90, color: "#1596b8", foam: "rgba(255, 255, 255, 0.4)" },
          ]
        : [
            { y: 0.0, amp: 22, len: 220, color: "#9ad8ee", foam: "rgba(255, 255, 255, 0.35)" },
            { y: 0.2, amp: 30, len: 170, color: "#63c0e2", foam: "rgba(255, 255, 255, 0.5)" },
            { y: 0.42, amp: 26, len: 140, color: "#2aa4d0", foam: "rgba(255, 255, 255, 0.55)" },
            { y: 0.62, amp: 22, len: 110, color: "#1789b8", foam: "rgba(255, 255, 255, 0.6)" },
            { y: 0.8, amp: 18, len: 90, color: "#0e739e", foam: "rgba(255, 255, 255, 0.7)" },
          ];

      layers.forEach((layer, index) => {
        const phase = reduce ? index : time * (0.35 + index * 0.08) + index * 1.4;
        const crest = (x: number) =>
          layer.y * height +
          Math.sin(x / layer.len + phase) * layer.amp +
          Math.sin(x / (layer.len * 0.46) - phase * 1.3) * layer.amp * 0.38;

        seaCtx.beginPath();
        seaCtx.moveTo(0, height);
        seaCtx.lineTo(0, crest(0));
        for (let x = 0; x <= width; x += 8) seaCtx.lineTo(x, crest(x));
        seaCtx.lineTo(width, height);
        seaCtx.closePath();
        seaCtx.fillStyle = layer.color;
        seaCtx.fill();

        seaCtx.beginPath();
        seaCtx.moveTo(0, crest(0));
        for (let x = 0; x <= width; x += 8) seaCtx.lineTo(x, crest(x));
        seaCtx.strokeStyle = layer.foam;
        seaCtx.lineWidth = 2.5;
        seaCtx.stroke();
      });
    };

    const drawDrop = (width: number, height: number, time: number) => {
      dropCtx.clearRect(0, 0, width, height);
      const drift = reduce ? 0 : 1;
      const targetX = pointer.inside ? pointer.x : width * 0.72 + Math.sin(time * 0.55) * 48 * drift;
      const targetY = pointer.inside ? pointer.y : height * 0.28 + Math.cos(time * 0.4) * 22 * drift;
      const vx = targetX - drop.x;
      const vy = targetY - drop.y;
      drop.x += vx * 0.075;
      drop.y += vy * 0.075;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.6) angle = Math.atan2(vy, vx) + Math.PI / 2;

      if (speed > 1.4 && frame % 8 === 0) {
        ripples.push({ x: drop.x, y: drop.y + 18, r: 8, a: 0.55 });
      }

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i];
        ripple.r += 1.5;
        ripple.a *= 0.97;
        if (ripple.a < 0.04) {
          ripples.splice(i, 1);
          continue;
        }
        dropCtx.beginPath();
        dropCtx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        dropCtx.strokeStyle = dark ? `rgba(220, 245, 255, ${ripple.a})` : `rgba(255, 255, 255, ${ripple.a})`;
        dropCtx.lineWidth = 1.6;
        dropCtx.stroke();
      }

      const tilt = Math.max(-0.35, Math.min(0.35, vx * 0.015));
      angle = tilt;
      dropCtx.save();
      dropCtx.translate(drop.x, drop.y);
      dropCtx.rotate(angle);
      dropCtx.beginPath();
      dropCtx.moveTo(0, -34);
      dropCtx.bezierCurveTo(-6, -18, -18, -2, -18, 10);
      dropCtx.arc(0, 10, 18, Math.PI, 0, false);
      dropCtx.bezierCurveTo(18, -2, 6, -18, 0, -34);
      dropCtx.closePath();
      const body = dropCtx.createLinearGradient(-10, -30, 12, 24);
      body.addColorStop(0, "rgba(255, 255, 255, 0.96)");
      body.addColorStop(0.35, "rgba(186, 236, 255, 0.92)");
      body.addColorStop(1, "rgba(36, 156, 214, 0.95)");
      dropCtx.fillStyle = body;
      dropCtx.shadowColor = "rgba(120, 210, 245, 0.8)";
      dropCtx.shadowBlur = 18;
      dropCtx.fill();
      dropCtx.shadowBlur = 0;
      dropCtx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      dropCtx.lineWidth = 1.2;
      dropCtx.stroke();
      dropCtx.beginPath();
      dropCtx.ellipse(-6, 2, 4.5, 8, -0.4, 0, Math.PI * 2);
      dropCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
      dropCtx.fill();
      dropCtx.beginPath();
      dropCtx.ellipse(-3, -12, 2.2, 3.4, 0.3, 0, Math.PI * 2);
      dropCtx.fillStyle = "rgba(255, 255, 255, 0.7)";
      dropCtx.fill();
      dropCtx.restore();
    };

    const tick = (now: number) => {
      if (!loop.active) return;
      frame += 1;
      const width = root.clientWidth;
      const height = root.clientHeight;
      const time = now / 1000;
      drawSea(width, height, time);
      drawDrop(width, height, time);
      raf = window.requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    window.addEventListener("pointermove", onPointer, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      loop.active = false;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [theme]);

  return (
    <>
      <canvas ref={seaRef} className="sea-canvas" aria-hidden="true" />
      <canvas ref={dropRef} className="sea-drop" aria-hidden="true" />
    </>
  );
}
