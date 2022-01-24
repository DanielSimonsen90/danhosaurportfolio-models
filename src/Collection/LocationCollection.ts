import ScheduleItem from "../ScheduleItem";
import PlanLocation from "../Utils/PlanLocation";
import DanhoDate from '../Utils/DanhoDate'

export class LocationCollection extends Array<ScheduleItem> {
    constructor() {
        super();
        const modules = new Array<ScheduleItem>(
            new ScheduleItem("Grundforløb", new DanhoDate(2018, 8, 8), new DanhoDate(2019, 6, 28)),
            new ScheduleItem("Hovedforløb 1", new DanhoDate(2020, 1, 6), new DanhoDate(2020, 3, 13)),
            new ScheduleItem("Hovedforløb 2", new DanhoDate(2020, 8, 3), new DanhoDate(2020, 10, 9)),
            new ScheduleItem("Hovedforløb 3", new DanhoDate(2021, 4, 6), new DanhoDate(2021, 6, 18)),
            new ScheduleItem("Hovedforløb 4", new DanhoDate(2021, 10, 11), new DanhoDate(2021, 12, 17)),
            new ScheduleItem("Hovedforløb 5", new DanhoDate(2022, 9, 19), new DanhoDate(2022, 11, 25)),
            new ScheduleItem("Hovedforløb 6", new DanhoDate(2023, 11, 6), new DanhoDate(2023, 12, 8))
        );

        for (let i = 0; i < modules.length - 1; i++) {
            const module = modules[i];

            const start = new DanhoDate(module.end.year, module.end.month, module.end.day + 1);
            const end = new DanhoDate(modules[i + 1].start.year, modules[i + 1].start.month, modules[i + 1].start.day - 1);
            const skp = new ScheduleItem(`Skolepraktik ${i + 1}` as PlanLocation, start, end);

            this.push(module, skp)
        }

        this.push(modules[modules.length - 1]);
    }

    public getLocationFrom(timestamp: number): PlanLocation {
        for (const item of this) {
            if (item.start.getTime() > timestamp)
                return this[this.indexOf(item) - 1].course;
        }

        return 'Fritid';
    }
    public whereAmI() {
        return this.getLocationFrom(Date.now());
    }
}
export default LocationCollection