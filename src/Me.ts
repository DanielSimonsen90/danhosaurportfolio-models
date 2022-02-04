import Item from "./Utils/Item";
import LocationCollection from "./Collection/LocationCollection";
import ProjectCollection from './Collection/ProjectCollection';
import PlanLocation from "./Utils/PlanLocation";
import IContact from "./IContact";
import DanhoDate from './Utils/DanhoDate';
import API from "./Utils/API";
import { TimeSpan } from "danholibraryjs";

export class Me {
    constructor(locationCollection: LocationCollection, contact: IContact, spareTime: Array<Item>, api: API) {
        this.occupation = locationCollection.whereAmI();
        this.contact = contact;
        this.projects = new ProjectCollection(api);
        this.spareTime = spareTime;
    }
    
    public name = 'Daniel Simonsen';
    public age = this.getYear(new DanhoDate(2001, 5, 3));
    public codingFor = this.getYear(new DanhoDate(2018, 8, 8));
    public occupation: PlanLocation;
    public contact: IContact;
    public spareTime: Item[];
    public projects: ProjectCollection;

    public toString() {
        return this.name;
    }

    private getYear(date: DanhoDate) {
        return new TimeSpan(new Date(), new Date(date.getTime())).years;
    }
}
export default Me;