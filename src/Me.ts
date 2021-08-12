import Project from "./Project";
import Item from "./Utils/Item";
import LocationCollection from "./Collection/LocationCollection";
import ProjectCollection from './Collection/ProjectCollection';
import PlanLocation from "./Utils/PlanLocation";
import IContact from "./IContact";
import DanhoDate from './Utils/DanhoDate';

export default class Me {
    constructor(locationCollection: LocationCollection, contact: IContact, projects: ProjectCollection) {
        this.occupation = locationCollection.whereAmI();
        this.contact = contact;
        this.projects = projects;
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
        return new Date().getFullYear() - date.year;
    }
}