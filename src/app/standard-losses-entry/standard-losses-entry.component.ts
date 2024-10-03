/*
    Author:Nita
    Description: For standerd losses entry
    LastUpdate:on 18-12-23 by nita
*/

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { StandardLossesEntryService } from './standard-losses-entry.service';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';


export class StandardLossesEntryFormValueInfoList {
  public Id: number = -1;
  public OeeParameter: string = "";
  public StdLossGroup: string = "";
  public SubGroup: string = "";
  public OeeId: string = "";
  public FirstLevelId: string = "";
  public SecondLevelId: string = "";
  public Reason: string = "";
  public Abb: string = "";
}

export class DropDownList {
  public Id: string = "";
  public Description: string = "";
}

@Component({
  selector: 'app-standard-losses-entry',
  templateUrl: './standard-losses-entry.component.html',
  styleUrls: ['./standard-losses-entry.component.scss']
})

export class StandardLossesEntryComponent implements OnInit, OnDestroy {

  LeftSideTreeviewHeight: string = "";
  selectedLossType: string = 'Standard';
  myform!: FormGroup;
  stringJson: string = "";
  TableName: string = "";
  BtnSaveUpdateText = "Save";
  displayedColumns: string[] = [];

  Id: number = -1;
  OEEParameterId: number = -1;
  StdLossGroupId: number = -1;
  StdLossGroup: string = "";
  SubGroup: string = "";
  Abb: string = "";
  Type: string = "";
    
  disabled_OEEParameterId:boolean=false;

  faPencil = faPencil;
  faTrash = faTrash;

  public OEEParameterFilterCtrl: FormControl = new FormControl();
  public filteredOEEParameters: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActOEEParameterMasterInfoList!: DropDownList[];

  public StdLossGroupFilterCtrl: FormControl = new FormControl();
  public filteredStdLossGroups: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActStdLossGroupMasterInfoList!: DropDownList[];

  objStandardLossesEntryFormValueInfoList!: StandardLossesEntryFormValueInfoList[];
  dataSource = new MatTableDataSource<StandardLossesEntryFormValueInfoList>();

  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sort!: MatSort;

  //displayedColumns: string[] = ['action','OeeParameter','StdLossGroup','SubGroup','Abb'];
  private _onDestroy = new Subject<void>();
  //multi
  protected _onDestroys = new Subject();

