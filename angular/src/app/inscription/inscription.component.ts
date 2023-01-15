import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../objets/utilisateur';
import {UtilisateurService} from '../services/utilisateur/utilisateur.service';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  options:string[];
  selectedOption:string;
  utilisateur:Utilisateur;

  constructor(
    private router: Router,
    private utilisateurService:UtilisateurService) {    
  }

  ngOnInit(): void {
    this.options = [
       'Rouge',
       'Noir',
       'Gris',
       'Blanc'
    ];
    this.selectedOption = 'Couleur';
    console.log(this.selectedOption);
    this.utilisateur={
      id:'',
      nom:'',
      prenom:'',
      mail:'',
      mdp:'',
      voiture:{
        id:'',
        immatriculation:'',
        couleur:''
      },
    }
  }

  selectCouleur(couleur){
    this.selectedOption=couleur;
    this.utilisateur.voiture.couleur=couleur;
  }

  inscrire(){
    console.log(this.utilisateur);
    this.utilisateurService.insert(this.utilisateur).subscribe(
      (response: any) =>{
       // console.log("REUSSI");
       // console.log(response);       
       this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    ); 
  }

}
