import { PostsItem } from "@/components/posts-item";
import { TheContact } from "@/components/the-contact";
import { TheContactMap } from "@/components/the-contact.map";
import { TheFooter } from "@/components/the-footer";
import { TheHeader } from "@/components/the-header";
import { TheHero } from "@/components/the-hero";
import { TheNewsletter } from "@/components/the-newsletter";
import { TheOtherKnowledges } from "@/components/the-other-knowledges";
import { getConfig, getEvents, getKnowledges, getPostItem, heroFrom, otherKnowledgesFrom } from "@/lib/pocketbase";
import globalsCss from "@/styles/globals.css?url";
import themeCss from "@/styles/theme.css?url";
import { Outlet, ScrollRestoration, type StaticDataRouteOption, createRootRoute, useParams, useRouterState } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";

// ROUTE ***********************************************************************************************************************************
export const Route = createRootRoute({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "TanStack Start Starter" }],
    links: [
      { rel: "stylesheet", href: globalsCss },
      { rel: "stylesheet", href: themeCss },
    ],
  }),
  loader: async () => {
    const [config, events, knowledges, organizationPost] = await Promise.all([
      getConfig(),
      getEvents(),
      getKnowledges(),
      getPostItem({ data: "l-association" }),
    ]);
    return { config, events, knowledges, organizationPost };
  },
  component: () => {
    const { knowledge = "traditions-ancestrales" } = useParams({ strict: false });
    const { config, knowledges, organizationPost } = Route.useLoaderData();
    const state = useRouterState();

    const { isHome, isMain } = state.matches.reduce((acc, { staticData }) => ({ ...acc, ...staticData }), {} as StaticDataRouteOption);
    const hero = heroFrom(config, knowledges, knowledge);
    const otherKnowledges = otherKnowledgesFrom(knowledges, knowledge);

    return (
      <html>
        <head>
          <Meta />
        </head>
        <body className="overflow-y-auto overflow-x-hidden antialiased" data-theme={knowledge}>
          <TheHeader className="fixed left-0 top-0 z-30 w-full" />
          <TheHero {...hero} className={isMain ? "h-screen" : "h-[50vh]"} />
          <Outlet />
          {isHome && <PostsItem post={organizationPost} border="bottom" intent="primary" />}
          <TheOtherKnowledges knowledges={otherKnowledges} />
          <TheNewsletter border="top" intent="primary" />
          {isHome ? (
            <TheContact intent="light">
              <TheContactMap className="absolute inset-x-0 bottom-0 z-0 h-96 xl:left-auto xl:top-0 xl:h-auto xl:w-1/2" />
            </TheContact>
          ) : (
            <PostsItem post={organizationPost} className="mb-4" />
          )}
          <TheFooter config={config} />
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  },
});
