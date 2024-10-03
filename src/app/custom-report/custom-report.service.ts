/*
   Author:	Nita
   Description: For Custom Report (Production,Performance,Alarm,CBM,Utilization,UtilitySummary) 
   LastUpdate:on 20-11-23 by nita
*/

import { Injectable } from '@angular/core';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CustomReportService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  //pageload
  CheckUserHasPermissionForPageUrl(SessionToken: string, UserTypeId: string, UserName: string) {
    this.heroesUrl = this.apiURL + "CustomeReport/CheckUserHasPermissionForPageUrl";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  //dropdown
  GetActiveReportList(SessionToken: string, UserTypeId: string, UserName: string, TableName: string) {
    this.heroesUrl = this.apiURL + "CustomeReport/GetActiveReportList?TableName=" + TableName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  //selectionChange
  GetMachineListByReportType(SessionToken: string, UserTypeId: string, UserName: string, ReportId: string) {
    this.heroesUrl = this.apiURL + "CustomeReport/GetMachineListByReportType?ReportId=" + ReportId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  //onbtnclick
  GetCustomeReport(SessionToken: string, UserTypeId: string, UserName: string, Interval: String = "", Machine: String = "", ReportType: String = "", FromDate: String = "", ToDate: String = "", PdfStatus: String = "") {
    this.heroesUrl = this.apiURL + "CustomeReport/GetCustomeReport?Interval=" + Interval + "&Machine=" + Machine + "&ReportType=" + ReportType + "&FromDate=" + FromDate + "&ToDate=" + ToDate + "&PdfStatus=" + PdfStatus;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

}