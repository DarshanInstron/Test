import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDashboardService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;
  private SigmaApisBaseURL = GlobalConstantsService.SigmaApisBaseURL;

  constructor(private _httpClient: HttpClient) { }

  GetscmDashboardFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "PurchaseDashboardAngApis/scmDashboardFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  GetPurchaseDashboardFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "PurchaseDashboardAngApis/PurchaseDashboardFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }
  
  Purchase_KPI_IOTToken() {
    this.heroesUrl = this.SigmaApisBaseURL + "Purchase_KPI_IOT/TokenAuth?userId=semco2023KPIIOT&secretKey=112233445566778&empCode=111111";
    return this._httpClient.post(this.heroesUrl, '');
  }
  Purchase_KPI_IOTInfoList(token: string) {
    this.heroesUrl = this.SigmaApisBaseURL + "Purchase_KPI_IOT/Purchase_KPI_IOT?branchplant=A2";
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this._httpClient.get(this.heroesUrl, { headers });
  }
  IOT_SCM_DashboardInfoByReportType(token: string,ReportType:string) {
    this.heroesUrl = this.SigmaApisBaseURL + "Purchase_KPI_IOT/IOT_SCM_Dashboard?ReportType="+ReportType;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this._httpClient.get(this.heroesUrl, { headers });
  }
  GetShortageDetailsReport(SessionToken: string, UserTypeId: string, UserName: string,filter: string){
    this.heroesUrl = this.apiURL + "CustomeReport/GetPurchaseShortageReportAsync?filter="+filter;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }
  GRN_RMS_DashboardByFilterName(token: string,FilterName:string) {
    this.heroesUrl = this.SigmaApisBaseURL + "Purchase_KPI_IOT/GRN_RMS_Dashboard?Name="+FilterName;
    //"Store_Primary_Location_Stock_Quantity,Gate_Entry_Quantity,Issue_Quantity_Till_Date_For_The_Month"
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this._httpClient.get(this.heroesUrl, { headers });
  }
}
