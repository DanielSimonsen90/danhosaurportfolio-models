import Item from "./Utils/Item";
import LocationCollection from "./Collection/LocationCollection";
import ProjectCollection from './Collection/ProjectCollection';
import PlanLocation from "./Utils/PlanLocation";
import IContact from "./IContact";
export default class Me {
    constructor(locationCollection: LocationCollection, contact: IContact, projects: ProjectCollection);
    name: string;
    age: number;
    codingFor: number;
    occupation: PlanLocation;
    contact: IContact;
    spareTime: Item[];
    projects: ProjectCollection;
    toString(): string;
    private getYear;
}
