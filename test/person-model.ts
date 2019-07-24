import { Column } from "../src/repository/decorators/column-decoration";
import { Key } from "../src/repository/decorators/key-decorator";
import { Table } from "../src/repository/decorators/table-decorator";

@Table('person')
export class Person {
  @Key()
  @Column('cd_id')
  id: string;
  @Column('ds_name')
  name: string;
  @Column('dt_birthday')
  birthday: string;
  @Column('bo_active',
    (data) => data ? 'S' : 'N',
    (data) => !!(data && data.toUpperCase() === 'S')
  )
  active: boolean;
}