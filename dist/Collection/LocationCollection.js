"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleItem_1 = require("../ScheduleItem");
const DanhoDate_1 = require("../Utils/DanhoDate");
class LocationCollection extends Array {
    constructSKP() {
        const result = new LocationCollection(this[0]);
        for (let i = 1; i < this.length; i++) {
            const item = this[i];
            const preItem = this[i - 1];
            const start = new DanhoDate_1.default(preItem.end.year, preItem.end.month, preItem.end.day + 1);
            const end = new DanhoDate_1.default(item.start.year, item.start.month, item.start.day - 1);
            const skp = new ScheduleItem_1.default(`Skolepraktik ${i}`, start, end);
            result.push(skp, item);
        }
        return result;
    }
    getLocationFrom(timestamp) {
        let previous = -1;
        for (const item of this) {
            if (item.start.getTime() > timestamp)
                return this[previous].course;
            previous = this.indexOf(item);
        }
        return 'Fritid';
    }
    whereAmI() {
        return this.getLocationFrom(new Date().getTime());
    }
}
exports.default = LocationCollection;
