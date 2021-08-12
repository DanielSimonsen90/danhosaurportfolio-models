import Project from "../Project";
import PlanLocation from "../Utils/PlanLocation";
import LocationCollection from "./LocationCollection";

export default class ProjectCollection extends Array<Project> {
    constructor(github: string, locationCollection: LocationCollection, ...projects: Project[]) {
        super(...projects);
        this.github = github;
        this.locationCollection = locationCollection;
    }

    public github: string;
    public get locations() {
        const result = new Map<PlanLocation, Project[]>();

        for (const item of this) {
            const itemLocation = this.locationCollection.getLocationFrom(item.createdAt.getTime());
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

    private locationCollection: LocationCollection
    private setLink(project: Project) {
        const githubLink = `https://github.com/${this.github}`;

        if (project.spareTime) return `${githubLink}/${project.name}`;

        const location = this.locationCollection.getLocationFrom(project.createdAt.getTime()) as string;
        const repo = location.includes("Hovedforløb") ? 'Education' : 'SKP';
        const branch = repo == 'Education' ? 'master' : 'main';
        const round = this.locationCollection.getLocationFrom(project.createdAt.getTime());
        const folderStart = (round.startsWith('Hovedforløb') ? round.toString().replace('ø', '%C3%B8') + "/" : 
                        round.startsWith("Skolepraktik") ? `Round ${round.toString().split(' ')[1]}/` : "");
        
        const folderEnd = project.link ? `${project.link}/` : "";
        const folder = folderStart + folderEnd;
        return `${githubLink}/${repo}/tree/${branch}/${folder}${project.name}/`.replace(/ +/, "%20");
    }
}