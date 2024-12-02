import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Section, type SectionProps } from "@/components/ui/section";
import { Title } from "@/components/ui/title";
import type { TestimoniesRecord } from "@/lib/pocketbase/schemas";
import type { Image as ImageData } from "@/lib/pocketbase/utils";
import { Image } from "@unpic/react";
import Autoplay from "embla-carousel-autoplay";

// PROPS ***********************************************************************************************************************************
export function TheTestimonies({ image, items, ...rest }: TheTestimoniesProps) {
  if (items.length === 0) return;

  return (
    <Section className="relative" {...rest} header={<Title text="Témoignages" className="z-10" />}>
      {image && <Image {...image} breakpoints={[320]} sizes="100vw" className="absolute inset-0 h-full scale-105 blur-sm" />}
      <div className="relative h-[28rem] w-full">
        <Carousel opts={{ loop: true }} orientation="vertical" plugins={[Autoplay({ delay: 6000 })]}>
          <CarouselContent className="h-[28rem]">
            {items.map(({ author, text, title }, key) => (
              <CarouselItem key={key} className="flex h-full items-center justify-center text-center">
                <article className="max-w-4xl">
                  <h4 className="mb-8 text-3xl font-bold italic">{title}</h4>
                  <div className="mb-4 italic" dangerouslySetInnerHTML={{ __html: text }} />
                  <p className="font-bold">{author}</p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </Section>
  );
}

// TYPES ***********************************************************************************************************************************
export type TheTestimoniesProps = SectionProps & { image?: ImageData; items: Pick<TestimoniesRecord, "author" | "text" | "title">[] };
