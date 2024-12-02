import { Knowledge } from "@/components/knowledge";
import { getPage } from "@/lib/pocketbase";
import { createFileRoute, getRouteApi, notFound } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/$knowledge/")({
  staticData: { isMain: true },
  beforeLoad: async ({ params: { knowledge } }) => {
    if (!["chamanisme", "reiki", "reves", "tarot"].includes(knowledge)) throw notFound();
  },
  loader: async ({ params: { knowledge } }) => getPage({ data: knowledge }),
  component: () => {
    const { knowledge } = Route.useParams();
    const route = getRouteApi("__root__");
    const { events: allEvents } = route.useLoaderData();
    const data = Route.useLoaderData();
    const events = allEvents.filter(({ slug }) => slug === knowledge);
    return <Knowledge {...data} events={events} />;
  },
});
