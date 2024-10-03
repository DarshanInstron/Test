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
export class UserCredentialsService {

  //myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  //pageload
  CheckUserHasPermissionForPageUrl(SessionToken: string, UserTypeId: string, UserName: string) {
    this.heroesUrl = this.apiURL + "UserCredentials/CheckUserHasPermissionForPageUrl";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  } 

  //onbtnclick
  InsertUpdateUserCredentialsFormValueInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,Id:number,MailId:string,UserFullName:string,User_Name:string,password:string,UserTypeId:string,UserGroupId:string,EmployeeNo:string,MobileNo:string,UserDesignationId:string) 
  {  
    this.heroesUrl = this.apiURL +"UserCredentials/InsertUpdateUserCredentialsFormValueInfo?TableName="+TableName+"&Id="+Id+"&MailId="+MailId+"&UserFullName="+UserFullName+"&User_Name="+User_Name+"&password="+password+"&UserTypeId="+UserTypeId+"&UserGroupId="+UserGroupId+"&EmployeeNo="+EmployeeNo+"&MobileNo="+MobileNo+"&UserDesignationId="+UserDesignationId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  
  CheckPasswordIsValidOrNot(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,password: string) {
    this.heroesUrl = this.apiURL + "UserCredentials/CheckPasswordIsValidOrNot?TableName="+TableName+"&Password=" + password;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '',{ headers: headers });
  }

  CheckEmployeeNoIsValidOrNot(SessionToken: string, UserTypeIdTemp: string, UserName: string,TableName:string,EmployeeNo: string) {
    this.heroesUrl = this.apiURL + "UserCredentials/CheckEmployeeNoIsValidOrNot?TableName="+TableName+"&EmployeeNo=" + EmployeeNo;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '',{ headers: headers });
  }    
}