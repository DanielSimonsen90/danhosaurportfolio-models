export default class Collab {
    constructor(github: string, repo: string);
    github: string;
    repo: string;
    get githubLink(): string;
    get repoLink(): string;
}
