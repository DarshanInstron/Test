import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class TraceabilityReportService {
  myform1!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;
  constructor(private _httpClient: HttpClient,private _formBuilder: FormBuilder) {
    //this.myform1=this.GetSetImageAndDateForm1();
  }
  reactiveForm() {
   this.myform1 = this._formBuilder.group({
     Barcode: ['', Validators.required],
     StrFromDate: ['', Validators.required],
     PdfStatus: ['', Validators.required],
     StrToDate: ['', Validators.required],
   });
 }
  //  GetSetImageAndDateForm1(): FormGroup {
  //   return this._formBuilder.group({
  //     //ImageDateId: [-1, [Validators.required]],
  //     Barcode: ["", [Validators.required]],
  //     StrFromDate: ["", [Validators.required]],
  //     //FromDate: ["", [Validators.required]],
  //     StrToDate: ["", [Validators.required]],
  //     //StrDateOfBirth: [moment("June 01, 2020", "MMM DD,YYYY"),[Validators.required]],
  //     //StrCurTime: ["", [Validators.required]],
  //    // StrJoiningDate: ["", Validators.required], 
  //     //Status: ["", Validators.required],   
  //   });
  // }
  
  GetTraceabilityReport(SessionToken:string,UserTypeIdTemp:string,UserName:string,Barcode:String="",FromDate:String="",ToDate:String="",PdfStatus:String="")
  {
    this.heroesUrl = this.apiURL + "TreacibilityReport/GetTreacibilityReportByFromToDatenPdfStatus?Barcode="+Barcode+"&FromDate="+FromDate+"&ToDate="+ToDate+"&PdfStatus=0";
    
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  GetBarcodeInfoList(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "TreacibilityReport/GetBarcodeInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }

  GetTraceabilityReportPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "TreacibilityReport/CheckTreacibilityReportPagePermission";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl,"", { headers: headers });
  }
}
