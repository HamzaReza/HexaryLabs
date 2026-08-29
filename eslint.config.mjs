import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Design-review artifacts (screenshots + generated comparison pages).
    "review/**",
  ]),
  {
    /**
     * The API seam. `src/content/*` is the current data source, and swapping it
     * for an API should be a change to `src/lib/data/source.ts` alone — which is
     * only true if nothing else reaches past the data layer. Importing content
     * directly from a page or component is a lint error, not a convention.
     */
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/data/**", "src/content/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/content/*", "**/content/*"],
              message:
                "Import from '@/lib/data' instead. Only src/lib/data/** may read src/content/* — see src/lib/data/source.ts.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
