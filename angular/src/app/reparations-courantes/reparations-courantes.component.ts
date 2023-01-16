import { Component, OnInit } from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import {VoitureService} from '../services/voiture/voiture.service';


@Component({
  selector: 'app-reparations-courantes',
  templateUrl: './reparations-courantes.component.html',
  styleUrls: ['./reparations-courantes.component.scss']
})
export class ReparationsCourantesComponent implements OnInit {

  user:any;
  depots:any;

  constructor(
    private localStorage:LocalStorageService,
    private voitureService:VoitureService
    ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("utilisateur"));
    this.voitureService.getReparationsCourantesUtilisateur(this.user).subscribe(
      (response: any) =>{
       console.log(response); 
       this.depots=response; 
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

}
