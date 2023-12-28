"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGuaranteedMemo = void 0;
const react_1 = require("react");
/** Like react's useMemo but with guarantee that the fn
 * won't be invoked again if deps hasn't change */
function useGuaranteedMemo(fn, deps) {
    const ref = (0, react_1.useRef)();
    if (!ref.current ||
        deps.length !== ref.current.prevDeps.length ||
        ref.current.prevDeps.map((v, i) => v === deps[i]).indexOf(false) >= 0) {
        ref.current = {
            "v": fn(),
            "prevDeps": [...deps],
        };
    }
    return ref.current.v;
}
exports.useGuaranteedMemo = useGuaranteedMemo;
