import PlanLocation from "./Utils/PlanLocation";
import DanhoDate from "./Utils/DanhoDate";
import { TimeSpan } from 'danholibraryjs';
export declare class ScheduleItem {
    constructor(course: PlanLocation, start: DanhoDate, end: DanhoDate);
    private _start;
    private _end;
    private _course;
    get start(): DanhoDate;
    get end(): DanhoDate;
    get course(): PlanLocation;
    get duration(): TimeSpan;
}
export default ScheduleItem;
