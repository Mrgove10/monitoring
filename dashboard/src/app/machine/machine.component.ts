import { Component, OnInit, OnDestroy,AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;

  public pageid: string;
  public lastValFormachine: any;

  constructor(
    private route: ActivatedRoute,
    private data: DataService
  ) { }


  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.pageid = params.id;
    });
    this.lastValFormachine = this.data.lastValues.get(this.pageid).toString();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
