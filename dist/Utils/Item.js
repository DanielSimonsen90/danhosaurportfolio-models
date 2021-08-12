"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    toString() {
        return this.name;
    }
}
exports.default = Item;
