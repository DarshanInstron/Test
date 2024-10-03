import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class GeneralSettingInfo {
  public Id: string = "";
  public ProductDashRefreshRate: string = "";
  public ProdDashSliderRefreshRate:string="";
}

@Injectable({
  providedIn: 'root'
})
export class GeneralsettingService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }
  
  getGeneralSettingInfoTableRecordsListWithNewDbStructure(SessionToken: string, UserTypeId: string, UserName: string, TableName: string,IsWithValidity:string) {
    this.heroesUrl = this.apiURL + "GeneralSettingAngApis/getGeneralSettingInfoTableRecordsListWithNewDbStructure?TableName="+TableName+"&IsWithValidity="+IsWithValidity;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId.toString());
     return this._httpClient.post(this.heroesUrl,'', { headers: headers });
   }
}
