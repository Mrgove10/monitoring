import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../services/data/data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    console.log('Starting app');

    var map = L.map('map', {
      worldCopyJump: true,
      center: [0, 0],
      zoom: 2,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map);
  }
}
