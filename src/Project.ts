import { 
    ProjectTypeC, ProjectTypeCSharp, 
    ProjectTypeEJS, ProjectTypeJavaScript, 
    ProjectTypeReactJS, 
    ProjectTypeTypeScript, ProjectTypeVueJS, 
    ProjectTypeWebsite, ProjectTypeXML 
} from './ProjectOptions';

export interface IProgrammingLanguage {
    "C#": ProjectTypeCSharp,
    "CSharp": ProjectTypeCSharp,
    "JavaScript": ProjectTypeJavaScript,
    "TypeScript": ProjectTypeTypeScript,
    "Website": ProjectTypeWebsite,
    "React.js": ProjectTypeReactJS,
    "Vue.js": ProjectTypeVueJS,
    "EJS": ProjectTypeEJS,
    "XML": ProjectTypeXML,
    "C": ProjectTypeC
}
type ProgrammingLanguage = keyof IProgrammingLanguage;
export { ProgrammingLanguage };

import Collab from './Utils/Collab';
import DanhoDate from './Utils/DanhoDate'
import MongoItem from './Utils/MongoItem';

export interface IDescription {
    Dansk: string[],
    English: string[]
}

export interface IProject<Language extends keyof IProgrammingLanguage> {
    language: Language,
    projectType: IProgrammingLanguage[Language],
    createdAt: DanhoDate,
    description: IDescription,
    display?: boolean,

    image?: string,
    link?: string,
    spareTime?: boolean,
    collab?: Collab,
}

export class Project<Language extends keyof IProgrammingLanguage = keyof IProgrammingLanguage> extends MongoItem {
    constructor(name: string, props: IProject<Language>) {
        super();
        const { 
            language, projectType, createdAt, 
            description, display, image, link,
            spareTime, collab,
        } = props;
        
        this.name = name;
        this.language = language;
        this.projectType = projectType;
        this.createdAt = createdAt;
        this.image = image;
        this.description = description;
        this.display = display === false ? false : true;
        
        this.link = link
        this.spareTime = spareTime;

        this.collab = collab && new Collab(collab.github, collab.repo);
        if (collab !== null && collab !== undefined) {
            this.link = this.collab.repoLink;
        }
    }

    public name: string;
    public description: IDescription;
    public language: keyof IProgrammingLanguage;
    public projectType: IProgrammingLanguage[keyof IProgrammingLanguage];
    public createdAt: DanhoDate;
    public link: string;
    public image: string;
    public display: boolean;
    public spareTime: boolean;
    public collab: Collab;

    public toString() {
        return this.name;
    }
}

export default Project;