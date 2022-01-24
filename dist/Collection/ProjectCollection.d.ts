import Project from "../Project";
import API from "../Utils/API";
import PlanLocation from "../Utils/PlanLocation";
export declare class ProjectCollection extends Array<Project> {
    constructor(github: string, api: API);
    private _locationCollection;
    private _api;
    github: string;
    get locations(): Map<PlanLocation, Project<keyof import("../Project").IProgrammingLanguage>[]>;
    append(...items: Project[]): this;
    private setLink;
    fetchProjects(): Promise<this>;
}
export default ProjectCollection;
