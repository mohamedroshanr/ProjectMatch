"use client";

import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: "mousemove",
          x: e.clientX,
          y: e.clientY
        }, "*");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <iframe 
      ref={iframeRef}
      src="/starfield.html" 
      className="fixed inset-0 w-screen h-screen border-0 -z-50 pointer-events-none opacity-50 mix-blend-screen"
      style={{ overflow: "hidden" }}
      title="Starfield Background"
    />
  );
}
