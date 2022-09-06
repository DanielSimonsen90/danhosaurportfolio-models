import axios from 'axios';
import Admin from '../Admin';
import Project from '../Project';
import DanhoDate from './DanhoDate';

interface AllowedModels {
    projects: Project
    admins: Admin
}

type OnError = (err: Error) => void;

export class API {
    private static async _tryRequest<T>(callback: () => Promise<T>, onError?: OnError) {
        try {
            const result = await callback();
            return result;
        } catch (err) {
            console.error(err);
            onError?.(err);
            return undefined;
        }
    }

    constructor(url: string, public githubUsername: string) {
        if (!url) throw { message: 'url must not be empty!' };
        else if (!url.startsWith('http')) url = `http://${url}/api`
        this.url = url;
    }

    public url: string;
    public get adminUrl() { return `${this.url}/admins` }
    public get projectsUrl() { return `${this.url}/projects` }

    private _convertProject(item: Project) {
        const { year, month, day } = item.createdAt;
        let result = new Project(item.name, {
            ...item,
            createdAt: new DanhoDate(year, month, day)
        });
        result.link = item.link ?? (item.link != 'No link' && item.link);
        result._id = item._id;
        result.image = item.image;

        return result;
    }
    private _convertAdmin(item: Admin) {
        return item;
    }

    private _convertJson<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, model: Model): Model {
        return (type == 'projects' ? 
            this._convertProject(model as Project) : 
            this._convertAdmin(model as Admin)
        ) as Model;
    }

    private _getUrl<ModelType extends keyof AllowedModels>(type: ModelType) {
        return type == 'projects' ? this.projectsUrl : this.adminUrl;
    }

    public async create<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, model: Model, onError?: OnError) {
        return API._tryRequest<Model>(async () => {
            const data = {
                ...model,
                _id: (await this.get(type)).length
            };
            await axios.post(this._getUrl(type), { postData: JSON.stringify(data) });
            return this.get<ModelType, Model>(type, data._id)[0];
        }, onError)
    }

    public async get<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, id?: number, onError?: OnError) {
        return API._tryRequest(() => (id ? [this._getModel(type, id)] : this._getAll(type)) as Promise<Array<Model>>, onError)
    }
    private async _getModel<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, id: number) {
        const response = await axios.get<Model>(`${this._getUrl(type)}/${id}`);
        const modelData = response.data;
        return this._convertJson(type, modelData);
    }
    private async _getAll<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType) {
        const response = await axios.get<Array<Model>>(this._getUrl(type));
        return response.data.map(item => this._convertJson(type, item));
    }

    public async update<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, updated: Model, onError?: OnError) {
        return API._tryRequest(async () => {
            await axios.put<Model>(`${this._getUrl(type)}/${updated._id}`, updated);
            return updated as Model;
        }, onError)
    }

    public async delete<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, model: Model, onError?: OnError) {
        return API._tryRequest(async () => {
            const url = `${this._getUrl(type)}/${model._id}`;
            console.log(url)
            axios.delete<Model>(url);
            return this.get<ModelType, Model>(type);
        }, onError);
    }
}
export default API;