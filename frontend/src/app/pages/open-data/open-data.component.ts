import { Component, OnInit } from '@angular/core';
import { Report } from '../../models/report.model';
import { ReportService } from '../../services/reports.service';

@Component({
  selector: 'app-open-data',
  templateUrl: './open-data.component.html',
  styleUrls: ['./open-data.component.sass']
})
export class OpenDataComponent implements OnInit {
  reports: Report[] = [];
  openedAccordion: number = -1;
   constructor(private reportService: ReportService) {
     this.reportService.getReports()
     .subscribe((reports: Report[]) => {
       this.reports = reports
     });
   }

   ngOnInit() {}

  closeAllAccordion(id) {
    if (this.openedAccordion === id) {
      this.openedAccordion = -1;
    } else {
      this.openedAccordion = id;
    }
  }
}
