import type { Post, Service } from "@/lib/pocketbase";
import { Image } from "@unpic/react";
import { Features } from "./ui/features";
import { Section } from "./ui/section";
import { Title } from "./ui/title";

// MAIN ************************************************************************************************************************************
export function RecordsSingle({ single: { features, image, text, title } }: RecordsSingleProps) {
  const sizes = `(min-width: 1536px) 42rem, (min-width: 1280px) 36rem, (min-width: 1024px) 28rem, (min-width: 768px) 20rem (min-width: 640px) 36rem, 100vw`;

  return (
    <Section
      asideRight
      border="all"
      intent="white"
      header={<Title text={title} className="mb-8" />}
      aside={
        <>
          {image && <Image {...image} alt={image.alt} sizes={sizes} className="relative shadow-lg shadow-black/50" />}
          <Features features={features} />
        </>
      }
    >
      <article dangerouslySetInnerHTML={{ __html: text }} />
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type RecordsSingleProps = { single: Post | Service };
