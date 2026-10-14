import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function Logo({
  className = "h-8 w-auto",
  priority = false,
  width = 240,
  height = 40,
}: LogoProps) {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* Light Theme Logo (Dark navy typography on light background) */}
      <Image
        src="/logo-light.png"
        alt="GB Software Solutions"
        width={width}
        height={height}
        priority={priority}
        className="block dark:hidden h-full w-auto object-contain transition-opacity duration-200"
      />

      {/* Dark Theme Logo (Vibrant blue typography on dark background) */}
      <Image
        src="/logo.png"
        alt="GB Software Solutions"
        width={width}
        height={height}
        priority={priority}
        className="hidden dark:block h-full w-auto object-contain transition-opacity duration-200"
      />
    </div>
  );
}

export default Logo;
