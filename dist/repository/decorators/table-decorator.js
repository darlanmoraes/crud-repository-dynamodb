"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const METADATA_KEY = Symbol("table");
exports.Table = (tableName) => {
    return (construct) => {
        const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
        metadata[METADATA_KEY] = tableName;
        Reflect.defineMetadata(METADATA_KEY, metadata, construct);
    };
};
function getTable(target) {
    const construct = target.constructor;
    const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
    return metadata[METADATA_KEY];
}
exports.getTable = getTable;
//# sourceMappingURL=table-decorator.js.map