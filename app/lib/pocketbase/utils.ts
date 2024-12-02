import type {
  EventsRecord,
  ImagesRecord,
  KnowledgesRecord,
  PlacesRecord,
  PostsRecord,
  ProductsRecord,
  ServicesRecord,
} from "@/lib/pocketbase/schemas";
import { format } from "@formkit/tempo";
import { blurhashToCssGradientString } from "@unpic/placeholder";

type Narrow<FROM, TO> = FROM extends undefined ? (TO extends Promise<unknown> ? Promise<undefined> : undefined) : TO;
export function allowUndefined<FROM, TO>(method: (defined: FROM) => TO) {
  return <F extends FROM | undefined>(possiblyUndefined: F) => (possiblyUndefined ? method(possiblyUndefined) : undefined) as Narrow<F, TO>;
}

// EVENTS **********************************************************************************************************************************
async function strictItemFromEvent(event: EventForItem) {
  const { excerpt: text, from, image, name: title, places, service, slug, to, url: href } = event;
  const features = [
    { href: hrefFromService(service), key: "Type", value: service.name },
    { key: "Du", value: format({ date: from, format: { date: "full", time: "short" }, locale: "fr", tz: "Indian/Reunion" }) },
    { key: "Au", value: format({ date: to, format: { date: "full", time: "short" }, locale: "fr", tz: "Indian/Reunion" }) },
    { key: "Endroits", value: places.map(({ name }) => name).join(" ou ") },
  ];
  return { features, href, image: await imageFrom(image), slug, stale: to.toISOString(), text, title };
}
export const itemFromEvent = allowUndefined(strictItemFromEvent);

// IMAGE ***********************************************************************************************************************************
async function strictImageFrom({ alt, height, id, src, width }: ImageForEntry) {
  const blurhashRes = await fetch(`${import.meta.env.PUBLIC_IMGIX_URL}/${id}/${src}?fm=blurhash&w=50`);
  const blurhash = await blurhashRes.text();
  return {
    alt,
    background: blurhashToCssGradientString(blurhash),
    src: `${import.meta.env.PUBLIC_IMGIX_URL}/${id}/${src}?q=50`,
    height,
    width,
  };
}
export const imageFrom = allowUndefined(strictImageFrom);

// KNOWLEDGE *******************************************************************************************************************************
async function strictItemFromKnowledge(knowledge: KnowledgeForItem) {
  const { image, name: title, slug, text } = knowledge;
  return { href: hrefFromKnowledge(knowledge), image: await imageFrom(image), slug, text, title };
}
export const itemFromKnowledge = allowUndefined(strictItemFromKnowledge);
export type KnowledgeItem = Awaited<ReturnType<typeof strictItemFromKnowledge>>;

export function fragmentFromKnowledge({ slug }: KnowledgeForRoute) {
  return slug === "traditions-ancestrales" ? undefined : slug;
}

export function hrefFromKnowledge({ slug }: KnowledgeForRoute) {
  return "/" + (slug === "traditions-ancestrales" ? "" : `${slug}`);
}

export function entryFromKnowledge(knowledge: KnowledgeForRoute) {
  return { knowledge: fragmentFromKnowledge(knowledge) };
}

export function pathFromKnowledge(knowledge: KnowledgeForRoute) {
  return { params: entryFromKnowledge(knowledge) };
}

// POST ************************************************************************************************************************************
async function strictSingleFromPost(post: PostForSingle) {
  const { image, text, title } = post;
  return { features: [], image: await imageFrom(image), text, title };
}
export const singleFromPost = allowUndefined(strictSingleFromPost);

async function strictItemFromPost(post: PostForItem) {
  const { excerpt: text, image, slug, title } = post;
  if (!image) throw new Error(`Post ${slug} has no image`);
  return { href: hrefFromPost(post), image: await imageFrom(image), slug, text, title };
}
export const itemFromPost = allowUndefined(strictItemFromPost);

export function hrefFromPost(post: PostForRoute) {
  const knowledgeHref = hrefFromKnowledge(post.knowledge);
  return `${knowledgeHref === "/" ? knowledgeHref : `${knowledgeHref}/`}articles/${post.slug}`;
}

export function entryFromPost({ knowledge, slug }: PostForRoute) {
  return { knowledge: fragmentFromKnowledge(knowledge), collection: "articles", slug };
}

export function pathFromPost(post: PostForRoute) {
  return { params: entryFromPost(post) };
}

