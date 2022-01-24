import ScheduleItem from "../ScheduleItem";
import PlanLocation from "../Utils/PlanLocation";
export declare class LocationCollection extends Array<ScheduleItem> {
    constructor();
    getLocationFrom(timestamp: number): PlanLocation;
    whereAmI(): PlanLocation;
}
export default LocationCollection;
