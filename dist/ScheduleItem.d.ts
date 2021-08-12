import PlanLocation from "./Utils/PlanLocation";
import DanhoDate from "./Utils/DanhoDate";
export default class ScheduleItem {
    constructor(course: PlanLocation, start: DanhoDate, end: DanhoDate);
    private _start;
    private _end;
    private _course;
    get start(): DanhoDate;
    get end(): DanhoDate;
    get course(): PlanLocation;
}
