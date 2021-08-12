"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectCollection extends Array {
    constructor(github, locationCollection, ...projects) {
        super(...projects);
        this.github = github;
        this.locationCollection = locationCollection;
    }
    get locations() {
        const result = new Map();
        for (const item of this) {
            const itemLocation = this.locationCollection.getLocationFrom(item.createdAt.getTime());
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
        const location = this.locationCollection.getLocationFrom(project.createdAt.getTime());
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
exports.default = ProjectCollection;
