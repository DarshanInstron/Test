import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstantsService } from '../Services/global-constants.service';
import Swal from 'sweetalert2';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { CommonSettingService } from '../Services/common-setting.service';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR} from '@fortawesome/free-solid-svg-icons';

export class CommonSettingList {
  public Id: number = -1;
  public DashboardUpdateTime: string = "";
  public SliderTime: string = "";
  public EmsCardRefreshRate: string = "";
  public EmsTrendRefreshRate: string = "";
  public TokenExpiryTime: string = "";
  public CountDownTime: string = "";
  public StealthQuotient_UserQuantum: string = "";
  public SecureCipher_DualAuth: string = "";
  public SCMDashboardUpdateTime: string = ""
}

@Component({
  selector: 'app-common-setting',
  templateUrl: './common-setting.component.html',
  styleUrls: ['./common-setting.component.scss']
})

export class CommonSettingComponent implements OnInit, OnDestroy {

  myform!: FormGroup;
  TableName: string = "CT0032";
  BtnSaveUpdateText: string = "Update";
  LeftSideTreeviewHeight: string = "";
  StrErrorMsg: any;

  Id: number = -1;
  DashboardUpdateTime: string = "30";
  SliderTime: string = "20";
  EmsCardRefreshRate: string = "30";
  EmsTrendRefreshRate: string = "30";
  TokenExpiryTime: string = "240";
  CountDownTime: string = "1";
  StealthQuotient_UserQuantum: string = "j";
  SecureCipher_DualAuth: string = "1";
  SCMDashboardUpdateTime: string = "5";
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  objCommonSettingInfoList1!: CommonSettingList[];
  constructor(private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService, public _CommonSettingPageService: CommonSettingService) { }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  //pageload
  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 100) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();
    this.reactiveForm();
    this.onViewCommonSettingFormInfo();
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      DashboardUpdateTime: ['', [Validators.required]],
      SliderTime: ['', [Validators.required]],
      EmsCardRefreshRate: ['', [Validators.required]],
      EmsTrendRefreshRate: ['', [Validators.required]],
      TokenExpiryTime: ['', [Validators.required]],
      CountDownTime: ['', Validators.required],
      StealthQuotient_UserQuantum: ['', Validators.required],
      SecureCipher_DualAuth: ['', Validators.required],
      SCMDashboardUpdateTime: ['', Validators.required]
    });
  }

  // Check if user has permission for page
  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._CommonSettingPageService.CheckUserHasPermissionForPageUrl(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
  }

  //GetCommonSettingInfo
  onViewCommonSettingFormInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this._CommonSettingPageService.GetCommonSettingInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objCommonSettingInfoList1 = response;
      var kSettingLength = this.objCommonSettingInfoList1.length;
      if (kSettingLength > 0) {
        this.Id = this.objCommonSettingInfoList1[0].Id;
        this.myform.controls['Id'].setValue(this.objCommonSettingInfoList1[0].Id);
        this.myform.controls['DashboardUpdateTime'].setValue(this.objCommonSettingInfoList1[0].DashboardUpdateTime);
        this.myform.controls['SliderTime'].setValue(this.objCommonSettingInfoList1[0].SliderTime);
        this.myform.controls['EmsCardRefreshRate'].setValue(this.objCommonSettingInfoList1[0].EmsCardRefreshRate);
        this.myform.controls['EmsTrendRefreshRate'].setValue(this.objCommonSettingInfoList1[0].EmsTrendRefreshRate);
        this.myform.controls['TokenExpiryTime'].setValue(this.objCommonSettingInfoList1[0].TokenExpiryTime);
        this.myform.controls['CountDownTime'].setValue(this.objCommonSettingInfoList1[0].CountDownTime);
        this.myform.controls['StealthQuotient_UserQuantum'].setValue(this.objCommonSettingInfoList1[0].StealthQuotient_UserQuantum);
        this.myform.controls['SecureCipher_DualAuth'].setValue(this.objCommonSettingInfoList1[0].SecureCipher_DualAuth);
        this.myform.controls['SCMDashboardUpdateTime'].setValue(this.objCommonSettingInfoList1[0].SCMDashboardUpdateTime);
      }
      return false;
    }, (error) => {
      console.log(error);
    });
    return;
  }

  //UpdateCommonSettingInfo
  onInsertUpdateCommonSettingClick() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this.Id = this.myform.get("Id")?.value;
    this.DashboardUpdateTime = this.myform.get("DashboardUpdateTime")?.value;
    this.SliderTime = this.myform.get("SliderTime")?.value;
    this.EmsCardRefreshRate = this.myform.get("EmsCardRefreshRate")?.value;
    this.EmsTrendRefreshRate = this.myform.get("EmsTrendRefreshRate")?.value;
    this.TokenExpiryTime = this.myform.get("TokenExpiryTime")?.value;
    this.CountDownTime = this.myform.get("CountDownTime")?.value;
    this.StealthQuotient_UserQuantum = this.myform.get("StealthQuotient_UserQuantum")?.value;
    this.SecureCipher_DualAuth = this.myform.get("SecureCipher_DualAuth")?.value;
    this.SCMDashboardUpdateTime = this.myform.get("SCMDashboardUpdateTime")?.value;

    if (this.DashboardUpdateTime == "" || this.DashboardUpdateTime == null) {
      Swal.fire('Please enter Production Dashboard Update Time');
      return false;
    }
    if (this.SliderTime == "" || this.SliderTime == null) {
      Swal.fire('Please enter Slider Time');
      return false;
    }
    if (this.EmsCardRefreshRate == "" || this.EmsCardRefreshRate == null) {
      Swal.fire('Please enter Ems Card Refresh Rate');
      return false;
    }
    if (this.EmsTrendRefreshRate == "" || this.EmsTrendRefreshRate == null) {
      Swal.fire('Please enter Ems Trend Refresh Rate');
      return false;
    }
    if (this.TokenExpiryTime == "" || this.TokenExpiryTime == null) {
      Swal.fire('Please enter Token Expiry Time');
      return false;
    }
    if (this.CountDownTime == "" || this.CountDownTime == null) {
      Swal.fire("Please Enter Count Down Time");
      return false;
    }
    if (this.StealthQuotient_UserQuantum == "" || this.StealthQuotient_UserQuantum == null) {
      Swal.fire("Please Enter Stealth Quotient - User Quantum");
      return false;
    }
    if (this.SecureCipher_DualAuth == "" || this.SecureCipher_DualAuth == null) {
      Swal.fire("Please Enter SecureCipher_DualAuth");
      return false;
    }
    if (this.SCMDashboardUpdateTime == "" || this.SCMDashboardUpdateTime == null) {
      Swal.fire('Please enter SCM Dashboard Update Time');
      return false;
    }
    if (this.DashboardUpdateTime == "" || this.SliderTime == "" || this.EmsCardRefreshRate == "" ||
      this.EmsTrendRefreshRate == "" || this.TokenExpiryTime == "" || this.CountDownTime == "" || this.StealthQuotient_UserQuantum == "" || this.SecureCipher_DualAuth == "" || this.SCMDashboardUpdateTime == "") {
      Swal.fire("Please enter all Field");
    }
    else {
      this._CommonSettingPageService.InsertUpdateCommonSettingInfo(SessionToken, UserTypeId, UserName, this.TableName, this.Id, this.DashboardUpdateTime, this.SliderTime, this.EmsCardRefreshRate, this.EmsTrendRefreshRate, this.TokenExpiryTime, this.CountDownTime, this.StealthQuotient_UserQuantum, this.SecureCipher_DualAuth, this.SCMDashboardUpdateTime).subscribe((response: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForValidations(response);
        if (StrErrorMsg != '') {
          Swal.fire(StrErrorMsg);
          return false;
        }
        StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForTrendSetting(response);
        if (StrErrorMsg != '') {
          Swal.fire(StrErrorMsg);
          return false;
        }
        else {
          Swal.fire('Common setting changed!');
          this.BtnSaveUpdateText = "Update";
        }
        return false;
      }, (error) => {
        console.log(error);
      });
    }
    return false;
  }

  //resetCommonSetting
  onResetCommonSettingClick() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this.Id = this.myform.get("Id")?.value;
    this.DashboardUpdateTime = "5";
    this.SliderTime = "10";
    this.EmsCardRefreshRate = "5";
    this.EmsTrendRefreshRate = "10";
    this.TokenExpiryTime = "240";
    this.CountDownTime = "1";
    this.StealthQuotient_UserQuantum = "j";
    this.SecureCipher_DualAuth = "1";
    this.SCMDashboardUpdateTime = "5";
    if (this.DashboardUpdateTime == "" || this.SliderTime == "" || this.EmsCardRefreshRate == "" ||
      this.EmsTrendRefreshRate == "" || this.TokenExpiryTime == "" || this.CountDownTime == "" || this.StealthQuotient_UserQuantum == "" || this.SecureCipher_DualAuth == "" || this.SCMDashboardUpdateTime == "") {
      Swal.fire("Please Enter All Field");
    }
    else {
      this._CommonSettingPageService.InsertUpdateCommonSettingInfo(SessionToken, UserTypeId, UserName, this.TableName, this.Id, this.DashboardUpdateTime, this.SliderTime, this.EmsCardRefreshRate, this.EmsTrendRefreshRate, this.TokenExpiryTime, this.CountDownTime, this.StealthQuotient_UserQuantum, this.SecureCipher_DualAuth, this.SCMDashboardUpdateTime).subscribe((response: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        if (response == "Error in page!") {
          Swal.fire(response);
          return false;
        }
        else {
          Swal.fire({
            title: 'Default Common Setting Applied!',
            showCancelButton: false,
            confirmButtonText: 'Okay',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
        return false;
      });
    }
    return false;
  }

}