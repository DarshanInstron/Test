import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { TrendSettingPageService } from '../Services/trend-setting-page.service';
import Swal from 'sweetalert2';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR, faUserPlus,faM } from '@fortawesome/free-solid-svg-icons';

export class TrendSettingList {
  public Id: number = -1;
  public HeaderFontSize: string = "";
  public HeaderFontColor: string = "";
  public RefreshRate: string = "";
  public LiveTrendTime: string = "";
}

@Component({
  selector: 'app-trend-setting-page',
  templateUrl: './trend-setting-page.component.html',
  styleUrls: ['./trend-setting-page.component.scss']
})

export class TrendSettingPageComponent implements OnInit,OnDestroy {

  myform!: FormGroup;
  TableName: string ="CT0027";
  BtnSaveUpdateText: string = "Save";
  IsShowForUserType: boolean = false;
  LeftSideTreeviewHeight: string="";
  StrErrorMsg: any;


  Id: number = -1;
  TrendHeaderFontSize: string = "20px";
  TrendHeaderFontColor: string = "Black";
  TrendRefreshRate: string = "15";
  LiveTrendTime: string = "5";
  
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faUserPlus=faUserPlus;
  faM=faM;

  objTrendSettingInfoList1!: TrendSettingList[];
  constructor(private router: Router, public _TrendSettingPageService: TrendSettingPageService, private _GlobalConstantsService: GlobalConstantsService, private _formBuilder: FormBuilder,public _ValidationerrormessagesService:ValidationerrormessagesService) { }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 80) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();
    this.reactiveForm();
    this.onViewTrendSettingFormInfo();
    console.warn("usertype:", this.IsShowForUserType)
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      HeaderFontSize: ['', [Validators.required]],
      HeaderFontColor: ['', [Validators.required]],
      RefreshRate: ['', [Validators.required]],
      LiveTrendTime: ['', [Validators.required]]
    });
  }

  CheckUserHasPermissionForPageurlOrNot(){
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._TrendSettingPageService.CheckUserHasPermissionForPageUrl(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
  }  

  //GetTrendSettingInfo
  onViewTrendSettingFormInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    if (UserTypeIdTemp == "2" || UserTypeIdTemp == "3") {
      this.IsShowForUserType = true;
    }
    else{
      this.IsShowForUserType =false;
    }
    var UserName = sessionStorage.getItem('UserName') as string;

    this._TrendSettingPageService.GetTrendSettingInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        this.objTrendSettingInfoList1 = response;
        var kSettingLength = this.objTrendSettingInfoList1.length;
        if (kSettingLength >0) {
          this.Id=this.objTrendSettingInfoList1[0].Id;
          this.myform.controls['Id'].setValue(this.objTrendSettingInfoList1[0].Id);
          if(this.Id!=-1){
            this.BtnSaveUpdateText = "Update";
          }
          else{
            this.BtnSaveUpdateText = "Save";
          }
        }
        if (kSettingLength >0) {
          this.myform.controls['HeaderFontSize'].setValue(this.objTrendSettingInfoList1[0].HeaderFontSize);
        }
        if (kSettingLength>0) {
          this.myform.controls['HeaderFontColor'].setValue(this.objTrendSettingInfoList1[0].HeaderFontColor);
        }
        if (kSettingLength >0) {
          this.myform.controls['RefreshRate'].setValue(this.objTrendSettingInfoList1[0].RefreshRate);
        }
        if (kSettingLength >0) {
          this.myform.controls['LiveTrendTime'].setValue(this.objTrendSettingInfoList1[0].LiveTrendTime);
        }
  }, (error) => {
    console.log(error);
  });
  return;
}

  //UpdateTrendSettingInfo
  onInsertUpdateTrendSettingClick() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.Id = this.myform.get("Id")?.value;
    this.TrendHeaderFontSize = this.myform.get("HeaderFontSize")?.value;
    this.TrendHeaderFontColor = this.myform.get("HeaderFontColor")?.value;
    this.TrendRefreshRate = this.myform.get("RefreshRate")?.value;
    this.LiveTrendTime = this.myform.get("LiveTrendTime")?.value;

    if (this.TrendHeaderFontSize == ""||this.TrendHeaderFontSize == null) {
      Swal.fire('Please enter Trend Header Font Size!');
      return false;
    }
    if (this.TrendHeaderFontColor == ""||this.TrendHeaderFontColor == null) {
      Swal.fire('Please enter Trend Header Font Color!');
      return false;
    }
    if (this.TrendRefreshRate == ""||this.TrendRefreshRate == null) {
      Swal.fire('Please enter Trend Refresh Rate!');
      return false;
    }
    if (this.LiveTrendTime == ""||this.LiveTrendTime == null) {
      Swal.fire('Please enter Live Trend Time!');
      return false;
    }
    if(this.TrendHeaderFontColor == "" || this.TrendHeaderFontSize=="" || this.TrendRefreshRate == "" || this.LiveTrendTime =="")
    {
      Swal.fire("Please enter all Field");
    }
    else{
      this._TrendSettingPageService.InsertUpdateTrendSettingInfo(SessionToken, UserTypeId, UserName,this.TableName, this.Id, this.TrendHeaderFontSize, this.TrendHeaderFontColor, this.TrendRefreshRate, this.LiveTrendTime).subscribe((response: any) => {
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
          Swal.fire('Trend setting changed!'); 
          this.BtnSaveUpdateText = "Update";         
        }
        return false;      
      }, (error) => {
        console.log(error);
      });
      }
      return false;
  }

  onResetTrendSettingClick()
  {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this.Id = this.myform.get("Id")?.value;
    this.TrendHeaderFontSize = "24";
    this.TrendHeaderFontColor = "Black";
    this.TrendRefreshRate = "15";
    this.LiveTrendTime = "5";
    

    if(this.TrendHeaderFontColor == "" || this.TrendHeaderFontSize=="" || this.TrendRefreshRate == "" || this.LiveTrendTime =="")
    {
      Swal.fire("Please Enter All Field");
    }
    else{
      this._TrendSettingPageService.InsertUpdateTrendSettingInfo(SessionToken, UserTypeId, UserName,this.TableName, this.Id, this.TrendHeaderFontSize, this.TrendHeaderFontColor, this.TrendRefreshRate, this.LiveTrendTime).subscribe((response: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        if (response == "Error in page!") {
          Swal.fire(response);
          return false;
        }
        else {
          Swal.fire({
            title: 'Default Trend Setting Applied!',
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