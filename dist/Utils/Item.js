"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    toString() {
        return this.name;
    }
}
exports.Item = Item;
exports.default = Item;
