import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { PasswordSettingService } from '../Services/password-setting.service';
import Swal from 'sweetalert2';

export class passwordSetting {
  public Id: number = -1;
  public NoofCapitalLetters: string = "";
  public NoofSmallLetters: string = "";
  public NoofNumbers: string = "";
  public NoofSpecialCharacters: string = "";
  public MinimumPasssLength: string = "";
  public MaximumPasssLength: string = "";
  public AvoidCharacters: string = "";
}
@Component({
  selector: 'app-password-setting',
  templateUrl: './password-setting.component.html',
  styleUrls: ['./password-setting.component.scss']
})
export class PasswordSettingComponent implements OnInit
{
  myform!: FormGroup;
  BtnSaveUpdateText: string = "Save";
  IsShowForUserType: boolean = false;
  TableName: string = "CT0006";
  StrErrorMsg: any;

  Id: number = -1;
  NoofCapitalLetters: string = "";
  NoofSmallLetters: string = "";
  NoofNumbers: string = "";
  NoofSpecialCharacters: string = "";
  MinimumPasssLength: string = "";
  MaximumPasssLength: string = "";
  AvoidCharacters: string = "";

  StrId!: string;
  StrNoofCapitalLetters!: string;
  StrNoofSmallLetters!: string;
  StrNoofNumbers!: string;
  StrNoofSpecialCharacters!: string;
  StrMinimumPasssLength!: string;
  StrMaximumPasssLength!: string;
  StrAvoidCharacters!: string;
  
  objPasswordSetting1!: passwordSetting;
  LeftSideTreeviewHeight: string = "";

