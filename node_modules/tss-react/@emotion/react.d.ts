import type { EmotionCache } from "@emotion/utils";
declare module "@emotion/react" {
    function __unsafe_useEmotionCache(): EmotionCache | null;
}
export { __unsafe_useEmotionCache as useEmotionCache } from "@emotion/react";
export * from "@emotion/react";
