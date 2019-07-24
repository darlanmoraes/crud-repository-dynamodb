import * as AWS from "aws-sdk";
import { getKey } from "./decorators/key-decorator";
import { getTable } from "./decorators/table-decorator";
import { Mapper } from "./mapper";

function configure() {
  const { AWS_REGION, AWS_DYNAMO_ENDPOINT } = process.env;
  return {
    endpoint: AWS_DYNAMO_ENDPOINT,
    region: AWS_REGION,
  };
}

export abstract class CrudRepository<T extends { id: string }> {

  private mapper: Mapper<T>;
  private key: string;
  private table: string;
  private db: AWS.DynamoDB.DocumentClient;

  constructor(
    private entity: new() => T,
  ) {
    const sample = new entity();
    this.mapper = new Mapper<T>();
    this.key = getKey(sample);
    this.table = getTable(sample);
    this.db = new AWS.DynamoDB.DocumentClient(configure());
  }

  public async findOneById(id: string): Promise<T> {
    const Key = { };
    Key[this.key] = id;
    const data = await this.db.get({
      Key, TableName: this.table,
    }).promise();
    if (data.Item) {
      return this.mapper.fromItem(data.Item, this.entity);
    }
  }

  public async update(Item: T): Promise<T> {
    if (Item.id) {
      await this.db.put({
        Item: this.mapper.toItem(Item),
        TableName: this.table,
      }).promise();
      process.stdout.write(`db:update(${this.table}) => id=${Item.id}\n`);
      return Item;
    }
  }

  public async insert(Item: T): Promise<T> {
    Item.id = this.newModelId(4);
    await this.db.put({
      Item: this.mapper.toItem(Item),
      TableName: this.table,
    }).promise();
    process.stdout.write(`db:insert(${this.table}) => id=${Item.id}\n`);
    return Item;
  }

  public async delete(Item: T): Promise<void> {
    if (Item.id) {
      const Key = { };
      Key[this.key] = Item.id;
      await this.db.delete({
        Key, TableName: this.table,
      }).promise();
      process.stdout.write(`db:delete(${this.table}) => id=${Item.id}\n`);
    }
  }

  public async findAll(): Promise<T[]> {
    const request = await this.db.scan({
      TableName: this.table,
    }).promise();
    if (request.Count) {
      return request.Items.map((Item) => this.mapper.fromItem(Item, this.entity));
    }
    return [];
  }

  private newModelId = (subId) => `${(
    (((new Date().getTime() - 1300000000000) * 64) + subId) * 512) +
    ((Math.floor(Math.random() * 512)) % 512)}`

}
