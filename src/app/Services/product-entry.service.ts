/*
   Author:	
   Description: For product Entry
   LastUpdate:on 18-12-23 by nita for VAPT
*/

import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductEntryService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }


  GetProductConfigFormPageWithNewDbStructure(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "ProductConfig/ProductConfigFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

   getMachineList(SessionToken: string, UserTypeId: string, UserName: string) {
    
    this.heroesUrl = this.apiURL + "CRUDAPI/GetMachineDropdown";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
   }

   InsertUpdateProductEntryFormValueInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,Id:number,ProductName:string,CycleTime:string,DownTimeSetPoint:string,DownTimeDelay:string,ProductCode:string,UniqueID:string) 
  {  
    this.heroesUrl = this.apiURL +"ProductConfig/ProductConfigInsertUpdateCommonTableFormValueInfoWithNewDbStructure?TableName="+TableName+"&Id=" + Id + "&ProductName="+ProductName+"&CycleTime="+CycleTime+"&DownTimeSetPoint="+DownTimeSetPoint+"&DownTimeDelay="+DownTimeDelay+"&ProductCode="+ProductCode+"&UniqueID="+UniqueID;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetProductEntryViewRecordsWithNewDbStructure(SessionToken: string, UserTypeIdTemp: string, User_Name: string,TableName:string)
  {
    this.heroesUrl = this.apiURL + "ProductConfig/GetProductEntryViewRecordsWithNewDbStructure?TableName="+TableName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', User_Name);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  DeleteProductConfig(SessionToken: string, UserTypeIdTemp: string, User_Name: string,TableName:string,Id:number,UniqueID:string)
  {
    this.heroesUrl = this.apiURL + "ProductConfig/DeleteProductConfig?TableName="+TableName+"&Id="+Id+"&UniqueID="+UniqueID;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', User_Name);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.delete(this.heroesUrl, {headers: headers});
  }

}