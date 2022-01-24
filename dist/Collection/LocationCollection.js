"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationCollection = void 0;
const ScheduleItem_1 = require("../ScheduleItem");
const DanhoDate_1 = require("../Utils/DanhoDate");
class LocationCollection extends Array {
    constructor() {
        super();
        const modules = new Array(new ScheduleItem_1.default("Grundforløb", new DanhoDate_1.default(2018, 8, 8), new DanhoDate_1.default(2019, 6, 28)), new ScheduleItem_1.default("Hovedforløb 1", new DanhoDate_1.default(2020, 1, 6), new DanhoDate_1.default(2020, 3, 13)), new ScheduleItem_1.default("Hovedforløb 2", new DanhoDate_1.default(2020, 8, 3), new DanhoDate_1.default(2020, 10, 9)), new ScheduleItem_1.default("Hovedforløb 3", new DanhoDate_1.default(2021, 4, 6), new DanhoDate_1.default(2021, 6, 18)), new ScheduleItem_1.default("Hovedforløb 4", new DanhoDate_1.default(2021, 10, 11), new DanhoDate_1.default(2021, 12, 17)), new ScheduleItem_1.default("Hovedforløb 5", new DanhoDate_1.default(2022, 9, 19), new DanhoDate_1.default(2022, 11, 25)), new ScheduleItem_1.default("Hovedforløb 6", new DanhoDate_1.default(2023, 11, 6), new DanhoDate_1.default(2023, 12, 8)));
        for (let i = 0; i < modules.length - 1; i++) {
            const module = modules[i];
            const start = new DanhoDate_1.default(module.end.year, module.end.month, module.end.day + 1);
            const end = new DanhoDate_1.default(modules[i + 1].start.year, modules[i + 1].start.month, modules[i + 1].start.day - 1);
            const skp = new ScheduleItem_1.default(`Skolepraktik ${i + 1}`, start, end);
            this.push(module, skp);
        }
        this.push(modules[modules.length - 1]);
    }
    getLocationFrom(timestamp) {
        for (const item of this) {
            if (item.start.getTime() > timestamp)
                return this[this.indexOf(item) - 1].course;
        }
        return 'Fritid';
    }
    whereAmI() {
        return this.getLocationFrom(Date.now());
    }
}
exports.LocationCollection = LocationCollection;
exports.default = LocationCollection;
