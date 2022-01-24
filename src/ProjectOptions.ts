type ProjectOptionASPNetCore = 'ASP.Net Core';
type ProjectOptionConsole = 'Console';
type ProjectOptionLibrary = 'Library';
type ProjectOptionNodejs = 'Node.js';
type ProjectOptionWebsite = 'Website';
type ProjectOptionWindowsForms = 'Windows Forms';
type ProjectOptionWPF = 'WPF';
type ProjectOptionATmega = 'ATmega168';

export type ProjectTypeCSharp = 
    ProjectOptionASPNetCore | ProjectOptionConsole | 
    ProjectOptionLibrary | 
    ProjectOptionWindowsForms | ProjectOptionWPF;

export type ProjectTypeJavaScript = ProjectOptionNodejs | ProjectOptionWebsite | ProjectOptionConsole;
export type ProjectTypeTypeScript = ProjectOptionNodejs | ProjectOptionWebsite | ProjectOptionLibrary;
export type ProjectTypeWebsite = ProjectOptionNodejs | ProjectOptionWebsite | ProjectOptionASPNetCore;

export type ProjectTypeReactJS = ProjectOptionWebsite;
export type ProjectTypeVueJS = ProjectOptionWebsite;
export type ProjectTypeEJS = ProjectOptionWebsite;

export type ProjectTypeXML = ProjectTypeCSharp;
export type ProjectTypeC = ProjectOptionATmega;
export type ProjectTypePython = ProjectOptionConsole;