"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const column_decoration_1 = require("../src/repository/decorators/column-decoration");
const key_decorator_1 = require("../src/repository/decorators/key-decorator");
const table_decorator_1 = require("../src/repository/decorators/table-decorator");
let Person = class Person {
};
__decorate([
    key_decorator_1.Key(),
    column_decoration_1.Column('cd_id'),
    __metadata("design:type", String)
], Person.prototype, "id", void 0);
__decorate([
    column_decoration_1.Column('ds_name'),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    column_decoration_1.Column('dt_birthday'),
    __metadata("design:type", String)
], Person.prototype, "birthday", void 0);
__decorate([
    column_decoration_1.Column('bo_active', (data) => data ? 'S' : 'N', (data) => !!(data && data.toUpperCase() === 'S')),
    __metadata("design:type", Boolean)
], Person.prototype, "active", void 0);
Person = __decorate([
    table_decorator_1.Table('person')
], Person);
exports.Person = Person;
//# sourceMappingURL=person-model.js.map