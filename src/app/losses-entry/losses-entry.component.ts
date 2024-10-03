/*
   Author:	Nita
   Description: For losses Entry
   LastUpdate:on 18-12-23 by nita for VAPT
*/

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { LossesEntryService } from './losses-entry.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';

export class DropDownList {
  public Id: string = "";
  public Description: string = "";
}

export class LossesEntryFormValueInfoList {
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

@Component({
  selector: 'app-losses-entry',
  templateUrl: './losses-entry.component.html',
  styleUrls: ['./losses-entry.component.scss']
})

export class LossesEntryComponent implements OnInit, OnDestroy {

  LeftSideTreeviewHeight: string = "";
  myform!: FormGroup;
  BtnSaveUpdateText = "Save";
  stringJson: string = "";
  TableName: string = "";
  faPencil = faPencil;
  faTrash = faTrash;

  Id: number = -1;
  OEEParameterId: number = -1;
  StdLossGroupId: number = -1;
  SubGroupId: number = -1;
  Reason: string = "";
  Abbreviation: string = "";
  disabled_OEEParameterId:boolean=false;

  public OEEParameterFilterCtrl: FormControl = new FormControl();
  public filteredOEEParameters: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActOEEParameterMasterInfoList!: DropDownList[];

  public StdLossGroupFilterCtrl: FormControl = new FormControl();
  public filteredStdLossGroups: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActStdLossGroupMasterInfoList!: DropDownList[];

  public SubGroupFilterCtrl: FormControl = new FormControl();
  public filteredSubGroups: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActSubGroupMasterInfoList!: DropDownList[];

  objLossesEntryFormValueInfoList!: LossesEntryFormValueInfoList[];
  dataSource = new MatTableDataSource<LossesEntryFormValueInfoList>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sort!: MatSort;

  displayedColumns: string[] = ['action', 'OeeParameter', 'StdLossGroup', 'SubGroup', 'Reason', 'Abb'];

  private _onDestroy = new Subject<void>();

  constructor(private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService, public _CRUDFunctionsService: CRUDFunctionsService, public _lossesEntryService: LossesEntryService) { }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 120) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();
    this.GetDropdownListByTableName('CT0020');
    this.reactiveForm();
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

