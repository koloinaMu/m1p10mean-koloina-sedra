import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  voiture={
    immatriculation:'',
    couleur:''
  };
  options:string[];
  depots:any[];

  constructor(
    private voitureService:VoitureService
  ) { }

  ngOnInit(): void {
    this.options = [
       'Couleur',
       'Rouge',
       'Noir',
       'Gris',
       'Blanc'
    ];
  }

  rechercher(){
    console.log(this.voiture);
    this.voitureService.rechercherDepotVoiture(this.voiture).subscribe(
      (response: any) =>{
       //console.log(response); 
       this.depots=response; 
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
