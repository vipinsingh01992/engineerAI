import { Component, OnInit } from '@angular/core';
import { EngineerAIService } from './engineer-ai.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;
  originalData: any;
  searchText: string;
  rowData: any;
  modalRef: BsModalRef;
  counter: any = 0;
  pollTime = 10000;
  constructor(
    private engineerAIService: EngineerAIService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getPollingData();
  }

  getPollingData() {
    interval(this.pollTime)
      .pipe(switchMap(() => this.engineerAIService.getData()))
      .subscribe(result => {
        this.counter++;
        this.originalData = result;
        this.search();
      });
  }

  search() {
    if (this.searchText && this.searchText.length > 0) {
      this.data = this.originalData.hits.filter(
        x => x.title.toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0
      );
    } else {
      this.data = this.originalData.hits;
    }
  }

  rowClick(template) {
    this.modalRef = this.modalService.show(template);
  }
}
