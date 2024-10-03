import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ManualEntryService } from '../Services/manual-entry.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { HeaderService } from '../Services/header.service';
import { MenuInfo } from '../header/header.component';

@Component({
  selector: 'app-menu-reorder',
  templateUrl: './menu-reorder.component.html',
  styleUrls: ['./menu-reorder.component.scss']
})
export class MenuReorderComponent {
  objMultiLvlMenuviewInfoList1: MenuInfo[] = [];
  myform!: FormGroup;
  HeaderTitleName: string = "";
  TempHeaderTitle: string = "";
  BtnSaveUpdateText: string = "Save";
  LeftSideMenuviewHeight: string = "";
  LevelTypeInputs:string="";
  ParentLevelId:string="0";
  stringJson:string="";
  objMenuInfoList!: MenuInfo[];

  public MenuId: number=0;
  public ParentMenuId: number=0;
  public Title: string="";
  public DescriptionName: string="";
  public Url: string="";
  public IconName: string="";
  public AlertToId: string="";
  public IsCustomMenu: number=0;
  public VOrder: number=0;
  
  @Output() KpiTreeviewObjectData = new EventEmitter<any>();
  constructor( public _headerService: HeaderService,private router: Router, public _ManualEntryPageService: ManualEntryService,
     private _formBuilder: FormBuilder,public _ValidationerrormessagesService:ValidationerrormessagesService,private _GlobalConstantsService: GlobalConstantsService) { }

  ngOnInit(): void {
    this.CheckUserHasPermissionForPageurlOrNot();
    var h = window.innerHeight;
    this.LeftSideMenuviewHeight = (h - 138) + "px";

    this.reactiveForm();
    if (sessionStorage.getItem("SessionIsCustomMenu") === null) {
      this.GetLeftSideMenuDetailsDataSet();
      this.getManualEntryDropdowns("0","0");
      console.log(this.ParentLevelId)
    }
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      MenuId: [''],
      Title: [''],
      DescriptionName:[''],
      Url: [''],
      AlertToId: [''],
      IsCustomMenu:[''],
      ParentMenuId:[''],
      VOrder:['']
    });
  }
 CheckUserHasPermissionForPageurlOrNot(){
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._headerService.GetMenuViewreorderFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error: any) => {
      console.log(error);
    });
  }
  GetLeftSideMenuDetailsDataSet() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
   this._headerService.GetUserHasPermissionForMenuList(SessionToken, UserTypeId, UserName).subscribe((response) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objMenuInfoList = JSON.parse(this.stringJson);
    }, (error) => {
      console.log(error);
    });
    return false;
  }
  
  public ShowKpiBoxesInfoByObjectClick(objMenuviewObjLevelInfoTemp: any, IsBtnClick: any) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    if (IsBtnClick == '')
      this.HeaderTitleName = objMenuviewObjLevelInfoTemp.MenuId;
    var objMenuviewObjLevelInfo = {
      MenuId: objMenuviewObjLevelInfoTemp.MenuId, Title: objMenuviewObjLevelInfoTemp.Title,
      DescriptionName: objMenuviewObjLevelInfoTemp.DescriptionName, ParentMenuId: objMenuviewObjLevelInfoTemp.ParentMenuId, IsBtnClick: IsBtnClick
    };
    this.KpiTreeviewObjectData.emit(objMenuviewObjLevelInfo);
    return;
  }

  public SetnShowParentLevelIdClick(objMenuviewObjLevelInfoTemp: any, ForLevelNo: any) {
    this.ParentLevelId=objMenuviewObjLevelInfoTemp.MenuId;
    this.getManualEntryDropdowns(objMenuviewObjLevelInfoTemp.MenuId,ForLevelNo);
    return;
  }

  getManualEntryDropdowns(LevelId: string, ForLevelNo: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._ManualEntryPageService.getManualEntryDropdownsAccParentId(SessionToken, UserTypeId, UserName, LevelId).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objMultiLvlMenuviewInfoList1 = response;
    }, (error) => {
      console.log(error);
    });
    return;
  }

//for drag and drop start
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.objMultiLvlMenuviewInfoList1, event.previousIndex, event.currentIndex);
  }


// for drag and drop end

UpdateMenuViewByParametersnList(){
  this._GlobalConstantsService.CheckSessionIsRuningOrNot();
  var SessionToken = sessionStorage.getItem('SessionToken') as string;
  var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
  var UserName = sessionStorage.getItem('UserName') as string;

  this._headerService.UpdateMenuViewByParametersnList(SessionToken, UserTypeId, UserName, this.ParentLevelId, this.objMultiLvlMenuviewInfoList1).subscribe((response: any) => {
    this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    Swal.fire("MenuView Updated");
    window.location.reload();
  }, (error) => {
    console.log(error);
  });
  return;
}
}
