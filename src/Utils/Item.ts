export class Item {
    constructor(name: string, description: Array<string>) {
        this.name = name;
        this.description = description;
    }

    public name: string;
    public description: Array<string>;

    public toString() {
        return this.name;
    }
}
export default Item;