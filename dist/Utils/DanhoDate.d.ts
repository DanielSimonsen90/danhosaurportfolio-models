export declare class DanhoDate {
    constructor(year: number, month: number, day: number);
    day: number;
    month: number;
    year: number;
    getTime(): number;
    toString(seperator?: string, yearSeperator?: string): string;
    toStringReverse(): string;
    toJSON(): {
        day: number;
        month: number;
        year: number;
    };
}
export default DanhoDate;
