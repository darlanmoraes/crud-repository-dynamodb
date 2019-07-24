"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const column_decoration_1 = require("./column-decoration");
const METADATA_KEY = Symbol("id");
exports.Key = () => {
    return (target, property) => {
        const construct = target.constructor;
        const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
        metadata[METADATA_KEY] = column_decoration_1.getColumn(target, property.toString()).name;
        Reflect.defineMetadata(METADATA_KEY, metadata, construct);
    };
};
function getKey(target) {
    const construct = target.constructor;
    const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
    return metadata[METADATA_KEY];
}
exports.getKey = getKey;
//# sourceMappingURL=key-decorator.js.map