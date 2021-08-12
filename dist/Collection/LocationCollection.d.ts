import ScheduleItem from "../ScheduleItem";
import PlanLocation from "../Utils/PlanLocation";
export default class LocationCollection extends Array<ScheduleItem> {
    constructSKP(): LocationCollection;
    getLocationFrom(timestamp: number): PlanLocation;
    whereAmI(): PlanLocation;
}
