import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  images = [
    'assets/img/bgslides/1.jpg',
    'assets/img/bgslides/2.jpg',
    'assets/img/bgslides/3.jpg'
  ];

  constructor() { }

  ngOnInit() {
  }

}
