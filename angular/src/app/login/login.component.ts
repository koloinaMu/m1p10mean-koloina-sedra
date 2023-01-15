import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Utilisateur} from '../objets/Utilisateur';
import {UtilisateurService} from '../services/utilisateur/utilisateur.service';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
  //providers:[UtilisateurService]
})
export class LoginComponent implements OnInit {

  utilisateur:Utilisateur={
    id:'',
    nom:'',
    prenom:'',
    mail:'',
    mdp:'',
    voiture:{
      id:'',
      immatriculation:'',
      couleur:''
    }
  };

  constructor(
    private router: Router,
    private utilisateurService:UtilisateurService,
    private localStorage:LocalStorageService
    ) { }

  ngOnInit(): void {
   // console.log("UTILISATEUR");
   // console.log(typeof this.utilisateur);
  }

  connecter(){
    this.utilisateurService.connecter(this.utilisateur).subscribe(
      (response: any) =>{
       // console.log("REUSSI");
       console.log(response);
       if(response!='null'){
         this.utilisateur.mdp='';
         localStorage.setItem('utilisateur', (response));
         this.router.navigate(['/dashboard']);
       }       
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    ); 
  }

}
