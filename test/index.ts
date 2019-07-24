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