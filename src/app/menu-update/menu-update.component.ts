import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MenuInfo } from '../header/header.component';
import Swal from 'sweetalert2';
import { HeaderService } from '../Services/header.service';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';

export class DropDownList {
  public Id: string = "";
  public Description: string = "";
}
@Component({
    selector: 'app-menu-update',
    templateUrl: './menu-update.component.html',
    styleUrls: ['./menu-update.component.scss']
  })

  export class MenuUpdateComponent implements OnInit
  {
    myform!: FormGroup;
    HeaderTitleName: string = "";
    TempHeaderTitle: string = "";
    BtnSaveUpdateText: string = "Save";
    LeftSideTreeviewHeight: string = "";
    stringJson:string="";
    objMenuInfoList!: MenuInfo[];
    isdisable: boolean = false;
    splitArray: number[] = [];
    UserTypesPermns = new FormControl();

  public UserTypeFilterCtrl: FormControl = new FormControl();
  public filteredUserTypes: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActUserTypeMasterInfoList: DropDownList[]=[];

  public UserGroupFilterCtrl: FormControl = new FormControl();
  public filteredUserGroups: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActUserGroupMasterInfoList: DropDownList[]=[];

  public UserDesignationFilterCtrl: FormControl = new FormControl();
  public filteredUserDesignations: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActUserDesignationMasterInfoList: DropDownList[]=[];

  public MenuId: number=0;
  public ParentMenuId: number=0;
  public Title: string="";
  public DescriptionName: string="";
  public Url: string="";
  public IconName: string="";
  public AlertToId: string="";
  public IsCustomMenu: number=0;
  public VOrder: number=0;

  _onDestroy: any;
    constructor( public _headerService: HeaderService,private router: Router, public _CRUDFunctionsService: CRUDFunctionsService, private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService,public _ValidationerrormessagesService:ValidationerrormessagesService) { }
  
    ngOnInit(): void {
      this.CheckUserHasPermissionForPageurlOrNot();
      var h = window.innerHeight;
      this.LeftSideTreeviewHeight = (h - 150) + "px";
  
      this.reactiveForm();
      if (sessionStorage.getItem("SessionIsCustomMenu") === null) {
        this.GetLeftSideMenuDetailsDataSet();
      }
      this.UserTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUserTypeInfo();
      });

    this.GetDropdownListByTableName('CT0010');

    this.GetDropdownListByTableName('CT0011');

    this.GetDropdownListByTableName('CT0012');

    }
    selectedOption: string = '-1'; // Set a default option if needed
    inputText: string = '';

    reactiveForm() {
      this.myform = this._formBuilder.group({
        MenuId: [''],
        Title: [''],
        DescriptionName:[''],
        Url: [''],
        //UserTypeId: [''],
        IsCustomMenu:['-1'],
        ParentMenuId:['0'],
        VOrder:['']
      });
    }
    ShowAlert() {
      Swal.fire("hello");
    }
    CheckUserHasPermissionForPageurlOrNot() {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
      var SessionToken = sessionStorage.getItem('SessionToken') as string;
      var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
      var UserName = sessionStorage.getItem('UserName') as string;
      this._headerService.GetUserHasPermissionForMenuUpdate(SessionToken, UserTypeId, UserName).subscribe((response) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        this.stringJson = JSON.stringify(response);
      }, (error) => {
        console.log(error);
      });
      return false;
    }

    GetDropdownListByTableName(Table: string) {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
      var SessionToken = sessionStorage.getItem('SessionToken') as string;
      var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
      var UserName = sessionStorage.getItem('UserName') as string;
      var TableName = Table;
      this._CRUDFunctionsService.GetDropdownListByTableName(SessionToken, UserTypeId, UserName, TableName).subscribe((response: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
          this.stringJson = JSON.stringify(response);
          if (Table == 'CT0010') 
          {
            if (UserTypeId != '3') 
            {
              this.objActUserTypeMasterInfoList = JSON.parse(this.stringJson);
              this.filteredUserTypes.next(this.objActUserTypeMasterInfoList.slice());
              return;
            }
            else 
            {
              this.objActUserTypeMasterInfoList = JSON.parse(this.stringJson);
              this.filteredUserTypes.next(this.objActUserTypeMasterInfoList.slice());
              return;          
            }
          }
          if (Table == 'CT0011') {
            this.objActUserGroupMasterInfoList = JSON.parse(this.stringJson);
            this.filteredUserGroups.next(this.objActUserGroupMasterInfoList.slice());
            return;
          }
          if (Table == 'CT0012') {
            this.objActUserDesignationMasterInfoList = JSON.parse(this.stringJson);
            this.filteredUserDesignations.next(this.objActUserDesignationMasterInfoList.slice());
            return;
          }
      }, (error) => {
        console.log(error);
      });
    }

    private filterUserTypeInfo() {
      if (!this.objActUserTypeMasterInfoList) {
        return;
      }
      let search = this.UserTypeFilterCtrl.value;
      if (!search) {
        this.filteredUserTypes.next(this.objActUserTypeMasterInfoList.slice());
        return;
      }
      else {
        search = search.toLowerCase();
      }
      this.filteredUserTypes.next(
        this.objActUserTypeMasterInfoList.filter(data => data.Description.toLowerCase().indexOf(search) > - 1)
      );
    }

    GetLeftSideMenuDetailsDataSet() {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
      var SessionToken = sessionStorage.getItem('SessionToken') as string;
      var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
      var UserName = sessionStorage.getItem('UserName') as string;
      this._headerService.GetMenuInfoList(SessionToken, UserTypeId, UserName, '0').subscribe((response) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        this.stringJson = JSON.stringify(response);
        this.objMenuInfoList = JSON.parse(this.stringJson);
      }, (error) => {
        console.log(error);
      });
      return false;
    }

    public SetnShowParentLevelIdClick(objmenuviewObjLevelInfoTemp: any, IsOldRecord: any) {
      this.CancelAddUpdateMenuViewLevel();
      // this.BtnSaveUpdateText = "Save";
      // this.myform.controls['MenuId'].setValue('');
      // this.myform.controls['ParentMenuId'].setValue('0');
      // this.myform.controls['Title'].setValue('');
      // this.myform.controls['DescriptionName'].setValue('');
      console.log(objmenuviewObjLevelInfoTemp);
      if (objmenuviewObjLevelInfoTemp != '') {
        this.myform.controls['MenuId'].setValue(objmenuviewObjLevelInfoTemp.MenuId);
        this.myform.controls['ParentMenuId'].setValue(objmenuviewObjLevelInfoTemp.ParentMenuId);
        if (IsOldRecord == '') {
          this.myform.controls['MenuId'].setValue('');
          this.myform.controls['ParentMenuId'].setValue(objmenuviewObjLevelInfoTemp.MenuId);
        }
        else {
          this.BtnSaveUpdateText = "Update";
          this.isdisable=true;
          this.myform.controls['Title'].setValue(objmenuviewObjLevelInfoTemp.Title);
          this.myform.controls['DescriptionName'].setValue(objmenuviewObjLevelInfoTemp.DescriptionName);
          this.myform.controls['Url'].setValue(objmenuviewObjLevelInfoTemp.Url);
          //this.myform.controls['UserTypeId'].setValue(objmenuviewObjLevelInfoTemp.UserTypeId);
          this.myform.controls['IsCustomMenu'].setValue(objmenuviewObjLevelInfoTemp.IsCustomMenu);
          this.myform.controls['VOrder'].setValue(objmenuviewObjLevelInfoTemp.VOrder);
          const UserTypesSelectedValues: any = [];
          if (objmenuviewObjLevelInfoTemp.UserTypeId != "" && objmenuviewObjLevelInfoTemp.UserTypeId != null) {
            this.splitArray = objmenuviewObjLevelInfoTemp.UserTypeId.split(',');
            for (var i = 0; i < this.splitArray.length; i++) {
              var objUserMgmt = this.splitArray[i];
              UserTypesSelectedValues.push(objUserMgmt);
            }
          }
          this.UserTypesPermns = new FormControl(UserTypesSelectedValues);
        }
      }
      return;
    }
    SaveUpdateMenuViewLevelInfo() {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
      var SessionToken = sessionStorage.getItem('SessionToken') as string;
      var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
      var UserName = sessionStorage.getItem('UserName') as string;
  
      var MenuId = this.myform.get("MenuId")?.value;
      var Title = this.myform.get("Title")?.value;
      var DescriptionName = this.myform.get("DescriptionName")?.value;
      var Url = this.myform.get("Url")?.value;
      var IsCustomMenu = this.myform.get("IsCustomMenu")?.value;
      var ParentMenuId = this.myform.get("ParentMenuId")?.value;
      var VOrder = this.myform.get("VOrder")?.value;
      var UserTypesPermnsIds = "";
      if (this.UserTypesPermns.value != null && this.UserTypesPermns.value != "") {
        for (var i = 0; i < this.UserTypesPermns.value.length; i++) {
          var UserMgmtId = this.UserTypesPermns.value[i];
          UserTypesPermnsIds += UserMgmtId + ",";
        }
        if (UserTypesPermnsIds.length > 1)
        UserTypesPermnsIds = UserTypesPermnsIds.slice(0, -1);
      }
      if (Title == null || Title == "") {
        Swal.fire("Please select Title!");
        return;
      }
      if (DescriptionName == null || DescriptionName == "") {
        Swal.fire("Please enter DescriptionName!");
        return;
      }
      if (UserTypesPermnsIds == null || UserTypesPermnsIds == "") {
        Swal.fire("Please enter Permission!");
        return;
      }
      if (IsCustomMenu == null || IsCustomMenu == "") {
        Swal.fire("Please enter IsCustomMenu!");
        return;
      }
      if (VOrder == null || VOrder == "") {
        Swal.fire("Please enter VOrder!");
        return;
      }
      
      this._headerService.AddnUpdateMenuDetails(SessionToken, UserTypeId, UserName, MenuId,ParentMenuId, Title, DescriptionName, Url,UserTypesPermnsIds,IsCustomMenu,VOrder).subscribe((response: any) => {
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
          if (this.BtnSaveUpdateText == "Update") {
            Swal.fire("Record updated successfully!");
            window.location.reload();
          }
          else {
            Swal.fire("Record saved successfully!");
            window.location.reload();
          }
        
        }       
        this.CancelAddUpdateMenuViewLevel();
        return;
      }, (error) => {
        console.log(error);
      });
      return;
    }
    CancelAddUpdateMenuViewLevel() {
      this.BtnSaveUpdateText = "Save";
      this.myform.controls['MenuId'].setValue('');
      this.myform.controls['ParentMenuId'].setValue('0');
      this.myform.controls['Title'].setValue('');
      this.myform.controls['DescriptionName'].setValue('');
      this.myform.controls['Url'].setValue('');
      //this.myform.controls['UserTypeId'].setValue('');
      this.myform.controls['IsCustomMenu'].setValue('-1');
      this.myform.controls['VOrder'].setValue('');
      const UserTypesSelectedValues: any = [];
      this.UserTypesPermns = new FormControl(UserTypesSelectedValues);
    }
    onClickMenuViewlevelsDelete() {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
      var SessionToken = sessionStorage.getItem('SessionToken') as string;
      var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
      var UserName = sessionStorage.getItem('UserName') as string;

      var MenuId = this.myform.get("MenuId")?.value;
      if (MenuId == null || MenuId == "") {
        Swal.fire("Please select Menu Level!");
        return;
      }
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
                  this._headerService.DeleteMenuViewlevelsInfo(SessionToken, UserTypeIdTemp, UserName,'CT0009',MenuId).subscribe((response) => {
                    this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
                    this.objMenuInfoList= this.objMenuInfoList.filter(
                      (objMenuInfoList: MenuInfo) => objMenuInfoList.MenuId != MenuId
                    );
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
