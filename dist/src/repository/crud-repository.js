"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const key_decorator_1 = require("./decorators/key-decorator");
const table_decorator_1 = require("./decorators/table-decorator");
const mapper_1 = require("./mapper");
function configure() {
    const { AWS_REGION, AWS_DYNAMO_ENDPOINT } = process.env;
    return {
        endpoint: AWS_DYNAMO_ENDPOINT,
        region: AWS_REGION,
    };
}
class CrudRepository {
    constructor(entity) {
        this.entity = entity;
        this.newModelId = (subId) => `${((((new Date().getTime() - 1300000000000) * 64) + subId) * 512) +
            ((Math.floor(Math.random() * 512)) % 512)}`;
        const sample = new entity();
        this.mapper = new mapper_1.Mapper();
        this.key = key_decorator_1.getKey(sample);
        this.table = table_decorator_1.getTable(sample);
        this.db = new AWS.DynamoDB.DocumentClient(configure());
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Key = {};
            Key[this.key] = id;
            const data = yield this.db.get({
                Key, TableName: this.table,
            }).promise();
            if (data.Item) {
                return this.mapper.fromItem(data.Item, this.entity);
            }
        });
    }
    update(Item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Item.id) {
                yield this.db.put({
                    Item: this.mapper.toItem(Item),
                    TableName: this.table,
                }).promise();
                process.stdout.write(`db:update(${this.table}) => id=${Item.id}\n`);
                return Item;
            }
        });
    }
    insert(Item) {
        return __awaiter(this, void 0, void 0, function* () {
            Item.id = this.newModelId(4);
            yield this.db.put({
                Item: this.mapper.toItem(Item),
                TableName: this.table,
            }).promise();
            process.stdout.write(`db:insert(${this.table}) => id=${Item.id}\n`);
            return Item;
        });
    }
    delete(Item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Item.id) {
                const Key = {};
                Key[this.key] = Item.id;
                yield this.db.delete({
                    Key, TableName: this.table,
                }).promise();
                process.stdout.write(`db:delete(${this.table}) => id=${Item.id}\n`);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield this.db.scan({
                TableName: this.table,
            }).promise();
            if (request.Count) {
                return request.Items.map((Item) => this.mapper.fromItem(Item, this.entity));
            }
            return [];
        });
    }
}
exports.CrudRepository = CrudRepository;
//# sourceMappingURL=crud-repository.js.map