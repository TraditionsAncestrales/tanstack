import { Knowledge } from "@/components/knowledge";
import { getPage, getTestimonies } from "@/lib/pocketbase";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/")({
  staticData: { isHome: true, isMain: true },
  loader: async () => {
    const [{ post, testimoniesImage }, testimonies] = await Promise.all([getPage({ data: "traditions-ancestrales" }), getTestimonies()]);
    return { post, testimonies, testimoniesImage };
  },
  component: () => {
    const route = getRouteApi("__root__");
    const { events } = route.useLoaderData();
    const data = Route.useLoaderData();
    return <Knowledge {...data} events={events} />;
  },
});
