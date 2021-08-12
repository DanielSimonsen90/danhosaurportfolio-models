export default class DanhoDate {
    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public day: number;
    public month: number;
    public year: number;

    public getTime() {
        const { year, month, day } = this;
        return new Date(year, month - 1, day).getTime();
    }

    public toString(seperator = '/', yearSeperator = '/') {
        const { year, month, day } = this;
        return [day, month, year].join(seperator).replace(new RegExp(seperator + '$'), yearSeperator);
    }
    public toStringReverse() {
        const seperator = '-';
        return this.toString(seperator)
            .split(seperator)
            .reverse()
            .map(s => s.length == 1 ? `0${s}` : s)
            .join(seperator);
        
    }
    public toJSON() {
        return {
            day: this.day,
            month: this.month,
            year: this.year,
        }
    }
}