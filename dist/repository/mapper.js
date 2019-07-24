"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_decoration_1 = require("./decorators/column-decoration");
class Mapper {
    fromItem(item, entity) {
        const result = new entity();
        for (const symbol of Reflect.getMetadataKeys(entity)) {
            if (symbol.toString() === `Symbol(column)`) {
                const metadata = Reflect.getMetadata(symbol, entity);
                Object.keys(metadata)
                    .forEach((key) => {
                    const column = metadata[key];
                    const name = column.name;
                    const dsrl = column.deserializer;
                    const value = item[name];
                    result[key] = dsrl ? dsrl(value) : value;
                });
                return result;
            }
        }
    }
    toItem(entity) {
        const result = {};
        for (const property in entity) {
            if (entity[property]) {
                const column = column_decoration_1.getColumn(entity, property);
                const value = entity[property];
                if (typeof column === "string") { // when item doesn't have decorators
                    result[column] = value;
                }
                else {
                    const name = column.name;
                    const srlz = column.serializer;
                    result[name] = srlz ? srlz(value) : value;
                }
            }
        }
        return result;
    }
}
exports.Mapper = Mapper;
//# sourceMappingURL=mapper.js.map