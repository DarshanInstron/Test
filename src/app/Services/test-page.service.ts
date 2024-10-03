import { Injectable, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { GlobalConstantsService } from './global-constants.service';
//import { CourseDialogComponent } from '../test-page/test-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class TestPageService {
  myform2!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient,private _formBuilder: FormBuilder) 
  {
    //this.myform2=this.GetSetUserDefinition(); 
  }


  
  // GetTestPage(auth_token:string,UserTypeIdTemp:string,UserName:string)
  // {
  //   this.heroesUrl = this.apiURL + "TreacibilityReport/TreacibilityReportPage";
  //   let headers = new HttpHeaders();
  //   headers = headers.set('SessionToken', auth_token);
  //   headers = headers.set('UserName', UserName);
  //   headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
  //   return this.http.post(this.heroesUrl,"", { headers: headers });
  // }
  

  // GetUserDefinitionInfoListS():Observable<string>
  // {
  //   this.heroesUrl = this.apiURL + "UserDefinition/GetUserDefinitionInfoList";
  //   return this._httpClient.get<string>(this.heroesUrl);
  // }
}


