import "reflect-metadata";
export declare const Column: (name: any, serializer?: Function, deserializer?: Function) => PropertyDecorator;
export declare function getColumn(target: any, property: string): any;
