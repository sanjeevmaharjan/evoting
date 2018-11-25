import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [1, 2, 3].map((x) => `https://localhost:4200/assets/img/bgslides/${x}.jpg`);

  constructor() { }

  ngOnInit() {
  }

}
