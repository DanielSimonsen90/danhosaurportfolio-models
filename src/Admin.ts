import MongoItem from "./Utils/MongoItem";

export class Admin extends MongoItem {
    constructor(public username: string) {
        super();
    }
}
export default Admin;