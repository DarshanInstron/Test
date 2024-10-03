/*
    Author:Nita
    Description: For standerd losses entry
    LastUpdate:on 18-12-23 by nita
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class StandardLossesEntryService {

  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }
  
  GetStandardLossesEntryFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "LossesEntry/StandardLossesEntryFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  GetStdLossGroupInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,OEEParameterId:number)
  {
    this.heroesUrl = this.apiURL + "LossesEntry/getLossGroupInfoBySelectedId?TableName="+TableName+"&SelectedOption="+OEEParameterId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  InsertUpdateStandardLossesEntryFormValueInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,selectedLossType:string,Id:number,OEEParameterId:number,StdLossGroup:string,StdLossGroupId:number,SubGroup:string,Abbreviation:string) 
  {  
    this.heroesUrl = this.apiURL +"LossesEntry/InsertUpdatestandardLossesEntryFormValueInfoWithNewDbStructure?TableName="+TableName+"&selectedLossType="+selectedLossType+"&Id="+Id+"&OEEParameterId="+OEEParameterId+"&StdLossGroup="+StdLossGroup+"&StdLossGroupId="+StdLossGroupId+"&SubGroup="+SubGroup+"&Abbreviation="+Abbreviation;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

}