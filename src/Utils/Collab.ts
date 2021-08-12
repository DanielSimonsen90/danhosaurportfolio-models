export default class Collab {
    constructor(github: string, repo: string) {
        this.github = github;
        this.repo = repo;
    }

    public github: string;
    public repo: string;
    public get githubLink() {
        return `https://github.com/${this.github}`;
    }
    public get repoLink() {
        return `${this.githubLink}/${this.repo}`;
    }
}