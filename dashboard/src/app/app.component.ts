import { Component, OnInit } from '@angular/core';


declare var mqtt: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  lastvalues: any[] = [];

  ngOnInit() {
    console.log('Starting app');

    const client = mqtt.connect('mqtt://test.mosquitto.org:8080');

    client.on('connect', () => {
      client.subscribe('2399ce45-7651-45a6-acaf-f8c5ca71180a', (err) => {
      });
    });

    client.on('message', (topic, message) => {
      console.log(message.toString());
      if (message.length > 0) {
        let data = JSON.parse(message.toString());
        this.addLastValuesForMachine(data.hostname, data);
      }
    });
  }

  addLastValuesForMachine(hostname, data) {
    let found = false;
    let foundIndex = -1;
    for (var i = 0; i < this.lastvalues.length; i++) {
      if (this.lastvalues[i].hostname === hostname) {
        found = true;
        foundIndex = i;
        break;
      }
    }

    if (found === true && foundIndex > -1) {//there is already a value for thes machine so replace it
      this.lastvalues[i] = data
    } else { // this is an unkon machine 
      console.log("New machine joined : " + hostname);
      this.lastvalues.push(data);
    }
  }
}