// PRODUCT *********************************************************************************************************************************
async function strictItemFromProduct(product: ProductForItem) {
  const { excerpt: text, image, name: title, slug, url: href } = product;
  if (!image) throw new Error(`Product ${slug} has no image`);
  return { features: featuresFromProduct(product), href, image: await imageFrom(image), slug, text, title };
}
export const itemFromProduct = allowUndefined(strictItemFromProduct);

export function featuresFromProduct({ price }: ProductForFeatures) {
  return [{ key: "Tarif", value: price }];
}

// SERVICES ********************************************************************************************************************************
async function strictSingleFromService(service: ServiceForSingle) {
  const { image, name: title, text } = service;
  return { features: featuresFromService(service), image: await imageFrom(image), text, title };
}
export const singleFromService = allowUndefined(strictSingleFromService);

async function strictItemFromService(service: ServiceForItem) {
  const { category, excerpt: text, image, name: title, slug } = service;
  const features = featuresFromService(service);
  return { extra: { category }, features, href: hrefFromService(service), image: await imageFrom(image), slug, text, title };
}
export const itemFromService = allowUndefined(strictItemFromService);

export function featuresFromService({ price, duration, places }: ServiceForFeatures) {
  return [
    { key: "Tarif", value: price },
    { key: "Durée", value: duration },
    { key: "Endroits", value: places.map(({ name }) => name).join(" ou ") },
  ];
}

export function fragmentFromService({ category }: ServiceForFragment) {
  return { consult: "consultations" as const, training: "formations" as const, workshop: "ateliers" as const }[category];
}

export function hrefFromService(service: ServiceForRoute) {
  const knowledgeHref = hrefFromKnowledge(service.knowledge);
  return `${knowledgeHref === "/" ? knowledgeHref : `${knowledgeHref}/`}${fragmentFromService(service)}/${service.slug}`;
}

export function entryFromService(service: ServiceForRoute) {
  return { knowledge: fragmentFromKnowledge(service.knowledge), collection: fragmentFromService(service), slug: service.slug };
}

export function pathFromService(service: ServiceForRoute) {
  return { params: entryFromService(service) };
}

// TYPES ***********************************************************************************************************************************
export type EventItem = Awaited<ReturnType<typeof strictItemFromEvent>>;
export type Extra = Record<string, unknown> | undefined;

export type Feature = {
  href?: string;
  key: string;
  value: string;
};

export type Image = Awaited<ReturnType<typeof strictImageFrom>>;
export type Item<E = undefined> = E extends undefined ? StrictItem : StrictItem & { extra: E };
export type PostItem = Awaited<ReturnType<typeof strictItemFromPost>>;
export type ServiceItem = Awaited<ReturnType<typeof strictItemFromService>>;

export type StrictItem = {
  features?: Feature[];
  href: string;
  image: Image;
  slug: string;
  stale?: string;
  text: string;
  title: string;
};

type EventForItem = Pick<EventsRecord, "excerpt" | "from" | "name" | "slug" | "to" | "url"> & {
  image: ImageForEntry;
  places: Pick<PlacesRecord, "name">[];
  service: Pick<ServicesRecord, "name"> & ServiceForRoute;
};

type ImageForEntry = Pick<ImagesRecord, "alt" | "height" | "id" | "src" | "width">;
type KnowledgeForItem = KnowledgeForRoute & Pick<KnowledgesRecord, "name" | "text"> & { image: ImageForEntry };
type KnowledgeForRoute = Pick<KnowledgesRecord, "slug">;
type PostForSingle = Pick<PostsRecord, "text" | "title"> & { image?: ImageForEntry };
type PostForItem = PostForRoute & Pick<PostsRecord, "excerpt" | "title"> & { image?: ImageForEntry };
type PostForRoute = Pick<PostsRecord, "slug"> & { knowledge: KnowledgeForRoute };
type ProductForFeatures = Pick<ProductsRecord, "price">;
type ProductForItem = ProductForFeatures & Pick<ProductsRecord, "excerpt" | "name" | "slug" | "url"> & { image: ImageForEntry };
type ServiceForSingle = ServiceForFeatures & Pick<ServicesRecord, "name" | "text"> & { image: ImageForEntry };
type ServiceForFeatures = Pick<ServicesRecord, "price" | "duration"> & { places: Pick<PlacesRecord, "name">[] };
type ServiceForFragment = Pick<ServicesRecord, "category">;
type ServiceForItem = ServiceForFeatures & ServiceForRoute & Pick<ServicesRecord, "excerpt" | "name"> & { image: ImageForEntry };
type ServiceForRoute = ServiceForFragment & Pick<ServicesRecord, "slug"> & { knowledge: KnowledgeForRoute };
