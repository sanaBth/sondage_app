export class Vote {
    titre:string;
    
    description:string;
    choix:string;
  
  
    constructor(titre :string,description : string,choix:string)
    {
        this.titre=titre;
        this.description=description;
        this.choix=choix;
      
    }
}