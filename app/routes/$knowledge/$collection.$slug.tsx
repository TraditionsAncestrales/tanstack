import { RecordsSingle } from "@/components/records-single";
import { getPostSingle, getServiceSingle } from "@/lib/pocketbase";
import { createFileRoute } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/$knowledge/$collection/$slug")({
  loader: async ({ params: { collection, slug } }) =>
    collection === "articles" ? getPostSingle({ data: slug }) : getServiceSingle({ data: slug }),
  component: () => {
    const single = Route.useLoaderData();
    return <RecordsSingle single={single} />;
  },
});
