import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  test : Date = new Date();
  focus;
  focus1;
  focus2;
  constructor() { }

  ngOnInit(): void {
  }

}
