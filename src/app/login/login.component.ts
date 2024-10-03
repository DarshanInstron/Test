import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { ConnectionStringPageService } from '../Services/connection-string-page.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { LoginService } from '../Services/login.service';
import { OnlyAlphabetDirectiveService } from '../Services/only-alphabet-directive.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { faFireFlameCurved, faIndianRupeeSign, faBolt, faWater, faWind, faBars, faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonSettingService } from '../Services/common-setting.service';
import { CommonSettingList } from '../common-setting/common-setting.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  myform!: FormGroup;
  date = new FormControl(moment());
  alphabetlimit = OnlyAlphabetDirectiveService.alphabetlimit;
  hide = true;
  stringJson: any;
  StrErrorMsg: string = "";
  TempUserName: string = "";
  TempPassword: string = "";
  myDatePicker: string = "";
  IsWaitingOn: boolean = true;
  IsWaitingForConn: boolean = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faUser = faUser;
  objCommonSettingInfoList1!: CommonSettingList[];
  TokenExpiryTime: number = -1;

  LeftSideTreeviewHeight: string = "";

  //objActLanguageTypeList!: LanguagetypeInfo[];
  //private _standardAllcontrollerFormService: any;

  public languageTypeFilterCtrl: FormControl = new FormControl();
  public filteredLanguageType: ReplaySubject<any> = new ReplaySubject<any>(2);

  private _onDestroy = new Subject<void>();
  //multi
  protected _onDestroys = new Subject();

  constructor(private router: Router, private _httpClient: HttpClient, public _loginService: LoginService, private _GlobalConstantsService: GlobalConstantsService,
    public _connectionStringPageService: ConnectionStringPageService, private _formBuilder: FormBuilder, public _CommonSettingPageService: CommonSettingService, public _ValidationerrormessagesService: ValidationerrormessagesService) {
    this.CheckConnectionStringValidOrNotEvent();
  }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 72) + "px";
    this.reactiveForm();
    this.onLogoutCurrentSessionDetails();
    //this.onViewCommonSettingFormInfo;
    this.languageTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        //this.filterlanguageTypeInfo();
      });

    this.myform.controls['ID'].setValue(2);
  }

  CheckConnectionStringValidOrNotEvent() {
    var a = setTimeout(() => {
      if (this.IsWaitingForConn) {
        this.IsWaitingOn = false;
        Swal.close();
        this.router.navigate(['/connection-string-page']);
      }
    }, 7000);
    Swal.fire({
      title: '',
      html: 'Checking database connection <b> Please wait....</b>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    this._connectionStringPageService.GetConnectionStringInfo().subscribe((response: any) => {
      //this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this._connectionStringPageService.UpdateConnectionString(response.ServerName, response.DbName, response.DbUserName, response.DbPassword).subscribe((response1: any) => {
        //this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForConnectionString(response1);
        if (StrErrorMsg != '') {
          this.router.navigate(['/connection-string-page']);
          Swal.fire(StrErrorMsg);
          return false;
        }
        else {
          this.IsWaitingForConn = false;
        }
        this.IsWaitingOn = false;
        Swal.close();
        return false;
      });
    }, (error) => {
      console.log(error);
    });
  }

  ClearLastSessionFrom() {
    sessionStorage.removeItem('SessionToken');
    sessionStorage.removeItem('UserTypeId');
    sessionStorage.removeItem('UserName');
  }

  GetBaseUrlFromCsv() {
    this._httpClient.get('assets/SoftwareConfig.csv', { responseType: 'text' }).subscribe(
      (data: string) => {
        let csvToRowArray = data.split("\n");
        let row = csvToRowArray[1].split(",");
        let ApiBaseURL = row[0];
        sessionStorage.setItem('ApiBaseURL', ApiBaseURL);
        setInterval(() => {
          //this.GetLanguageTypeInfoListUsgSPByFilter();
        }, 2000);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      TempUserName: ["", [Validators.required]],
      TempPassword: ['', Validators.required],
      ID: [0],
      strdate: [""]
    });
  }

  onPasswordKeydownEvent(event: any) {
    // if (event.key === "Enter") {
    //   this.onChecknVerifyUserCredentialsInfoClick()
    // }
  }

  onChecknVerifyUserCredentialsInfoClick() {
    this.TempUserName = this.myform.get("TempUserName")?.value;
    this.TempPassword = this.myform.get("TempPassword")?.value;
    if (this.TempUserName == "" || this.TempUserName == null) {
      Swal.fire('Please enter user name!');
      return false;
    }
    if (this.TempPassword == "" || this.TempPassword == null) {
      Swal.fire('Please enter password!');
      return false;
    }
    Swal.fire({
      title: '',
      html: '<b> Please wait....</b>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    this._loginService.GetUsercredentialsInfoByUserNamenPassword(this.TempUserName, this.TempPassword, '0').subscribe((response: any) => {
      if (response == "Session is already running somewhere!") {
        Swal.fire({
          title: response,
          //text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Close!',
          focusCancel: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.GetUserCredentialsInfoByUserNamenPassword();
            return;
          }
        });
        return;
      }
      var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForLogin(response);
      Swal.close();
      if (StrErrorMsg != '') {
        Swal.fire(StrErrorMsg);
        return false;
      }
      var logInTime = new Date();
      const logInTimeTemp = logInTime.toString();
      sessionStorage.setItem('SessionToken', response.StrSessionToken);
      sessionStorage.setItem('UserTypeId', response.UserTypeId);
      sessionStorage.setItem('UserName', response.User_Name);
      sessionStorage.setItem('logInTime', logInTimeTemp);
      //response.url = '/Trendwithlefttreeview';
      response.url = '/dashboard';
      //response.url = '/UserCredentials';
      this.router.navigate([response.Url]);
      //this.router.navigate(['/manualentry']);
      return false;
    }, (error) => {
      console.log(error);
    });
    return;
  }
  GetUserCredentialsInfoByUserNamenPassword() {
    this._loginService.GetUsercredentialsInfoByUserNamenPassword(this.TempUserName, this.TempPassword, '1').subscribe((response: any) => {
      var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForLogin(response);
      Swal.close();
      if (StrErrorMsg != '') {
        Swal.fire(StrErrorMsg);
        return false;
      }
      var logInTime = new Date();
      logInTime.setMinutes(logInTime.getMinutes() + 2);
      const updatedDate = logInTime.toString();
      sessionStorage.setItem('SessionToken', response.StrSessionToken);
      sessionStorage.setItem('UserTypeId', response.UserTypeId);
      sessionStorage.setItem('UserName', response.User_Name);
      sessionStorage.setItem('logInTime', updatedDate);
      //response.url = '/Trendwithlefttreeview';
      response.url = '/dashboard';
      //response.url = '/UserCredentials';
      this.router.navigate([response.Url]);
      //this.router.navigate(['/manualentry']);
      return false;
    }, (error) => {
      console.log(error);
    });
  }
  onLogoutCurrentSessionDetails() {
    // this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    if (sessionStorage.getItem('SessionToken') != null) {
      var SessionToken = sessionStorage.getItem('SessionToken') as string;
      var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
      var UserName = sessionStorage.getItem('UserName') as string;
      this._loginService.LogoutCurrentSessionDetails(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
        this.ClearLastSessionFrom();
        return false;
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.ClearLastSessionFrom();
    }
    return;
  }
  // setSessionData(data: any, timeoutInMinutes: number = 30): void {
  //   const currentTime = new Date().getTime();
  //   //const expirationTime = currentTime + timeoutInMinutes * 60 * 1000;
  //   const expirationTime = currentTime + 20000;
  //   console.log('expire time'+expirationTime)
  //   const sessionData = { data, expirationTime };

  //   sessionStorage.setItem(this.storageKey, JSON.stringify(sessionData));
  // }
  // getSessionData(): any {
  //   const sessionData = sessionStorage.getItem(this.storageKey);
  //   if (sessionData) {
  //     const parsedSessionData = JSON.parse(sessionData);
  //     const currentTime = new Date().getTime();
  //     if (parsedSessionData.expirationTime > currentTime) {
  //       return parsedSessionData.data;
  //     }
  //   }
  //   this.clearSessionData();
  //   return null;
  // }
  // clearSessionData(): void {
  //   sessionStorage.removeItem(this.storageKey);
  // }
  // CheckSessionData(){
  //   const data = this.getSessionData();
  //   console.log(data);
  // }

  onViewCommonSettingFormInfo() {
    //this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName = 'CT0032';
    this._CommonSettingPageService.GetCommonSettingInfoList(SessionToken, UserTypeIdTemp, UserName, TableName).subscribe((response: any) => {
      this.objCommonSettingInfoList1 = response;
      var cSettingLength = this.objCommonSettingInfoList1.length;
      if (cSettingLength > 0) {
        this.TokenExpiryTime = Number(this.objCommonSettingInfoList1[0].TokenExpiryTime);
      }
      return false;
    }, (error) => {
      console.log(error);
    });
    return;
  }
}