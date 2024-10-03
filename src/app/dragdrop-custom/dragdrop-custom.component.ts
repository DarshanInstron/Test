import { Component, EventEmitter, Output } from '@angular/core';
import { MultiLvlTreeviewInfo, TagInDetailsInfo } from '../kpipage/kpipage.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KpiPageService } from '../Services/kpi-page.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dragdrop-custom',
  templateUrl: './dragdrop-custom.component.html',
  styleUrls: ['./dragdrop-custom.component.scss']
})

export class DragdropCustomComponent {
selectedcustomsetting: string = 'CustomKPISetting';
LeftSideTreeviewHeight: any;
myform!: FormGroup;
objMultiLvlTreeviewInfoList: MultiLvlTreeviewInfo[] = [];
BtnSaveUpdateText: string = "Save";
HeaderTitleName: string = "";
LevelTypePassToChild: string = "a";
LevelUpToPassToChild: string = "99";
WithParametersPassToChild: string = "1";
SelectedParamIds: string = "";
IsPageLoad: string = "1";
objTreeviewSelectObj: any;
selectedTags = new FormControl();
tempObjTagInDetailsInfoList: any = [];

@Output() PassSelectedParamIds = new EventEmitter<any>();
@Output() KpiTreeviewObjectData = new EventEmitter<any>();
 
constructor(public _KpiPageService: KpiPageService, private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService) { }
 
  ngOnInit(): void {
    this.reactiveForm();

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
  
  ChangeLeftSideTreeTagsSelection(SelectedParamIds: any) {
    this.SelectedParamIds = SelectedParamIds;
    console.log(SelectedParamIds);
    if (this.IsPageLoad == "1") {
      setTimeout(() => {
        //this.onClickViewButton();
        this.IsPageLoad = "0";
      }, 1000);
   
    }
    
  }
  
  getKpiBoxDataByPlcNumberGatewayNoObjName($event: any) {
    this.objTreeviewSelectObj = $event;
    this.tempObjTagInDetailsInfoList.push(this.objTreeviewSelectObj);
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
  removeTagFromArr(objTagInDetailsInfoInfo: any) {
    const index = this.tempObjTagInDetailsInfoList.indexOf(objTagInDetailsInfoInfo);
    if (index !== -1) {
      this.tempObjTagInDetailsInfoList.splice(index, 1);
    }
    //this.UncheckAllorSelectedParamters(objTagInDetailsInfoInfo.UniqueId, "");
  }

SetnShowSelectedTagIdClick(objSelectedTagIdLevelInfoTemp: any) {
    this.ChangeLeftSideTreeTagsSelection(this.SelectedParamIds);
   //this.CancelAddUpdateMenuViewLevel();
    if (objSelectedTagIdLevelInfoTemp != '') {
      this.myform.controls['C001_LevelId'].setValue(objSelectedTagIdLevelInfoTemp.C001_LevelId);
      this.myform.controls['C002_ParentLevelId'].setValue(objSelectedTagIdLevelInfoTemp.C002_ParentLevelId);
      this.myform.controls['C003_LevelName'].setValue(objSelectedTagIdLevelInfoTemp.C003_LevelName);
      this.myform.controls['C004_LevelDescription'].setValue(objSelectedTagIdLevelInfoTemp.C004_LevelDescription);
      this.myform.controls['LevelTypeInputs'].setValue(objSelectedTagIdLevelInfoTemp.LevelTypeInputs);
      
    }
    return;
  }
  objTagInDetailsInfoInfo: any = [];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tempObjTagInDetailsInfoList, event.previousIndex, event.currentIndex);
  }
  
}
