"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCollection = void 0;
const LocationCollection_1 = require("./LocationCollection");
class ProjectCollection extends Array {
    constructor(github, api) {
        super();
        this.github = github;
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
    append(...items) {
        const projects = items.map(p => {
            if (p.link != "No link" && !p.collab)
                p.link = this.setLink(p);
            return p;
        });
        super.push(...projects);
        return this;
    }
    setLink(project) {
        const githubLink = `https://github.com/${this.github}`;
        if (project.spareTime)
            return `${githubLink}/${project.name}`;
        const location = this._locationCollection.getLocationFrom(project.createdAt.getTime());
        const repo = location.includes("Hovedforløb") ? 'Education' : 'SKP';
        const branch = repo == 'Education' ? 'master' : 'main';
        const module = this._locationCollection.getLocationFrom(project.createdAt.getTime());
        const folderStart = (module.startsWith('Hovedforløb') ? module.toString().replace('ø', '%C3%B8') + "/" :
            module.startsWith("Skolepraktik") ? `Round ${module.toString().split(' ')[1]}/` : "");
        const folderEnd = project.link ? `${project.link}/` : "";
        const folder = folderStart + folderEnd;
        return `${githubLink}/${repo}/tree/${branch}/${folder}${project.name}/`.replace(/ +/g, "%20");
    }
    async fetchProjects() {
        return this._api.get('projects', null, () => []).then(arr => {
            if (arr)
                this.append(...arr);
            return this;
        });
    }
}
exports.ProjectCollection = ProjectCollection;
exports.default = ProjectCollection;
