"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DanhoDate {
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    getTime() {
        const { year, month, day } = this;
        return new Date(year, month - 1, day).getTime();
    }
    toString(seperator = '/', yearSeperator = '/') {
        const { year, month, day } = this;
        return [day, month, year].join(seperator).replace(new RegExp(seperator + '$'), yearSeperator);
    }
    toStringReverse() {
        const seperator = '-';
        return this.toString(seperator)
            .split(seperator)
            .reverse()
            .map(s => s.length == 1 ? `0${s}` : s)
            .join(seperator);
    }
    toJSON() {
        return {
            day: this.day,
            month: this.month,
            year: this.year,
        };
    }
}
exports.default = DanhoDate;
