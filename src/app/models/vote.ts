export class Vote {
  _id:string;
    titre:string;
    
    description:string;
    oui:number;
    non:number;
    
    constructor(_id:string,titre :string,description : string,oui:number,non:number)
    {
           this._id=_id;
        this.titre=titre;
        this.description=description;
        this.oui=oui;
      this.non =non  
     }
}