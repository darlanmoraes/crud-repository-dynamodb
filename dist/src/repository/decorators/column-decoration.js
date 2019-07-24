"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const METADATA_KEY = Symbol("column");
exports.Column = (name, serializer, deserializer) => {
    return (target, property) => {
        const construct = target.constructor;
        const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
        metadata[property] = {
            deserializer, name, serializer,
        };
        Reflect.defineMetadata(METADATA_KEY, metadata, construct);
    };
};
function getColumn(target, property) {
    const construct = target.constructor;
    const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
    return metadata[property] ? metadata[property] : property;
}
exports.getColumn = getColumn;
//# sourceMappingURL=column-decoration.js.map