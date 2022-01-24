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
import MongoItem from './Utils/MongoItem';
export interface IDescription {
    Dansk: string[];
    English: string[];
}
export interface IProject<Language extends keyof IProgrammingLanguage> {
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
export declare class Project<Language extends keyof IProgrammingLanguage = keyof IProgrammingLanguage> extends MongoItem {
    constructor(name: string, props: IProject<Language>);
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
export default Project;
