/*
    Author:	Nita
    Description: For KPI Setting
    LastUpdate:on 18-12-23 by nita 
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { KpiPageService } from '../Services/kpi-page.service';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR, faUserPlus,faM } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export class KpiSettingList {
  public Id: number = -1;
  public KpiBoxHeaderFontSize: string = "";
  public KpiBoxHeaderFontColor: string = "";
  public KpiBoxValueFontSize: string = "";
  public KpiBoxBoxIconHeight: string = "";
  public KpiBoxBoxIconWidth: string = "";
  public KpiBoxBoxHeight: string = "";
  public KpiBoxBoxWidth: string = "";
  public KpiBoxBoxesPerPage: string = "";
  public KpiBoxBoxRefreshRate: string = "";
}

@Component({
  selector: 'app-kpi-setting-page',
  templateUrl: './kpi-setting-page.component.html',
  styleUrls: ['./kpi-setting-page.component.scss']
})

export class KpiSettingPageComponent implements OnInit {
  LeftSideTreeviewHeight: string = "";
  myform!: FormGroup;
  IsShowForUserType: boolean = false;
  BtnSaveUpdateText: string = "Save";
  TableName: string = "CT0028";
  StrErrorMsg: any;

  Id: number = -1;
  KpiBoxHeaderFontSize: string = "20px";
  KpiBoxHeaderFontColor: string = "Black";
  KpiBoxValueFontSize: string = "30px";
  KpiBoxBoxIconHeight: string = "40px";
  KpiBoxBoxIconWidth: string = "40px";
  KpiBoxBoxHeight: string = "130px";
  KpiBoxBoxWidth: string = "col-md-3";
  KpiBoxBoxesPerPage: string = "50";
  KpiBoxBoxRefreshRate: string = "15";

  StrId!: string;
  StrKpiBoxHeaderFontSize!: string;
  StrKpiBoxHeaderFontColor!: string;
  StrKpiBoxValueFontSize!: string;
  StrKpiBoxBoxIconHeight!: string;
  StrKpiBoxBoxIconWidth!: string;
  StrKpiBoxBoxHeight!: string;
  StrKpiBoxBoxWidth!: string;
  StrKpiBoxBoxesPerPage!: string;
  StrKpiBoxBoxRefreshRate!: string;

  objKpiBoxesSettingInfoList1!: KpiSettingList[];
  
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faUserPlus=faUserPlus;
  faM=faM;

  constructor(private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService, public _KpiPageService: KpiPageService) {
  }

  ngOnDestroy(): void {
    console.log('Method not implemented.');    
  }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 80) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();
    this.reactiveForm();
    this.onViewKpiBoxesSettingFormInfo();
    console.warn("usertype:", this.IsShowForUserType)
  }

  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._KpiPageService.GetkpisettingpageFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error: any) => {
      console.log(error);
    });
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      KpiBoxHeaderFontSize: ['', [Validators.required]],
      KpiBoxHeaderFontColor: ['', [Validators.required]],
      KpiBoxValueFontSize: ['', [Validators.required]],
      KpiBoxBoxIconHeight: ['', [Validators.required]],
      KpiBoxBoxIconWidth: ['', [Validators.required]],
      KpiBoxBoxHeight: ['', [Validators.required]],
      KpiBoxBoxWidth: ['', [Validators.required]],
      KpiBoxBoxesPerPage: ['', [Validators.required]],
      KpiBoxBoxRefreshRate: ['', [Validators.required]],
    });
  }

  onViewKpiBoxesSettingFormInfo() {
    this.StrId = '-1';
    this.StrKpiBoxHeaderFontSize = '';
    this.StrKpiBoxHeaderFontColor = '';
    this.StrKpiBoxValueFontSize = '';
    this.StrKpiBoxBoxIconHeight = '';
    this.StrKpiBoxBoxIconWidth = '';
    this.StrKpiBoxBoxHeight = '';
    this.StrKpiBoxBoxWidth = '';
    this.StrKpiBoxBoxesPerPage = '';
    this.StrKpiBoxBoxRefreshRate = '';
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    if (UserTypeIdTemp == "2" || UserTypeIdTemp == "3") {
      this.IsShowForUserType = true;
    }
    else {
      this.IsShowForUserType = false;
    }
    var UserName = sessionStorage.getItem('UserName') as string;

    this._KpiPageService.getKpiBoxesSettingInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objKpiBoxesSettingInfoList1 = response;
      var kSettingLength = this.objKpiBoxesSettingInfoList1.length;
      if (kSettingLength > 0) {
        this.Id = this.objKpiBoxesSettingInfoList1[0].Id;
        this.myform.controls['Id'].setValue(this.objKpiBoxesSettingInfoList1[0].Id);
        if (this.Id != -1) {
          this.BtnSaveUpdateText = "Update";
        }
        else {
          this.BtnSaveUpdateText = "Save";
        }
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxHeaderFontSize'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxHeaderFontSize);
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxHeaderFontColor'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxHeaderFontColor);
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxValueFontSize'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxValueFontSize);
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxBoxIconHeight'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxBoxIconHeight);
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxBoxIconWidth'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxBoxIconWidth);
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxBoxHeight'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxBoxHeight);
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxBoxWidth'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxBoxWidth);
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxBoxesPerPage'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxBoxesPerPage);
      }
      if (kSettingLength > 0) {
        this.myform.controls['KpiBoxBoxRefreshRate'].setValue(this.objKpiBoxesSettingInfoList1[0].KpiBoxBoxRefreshRate);
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }

  onInsertUpdateKpiBoxSettingClick() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.Id = this.myform.get("Id")?.value;
    this.KpiBoxHeaderFontSize = this.myform.get("KpiBoxHeaderFontSize")?.value;
    this.KpiBoxHeaderFontColor = this.myform.get("KpiBoxHeaderFontColor")?.value;
    this.KpiBoxValueFontSize = this.myform.get("KpiBoxValueFontSize")?.value;
    this.KpiBoxBoxIconHeight = this.myform.get("KpiBoxBoxIconHeight")?.value;
    this.KpiBoxBoxIconWidth = this.myform.get("KpiBoxBoxIconWidth")?.value;
    this.KpiBoxBoxHeight = this.myform.get("KpiBoxBoxHeight")?.value;
    this.KpiBoxBoxWidth = this.myform.get("KpiBoxBoxWidth")?.value;
    this.KpiBoxBoxesPerPage = this.myform.get("KpiBoxBoxesPerPage")?.value;
    this.KpiBoxBoxRefreshRate = this.myform.get("KpiBoxBoxRefreshRate")?.value;
    if (this.KpiBoxHeaderFontSize == "" || this.KpiBoxHeaderFontSize == null) {
      Swal.fire('Please enter  Header Font Size');
      return false;
    }
    if (this.KpiBoxHeaderFontColor == "" || this.KpiBoxHeaderFontColor == null) {
      Swal.fire('Please enter Header Font Color');
      return false;
    }
    if (this.KpiBoxValueFontSize == "" || this.KpiBoxValueFontSize == null) {
      Swal.fire('Please enter  Value Font Size');
      return false;
    }
    if (this.KpiBoxBoxIconHeight == "" || this.KpiBoxBoxIconHeight == null) {
      Swal.fire('Please enter Box Icon Height');
      return false;
    }
    if (this.KpiBoxBoxIconWidth == "" || this.KpiBoxBoxIconWidth == null) {
      Swal.fire('Please enter  Box Icon Width');
      return false;
    }
    if (this.KpiBoxBoxHeight == "" || this.KpiBoxBoxHeight == null) {
      Swal.fire('Please enter  Box Height');
      return false;
    }
    if (this.KpiBoxBoxWidth == "" || this.KpiBoxBoxWidth == null) {
      Swal.fire('Please enter  Box Width');
      return false;
    }
    if (this.KpiBoxBoxesPerPage == "" || this.KpiBoxBoxesPerPage == null) {
      Swal.fire('Please enter Boxes Per Page');
      return false;
    }
    if (this.KpiBoxBoxRefreshRate == "" || this.KpiBoxBoxRefreshRate == null) {
      Swal.fire('Please enter  Box Refresh Rate');
      return false;
    }
    if (this.KpiBoxHeaderFontSize == "" || this.KpiBoxHeaderFontColor == "" || this.KpiBoxValueFontSize == "" || this.KpiBoxBoxIconHeight == "" || this.KpiBoxBoxIconWidth == "" || this.KpiBoxBoxHeight == "" || this.KpiBoxBoxWidth == "" || this.KpiBoxBoxesPerPage == "" || this.KpiBoxBoxRefreshRate == "") {
      Swal.fire("Please Enter All Fields");
    }
    else {
      this._KpiPageService.InsertUpdateKpiBoxesSettingInfo(SessionToken, UserTypeId, UserName, this.TableName, this.Id, this.KpiBoxHeaderFontSize, this.KpiBoxHeaderFontColor,
        this.KpiBoxValueFontSize, this.KpiBoxBoxIconHeight, this.KpiBoxBoxIconWidth, this.KpiBoxBoxHeight, this.KpiBoxBoxWidth, this.KpiBoxBoxesPerPage,
        this.KpiBoxBoxRefreshRate).subscribe((response: any) => {
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
            Swal.fire('KPI setting changed!');
            this.BtnSaveUpdateText = "Update";
          }
          return false;
        });
    }
    return false;
  }

  onResetKpiSettingClick() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.Id = this.myform.get("Id")?.value;
    this.KpiBoxHeaderFontSize = "22";
    this.KpiBoxHeaderFontColor = "Black";
    this.KpiBoxValueFontSize = "30";
    this.KpiBoxBoxIconHeight = "40";
    this.KpiBoxBoxIconWidth = "40";
    this.KpiBoxBoxHeight = "130";
    this.KpiBoxBoxWidth = "3";
    this.KpiBoxBoxesPerPage = "3";
    this.KpiBoxBoxRefreshRate = "15";
    if (this.KpiBoxHeaderFontSize == "" || this.KpiBoxHeaderFontColor == "" || this.KpiBoxValueFontSize == "" || this.KpiBoxBoxIconHeight == "" || this.KpiBoxBoxIconWidth == "" || this.KpiBoxBoxHeight == "" || this.KpiBoxBoxWidth == "" || this.KpiBoxBoxesPerPage == "" || this.KpiBoxBoxRefreshRate == "") {
      Swal.fire("Please Enter All Fields");
    }
    else {
      this._KpiPageService.InsertUpdateKpiBoxesSettingInfo(SessionToken, UserTypeId, UserName, this.TableName, this.Id, this.KpiBoxHeaderFontSize, this.KpiBoxHeaderFontColor,
        this.KpiBoxValueFontSize, this.KpiBoxBoxIconHeight, this.KpiBoxBoxIconWidth, this.KpiBoxBoxHeight, this.KpiBoxBoxWidth, this.KpiBoxBoxesPerPage,
        this.KpiBoxBoxRefreshRate).subscribe((response: any) => {
          this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
          if (response == "Error in page!") {
            Swal.fire(response);
            return false;
          }
          else {
            Swal.fire({
              title: 'Default Kpi Setting Applied!',
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