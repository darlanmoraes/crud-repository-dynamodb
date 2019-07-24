import "reflect-metadata";

const METADATA_KEY = Symbol("table");

export const Table = (tableName: string): ClassDecorator => {
  return (construct) => {
    const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
    metadata[METADATA_KEY] = tableName;
    Reflect.defineMetadata(METADATA_KEY, metadata, construct);
  };
};

export function getTable(target: any) {
  const construct = target.constructor;
  const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
  return metadata[METADATA_KEY];
}
