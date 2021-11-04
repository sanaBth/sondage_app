export class Vote {
  _id:string;
    titre:string;
    
    description:string;
    oui:string;
    non:string;
  
    constructor(_id:string,titre :string,description : string,oui:string,non:string)
    {
      this._id=_id;
        this.titre=titre;
        this.description=description;
        this.oui=oui;
      this.non =non  
     }
}