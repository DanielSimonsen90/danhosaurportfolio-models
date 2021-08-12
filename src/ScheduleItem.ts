import PlanLocation from "./Utils/PlanLocation";
import DanhoDate from "./Utils/DanhoDate";

export default class ScheduleItem {
    constructor(course: PlanLocation, start: DanhoDate, end: DanhoDate) {
        this._course = course;
        this._start = start;
        this._end = end;
    }

    private _start: DanhoDate;
    private _end: DanhoDate;
    private _course: PlanLocation;

    public get start() { return this._start }
    public get end() { return this._end }
    public get course() { return this._course }
}