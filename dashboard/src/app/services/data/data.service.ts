import { Injectable } from '@angular/core';

declare var mqtt: any;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public lastValues: Map<string, string> = new Map<string, string>();

  public init() {
    console.log("starting daata Service")
    const client = mqtt.connect('mqtt://test.mosquitto.org:8080');

    client.on('connect', () => {
      client.subscribe('2399ce45-7651-45a6-acaf-f8c5ca71180a', (err) => {
      });
    });

    client.on('message', (topic, message) => {
      if (message.length > 0) {
        let data = JSON.parse(message.toString());
        this.addLastValuesForMachine(data.uuid, data);
      }
    });

  }

  public GetlastvaluesForUUID(uuid: string) {
    return this.lastValues.get(uuid);
  }

  private addLastValuesForMachine(uuid: string, data) {
    if (!this.lastValues.has(uuid)) {
      console.log('New machine joined : ' + data.hostname);
    }
    this.lastValues.set(uuid, data);
  }
}
