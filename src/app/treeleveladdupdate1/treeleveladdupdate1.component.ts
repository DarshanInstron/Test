import { Response } from './../../../node_modules/@types/express-serve-static-core/index.d';
import { Component, EventEmitter, Output } from '@angular/core';
import { MultiLvlTreeviewInfo } from '../kpipage/kpipage.component';
import { Router } from '@angular/router';
import { KpiPageService } from '../Services/kpi-page.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Component({
  selector: 'app-treeleveladdupdate1',
  templateUrl: './treeleveladdupdate1.component.html',
  styleUrls: ['./treeleveladdupdate1.component.scss']
})
export class Treeleveladdupdate1Component {
  objMultiLvlTreeviewInfoList: MultiLvlTreeviewInfo[] = [];
  myform!: FormGroup;
  C001_LevelId: string = "";
  C002_ParentLevelId: string = "";
  C003_LevelName: string = "";
  C004_LevelDescription: string = "";
  HeaderTitleName: string = "";
  TempHeaderTitle: string = "";
  BtnSaveUpdateText: string = "Save";
  LeftSideTreeviewHeight: string = "";

  @Output() KpiTreeviewObjectData = new EventEmitter<any>();
  constructor(private router: Router, public _KpiPageService: KpiPageService, private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService,public _ValidationerrormessagesService:ValidationerrormessagesService) { }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 150) + "px";

    this.reactiveForm();
    if (sessionStorage.getItem("SessionIsCustomMenu") === null) {
      this.GetLeftSideTreeDetailsDataSet();
    }
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      C001_LevelId: [''],
      C002_ParentLevelId: [''],
      C003_LevelName: [''],
      C004_LevelDescription: [''],
      LevelTypeInputs: ['a']
    });
  }
  ShowAlert() {
    Swal.fire("hello");
  }
  
  GetLeftSideTreeDetailsDataSet() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    var LevelTypeInputs = this.myform.get("LevelTypeInputs")?.value;
    this.BtnSaveUpdateText = "Save";
    this.myform.reset();
    this.myform.controls['LevelTypeInputs'].setValue(LevelTypeInputs);

      this._KpiPageService.GetMultiLevelTreeViewByParametersnLevelLimit(SessionToken, UserTypeId, UserName, '-1','99','','','','',LevelTypeInputs,'','').subscribe((response: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        this.objMultiLvlTreeviewInfoList = response;
      if (this.objMultiLvlTreeviewInfoList.length > 0) {
        var objTreeviewObjLevelInfoTemp = this.objMultiLvlTreeviewInfoList[0];
        if (objTreeviewObjLevelInfoTemp.objMultiLvlTreeviewInfoList.length > 0) {
          var objTreeviewObjLevelInfoTemp1 = objTreeviewObjLevelInfoTemp.objMultiLvlTreeviewInfoList[0];
          if (objTreeviewObjLevelInfoTemp1.objMultiLvlTreeviewInfoList.length > 0) {
            var objTreeviewObjLevelInfoTemp2 = objTreeviewObjLevelInfoTemp1.objMultiLvlTreeviewInfoList[0];
            if (objTreeviewObjLevelInfoTemp2.objMultiLvlTreeviewInfoList.length > 0) {
              var objTreeviewObjLevelInfoTemp3 = objTreeviewObjLevelInfoTemp2.objMultiLvlTreeviewInfoList[0];
              if (objTreeviewObjLevelInfoTemp3.objMultiLvlTreeviewInfoList.length > 0) {
                var objTreeviewObjLevelInfoTemp4 = objTreeviewObjLevelInfoTemp3.objMultiLvlTreeviewInfoList[0];
                if (objTreeviewObjLevelInfoTemp4.objMultiLvlTreeviewInfoList.length > 0) {
                  var objTreeviewObjLevelInfoTemp5 = objTreeviewObjLevelInfoTemp4.objMultiLvlTreeviewInfoList[0];
                  if (objTreeviewObjLevelInfoTemp5.objMultiLvlTreeviewInfoList.length > 0) {
                    var objTreeviewObjLevelInfoTemp6 = objTreeviewObjLevelInfoTemp5.objMultiLvlTreeviewInfoList[0];
                    if (objTreeviewObjLevelInfoTemp6.objMultiLvlTreeviewInfoList.length > 0) {
                      var objTreeviewObjLevelInfoTemp7 = objTreeviewObjLevelInfoTemp6.objMultiLvlTreeviewInfoList[0];
                      this.ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp7, '');
                      return false;
                    }
                    else {
                      this.ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp6, '');
                      return false;
                    }
                  }
                  else {
                    this.ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp5, '');
                    return false;
                  }
                }
                else {
                  this.ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp4, '');
                  return false;
                }
              }
              else {
                this.ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp3, '');
                return false;
              }
            }
            else {
              this.ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp2, '');
              return false;
            }
          }
          else {
            this.ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp1, '');
            return false;
          }
        }
        else {
          this.ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp, '');
          return false;
        }
      }
      return;
    }, (error) => {
      console.log(error);
    });
    return;
  }
  public ShowKpiBoxesInfoByObjectClick(objTreeviewObjLevelInfoTemp: any, IsBtnClick: any) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    if (IsBtnClick == '')
      this.HeaderTitleName = objTreeviewObjLevelInfoTemp.C001_LevelId;
    var objTreeviewObjLevelInfo = {
      C001_LevelId: objTreeviewObjLevelInfoTemp.C001_LevelId, C003_LevelName: objTreeviewObjLevelInfoTemp.C003_LevelName,
      C004_LevelDescription: objTreeviewObjLevelInfoTemp.C004_LevelDescription, C002_ParentLevelId: objTreeviewObjLevelInfoTemp.C002_ParentLevelId, IsBtnClick: IsBtnClick
    };
    this.KpiTreeviewObjectData.emit(objTreeviewObjLevelInfo);
    return;
  }
  public SetnShowParentLevelIdClick(objTreeviewObjLevelInfoTemp: any, IsOldRecord: any) {
    this.BtnSaveUpdateText = "Save";
    this.myform.controls['C001_LevelId'].setValue('');
    this.myform.controls['C002_ParentLevelId'].setValue('0');
    this.myform.controls['C003_LevelName'].setValue('');
    this.myform.controls['C004_LevelDescription'].setValue('');
    if (objTreeviewObjLevelInfoTemp != '') {
      this.myform.controls['C001_LevelId'].setValue(objTreeviewObjLevelInfoTemp.C001_LevelId);
      this.myform.controls['C002_ParentLevelId'].setValue(objTreeviewObjLevelInfoTemp.C002_ParentLevelId);
      if (IsOldRecord == '') {
        this.myform.controls['C001_LevelId'].setValue('');
        this.myform.controls['C002_ParentLevelId'].setValue(objTreeviewObjLevelInfoTemp.C001_LevelId);
      }
      else {
        this.BtnSaveUpdateText = "Update";
        this.myform.controls['C003_LevelName'].setValue(objTreeviewObjLevelInfoTemp.C003_LevelName);
        this.myform.controls['C004_LevelDescription'].setValue(objTreeviewObjLevelInfoTemp.C004_LevelDescription);
      }
    }
    return;
  }
  SaveUpdateTreeviewLevelInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    var C001_LevelId = this.myform.get("C001_LevelId")?.value;
    var C002_ParentLevelId = this.myform.get("C002_ParentLevelId")?.value;
    var C003_LevelName = this.myform.get("C003_LevelName")?.value;
    var C004_LevelDescription = this.myform.get("C004_LevelDescription")?.value;
    var LevelTypeInputs = this.myform.get("LevelTypeInputs")?.value;
    if (C002_ParentLevelId == null || C002_ParentLevelId == "") {
      Swal.fire("Please select parent!");
      return;
    }
    if (C003_LevelName == null || C003_LevelName == "") {
      Swal.fire("Please enter level name!");
      return;
    }
    if (C004_LevelDescription == null || C004_LevelDescription == "") {
      Swal.fire("Please level description!");
      return;
    }
    if (LevelTypeInputs == null || LevelTypeInputs == "") {
      Swal.fire("Please level type!");
      return;
    }

    this._KpiPageService.AddnUpdateMultiLevelTreeView(SessionToken, UserTypeId, UserName, C001_LevelId, C002_ParentLevelId, C003_LevelName, C004_LevelDescription,LevelTypeInputs).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objMultiLvlTreeviewInfoList = response;
      if (this.BtnSaveUpdateText == "Update") {
        Swal.fire("Record updated successfully!");
      }
      else {
        Swal.fire("Record saved successfully!");
      }
      this.CancelAddUpdateMultiLevelTreeview();
      return;
    }, (error) => {
      console.log(error);
    });
    return;
  }
  CancelAddUpdateMultiLevelTreeview() {
    this.BtnSaveUpdateText = "Save";
    this.myform.controls['C001_LevelId'].setValue('');
    this.myform.controls['C002_ParentLevelId'].setValue('0');
    this.myform.controls['C003_LevelName'].setValue('');
    this.myform.controls['C004_LevelDescription'].setValue('');
  }
  onClickAllTreeviewlevelsDelete() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    Swal.fire({
      title: 'Are you want to delete?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Are you want to sure delete?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          focusCancel: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Are you want to sure delete?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
              focusCancel: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this._KpiPageService.DeleteAllTreeviewlevelsInfo(SessionToken, UserTypeIdTemp, UserName,'CT0022').subscribe((response) => {
                  this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
                  this.objMultiLvlTreeviewInfoList =[];
                  Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
                });
              }
            })
          }
        })
      }
    })
  }
}
