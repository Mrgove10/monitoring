import { Injectable } from '@angular/core';

declare var mqtt: any;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public lastValues: Map<string, string> = new Map<string, string>();

  public init() {
    console.log('[DATA] Started');
    const client = mqtt.connect('mqtt://test.mosquitto.org:8080');

    client.on('connect', () => {
      client.subscribe('2399ce45-7651-45a6-acaf-f8c5ca71180a', (err) => {
        if (!err) {
          console.log('[DATA] Connected To Broker');
        }
      });
    });

    client.on('message', (topic, message) => {
      if (message.length > 0) {
        let data = JSON.parse(message.toString());
        this.addLastValuesForMachine(data.uuid, data);
      }
    });

  }

  /**
   * Returns the latest value for the given UUID
   */
  public GetlastvaluesForUUID(uuid: string) {
    return this.lastValues.get(uuid);
  }

  public GetAllGeoIP() {
    let tmp = [];
    this.lastValues.forEach((element:any)=>{
      if (element.geoIP !== null) {
        tmp.push({
          ip: element.uuid,
          geoIP: element.geoIP
        });
      }
    })
    return tmp;
  }

  private addLastValuesForMachine(uuid: string, data) {
    if (!this.lastValues.has(uuid)) {
      console.log('[DATA] New machine joined : ' + data.hostname);
    }
    this.lastValues.set(uuid, data);
  }
}
