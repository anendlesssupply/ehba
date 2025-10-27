"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

export function BlockHtmlEmbed(props: any = {}) {
  const { html } = props?.value || {};
  const ref = useRef<any>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    const el = ref?.current;
    const iframe = el.querySelector("iframe");
    if (!iframe) {
      return;
    }
    const width = iframe?.width ?? "1";
    const height = iframe?.height ?? "1";
    const nextAspectRatio = Number(height) / Number(width);
    setAspectRatio(nextAspectRatio);
  }, [ref]);
  if (!html) {
    return null;
  }
  return (
    <div
      ref={ref}
      style={{ "--aspect-ratio": `${aspectRatio * 100}%` } as CSSProperties}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
