import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class BarcodescannereventsService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient){ }

  GetG1M11_B1wScadanT8RtnErroMsgsInfo(SessionToken:string,UserTypeId:string,UserName:string) {
    this.heroesUrl = this.apiURL + "ScannerEvents1332/GetG1M11_B1wScadanT8RtnErroMsgsInfo";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  getG1M11OrB1InfoByTblNameSufnBarcode(SessionToken:string,UserTypeId:string,UserName:string,Barcode:string) {
    this.heroesUrl = this.apiURL + "ScannerEvents1332/getG1M11OrB1InfoByTblNameSufnBarcode?Barcode="+Barcode;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  InsertUpdateG1M11B1nScadaInfo(SessionToken:string,UserTypeId:string,UserName:string,Barcode:string,TscC3:string) {
    this.heroesUrl = this.apiURL + "ScannerEvents1332/InsertUpdateG1M11B1nScadaInfo?Barcode="+Barcode+"&TscC3="+TscC3;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  GetobjTBL228InfoList(SessionToken:string,UserTypeId:string,UserName:string) {
    this.heroesUrl = this.apiURL + "ScannerEvents1332/GetobjTBL228InfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  UpdateTscC2Flag(SessionToken:string,UserTypeId:string,UserName:string,TscC2:string) {
    this.heroesUrl = this.apiURL + "ScannerEvents1332/UpdateTscC2Flag?TscC2="+TscC2;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  DiscardBarcodeResetnTruncateCurrentCycle(SessionToken:string,UserTypeId:string,UserName:string) {
    this.heroesUrl = this.apiURL + "ScannerEvents1332/DiscardBarcodeResetnTruncateCurrentCycle";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  ChecknSet1332BarcodeValidation(SessionToken:string,UserTypeId:string,UserName:string,Barcode:string) {
    this.heroesUrl = this.apiURL + "ScannerEvents1332/ChecknSet1332BarcodeValidation?EQUIP="+Barcode+"&AUTO=0";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  CheckScannerEvents1332PagePermission(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "ScannerEvents1332/CheckScannerEvents1332PagePermission";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }
}