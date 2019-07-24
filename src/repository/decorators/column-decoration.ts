import "reflect-metadata";

const METADATA_KEY = Symbol("column");

export const Column = (name, serializer?: Function, deserializer?: Function): PropertyDecorator => {
  return (target, property) => {
    const construct = target.constructor;
    const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
    metadata[property] = {
      deserializer, name, serializer,
    };
    Reflect.defineMetadata(METADATA_KEY, metadata, construct);
  };
};

export function getColumn(target: any, property: string) {
  const construct = target.constructor;
  const metadata = Reflect.getMetadata(METADATA_KEY, construct) || {};
  return metadata[property] ? metadata[property] : property;
}
