"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCollection = void 0;
const LocationCollection_1 = require("./LocationCollection");
class ProjectCollection extends Array {
    constructor(api) {
        super();
        this._locationCollection = new LocationCollection_1.default();
        this._api = api;
    }
    get locations() {
        const result = new Map();
        for (const item of this) {
            const itemLocation = this._locationCollection.getLocationFrom(item.createdAt.getTime());
            result.set(itemLocation, result.has(itemLocation) ? [...result.get(itemLocation), item] : [item]);
        }
        return result;
    }
    fetchProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._api.get('projects', null, () => []).then(arr => {
                if (arr)
                    this.push(...arr);
                return this;
            });
        });
    }
}
exports.ProjectCollection = ProjectCollection;
exports.default = ProjectCollection;
