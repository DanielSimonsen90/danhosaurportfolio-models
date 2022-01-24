"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const Collab_1 = require("./Utils/Collab");
const MongoItem_1 = require("./Utils/MongoItem");
class Project extends MongoItem_1.default {
    constructor(name, props) {
        super();
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
exports.Project = Project;
exports.default = Project;
