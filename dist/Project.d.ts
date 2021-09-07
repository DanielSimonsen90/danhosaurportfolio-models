/// <reference types="node" />
import { ProjectTypeC, ProjectTypeCSharp, ProjectTypeEJS, ProjectTypeJavaScript, ProjectTypeReactJS, ProjectTypeTypeScript, ProjectTypeVueJS, ProjectTypeWebsite, ProjectTypeXML } from './ProjectOptions';
export interface IProgrammingLanguage {
    "C#": ProjectTypeCSharp;
    "CSharp": ProjectTypeCSharp;
    "JavaScript": ProjectTypeJavaScript;
    "TypeScript": ProjectTypeTypeScript;
    "Website": ProjectTypeWebsite;
    "React.js": ProjectTypeReactJS;
    "Vue.js": ProjectTypeVueJS;
    "EJS": ProjectTypeEJS;
    "XML": ProjectTypeXML;
    "C": ProjectTypeC;
}
declare type ProgrammingLanguage = keyof IProgrammingLanguage;
export { ProgrammingLanguage };
import Collab from './Utils/Collab';
import DanhoDate from './Utils/DanhoDate';
interface IDescription {
    Dansk: string[];
    English: string[];
}
interface IProject<Language extends keyof IProgrammingLanguage> {
    language: Language;
    projectType: IProgrammingLanguage[Language];
    createdAt: DanhoDate;
    description: IDescription;
    display?: boolean;
    image?: Buffer;
    hasLink?: boolean;
    baseLink?: string;
    spareTime?: boolean;
    collab?: Collab;
}
export default class Project<Language extends keyof IProgrammingLanguage = keyof IProgrammingLanguage> {
    constructor(name: string, props: IProject<Language>);
    _id: number;
    name: string;
    description: IDescription;
    language: keyof IProgrammingLanguage;
    projectType: IProgrammingLanguage[keyof IProgrammingLanguage];
    createdAt: DanhoDate;
    link: string;
    image: Buffer;
    display: boolean;
    spareTime: boolean;
    collab: Collab;
    toString(): string;
}
