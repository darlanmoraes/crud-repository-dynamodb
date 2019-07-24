"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const person_model_1 = require("./person-model");
const crud_repository_1 = require("../src/repository/crud-repository");
class PersonRepository extends crud_repository_1.CrudRepository {
    constructor() {
        super(person_model_1.Person);
    }
}
exports.PersonRepository = PersonRepository;
exports.personRepository = new PersonRepository();
//# sourceMappingURL=person-repository.js.map