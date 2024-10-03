import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { GlobalConstantsService } from './global-constants.service';


@Injectable({
  providedIn: 'root'
})

export class BarcodeGenerationService {

  myform2!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) 
  {}

  GetBarcodeGenerationPagePermission(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "BarcodeGeneration/CheckBarcodeGenerationPagePermission";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  GenerateNoofBarcodeSticker(SessionToken:string,UserTypeId:string,UserName:string,NoofBarcodeSticker:string) {
    this.heroesUrl = this.apiURL + "BarcodeGeneration/GenerateNoofBarcodeSticker?NoofBarcodeSticker="+NoofBarcodeSticker;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }
  
}