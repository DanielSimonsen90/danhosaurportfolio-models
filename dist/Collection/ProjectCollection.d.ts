import Project from "../Project";
import API from "../Utils/API";
import PlanLocation from "../Utils/PlanLocation";
export declare class ProjectCollection extends Array<Project> {
    constructor(api: API);
    private _locationCollection;
    private _api;
    get locations(): Map<PlanLocation, Project<keyof import("../Project").IProgrammingLanguage>[]>;
    fetchProjects(): Promise<this>;
}
export default ProjectCollection;
