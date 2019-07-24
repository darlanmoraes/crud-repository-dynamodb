"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_repository_1 = require("./person-repository");
const person_model_1 = require("./person-model");
const person = new person_model_1.Person();
person.id = new Date().toTimeString();
person.name = 'name-1';
person.birthday = '1990-20-10';
person.active = true;
person_repository_1.personRepository.insert(person)
    .then(data => person_repository_1.personRepository.findAll())
    .then(data => console.log(data))
    .catch(e => console.log(e));
//# sourceMappingURL=index.js.map