import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class TrendserviceService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  GetTrendParamInfoByParamIdsNew(SessionToken: string, UserTypeIdTemp: string, UserName: string, FromDateTime: string, ToDateTime: string, StrTrendParam: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/GetTrendParamInfoByParamIdsNew?FromDateTime=" + FromDateTime + "&ToDateTime=" + ToDateTime + "&ParameterIds=" + StrTrendParam;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetTrendParamInfoByParamIdsForExcel(SessionToken: string, UserTypeIdTemp: string, UserName: string, FromDateTime: string, ToDateTime: string, StrTrendParam: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/GetTrendParamInfoByParamIdsForExcel?FromDateTime=" + FromDateTime + "&ToDateTime=" + ToDateTime + "&ParameterIds=" + StrTrendParam;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetTrendParamInfoByFromnToDates(SessionToken: string, UserTypeIdTemp: string, UserName: string, FromDateTime: string, ToDateTime: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/GetTrendParamInfoByFromnToDates?FromDateTime=" + FromDateTime + "&ToDateTime=" + ToDateTime;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  ReadtextfileByusingSpecificPath(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/ReadtextfileByusingSpecificPath";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetSystemHealthPage(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/GetSystemHealthPage";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetPLCHealthStatus(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/GetPLCStatusInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  ReadtextfileByusingBatch(SessionToken: string, UserTypeIdTemp: string, UserName: string, PathNo: number,
    ForPathDate: string, MainPathUrl: string, SubPathUrl: string, StartLineOn: number, EndLineNo: number) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/ReadtextfileByusingBatch?PathNo=" + PathNo
      + "&ForPathDate=" + ForPathDate + "&MainPathUrl=" + MainPathUrl + "&SubPathUrl=" + SubPathUrl
      + "&StartLineOn=" + StartLineOn + "&EndLineNo=" + EndLineNo;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetTrendParamInfoByParamIdsFromToDateTimeForEmsDashboard(SessionToken: string, UserTypeIdTemp: string, UserName: string, FromDateTime: string, ToDateTime: string, StrTrendParam: string) {
    this.heroesUrl = this.apiURL + "EmsDashboardAngApis/GetTrendParamInfoByParamIdsFromToDateTimeForEmsDashboard?FromDateTime=" + FromDateTime + "&ToDateTime=" + ToDateTime + "&ParameterIds=" + StrTrendParam;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
}