"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScheduleItem {
    constructor(course, start, end) {
        this._course = course;
        this._start = start;
        this._end = end;
    }
    get start() { return this._start; }
    get end() { return this._end; }
    get course() { return this._course; }
}
exports.default = ScheduleItem;
