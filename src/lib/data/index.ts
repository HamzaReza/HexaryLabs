/**
 * The data layer's public surface. **Import from here, never from `@/content/*`.**
 *
 * Enforced by `no-restricted-imports` in `eslint.config.mjs`: only files under
 * `src/lib/data/**` may reach into `src/content/*`. Everything else goes through
 * this barrel, so moving the source to an API is a change to `source.ts` alone.
 */

export * from "./types";
export * from "./site";
export * from "./services";
export * from "./work";
export * from "./content";
