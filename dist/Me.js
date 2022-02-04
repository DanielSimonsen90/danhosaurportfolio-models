"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Me = void 0;
const ProjectCollection_1 = require("./Collection/ProjectCollection");
const DanhoDate_1 = require("./Utils/DanhoDate");
const danholibraryjs_1 = require("danholibraryjs");
class Me {
    constructor(locationCollection, contact, spareTime, api) {
        this.name = 'Daniel Simonsen';
        this.age = this.getYear(new DanhoDate_1.default(2001, 5, 3));
        this.codingFor = this.getYear(new DanhoDate_1.default(2018, 8, 8));
        this.occupation = locationCollection.whereAmI();
        this.contact = contact;
        this.projects = new ProjectCollection_1.default(api);
        this.spareTime = spareTime;
    }
    toString() {
        return this.name;
    }
    getYear(date) {
        return new danholibraryjs_1.TimeSpan(new Date(), new Date(date.getTime())).years;
    }
}
exports.Me = Me;
exports.default = Me;
