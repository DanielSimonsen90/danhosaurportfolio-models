"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collab_1 = require("./Utils/Collab");
class Project {
    constructor(name, props) {
        const { language, projectType, createdAt, description, display, image, hasLink, baseLink, spareTime, collab } = props;
        this.name = name;
        this.language = language;
        this.projectType = projectType;
        this.createdAt = createdAt;
        this.image = image;
        this.description = description;
        this.display = display === false ? false : true;
        this.link = hasLink === false ? "No link" : baseLink !== undefined && baseLink !== null ? baseLink : "";
        this.spareTime = spareTime;
        this.collab = collab && new Collab_1.default(collab.github, collab.repo);
        if (collab !== null && collab !== undefined) {
            this.link = this.collab.repoLink;
        }
    }
    toString() {
        return this.name;
    }
}
exports.default = Project;
