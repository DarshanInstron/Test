import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalConstantsService } from 'src/app/Services/global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class PlantonHistoryReportService {
  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  CheckPlantonHistoryReportPagePermission(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "PressureTestReport1364/CheckPlantonHistoryReportPagePermission";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetSoNoInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "PressureTestReport1364/GetSoNoInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetJobNoInfoListBySoNo(SessionToken: string, UserTypeIdTemp: string, UserName: string, SoNo: number) {
    this.heroesUrl = this.apiURL + "PressureTestReport1364/GetJobNoInfoListBySoNo?SoNo="+SoNo;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetHistoryReportByTesTypeTestJobNoSoNonPdfStatus(SessionToken: string, UserTypeIdTemp: string, UserName: string, TestType: number, Test: number, JobNo: number, SoNo: number, PdfStatus: String) {
    this.heroesUrl = this.apiURL + "PressureTestReport1364/GetHistoryReportByTesTypeTestJobNoSoNonPdfStatus?TestType=" + TestType + "&Test=" + Test + "&JobNo=" + JobNo +
      "&SoNo=" + SoNo + "&PdfStatus" + PdfStatus;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
}