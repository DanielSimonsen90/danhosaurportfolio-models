import Item from "./Utils/Item";
import LocationCollection from "./Collection/LocationCollection";
import ProjectCollection from './Collection/ProjectCollection';
import PlanLocation from "./Utils/PlanLocation";
import IContact from "./IContact";
import API from "./Utils/API";
export declare class Me {
    constructor(locationCollection: LocationCollection, contact: IContact, spareTime: Array<Item>, api: API);
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
export default Me;
