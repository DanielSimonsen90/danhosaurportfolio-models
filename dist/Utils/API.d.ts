import Admin from '../Admin';
import Project from '../Project';
interface AllowedModels {
    projects: Project;
    admins: Admin;
}
declare type OnError = (err: Error) => void;
export declare class API {
    constructor(url: string);
    url: string;
    get adminUrl(): string;
    get projectsUrl(): string;
    private _getUrl;
    private _convertJson;
    private _convertProject;
    private _convertAdmin;
    private _tryRequest;
    create<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, model: Model, onError?: OnError): Promise<Model>;
    get<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, id?: number, onError?: OnError): Promise<Model[]>;
    private _getModel;
    private _getAll;
    update<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, updated: Model, onError?: OnError): Promise<Model>;
    delete<ModelType extends keyof AllowedModels, Model extends AllowedModels[ModelType]>(type: ModelType, model: Model, onError?: OnError): Promise<Model[]>;
}
export default API;
