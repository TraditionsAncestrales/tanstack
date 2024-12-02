import { type Image as ImageData } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import { Image } from "@unpic/react";
import type { ClassValue } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
const cMask = `[mask-image:url(/_build/app/public/splash_JaAKBlu3Mz.avif)] [mask-size:contain] [mask-position:center] [mask-repeat:no-repeat]`;

// MAIN ************************************************************************************************************************************
export function TheHero({ className, image, subtitle, title }: HeroProps) {
  return (
    <div className={cn("relative flex w-full items-center justify-center bg-cover bg-center font-bold", className)}>
      <Image {...image} priority sizes="100vw" className="absolute inset-0 h-full !max-h-none w-full !max-w-none" />
      <div className="relative py-40 text-center uppercase tracking-widest text-white">
        <div className={cn("absolute inset-0 bg-primary", [cMask])}></div>
        <h1 className="relative my-2 max-w-2xl text-4xl sm:text-7xl">{title}</h1>
        <h2 className="relative text-xs">{subtitle}</h2>
      </div>
    </div>
  );
}

// TYPES ***********************************************************************************************************************************
export type HeroProps = { className?: ClassValue; subtitle: string; title: string; image: ImageData };
