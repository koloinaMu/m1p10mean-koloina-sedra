import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http: HttpClient) { }

  insert(utilisateur) {
    //console.log("INSERT essai");
    return this.http.post(baseUrl+'inscription',utilisateur,{responseType:'text'});
  }

  connecter(utilisateur) {
    console.log(utilisateur);
    return this.http.post(baseUrl+'connexion',utilisateur,{responseType:'text'});
  }
}
