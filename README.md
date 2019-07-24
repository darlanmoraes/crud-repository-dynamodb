### DynamoDB CRUD

Simple module to use a basic CRUD with DynamoDB.

- Importing the project
```
npm install https://github.com/darlanmoraes/crud-repository-dynamodb#master
```

- Installing the project

```
docker run -p 8000:8000 amazon/dynamodb-local
aws dynamodb create-table --endpoint-url http://localhost:8000 --region localhost --cli-input-json file://test/table-person.json
```

- Running the test

```
npm run test
```

- List tables and items
```
aws dynamodb list-tables --region localhost --endpoint-url http://localhost:8000
aws dynamodb scan --table-name person --region localhost --endpoint-url http://localhost:8000
```

- Configuring

```
export AWS_REGION=sa-east-1
export AWS_DYNAMO_ENDPOINT=https://dynamodb.sa-east-1.amazonaws.com
```

- Create new CRUD Repository

```
import { Person } from './person-model';
import { CrudRepository } from '../src/repository/crud-repository';

export class PersonRepository extends CrudRepository<Person> {
  constructor() {
    super(Person);
  }
}

export const personRepository = new PersonRepository();
```

- Using the CRUD Repository

```
import { personRepository } from "./person-repository";
import { Person } from "./person-model";

const person = new Person();
person.id = new Date().toTimeString();
person.name = 'name-1';
person.birthday = '1990-20-10';
person.active = true;

personRepository.insert(person)
  .then(data => personRepository.findAll())
  .then(data => console.log(data))
  .catch(e => console.log(e));
```