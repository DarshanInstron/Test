/* 
    Author:	Nita
    Description: For common entry settings
    LastUpdate:on 13-12-23 by nita
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class CommonEntryService {

  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  GetCommonEntryFormPage(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "CommonEntry/CommonEntryFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  InsertUpdateCommonEntryTableValueInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string, TableName: string, Id: number, CommonEntryTypeId: string, Description: string, Act: string, Abbreviation: string,) {
    this.heroesUrl = this.apiURL + "CommonEntry/InsertUpdateCommonEntryTableValueInfoWithNewDbStructure?TableName=" + TableName + "&Id=" + Id + "&CommonEntryTypeId=" + CommonEntryTypeId + "&Description=" + Description + "&Act=" + Act + "&Abbreviation=" + Abbreviation;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  
  GetTableNameInfoByCommonEntryTypeId(SessionToken: string, UserTypeIdTemp: string, UserName: string, TableName: string, CommonEntryTypeId: string) {
    this.heroesUrl = this.apiURL + "CommonEntry/GetTableNameInfoByCommonEntryTypeId?TableName=" + TableName + "&CommonEntryTypeId=" + CommonEntryTypeId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

}