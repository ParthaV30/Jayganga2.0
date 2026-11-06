'use client';

import React, { useRef, useState, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = '',
  glowColor = 'rgba(212, 175, 55, 0.15)',
  maxTilt = 8,
  onClick
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
      className={`relative group overflow-hidden rounded-2xl ${className}`}
    >
      {/* Subtle cursor-following radial light glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`
          }}
        />
      )}
      {children}
    </div>
  );
}

