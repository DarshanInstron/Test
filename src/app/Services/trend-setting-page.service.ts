import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class TrendSettingPageService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;
  constructor(private _httpClient: HttpClient) { }

  CheckUserHasPermissionForPageUrl(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/TrendSettingFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  GettrendFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/TrendFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  GetTrendSettingInfoList(SessionToken: string, UserTypeId: string, UserName: string, TableName: string) {
   this.heroesUrl = this.apiURL + "TrendAndAPIs/GetTrendSettingTableRecordsListWithNewDbStructure?TableName="+TableName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  InsertUpdateTrendSettingInfo(SessionToken: string, UserTypeId: string, UserName: string,TableName: string, Id: number, HeaderFontSize: string, HeaderFontColor: string, RefreshRate: string, LiveTrendTime: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/InsertUpdateTrendSettingInfo?TableName="+TableName+"&Id=" + Id + "&HeaderFontSize=" + HeaderFontSize + "&HeaderFontColor=" + HeaderFontColor + "&RefreshRate=" + RefreshRate + "&LiveTrendTime=" + LiveTrendTime;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  
}