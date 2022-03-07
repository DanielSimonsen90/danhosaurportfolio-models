import LocationCollection from './Collection/LocationCollection';
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
    hasLink?: boolean,
    baseLink?: string,
    spareTime?: boolean,
    collab?: Collab,

    githubUsername: string
}

export class Project<Language extends keyof IProgrammingLanguage = keyof IProgrammingLanguage> extends MongoItem {
    constructor(name: string, props: IProject<Language>) {
        super();
        const { 
            language, projectType, createdAt, 
            description, display, image, 
            hasLink, baseLink, 
            spareTime, collab,
            githubUsername
        } = props;
        
        this.name = name;
        this.language = language;
        this.projectType = projectType;
        this.createdAt = createdAt;
        this.image = image;
        this.description = description;
        this.display = display === false ? false : true;
        
        this.baseLink = baseLink;

        this.link = this.setLink(hasLink, githubUsername);
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
    public baseLink: string;
    public image: string;
    public display: boolean;
    public spareTime: boolean;
    public collab: Collab;

    private setLink(hasLink: boolean, githubUsername) {
        if (!hasLink) return "No link";

        const githubLink = `https://github.com/${githubUsername}`;

        if (this.spareTime) return `${githubLink}/${this.name}`;
        
        const module = new LocationCollection().getLocationFrom(this.createdAt.getTime());
        const repo = (module as string).includes("Hovedforløb") ? 'Education' : 'SKP';
        const branch = repo == 'Education' ? 'master' : 'main';
        const folder = (
            repo === 'Education' ? module.toString().replaceAll('ø', '%C3%B8') + "/" : 
            repo === 'SKP' ? `Round ${module.toString().split(' ')[1]}/` : ""
            ) + this.baseLink ? `${this.baseLink}/` : "";
            
        // console.log({
        //     project: this,
        //     module, folder, repo, baseLink: this.baseLink
        // });
        return `${githubLink}/${repo}/tree/${branch}/${folder}${this.name}/`.replaceAll(' ', "%20");
    }

    public toString() {
        return this.name;
    }
}

export default Project;