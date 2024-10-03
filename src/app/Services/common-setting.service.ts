import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class CommonSettingService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;
  constructor(private _httpClient: HttpClient) { }

  CheckUserHasPermissionForPageUrl(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "CommonSetting/CommonSettingFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  GetCommonSettingInfoList(SessionToken: string, UserTypeId: string, UserName: string, TableName: string) {
   this.heroesUrl = this.apiURL + "CommonSetting/GetCommonSettingTableRecordsListWithNewDbStructure?TableName="+TableName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  InsertUpdateCommonSettingInfo(SessionToken: string, UserTypeId: string, UserName: string,TableName: string, Id: number, DashboardUpdateTime: string, SliderTime: string, EmsCardRefreshRate: string, EmsTrendRefreshRate: string, TokenExpiryTime: string, CountDownTime: string, StealthQuotient_UserQuantum:string, SecureCipher_DualAuth:string, SCMDashboardUpdateTime:string) {
    this.heroesUrl = this.apiURL + "CommonSetting/InsertUpdateCommonSettingInfo?TableName="+TableName+"&Id=" + Id + "&DashboardUpdateTime=" + DashboardUpdateTime + "&SliderTime=" + SliderTime + "&EmsCardRefreshRate=" + EmsCardRefreshRate + "&EmsTrendRefreshRate=" + EmsTrendRefreshRate + 
    "&TokenExpiryTime=" + TokenExpiryTime + "&CountDownTime=" + CountDownTime + "&StealthQuotient_UserQuantum=" + StealthQuotient_UserQuantum + "&SecureCipher_DualAuth=" + SecureCipher_DualAuth + "&SCMDashboardUpdateTime=" + SCMDashboardUpdateTime;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
}
