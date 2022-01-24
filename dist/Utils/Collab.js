"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collab = void 0;
class Collab {
    constructor(github, repo) {
        this.github = github;
        this.repo = repo;
    }
    get githubLink() {
        return `https://github.com/${this.github}`;
    }
    get repoLink() {
        return `${this.githubLink}/${this.repo}`;
    }
}
exports.Collab = Collab;
exports.default = Collab;
