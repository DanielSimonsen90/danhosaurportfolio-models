"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const LocationCollection_1 = require("./Collection/LocationCollection");
const Collab_1 = require("./Utils/Collab");
const MongoItem_1 = require("./Utils/MongoItem");
class Project extends MongoItem_1.default {
    constructor(name, props) {
        super();
        const { language, projectType, createdAt, description, display, image, hasLink, baseLink, spareTime, collab, githubUsername } = props;
        this.name = name;
        this.language = language;
        this.projectType = projectType;
        this.createdAt = createdAt;
        this.image = image;
        this.description = description;
        this.display = display === false ? false : true;
        this.baseLink = baseLink;
        this.link = this.setLink(hasLink, githubUsername);
        this.spareTime = spareTime;
        this.collab = collab && new Collab_1.default(collab.github, collab.repo);
        if (collab !== null && collab !== undefined) {
            this.link = this.collab.repoLink;
        }
    }
    setLink(hasLink, githubUsername) {
        if (!hasLink)
            return "No link";
        const githubLink = `https://github.com/${githubUsername}`;
        if (this.spareTime)
            return `${githubLink}/${this.name}`;
        const module = new LocationCollection_1.default().getLocationFrom(this.createdAt.getTime());
        const repo = module.includes("Hovedforløb") ? 'Education' : 'SKP';
        const branch = repo == 'Education' ? 'master' : 'main';
        const folder = (repo === 'Education' ? module.toString().replaceAll('ø', '%C3%B8') + "/" :
            repo === 'SKP' ? `Round ${module.toString().split(' ')[1]}/` : "") + this.baseLink ? `${this.baseLink}/` : "";
        console.log({
            project: this,
            module, folder, repo, baseLink: this.baseLink
        });
        return `${githubLink}/${repo}/tree/${branch}/${folder}${this.name}/`.replaceAll(' ', "%20");
    }
    toString() {
        return this.name;
    }
}
exports.Project = Project;
exports.default = Project;
