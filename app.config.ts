import { defineConfig } from "@tanstack/start/config";
import { FontaineTransform } from "fontaine";
import { promises as fs } from "node:fs";
import Icons from "unplugin-icons/vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    preset: "vercel",
  },
  vite: {
    envPrefix: ["PUBLIC_"],
    plugins: [
      viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
      FontaineTransform.vite({
        fallbacks: ["Arial"],
        resolvePath: (id) => new URL(id.startsWith("/_build/app/public") ? `${id}` : `node_modules/${id}`, import.meta.url),
      }),
      Icons({
        compiler: "jsx",
        jsx: "react",
        customCollections: {
          ta: {
            logo: () => fs.readFile("./app/icons/logo.svg", "utf8"),
            stain: () => fs.readFile("./app/icons/stain.svg", "utf8"),
          },
        },
      }),
    ],
  },
});
