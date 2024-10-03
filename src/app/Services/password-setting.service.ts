import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordSettingService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  GetPasswordSettingpageFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "PasswordSettingController/PasswordSettingnewdbstpageFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  getPasswordSettingInfoList(SessionToken: string, UserTypeId: string, UserName: string, TableName: string) {
    this.heroesUrl = this.apiURL + "PasswordSettingController/GetPasswordSettingTableRecordsListWithNewDbStructure?TableName="+TableName;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId.toString());
     return this._httpClient.get(this.heroesUrl, { headers: headers });
   }

   InsertUpdatePasswordSettingInfo(SessionToken: string, UserTypeId: string, UserName: string,TableName: string, Id: number, NoofCapitalLetters: string, NoofSmallLetters: string, NoofNumbers: string,
    NoofSpecialCharacters: string, MinimumPasssLength: string, MaximumPasssLength: string, AvoidCharacters: string) {
    this.heroesUrl = this.apiURL + "PasswordSettingController/InsertUpdatePasswordSettingInfo?TableName="+TableName+"&Id=" + Id + "&NoOfCapitalLetters=" + NoofCapitalLetters + "&NoOfSmallLetters=" + NoofSmallLetters
      + "&NoOfNumbers=" + NoofNumbers + "&NoOfSpecialCharacters=" + NoofSpecialCharacters + "&MinimumPasssLength=" + MinimumPasssLength + "&MaximumPasssLength=" + MaximumPasssLength + "&AvoidCharacters=" + AvoidCharacters;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

}
