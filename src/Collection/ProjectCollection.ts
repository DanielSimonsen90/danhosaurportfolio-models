import Project from "../Project";
import API from "../Utils/API";
import PlanLocation from "../Utils/PlanLocation";
import LocationCollection from "./LocationCollection";

export class ProjectCollection extends Array<Project> {
    constructor(github: string, api: API) {
        super();
        this.github = github;
        this._locationCollection = new LocationCollection();
        this._api = api;
    }

    private _locationCollection: LocationCollection
    private _api: API
    public github: string;
    public get locations() {
        const result = new Map<PlanLocation, Project[]>();

        for (const item of this) {
            const itemLocation = this._locationCollection.getLocationFrom(item.createdAt.getTime());
            result.set(itemLocation, result.has(itemLocation) ? [...result.get(itemLocation), item] : [item]);
        }
        return result;
    }

    public append(...items: Project[]) {
        const projects = items.map(p => {
            if (p.link != "No link" && !p.collab)
                p.link = this.setLink(p);
            return p;
        })
        super.push(...projects);
        return this;
    }

    private setLink(project: Project) {
        const githubLink = `https://github.com/${this.github}`;

        if (project.spareTime) return `${githubLink}/${project.name}`;

        const location = this._locationCollection.getLocationFrom(project.createdAt.getTime()) as string;
        const repo = location.includes("Hovedforløb") ? 'Education' : 'SKP';
        const branch = repo == 'Education' ? 'master' : 'main';
        const module = this._locationCollection.getLocationFrom(project.createdAt.getTime());
        const folderStart = (module.startsWith('Hovedforløb') ? module.toString().replace('ø', '%C3%B8') + "/" : 
                        module.startsWith("Skolepraktik") ? `Round ${module.toString().split(' ')[1]}/` : "");
        
        const folderEnd = project.link ? `${project.link}/` : "";
        const folder = folderStart + folderEnd;
        return `${githubLink}/${repo}/tree/${branch}/${folder}${project.name}/`.replace(/ +/g, "%20");
    }

    public async fetchProjects() {
        return this._api.get('projects', null, () => []).then(arr => {
            if (arr) this.append(...arr)
            return this;
        });
    }
}
export default ProjectCollection;