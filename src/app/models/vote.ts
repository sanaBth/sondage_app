export class Vote {
  _id:string;
    titre:string;
    
    description:string;
    oui:string;
    non:string;
    pourcentoui : number;
    pourcentnon : number;
    constructor(_id:string,titre :string,description : string,oui:string,non:string,pourcentoui : number,pourcentnon : number)
    {
      this.pourcentoui =pourcentoui;
      this.pourcentnon=pourcentnon;
           this._id=_id;
        this.titre=titre;
        this.description=description;
        this.oui=oui;
      this.non =non  
     }
}