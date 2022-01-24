"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const MongoItem_1 = require("./Utils/MongoItem");
class Admin extends MongoItem_1.default {
    constructor(username) {
        super();
        this.username = username;
    }
}
exports.Admin = Admin;
exports.default = Admin;