  constructor(private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService,public _PasswordSettingService :PasswordSettingService) { }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 140) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();
    this.reactiveForm();
    this.onViewpasswordSettingFormInfo();
  }

  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._PasswordSettingService.GetPasswordSettingpageFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error: any) => {
      console.log(error);
    });
  }


  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      NoofCapitalLetters: ['', [Validators.required]],
      NoofSmallLetters: ['', [Validators.required]],
      NoofNumbers: ['', [Validators.required]],
      NoofSpecialCharacters: ['', [Validators.required]],
      MinimumPasssLength: ['', [Validators.required]],
      MaximumPasssLength: ['', [Validators.required]],
      AvoidCharacters: ['', [Validators.required]],
      
    });
  }

    onViewpasswordSettingFormInfo() {
      this.StrNoofCapitalLetters = '';
      this.StrNoofSmallLetters = '';
      this.StrNoofNumbers = '';
      this.NoofSpecialCharacters = '';
      this.StrMinimumPasssLength = '';
      this.StrMaximumPasssLength = '';
      this.AvoidCharacters = '';
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
  
      this._PasswordSettingService.getPasswordSettingInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName).subscribe((response: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        this.objPasswordSetting1 = response;
        this.myform.controls['NoofCapitalLetters'].setValue(this.objPasswordSetting1.NoofCapitalLetters);
        this.myform.controls['NoofSmallLetters'].setValue(this.objPasswordSetting1.NoofSmallLetters);
        this.myform.controls['NoofNumbers'].setValue(this.objPasswordSetting1.NoofNumbers);
        this.myform.controls['NoofSpecialCharacters'].setValue(this.objPasswordSetting1.NoofSpecialCharacters);
        this.myform.controls['MinimumPasssLength'].setValue(this.objPasswordSetting1.MinimumPasssLength);
        this.myform.controls['MaximumPasssLength'].setValue(this.objPasswordSetting1.MaximumPasssLength);
        this.myform.controls['AvoidCharacters'].setValue(this.objPasswordSetting1.AvoidCharacters);       
      }, (error) => {
        console.log(error);
      });
      return;
    }
    onInsertUpdatePasswordSettingClick() {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
      var SessionToken = sessionStorage.getItem('SessionToken') as string;
      var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
      var UserName = sessionStorage.getItem('UserName') as string;
      this.Id = this.myform.get("Id")?.value;
      this.NoofCapitalLetters = this.myform.get("NoofCapitalLetters")?.value;
      this.NoofSmallLetters = this.myform.get("NoofSmallLetters")?.value;
      this.NoofNumbers = this.myform.get("NoofNumbers")?.value;
      this.NoofSpecialCharacters = this.myform.get("NoofSpecialCharacters")?.value;
      this.MinimumPasssLength = this.myform.get("MinimumPasssLength")?.value;
      this.MaximumPasssLength = this.myform.get("MaximumPasssLength")?.value;
      this.AvoidCharacters = this.myform.get("AvoidCharacters")?.value;
      if (this.NoofCapitalLetters == "" || this.NoofCapitalLetters == null) {
        Swal.fire('Please enter  NoOfCapitalLetters');
        return false;
      }
      if (this.NoofSmallLetters == "" || this.NoofSmallLetters == null) {
        Swal.fire('Please enter NoOfSmallLetters');
        return false;
      }
      if (this.NoofNumbers == "" || this.NoofNumbers == null) {
        Swal.fire('Please enter  NoOfNumbers');
        return false;
      }
      if (this.NoofSpecialCharacters == "" || this.NoofSpecialCharacters == null) {
        Swal.fire('Please enter NoOfSpecialCharacters');
        return false;
      }
      if (this.MinimumPasssLength == "" || this.MinimumPasssLength == null) {
        Swal.fire('Please enter  MinimumPasssLength');
        return false;
      }
      if (this.MaximumPasssLength == "" || this.MaximumPasssLength == null) {
        Swal.fire('Please enter  MaximumPasssLength');
        return false;
      }
      if (this.AvoidCharacters == "" || this.AvoidCharacters == null) {
        Swal.fire('Please enter AvoidCharacters');
        return false;
      }
      if (this.NoofCapitalLetters == "" || this.NoofSmallLetters == "" || this.NoofNumbers == "" || this.NoofSpecialCharacters == "" || this.MinimumPasssLength == "" || this.MaximumPasssLength == "" || this.AvoidCharacters == "" ) {
        Swal.fire("Please Enter All Fields");
      }
      else {
        this._PasswordSettingService.InsertUpdatePasswordSettingInfo(SessionToken, UserTypeId, UserName, this.TableName, this.Id, this.NoofCapitalLetters, this.NoofSmallLetters,
          this.NoofNumbers, this.NoofSpecialCharacters, this.MinimumPasssLength, this.MaximumPasssLength, this.AvoidCharacters).subscribe((response: any) => {
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
              Swal.fire('Password setting changed!');
              this.BtnSaveUpdateText = "Update";
            }
            return false;
          });
      }
      return false;
    }
    OnResetPasswordSettingClick() {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
      var SessionToken = sessionStorage.getItem('SessionToken') as string;
      var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
      var UserName = sessionStorage.getItem('UserName') as string;
      this.Id = this.myform.get("Id")?.value;
      this.NoofCapitalLetters = "1";
      this.NoofSmallLetters = "1";
      this.NoofNumbers = "1";
      this.NoofSpecialCharacters = "1";
      this.MinimumPasssLength = "8";
      this.MaximumPasssLength = "10";
      this.AvoidCharacters = "0";
      if (this.NoofCapitalLetters == "" || this.NoofSmallLetters == "" || this.NoofNumbers == "" || this.NoofSpecialCharacters == "" || this.MinimumPasssLength == "" || this.MaximumPasssLength == "" || this.AvoidCharacters == null) {
        Swal.fire("Please Enter All Fields");
      }
      else {
        this._PasswordSettingService.InsertUpdatePasswordSettingInfo(SessionToken, UserTypeId, UserName, this.TableName, this.Id, this.NoofCapitalLetters, this.NoofSmallLetters,
          this.NoofNumbers, this.NoofSpecialCharacters, this.MinimumPasssLength, this.MaximumPasssLength, this.AvoidCharacters).subscribe((response: any) => {
            this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
            if (response == "Error in page!") {
              Swal.fire(response);
              return false;
            }
            else {
              Swal.fire({
                title: 'Default password Setting Applied!',
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
  

