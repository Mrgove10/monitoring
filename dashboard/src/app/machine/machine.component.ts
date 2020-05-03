import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data/data.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  public pageid: string;
  public lastValForMachine: any;
  public lastValForMachineString: String;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) { }


  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.pageid = params.id;
    });

    let CurrentLoadChart = c3.generate({
      bindto: '#CurrentLoadChart',
      data: {
        columns: [
          ['Current Load', 0]
        ],
        type: 'gauge',
      }
    });

    let AllCpuLoadChart = c3.generate({
      bindto: '#AllCpuLoadChart',
      data: {
        columns: [],
        type: 'gauge',
      }
    });

    setInterval(() => {
      if (this.data.lastValues.has(this.pageid)) {
        this.lastValForMachine = this.data.GetlastvaluesForUUID(this.pageid); //Get the values from the service
        if (this.lastValForMachine !== null) {
          this.lastValForMachineString = JSON.stringify(this.lastValForMachine); // treansform it into a string
          
          // Charts
          // Current load chat
          CurrentLoadChart.load({
            columns: [['Current Load', this.lastValForMachine.data.load.currentload.toFixed(2)]]
          });

          // Current load for all Cpu
         /* let tab :any[any];
          tab = [];
          for (let i = 0; i < this.lastValForMachine.data.cpuspeed.cores.length; i++) {
            const element = this.lastValForMachine.data.cpuspeed.cores[i];
            const str = 'Current Load ' + i;
            tab.push([str, element]);
            console.log(tab);
          }
          AllCpuLoadChart.load({
            columns: [tab]
          });*/
        }
      }
    }, 1000);

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
