"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const Tilt = ({
  children,
  className = "",
  rotationFactor = 15,
  isRevese = false,
}: {
  children: React.ReactNode;
  className?: string;
  rotationFactor?: number;
  isRevese?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, {
    stiffness: 300,
    damping: 30,
  });
  const mouseYSpring = useSpring(y, {
    stiffness: 300,
    damping: 30,
  });

  const transform = useMotionTemplate`perspective(1000px) rotateX(${
    isRevese ? mouseXSpring : mouseYSpring
  }deg) rotateY(${isRevese ? mouseYSpring : mouseXSpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * 100;
    const mouseY = (e.clientY - rect.top) * 100;

    const rX = (mouseY / height - 50) * -1 * (rotationFactor / 100);
    const rY = (mouseX / width - 50) * (rotationFactor / 100);

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
