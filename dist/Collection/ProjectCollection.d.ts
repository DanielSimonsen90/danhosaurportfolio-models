import Project from "../Project";
import PlanLocation from "../Utils/PlanLocation";
import LocationCollection from "./LocationCollection";
export default class ProjectCollection extends Array<Project> {
    constructor(github: string, locationCollection: LocationCollection, ...projects: Project[]);
    github: string;
    get locations(): Map<PlanLocation, Project<keyof import("../Project").IProgrammingLanguage>[]>;
    append(...items: Project[]): this;
    private locationCollection;
    private setLink;
}
