import type { Cx, Css } from "./types";
import type { EmotionCache } from "@emotion/cache";
export declare const createCssAndCx: (params: {
    cache: EmotionCache;
}) => {
    css: Css;
    cx: Cx;
};
/** Will pickup the contextual cache if any */
export declare function useCssAndCx(): {
    css: Css;
    cx: Cx;
};
