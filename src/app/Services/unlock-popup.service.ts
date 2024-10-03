import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class UnlockPopupService {
  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient,private _formBuilder: FormBuilder) { }

  UpdateBarcodeStatusInfonRemarkByBarcode(LockBarcodes:string,remark:String)
  {
    //this.heroesUrl = this.apiURL + "UnlockBarcodeCon/UpdateBarcodeStatusInfonRemarkByBarcode/"+lockdatetime+"/"+remark;
    this.heroesUrl = this.apiURL + "UnlockBarcodeCon/UpdateBarcodeStatusInfonRemarkByBarcode?LockBarcodes="+LockBarcodes+"&Remark="+remark;
    return this._httpClient.post(this.heroesUrl, {});
    //return this._httpClient.get<string>(this.heroesUrl);
  }
}