    this.SubGroupFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSubGroupInfo();
      });

  }

  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this._lossesEntryService.GetLossesEntryFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      OEEParameterId: [-1, Validators.required],
      StdLossGroupId: [-1, Validators.required],
      SubGroupId: [-1, Validators.required],
      Reason: ['', Validators.required],
      Abbreviation: ['', Validators.required],
    });
  }

  GetDropdownListByTableName(Table:string) {
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

  GetDropdownListBySelectedId(Table: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;    
    this.StdLossGroupId = this.myform.get("StdLossGroupId")?.value;
    console.log(this.StdLossGroupId);
    var SelectedId = 0;
    if (Table == 'CT0021')
      SelectedId = this.myform.get("OEEParameterId")?.value;
    if (Table == 'CT0023')
      SelectedId = this.myform.get("StdLossGroupId")?.value;
    var TableName = Table;
    this._lossesEntryService.GetDropdownListBySelectedId(SessionToken, UserTypeId, UserName, TableName, SelectedId).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForLossesEntry(response);
      if (StrErrorMsg != '') {
        Swal.fire(StrErrorMsg);
        return false;
      }
      else 
      {
        this.stringJson = JSON.stringify(response);
        if (Table == 'CT0021')
        {  
          if (Table == 'CT0021' && (this.OEEParameterId != -1 || this.OEEParameterId != null)) 
          {
            this.objActStdLossGroupMasterInfoList = JSON.parse(this.stringJson);
            this.filteredStdLossGroups.next(this.objActStdLossGroupMasterInfoList.slice());               
            this.myform.controls['StdLossGroupId'].setValue(-1);              
            this.myform.controls['SubGroupId'].setValue(-1);
            return;
          }        
          else
          {            
            Swal.fire('Please select OEE Parameter!');
            return false;           
          }
        }
        if (Table == 'CT0023' )
        {  
          if (Table == 'CT0023' && (this.StdLossGroupId != -1 || this.StdLossGroupId != null)) 
          {
            this.objActSubGroupMasterInfoList = JSON.parse(this.stringJson);
            this.filteredSubGroups.next(this.objActSubGroupMasterInfoList.slice());               
            this.myform.controls['SubGroupId'].setValue(-1);
            return;    
          }        
          else
          {
            Swal.fire('Please select Std Loss Group!');
            return false;       
          }
        } 
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

  private filterSubGroupInfo() {
    if (!this.objActSubGroupMasterInfoList) {
      return;
    }
    let search = this.SubGroupFilterCtrl.value;
    if (!search) {
      this.filteredSubGroups.next(this.objActSubGroupMasterInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredSubGroups.next(
      this.objActSubGroupMasterInfoList.filter(bank => bank.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  onClearInfoClick() {
    this.BtnSaveUpdateText = "Save";
    this.myform.reset();
    this.reactiveForm();
    this.GetDropdownListBySelectedId('CT0021');
    this.GetDropdownListBySelectedId('CT0023');
    this.disabled_OEEParameterId=false;
  }

  onInsertUpdateInfoClick() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.TableName = "CT0024";
    this.Id = this.myform.get("Id")?.value;
    this.OEEParameterId = this.myform.get("OEEParameterId")?.value;
    this.StdLossGroupId = this.myform.get("StdLossGroupId")?.value;
    this.SubGroupId = this.myform.get("SubGroupId")?.value;
    this.Reason = this.myform.get("Reason")?.value;
    this.Abbreviation = this.myform.get("Abbreviation")?.value;
    if (this.OEEParameterId == -1 || this.OEEParameterId == null) {
      Swal.fire('Please select OEE Parameter!');
      return false;
    }
    if (this.StdLossGroupId == -1 || this.StdLossGroupId == null) {
      Swal.fire('Please select Std Loss Group!');
      return false;
    }
    if (this.SubGroupId == -1 || this.SubGroupId == null) {
      Swal.fire('Please select Sub Group!');
      return false;
    }
    if (this.Reason == "" || this.Reason == null) {
      Swal.fire('Please enter Reason!');
      return false;
    }
    if (this.Abbreviation == "" || this.Abbreviation == null) {
      Swal.fire('Please enter Abbreviation!');
      return false;
    }

    this._lossesEntryService.InsertUpdatelossesEntryFormValueInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName, this.Id, this.OEEParameterId, this.StdLossGroupId, this.SubGroupId, this.Reason, this.Abbreviation).subscribe((response: any) => {
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
      this.onClearInfoClick();
      this.onViewLossesEntryFormInfo();
      return false;
    }, (error) => {
      console.log(error);
    });
    return false;
  }

  onEditInfoClick(objLossesEntryFormValueInfoList: LossesEntryFormValueInfoList) {
    this.myform.controls['Id'].setValue(objLossesEntryFormValueInfoList.Id);
    this.myform.controls['Reason'].setValue(objLossesEntryFormValueInfoList.Reason);
    this.myform.controls['Abbreviation'].setValue(objLossesEntryFormValueInfoList.Abb);
    this.myform.controls['OEEParameterId'].setValue(objLossesEntryFormValueInfoList.OeeId);
    this.myform.controls['StdLossGroupId'].setValue(Number(objLossesEntryFormValueInfoList.FirstLevelId));
    this.myform.controls['SubGroupId'].setValue(Number(objLossesEntryFormValueInfoList.SecondLevelId));
    this.BtnSaveUpdateText = "Update";    
    this.disabled_OEEParameterId=true;
  }

  onDeleteInfoClick(Id: number) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.TableName = "CT0024";
    Swal.fire({
      title: 'Are you sure to delete?',
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
              (objLossesEntryFormValueInfoList: LossesEntryFormValueInfoList) => objLossesEntryFormValueInfoList.Id != Id
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

  onViewLossesEntryFormInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var Type = "Grid";
    this._CRUDFunctionsService.GetLossesEntryGridViewInfoListbyType(SessionToken, UserTypeIdTemp, UserName, Type).subscribe((response) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objLossesEntryFormValueInfoList = JSON.parse(this.stringJson);
      this.dataSource.data = this.objLossesEntryFormValueInfoList;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.onClearInfoClick();
    }, (error) => {
      console.log(error);
    });
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

}