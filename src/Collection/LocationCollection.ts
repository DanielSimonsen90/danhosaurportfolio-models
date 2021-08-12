import ScheduleItem from "../ScheduleItem";
import PlanLocation from "../Utils/PlanLocation";
import DanhoDate from '../Utils/DanhoDate'

export default class LocationCollection extends Array<ScheduleItem> {
    public constructSKP() {
        const result = new LocationCollection(this[0]);

        for (let i = 1; i < this.length; i++) {
            const item = this[i];
            const preItem = this[i - 1];

            const start = new DanhoDate(preItem.end.year, preItem.end.month, preItem.end.day + 1);
            const end = new DanhoDate(item.start.year, item.start.month, item.start.day - 1);
            const skp = new ScheduleItem(`Skolepraktik ${i}` as PlanLocation, start, end);

            result.push(skp, item);
        }

        return result;
    }
    public getLocationFrom(timestamp: number): PlanLocation {
        let previous = -1;
        for (const item of this) {
            if (item.start.getTime() > timestamp)
                return this[previous].course;
            previous = this.indexOf(item);
        }

        return 'Fritid';
    }
    public whereAmI() {
        return this.getLocationFrom(new Date().getTime());
    }
}