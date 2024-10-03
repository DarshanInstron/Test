import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  CheckUserCredentialExistsByUserNamenPassword(TableName:string,TempUserName: string, TempPassword: String) {
    this.heroesUrl = this.apiURL + "LoginAndAPIs/CheckUserCredentialExistsByUserNamenPasswordWithNewDbStructure?TableName="+TableName;
    let headers = new HttpHeaders();
    headers = headers.set('UserName', TempUserName);
    headers = headers.set('Password', TempPassword.toString());
    return this._httpClient.post(this.heroesUrl,'', { headers: headers });
  }

  GetUsercredentialsInfoByUserNamenPassword(TempUserName: string, TempPassword: String,IsCloseExistingSession:string) {
    this.heroesUrl = this.apiURL + "LoginAndAPIs/GetUsercredentialsInfoByUserNamenPassword";
    let headers = new HttpHeaders();
    headers = headers.set('UserName', TempUserName);
    headers = headers.set('Password', TempPassword.toString());
    headers = headers.set('IsCloseExistingSession', IsCloseExistingSession);
    return this._httpClient.post(this.heroesUrl,'', { headers: headers });
  }
  GetLanguageTypeInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "LanguageType/GetLanguageTypeInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,'', { headers: headers });
  }
  LogoutCurrentSessionDetails(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "LoginAndAPIs/LogoutCurrentSessionDetails";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,'', { headers: headers });
  }
}