import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class ProductionReportService {
  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;
  constructor(private _httpClient: HttpClient,private _formBuilder: FormBuilder) {
    //this.myform=this.reactiveForm();
   }
   reactiveForm() {
    this.myform = this._formBuilder.group({
      StrFromDate: ['', Validators.required],
      PdfStatus: ['', Validators.required],
      StrToDate: ['', Validators.required],
    });
  }
     
  GetProductionReportPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "ProductionReport/CheckProductionReportPagePermission";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }
  
  GetProductionReport(SessionToken:string,UserTypeIdTemp:string,UserName:string,FromDate:String="",ToDate:String="",PdfStatus:String="")
  {
    this.heroesUrl = this.apiURL + "ProductionReport/GetProductionReportByFromToDatenPdfStatus?FromDate="+FromDate+"&ToDate="+ToDate+"&PdfStatus="+"0";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }
  
}