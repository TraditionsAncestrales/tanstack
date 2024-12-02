import { RecordsItems } from "@/components/records-items";
import { getProducts } from "@/lib/pocketbase";
import { createFileRoute } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/boutique")({
  loader: async () => getProducts(),
  component: () => {
    const products = Route.useLoaderData();
    return (
      <RecordsItems title="Produit" items={products} border="all" intent="light">
        <p>Il n'y a actuellement aucun produit dans la boutique.</p>
      </RecordsItems>
    );
  },
});
