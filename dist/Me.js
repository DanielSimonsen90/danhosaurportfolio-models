"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DanhoDate_1 = require("./Utils/DanhoDate");
class Me {
    constructor(locationCollection, contact, projects) {
        this.name = 'Daniel Simonsen';
        this.age = this.getYear(new DanhoDate_1.default(2001, 5, 3));
        this.codingFor = this.getYear(new DanhoDate_1.default(2018, 8, 8));
        this.occupation = locationCollection.whereAmI();
        this.contact = contact;
        this.projects = projects;
    }
    toString() {
        return this.name;
    }
    getYear(date) {
        return new Date().getFullYear() - date.year;
    }
}
exports.default = Me;
