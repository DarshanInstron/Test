import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class UserDefinitionService {

  myform!: FormGroup;

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  GetUserDefinitionPage(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "UserDefinition/UserDefinitionPage";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetUserTypeInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "UserDefinition/GetUserTypeInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '', { headers: headers });
  }

  GetDesignationInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "UserDefinition/GetDesignationInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '', { headers: headers });
  }

  GetUserGroupInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "UserDefinition/GetUserGroupInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '', { headers: headers });
  }

  GetUserDefinitionInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "UserDefinition/GetUserDefinitionInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '', { headers: headers });
  }

  GetCheckPasswordIsValidOrNot(SessionToken: string, UserTypeIdTemp: string, UserName: string, Password: string) {
    this.heroesUrl = this.apiURL + "LoginAndAPIs/PostCheckPasswordIsValidOrNot?Password=" + Password;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '', { headers: headers });
  }

  InsertUpdateUserDefinitionInfo(SessionToken: string, UserTypeIdTemp: string, UserName: string, Id: number, UserFullName: string, MobileNo: String, MailId: string, User_Name: string, Password: string, UserTypeId: number, AlertToId: number, EmployeeNo: string, UserGroupId: number) {
    this.heroesUrl = this.apiURL + "UserDefinition/InsertUpdateUserDefinitionInfo?Id=" + Id + "&UserFullName=" + UserFullName + "&MobileNo=" + MobileNo + "&MailId=" + MailId + "&User_Name=" + User_Name + "&Password=" + Password + "&UserTypeId=" + UserTypeId + "&AlertToId=" + AlertToId + "&EmployeeNo=" + EmployeeNo + "&UserGroupId=" + UserGroupId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  DeleteUserDefinitionInfo(SessionToken: string, UserTypeIdTemp: string, UserName: string, Id: number) {
    this.heroesUrl = this.apiURL + "UserDefinition/DeleteUserDefinitionInfo?Id=" + Id;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '', { headers: headers });
  }

  

}