import type { Item } from "@/lib/pocketbase/utils";
import { cn } from "@/lib/utils";
import { TITLE } from "@/styles/ui";
import { Image } from "@unpic/react";
import { useEffect, useMemo, useState } from "react";
import { BUTTON } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./ui/carousel";
import { Features } from "./ui/features";
import { Section, type SectionProps } from "./ui/section";
import { Title } from "./ui/title";

// MAIN ************************************************************************************************************************************
export function RecordsItems(props: RecordsItemsProps) {
  const {
    children,
    externalLink = false,
    forceMultiple = false,
    intent = "white",
    items = [],
    removeStale,
    title: singular,
    ...rest
  } = props;

  const hasSome = items.length > 0;
  if (!hasSome && !children) return;

  const isSingle = items.length === 1;
  const title = `${singular}${isSingle && !forceMultiple ? "" : "s"}`;
  const { features, href, image, text } = items[0] ?? {};

  const sizes = [
    "(min-width: 1536px) 42rem",
    "(min-width: 1280px) 36rem",
    "(min-width: 1024px) 28rem",
    "(min-width: 768px) 20rem",
    "calc(100vw - 7rem - 15px)",
  ].join(", ");

  const target = useMemo(() => (externalLink ? "_blank" : undefined), [externalLink]);
  const filteredItems = useMemo(
    () => (removeStale ? items.filter(({ stale }) => stale && stale >= new Date().toISOString()) : items),
    [items, removeStale],
  );

  const [api, setApi] = useState<CarouselApi>();
  const [justifyCenter, setJustifyCenter] = useState(false);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    if (!api) return;
    setJustifyCenter(api.scrollSnapList().length === 1);
    setIsSet(true);
    api.on("reInit", ({ scrollSnapList }) => setJustifyCenter(scrollSnapList().length === 1));
  }, [api]);

  return (
    <>
      {isSingle && !forceMultiple ? (
        <Section
          intent={intent}
          {...rest}
          header={<Title text={title} className="mb-8 xl:hidden" />}
          aside={
            <Image {...image} breakpoints={[320, 640, 960, 1280, 1600]} sizes={sizes} className="relative shadow-lg shadow-black/50" />
          }
        >
          <Title text={title} className="hidden self-start xl:inline-flex" />
          <Features intent={intent} features={features} />
          <article dangerouslySetInnerHTML={{ __html: text }} />
          <a href={href} target={target} className={BUTTON({ intent: intent === "primary" ? "secondary" : "primary", class: "self-end" })}>
            En savoir plus
          </a>
        </Section>
      ) : (
        <Section intent={intent} expanded={hasSome} {...rest} header={<Title text={title} className="mb-8" />}>
          {hasSome ? (
            <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
              <CarouselContent
                className={cn("opacity-0 transition-opacity duration-700", { "justify-center": justifyCenter, "opacity-100": isSet })}
              >
                {filteredItems.map(({ features, href, image, slug, text, title }) => (
                  <CarouselItem key={slug} className="mb-2 max-w-96">
                    <div className="flex h-full w-full flex-col bg-white shadow-md">
                      <Image {...image} height={256} width={384} breakpoints={[384, 768]} sizes="24rem" className="flex-none" />
                      <div className="flex flex-1 flex-col gap-4 p-4 px-6 sm:px-8">
                        <h4 className={TITLE()}>{title}</h4>
                        <Features features={features} intent="white" />
                        <article dangerouslySetInnerHTML={{ __html: text }} className="prose prose-p:my-1 prose-p:leading-normal" />
                        <div className="flex-1" />
                        <div className="flex justify-end gap-2">
                          <a href={href} target={target} className={BUTTON()}>
                            En savoir plus
                          </a>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
            children
          )}
        </Section>
      )}
    </>
  );
}

// TYPES ***********************************************************************************************************************************
export type RecordsItemsProps = {
  externalLink?: boolean;
  forceMultiple?: boolean;
  items: Item[];
  removeStale?: boolean;
  title: string;
} & SectionProps;
