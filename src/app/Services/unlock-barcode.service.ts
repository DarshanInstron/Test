import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class UnlockBarcodeService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient,private _formBuilder: FormBuilder) 
  {
    //this.myform2=this.GetSetUserDefinition(); 
  }

  GetUnlockBarcodeInfoListS()//:Observable<string>
  {
    this.heroesUrl = this.apiURL + "UnlockBarcodeCon/GetUnlockBarcodeInfoList";
    //return this._httpClient.get<string>(this.heroesUrl);
    return this._httpClient.post(this.heroesUrl, {});
  }
  CheckUnlockBarcodePagePermission(auth_token:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "UnlockBarcodeCon/CheckUnlockBarcodePagePermission";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', auth_token);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }
  
}
