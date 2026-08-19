"use client";

import { useEffect, useRef, type JSX, type ComponentType, type Ref } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

interface ScrambleTextProps {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  frames?: number;
  frameDelay?: number;
  className?: string;
  onDone?: () => void;
}

export default function ScrambleText({
  text,
  as: Tag = "span",
  frames = 25,
  frameDelay = 40,
  className,
  onDone,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / frames;
      el.textContent = text
        .split("")
        .map((char, i) =>
          char === " "
            ? " "
            : i < Math.floor(progress * text.length)
            ? char
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("");

      if (frame >= frames) {
        clearInterval(interval);
        el.textContent = text;
        onDone?.();
      }
    }, frameDelay);

    return () => clearInterval(interval);
  }, [text, frames, frameDelay, onDone]);

  // Tag to unia wszystkich tagow HTML - bez zawezenia TS liczy przeciecie propsow (never),
  // dlatego rzutujemy na komponent o propsach ktorych faktycznie uzywamy
  const Component = Tag as unknown as ComponentType<{
    ref?: Ref<HTMLElement>;
    className?: string;
  }>;
  return <Component ref={ref} className={className} />;
}