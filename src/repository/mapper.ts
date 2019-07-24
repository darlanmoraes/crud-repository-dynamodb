import { AttributeMap } from "aws-sdk/clients/xray";
import { getColumn } from "./decorators/column-decoration";

export class Mapper<T extends { id: string }> {

  public fromItem(item: AttributeMap, entity: new() => T): T {
    const result = new entity();
    for (const symbol of Reflect.getMetadataKeys(entity)) {
      if ((symbol as Symbol).toString() === `Symbol(column)`) {
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

  public toItem(entity: T): AttributeMap {
    const result = { };
    for (const property in entity) {
      if (entity[property]) {
        const column = getColumn(entity, property);
        const value = entity[property];
        if (typeof column === "string") { // when item doesn't have decorators
          result[column] = value;
        } else {
          const name = column.name;
          const srlz = column.serializer;
          result[name] = srlz ? srlz(value) : value;
        }
      }
    }
    return result;
  }

}
