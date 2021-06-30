import { Injectable } from '@angular/core';
import { API_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})

export class ReportService {
  constructor(private http: HttpClient) {}

  getReports() {
    return this.http.get<Report[]>(API_URL + '/data_reports');
  }
}

