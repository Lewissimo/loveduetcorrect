export type intro = {
    logo: string;
    portrait: string;
  };
  
  export type eventsType = {
    id:string;
    name: string;
    date: string;
    path: string;
    place: string
    order: number;
  };
  
  export type offerType = {
    id:string;
    photoPath: string;
    pathPDF: string;
  };
  
  export type aboutType = {
    id:string;
    name: string;
    introText: string;
    details: string[];
  };
  
  export type artistsType = {
    id:string;
    name: string;
    intro:string;
    role: string;
    order:number;
    photo: string;
    description: string;
  };
  
  export type galeryType = {
    id:string;
    name: string;
    paths: string[];
  };
  
  export type moviesType = {
    paths: string[];
  };
  
  export type contactType = {
    id:string
    name: string;
    phone: string;
    mail: string;
    fbPath: string;
    photo: string;
    order:number;
  };