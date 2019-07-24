import { Person } from './person-model';
import { CrudRepository } from '../src/repository/crud-repository';

export class PersonRepository extends CrudRepository<Person> {
  constructor() {
    super(Person);
  }
}

export const personRepository = new PersonRepository();