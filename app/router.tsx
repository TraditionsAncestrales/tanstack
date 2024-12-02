import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultGcTime: Infinity,
    defaultStaleTime: Infinity,
  });
  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
  interface StaticDataRouteOption {
    isHome?: boolean;
    isMain?: boolean;
  }
}
