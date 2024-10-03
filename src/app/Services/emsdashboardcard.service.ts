/*
  Author: Sumit
  Description: For EMS Dashboard
  LastUpdate:on 15-12-23 by nita
*/

import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmsdashboardcardService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }
  
  GetEmsdashboardcardFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "EmsDashboardAngApis/EmsDashboardFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }
  
  getEmsDashboardCardDetailsListByLevelIdSliderSequence(SessionToken: string, UserTypeIdTemp: string, UserName: string, LevelId: string) {
    this.heroesUrl = this.apiURL + "EmsDashboardAngApis/getEmsDashboardCardDetailsListByLevelIdSliderSequence?LevelId=" + LevelId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  
}