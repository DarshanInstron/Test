import { Component, EventEmitter, Output } from '@angular/core';
import { MultiLvlTreeviewInfo } from '../kpipage/kpipage.component';
import { Router } from '@angular/router';
import { KpiPageService } from '../Services/kpi-page.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ManualEntryService } from '../Services/manual-entry.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';
import { TreeviewReorderService } from '../Services/treeview-reorder.service';
import Swal from 'sweetalert2';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Component({
  selector: 'app-treeview-reorder',
  templateUrl: './treeview-reorder.component.html',
  styleUrls: ['./treeview-reorder.component.scss'],
})
export class TreeviewReorderComponent {
  objMultiLvlTreeviewInfoList: MultiLvlTreeviewInfo[] = [];
  objMultiLvlTreeviewInfoList1: MultiLvlTreeviewInfo[] = [];
  myform!: FormGroup;
  C001_LevelId: string = "";
  C002_ParentLevelId: string = "";
  C003_LevelName: string = "";
  C004_LevelDescription: string = "";
  HeaderTitleName: string = "";
  TempHeaderTitle: string = "";
  BtnSaveUpdateText: string = "Save";
  LeftSideTreeviewHeight: string = "";
  LevelTypeInputs:string="";
  ParentLevelId:string="";

  @Output() KpiTreeviewObjectData = new EventEmitter<any>();
  constructor(private router: Router, public _KpiPageService: KpiPageService, public _ManualEntryPageService: ManualEntryService,
     private _formBuilder: FormBuilder, public _treeviewReorderService: TreeviewReorderService,public _ValidationerrormessagesService:ValidationerrormessagesService,private _GlobalConstantsService: GlobalConstantsService) { }

  ngOnInit(): void {
     this.CheckUserHasPermissionForPageurlOrNot()
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 138) + "px";

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
 CheckUserHasPermissionForPageurlOrNot(){
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._treeviewReorderService.GettreeviewreorderFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error: any) => {
      console.log(error);
    });
  }
  GetLeftSideTreeDetailsDataSet() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this. LevelTypeInputs = this.myform.get("LevelTypeInputs")?.value;
    this.BtnSaveUpdateText = "Save";
    this.myform.reset();
    this.myform.controls['LevelTypeInputs'].setValue(this.LevelTypeInputs);

      this._KpiPageService.GetMultiLevelTreeViewByParametersnLevelLimit(SessionToken, UserTypeId, UserName, '-1','99','','','','',this.LevelTypeInputs,'','').subscribe((response: any) => {
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

  public SetnShowParentLevelIdClick(objTreeviewObjLevelInfoTemp: any, ForLevelNo: any) {
    this.ParentLevelId=objTreeviewObjLevelInfoTemp.C001_LevelId;
    this.getManualEntryDropdowns(objTreeviewObjLevelInfoTemp.C001_LevelId,ForLevelNo);
    return;
  }

  getManualEntryDropdowns(LevelId: string, ForLevelNo: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    if (LevelId == "0" && ForLevelNo != "0")
      return;
      var LevelTypeInputs = this.myform.get("LevelTypeInputs")?.value;
    this._ManualEntryPageService.getManualEntryDropdowns(SessionToken, UserTypeId, UserName, LevelId, LevelTypeInputs).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objMultiLvlTreeviewInfoList1 = response;
    }, (error) => {
      console.log(error);
    });
    return;
  }

//for drag and drop start
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.objMultiLvlTreeviewInfoList1, event.previousIndex, event.currentIndex);
  }


// for drag and drop end

UpdateMultiLevelTreeViewByParametersnList(){
  this._GlobalConstantsService.CheckSessionIsRuningOrNot();
  var SessionToken = sessionStorage.getItem('SessionToken') as string;
  var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
  var UserName = sessionStorage.getItem('UserName') as string;

  this._treeviewReorderService.UpdateMultiLevelTreeViewByParametersnList(SessionToken, UserTypeId, UserName, this.ParentLevelId, this.objMultiLvlTreeviewInfoList1).subscribe((response: any) => {
    this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    Swal.fire("Treeview Updated");
  }, (error) => {
    console.log(error);
  });
  return;
}

}
