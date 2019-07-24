export declare abstract class CrudRepository<T extends {
    id: string;
}> {
    private entity;
    private mapper;
    private key;
    private table;
    private db;
    constructor(entity: new () => T);
    findOneById(id: string): Promise<T>;
    update(Item: T): Promise<T>;
    insert(Item: T): Promise<T>;
    delete(Item: T): Promise<void>;
    findAll(): Promise<T[]>;
    private newModelId;
}