  constructor(private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService, public _CRUDFunctionsService: CRUDFunctionsService,public _standardLossesEntryService: StandardLossesEntryService) { }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 110) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();
    this.reactiveForm();
    this.GetDropdownListByTableName('CT0020');
    this.onViewLossesEntryFormInfo();

    this.OEEParameterFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOEEParameterInfo();
      });

    this.StdLossGroupFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterStdLossGroupInfo();
      });

  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      OEEParameterId: [-1, Validators.required],
      StdLossGroupId: [-1, Validators.required],
      StdLossGroup: ['', Validators.required],
      SubGroup: ['', Validators.required],
      Abb: ['', Validators.required],
    });
  }

  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._standardLossesEntryService.GetStandardLossesEntryFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
  }

  GetDropdownListByTableName(Table:string){
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.TableName = Table;
    this._CRUDFunctionsService.GetDropdownListByTableName(SessionToken, UserTypeIdTemp, UserName, this.TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objActOEEParameterMasterInfoList = JSON.parse(this.stringJson);
      this.filteredOEEParameters.next(this.objActOEEParameterMasterInfoList.slice());
      this.myform.controls['StdLossGroupId'].setValue(-1);
    }, (error) => {
      console.log(error);
    });
  }

  private filterOEEParameterInfo() {
    if (!this.objActOEEParameterMasterInfoList) {
      return;
    }
    let search = this.OEEParameterFilterCtrl.value;
    if (!search) {
      this.filteredOEEParameters.next(this.objActOEEParameterMasterInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredOEEParameters.next(
      this.objActOEEParameterMasterInfoList.filter(bank => bank.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  GetStdLossGroupByOEEParameterId() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.OEEParameterId = this.myform.get("OEEParameterId")?.value;
    this.TableName = "CT0021";
      this._standardLossesEntryService.GetStdLossGroupInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName, this.OEEParameterId).subscribe((response: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForLossesEntry(response);
        if (StrErrorMsg != '') 
        {
          Swal.fire(StrErrorMsg);
          return false;
        }
        else 
        {           
          this.stringJson = JSON.stringify(response);
          this.objActStdLossGroupMasterInfoList = JSON.parse(this.stringJson);
          this.filteredStdLossGroups.next(this.objActStdLossGroupMasterInfoList.slice()); 
          this.myform.controls['StdLossGroupId'].setValue(-1);        
        }
        return false;     
      }, (error) => {
        console.log(error);
      });
  }

  private filterStdLossGroupInfo() {
    if (!this.objActStdLossGroupMasterInfoList) {
      return;
    }
    let search = this.StdLossGroupFilterCtrl.value;
    if (!search) {
      this.filteredStdLossGroups.next(this.objActStdLossGroupMasterInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredStdLossGroups.next(
      this.objActStdLossGroupMasterInfoList.filter(bank => bank.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  onInsertUpdateInfoClick() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this.Id = this.myform.get("Id")?.value;
    this.OEEParameterId = this.myform.get("OEEParameterId")?.value;
    this.StdLossGroupId = this.myform.get("StdLossGroupId")?.value;
    this.StdLossGroup = this.myform.get("StdLossGroup")?.value;
    this.SubGroup = this.myform.get("SubGroup")?.value;
    this.Abb = this.myform.get("Abb")?.value;
    if (this.OEEParameterId == -1 || this.OEEParameterId == null) {
      Swal.fire('Please select OEE Parameter!');
      return false;
    }

    if (this.selectedLossType == 'Standard') {


      if (this.StdLossGroup == "" || this.StdLossGroup == null) {
        Swal.fire('Please select Std Loss Group!');
        return false;
      }
      if (this.StdLossGroupId == -1 || this.StdLossGroupId == null) {
        this.StdLossGroupId = -1;
      }
      if (this.SubGroup == "" || this.SubGroup == null) {
        this.SubGroup = "";
      }
      this.TableName = "CT0021";

    }
    else if (this.selectedLossType == 'SubStandard') {

      if (this.StdLossGroup == "" || this.StdLossGroup == null) {
        this.StdLossGroup = "";
      }
      if (this.StdLossGroupId == -1 || this.StdLossGroupId == null) {
        Swal.fire('Please select Std Loss Group!');
        return false;
      }
      if (this.SubGroup == "" || this.SubGroup == null) {
        Swal.fire('Please select Sub Group!');
        return false;
      }
      this.TableName = "CT0023";
    }

    else {
      Swal.fire('Please select one option between Standard Losses or Sub Standard Losses!');
      return false;
    }
    if (this.Abb == "" || this.Abb == null) {
      Swal.fire('Please enter Abbreviation!');
      return false;
    }

    this._standardLossesEntryService.InsertUpdateStandardLossesEntryFormValueInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName, this.selectedLossType, this.Id, this.OEEParameterId, this.StdLossGroup, this.StdLossGroupId, this.SubGroup, this.Abb).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForValidations(response);
      if (StrErrorMsg != '') {
        Swal.fire(StrErrorMsg);
        return false;
      }
      StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForLossesEntry(response);
      if (StrErrorMsg != '') {
        Swal.fire(StrErrorMsg);
        return false;
      }
      else {
        if (this.Id == -1) {
          Swal.fire('Data Added Successfully!');
        }
        else {
          Swal.fire('Data Updated Successfully!');
        }
      }
      this.onViewLossesEntryFormInfo();
      this.onClearInfoClick();
      return false;
    }
      , (error) => {
        console.log(error);
      });
    return false;
  }

  onViewLossesEntryFormInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    if (this.selectedLossType == 'Standard') {
      this.Type = "Show";
    }
    else if (this.selectedLossType == 'SubStandard') {
      this.Type = "Sublosses";
    }
    this._CRUDFunctionsService.GetLossesEntryGridViewInfoListbyType(SessionToken, UserTypeIdTemp, UserName, this.Type).subscribe((response) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objStandardLossesEntryFormValueInfoList = JSON.parse(this.stringJson);
      this.dataSource.data = this.objStandardLossesEntryFormValueInfoList;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      if (this.selectedLossType == "Standard") {
        this.displayedColumns = ['action', 'OeeParameter', 'StdLossGroup', 'Abb'];
      }
      else if (this.selectedLossType == 'SubStandard') {
        this.displayedColumns = ['action', 'OeeParameter', 'StdLossGroup', 'SubGroup', 'Abb'];
      }
      this.onClearInfoClick();
      return false;
    }, (error) => {
      console.log(error);
    });
  }

  onEditInfoClick(objStandardLossesEntryFormValueInfoList: StandardLossesEntryFormValueInfoList) {
    this.myform.controls['Id'].setValue(objStandardLossesEntryFormValueInfoList.Id);
    this.myform.controls['StdLossGroup'].setValue(objStandardLossesEntryFormValueInfoList.StdLossGroup);
    this.myform.controls['Abb'].setValue(objStandardLossesEntryFormValueInfoList.Abb);
    this.myform.controls['OEEParameterId'].setValue(objStandardLossesEntryFormValueInfoList.OeeId);
    this.myform.controls['StdLossGroupId'].setValue(Number(objStandardLossesEntryFormValueInfoList.FirstLevelId));
    this.myform.controls['SubGroup'].setValue(objStandardLossesEntryFormValueInfoList.Reason);
    this.BtnSaveUpdateText = "Update";  
    this.disabled_OEEParameterId=true;
  }

  onDeleteInfoClick(Id: number) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    if (this.selectedLossType == 'Standard') {
      this.TableName = "CT0021";
    }
    else if (this.selectedLossType == 'SubStandard') {
      this.TableName = "CT0023";
    }
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
        this._CRUDFunctionsService.DeleteTableRecordbyId(SessionToken, UserTypeIdTemp, UserName, this.TableName, Id).subscribe((response: any) => {
          this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
          if (response == "Successfully Deleted!") {
            this.dataSource.data = this.dataSource.data.filter(
              (objStandardLossesEntryFormValueInfoList: StandardLossesEntryFormValueInfoList) => objStandardLossesEntryFormValueInfoList.Id != Id
            );
          }
          return false;
        });
        Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        );
        this.onClearInfoClick();
        this.onViewLossesEntryFormInfo();
      }
    }, (error) => {
      console.log(error);
    });
  }

  onClearInfoClick() {
    this.BtnSaveUpdateText = "Save";
    this.myform.reset();
    this.reactiveForm();
    this.GetDropdownListByTableName('CT0020');
    this.GetStdLossGroupByOEEParameterId();  
    this.disabled_OEEParameterId=false;
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

}