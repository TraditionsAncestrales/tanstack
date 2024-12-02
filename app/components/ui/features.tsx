import type { Feature } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import type { Intent } from "@/styles/ui";
import type { ClassValue } from "tailwind-variants";

export function Features({ className, features = [], intent = "white" }: FeaturesProps) {
  if (features.length === 0) return;

  return (
    <dl className={cn("w-full p-4", intent === "white" ? "bg-primary/20" : "bg-white/25", className)}>
      {features.map(({ href, key, value }, i) => (
        <div key={i} className="flex gap-2">
          <dd className="flex-none font-bold">{key} :</dd>
          <dt>
            {href ? (
              <a href={href} className="hover:underline">
                {value}
              </a>
            ) : (
              value
            )}
          </dt>
        </div>
      ))}
    </dl>
  );
}

// TYPES ***********************************************************************************************************************************
export type FeaturesProps = { className?: ClassValue; features?: Feature[]; intent?: Intent };
