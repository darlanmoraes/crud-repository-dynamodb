import "reflect-metadata";
import { getColumn } from "./column-decorator";

const METADATA_KEY = Symbol("id");

export const Key = (): PropertyDecorator => {
  return (target, property) => {
    const construct = target.constructor;
    const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
    metadata[METADATA_KEY] = getColumn(target, property.toString()).name;
    Reflect.defineMetadata(METADATA_KEY, metadata, construct);
  };
};

export function getKey(target: any) {
  const construct = target.constructor;
  const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
  return metadata[METADATA_KEY];
}
