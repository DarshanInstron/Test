/*
   Author:	Nita
   Description: For User credentials details
   LastUpdate:on 21-11-23 by nita for VAPT
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class CRUDFunctionsService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  //Dropdown
  GetDropdownListByTableName(SessionToken: string, UserTypeId: string, UserName: string, TableName: string) {
    this.heroesUrl = this.apiURL + "CRUDAPI/GetTableInfoForDropdownWithNewDbStructure?TableName=" + TableName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }    
  
   //DeleteTableRecordbyId
   DeleteTableRecordbyId(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,Id:number)
   {
     this.heroesUrl = this.apiURL + "CRUDAPI/DeleteTableRecordsWithNewDbStructure?TableName="+TableName+"&Id="+Id;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
     return this._httpClient.delete(this.heroesUrl, {headers: headers});
   }
     
  //Gridview
  GetTableRecordsListForGridView(SessionToken: string, UserTypeId: string, UserName: string,TableName:string)
  {
    this.heroesUrl = this.apiURL + "CRUDAPI/GetTableViewRecordsWithNewDbStructure?TableName="+TableName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  GetCommonEntryFormvalueInfo(SessionToken: string, UserTypeIdTemp: string, UserName: string, TableName: string) {
    this.heroesUrl = this.apiURL + "CRUDAPI/GetCommonEntryTableViewRecordsWithNewDbStructure?TableName=" + TableName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  GetLossesEntryGridViewInfoListbyType(SessionToken: string, UserTypeIdTemp: string, UserName: string,Type:string)
  {
    this.heroesUrl = this.apiURL + "CRUDAPI/GetLossesEntryGridViewInfoListbyType?Type="+Type;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

 
}