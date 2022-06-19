import { DanhoDate } from "../Utils/DanhoDate";
import Project from "../Project";
import API from "../Utils/API";
import PlanLocation from "../Utils/PlanLocation";
import LocationCollection from "./LocationCollection";

export class ProjectCollection extends Array<Project> {
    constructor(api: API) {
        super();
        this._locationCollection = new LocationCollection();
        this._api = api;
    }

    private _locationCollection: LocationCollection
    private _api: API
    public get locations() {
        const result = new Map<PlanLocation, Project[]>();

        for (const item of this) {
            const itemLocation = this._locationCollection.getLocationFrom(item.createdAt.getTime());
            result.set(itemLocation, result.has(itemLocation) ? [...result.get(itemLocation), item] : [item]);
        }
        return result;
    }
    public before(date: DanhoDate | Date) {
        return this.filter(p => p.createdAt.getTime() < date.getTime());
    }    
    public after(date: DanhoDate | Date) {
        return this.filter(p => p.createdAt.getTime() > date.getTime());
    }

    public async fetchProjects() {
        return this._api.get('projects', null, () => []).then(arr => {
            if (arr) this.push(...arr)
            return this;
        });
    }
}
export default ProjectCollection;