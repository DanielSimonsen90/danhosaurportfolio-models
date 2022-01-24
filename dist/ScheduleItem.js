"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleItem = void 0;
const danholibraryjs_1 = require("danholibraryjs");
class ScheduleItem {
    constructor(course, start, end) {
        this._course = course;
        this._start = start;
        this._end = end;
    }
    get start() { return this._start; }
    get end() { return this._end; }
    get course() { return this._course; }
    get duration() { return new danholibraryjs_1.TimeSpan(this.start.getTime(), this.end.getTime()); }
}
exports.ScheduleItem = ScheduleItem;
exports.default = ScheduleItem;
