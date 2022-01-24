export class Item {
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    public name: string;
    public description: string;

    public toString() {
        return this.name;
    }
}
export default Item;