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
exports.API = void 0;
const axios_1 = require("axios");
const Project_1 = require("../Project");
const DanhoDate_1 = require("./DanhoDate");
class API {
    constructor(url, githubUsername) {
        this.githubUsername = githubUsername;
        if (!url)
            throw { message: 'url must not be empty!' };
        else if (!url.startsWith('http'))
            url = `http://${url}/api`;
        this.url = url;
    }
    static _tryRequest(callback, onError) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield callback();
                return result;
            }
            catch (err) {
                console.error(err);
                onError === null || onError === void 0 ? void 0 : onError(err);
                return undefined;
            }
        });
    }
    get adminUrl() { return `${this.url}/admins`; }
    get projectsUrl() { return `${this.url}/projects`; }
    _convertProject(item) {
        var _a;
        const { year, month, day } = item.createdAt;
        let result = new Project_1.default(item.name, Object.assign(Object.assign({}, item), { createdAt: new DanhoDate_1.default(year, month, day) }));
        result.link = (_a = item.link) !== null && _a !== void 0 ? _a : (item.link != 'No link' && item.link);
        result._id = item._id;
        result.image = item.image;
        return result;
    }
    _convertAdmin(item) {
        return item;
    }
    _convertJson(type, model) {
        return (type == 'projects' ?
            this._convertProject(model) :
            this._convertAdmin(model));
    }
    _getUrl(type) {
        return type == 'projects' ? this.projectsUrl : this.adminUrl;
    }
    create(type, model, onError) {
        return __awaiter(this, void 0, void 0, function* () {
            return API._tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const data = Object.assign(Object.assign({}, model), { _id: (yield this.get(type)).length });
                yield axios_1.default.post(this._getUrl(type), { postData: JSON.stringify(data) });
                return this.get(type, data._id)[0];
            }), onError);
        });
    }
    get(type, id, onError) {
        return __awaiter(this, void 0, void 0, function* () {
            return API._tryRequest(() => (id ? [this._getModel(type, id)] : this._getAll(type)), onError);
        });
    }
    _getModel(type, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(`${this._getUrl(type)}/${id}`);
            const modelData = response.data;
            return this._convertJson(type, modelData);
        });
    }
    _getAll(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(this._getUrl(type));
            return response.data.map(item => this._convertJson(type, item));
        });
    }
    update(type, updated, onError) {
        return __awaiter(this, void 0, void 0, function* () {
            return API._tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                yield axios_1.default.put(`${this._getUrl(type)}/${updated._id}`, updated);
                return updated;
            }), onError);
        });
    }
    delete(type, model, onError) {
        return __awaiter(this, void 0, void 0, function* () {
            return API._tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const url = `${this._getUrl(type)}/${model._id}`;
                console.log(url);
                axios_1.default.delete(url);
                return this.get(type);
            }), onError);
        });
    }
}
exports.API = API;
exports.default = API;
