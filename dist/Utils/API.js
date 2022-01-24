"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const axios_1 = require("axios");
const Project_1 = require("../Project");
const DanhoDate_1 = require("./DanhoDate");
class API {
    constructor(url) {
        if (!url.startsWith('http'))
            url = `http://${url}/api`;
        this.url = url;
    }
    get adminUrl() { return `${this.url}/admins`; }
    get projectsUrl() { return `${this.url}/projects`; }
    _getUrl(type) {
        return type == 'projects' ? this.projectsUrl : this.adminUrl;
    }
    _convertJson(type, model) {
        return (type == 'projects' ?
            this._convertProject(model) :
            this._convertAdmin(model));
    }
    _convertProject(item) {
        var _a;
        const { year, month, day } = item.createdAt;
        let result = new Project_1.default(item.name, {
            ...item,
            createdAt: new DanhoDate_1.default(year, month, day),
        });
        result.link = (_a = item.link) !== null && _a !== void 0 ? _a : (item.link != 'No link' && item.link);
        result._id = item._id;
        try {
            result.image = item.image && Buffer.from(item.image);
        }
        catch (err) { }
        return result;
    }
    _convertAdmin(item) {
        return item;
    }
    async _tryRequest(callback, onError) {
        try {
            const result = await callback();
            return result;
        }
        catch (err) {
            console.error(err);
            onError === null || onError === void 0 ? void 0 : onError(err);
            return undefined;
        }
    }
    async create(type, model, onError) {
        return this._tryRequest(async () => {
            const data = {
                ...model,
                _id: (await this.get(type)).length
            };
            await axios_1.default.post(this._getUrl(type), { postData: JSON.stringify(data) });
            return this.get(type, data._id)[0];
        }, onError);
    }
    async get(type, id, onError) {
        return this._tryRequest(() => (id ? this._getModel(type, id) : this._getAll(type)), onError);
    }
    async _getModel(type, id) {
        const response = await axios_1.default.get(`${this._getUrl(type)}/${id}`);
        const modelData = response.data;
        return [this._convertJson(type, modelData)];
    }
    async _getAll(type) {
        const url = type == 'projects' ? this.projectsUrl : this.adminUrl;
        const response = await axios_1.default.get(url);
        return response.data.map(item => this._convertJson(type, item));
    }
    async update(type, updated, onError) {
        return this._tryRequest(async () => {
            await axios_1.default.put(`${this._getUrl(type)}/${updated._id}`, updated);
            return updated;
        }, onError);
    }
    async delete(type, model, onError) {
        return this._tryRequest(async () => {
            axios_1.default.delete(`${this._getUrl(type)}/${model._id}`);
            return this.get(type);
        }, onError);
    }
}
exports.API = API;
exports.default = API;
