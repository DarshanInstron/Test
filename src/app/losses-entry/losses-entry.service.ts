/*
   Author:	Nita
   Description: For losses Entry
   LastUpdate:on 18-12-23 by nita for VAPT
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class LossesEntryService {

  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }
  
  GetLossesEntryFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "LossesEntry/LossesEntryFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  

  GetDropdownListBySelectedId(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,SelectedId:number)
  {
    this.heroesUrl = this.apiURL + "LossesEntry/getLossGroupInfoBySelectedId?TableName="+TableName+"&SelectedOption="+SelectedId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  InsertUpdatelossesEntryFormValueInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,Id:number,OEEParameterId:number,StdLossGroupId:number,SubGroupId:number,Reason:string,Abbreviation:string) 
  {  
    this.heroesUrl = this.apiURL +"LossesEntry/InsertUpdatelossesEntryFormValueInfoWithNewDbStructure?TableName="+TableName+"&Id=" + Id + "&OEEParameterId="+OEEParameterId+"&StdLossGroupId="+StdLossGroupId+"&SubGroupId="+SubGroupId+"&Reason="+Reason+"&Abbreviation="+Abbreviation;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

 

  

}