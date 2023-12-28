"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyframes = exports.cx = exports.css = void 0;
const cssAndCx_1 = require("../cssAndCx");
const cache_1 = require("../cache");
/** NOTE: These function use the default cache ("tss-react/cache") */
_a = (0, cssAndCx_1.createCssAndCx)({
    "cache": (0, cache_1.getTssDefaultEmotionCache)(),
}), exports.css = _a.css, exports.cx = _a.cx;
var react_1 = require("@emotion/react");
Object.defineProperty(exports, "keyframes", { enumerable: true, get: function () { return react_1.keyframes; } });
