/* 
    Author:	Nita
    Description: For common entry settings
    LastUpdate:on 13-12-23 by nita
*/

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { CommonEntryService } from './common-entry.service';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';

//gridview
export class CommonEntryFormValueInfoList {
  public Id: number = -1;
  public CommonEntryTypeId: string = "";
  public Description: string = "";
  public Act: string = "";
  public Abb: string = "";
  public TableName: string = "";
}

//dropdown
export class CommonEntryTypeMasterInfo {
  public Id: string = "";
  public Description: string = "";
}

@Component({
  selector: 'app-common-entry',
  templateUrl: './common-entry.component.html',
  styleUrls: ['./common-entry.component.scss']
})

export class CommonEntryComponent implements OnInit, OnDestroy {

  LeftSideTreeviewHeight: string = "";
  myform!: FormGroup;
  TableName: string = "CT0019";
  BtnSaveUpdateText: string = "Save";  

  //formcontrollers
  Id: number = -1;
  CommonEntryTypeId: string = "0";
  Description: string = "";
  Abbreviation: string = "";
  Act: string = "0";
  ActChecked: Boolean = false;
  
  disabled_CommonEntryType: boolean = false;
  IsshowGrid: boolean = false;
  IsshowAct: boolean = false;
  IsshowAbb: boolean = false;
  faPencil = faPencil;
  faTrash = faTrash;
  stringJson: string = "";

  public CommonEntryTypeFilterCtrl: FormControl = new FormControl();
  public filteredCommonEntryTypes: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActCommonEntryTypeMasterInfoList!: CommonEntryTypeMasterInfo[];

  objCommonEntryFormValueInfoList!: CommonEntryFormValueInfoList[];
  dataSource = new MatTableDataSource<CommonEntryFormValueInfoList>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sort!: MatSort;

  displayedColumns: string[] = ['action', 'TableName', 'Description', 'CreateBy', 'CreateDate'];

  private _onDestroy = new Subject<void>();
  protected _onDestroys = new Subject();

  constructor(private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService,  public _CRUDFunctionsService: CRUDFunctionsService, public _commonEntryService: CommonEntryService) { }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  //pageload
  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 125) + "px";

    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();

    this.reactiveForm();
    this.GetDropdownListByTableName('CT0019');

    this.CommonEntryTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterCommonEntryTypeInfo();
      });
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      CommonEntryTypeId: ['0', Validators.required],
      Description: ['', Validators.required],
      Act: ['0', Validators.required],
      Abbreviation: ['', Validators.required],
    });
  }

  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._commonEntryService.GetCommonEntryFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
  }

  //dropdown
  GetDropdownListByTableName(Table: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.TableName = Table;
    this._CRUDFunctionsService.GetDropdownListByTableName(SessionToken, UserTypeIdTemp, UserName, this.TableName).subscribe((response) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objActCommonEntryTypeMasterInfoList = JSON.parse(this.stringJson);
      this.filteredCommonEntryTypes.next(this.objActCommonEntryTypeMasterInfoList.slice());
      return false;
    }, (error) => {
      console.log(error);
    });
  }

  private filterCommonEntryTypeInfo() {
    if (!this.objActCommonEntryTypeMasterInfoList) {
      return;
    }
    let search = this.CommonEntryTypeFilterCtrl.value;
    if (!search) {
      this.filteredCommonEntryTypes.next(this.objActCommonEntryTypeMasterInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredCommonEntryTypes.next(
      this.objActCommonEntryTypeMasterInfoList.filter(data => data.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  //gridview
  GridViewCommonTableInfo() {
    this.IsshowGrid = true;    
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.TableName = "CT0019";
    this.CommonEntryTypeId = this.myform.get("CommonEntryTypeId")?.value;
    if(this.CommonEntryTypeId === '5')
      this.IsshowAct = true;
    else
      this.IsshowAct = false; 

    if(this.CommonEntryTypeId === '6')    
      this.IsshowAbb = true;      
    else
      this.IsshowAbb = false;

    this.Act = this.myform.get("Act")?.value;
    this._commonEntryService.GetTableNameInfoByCommonEntryTypeId(SessionToken, UserTypeIdTemp, UserName, this.TableName, this.CommonEntryTypeId,).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.TableName = response.Value;
      this._CRUDFunctionsService.GetCommonEntryFormvalueInfo(SessionToken, UserTypeIdTemp, UserName, this.TableName.toString()).subscribe((response1) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response1);
        this.stringJson = JSON.stringify(response1);
        this.objCommonEntryFormValueInfoList = JSON.parse(this.stringJson);
        console.log(this.objCommonEntryFormValueInfoList);
        this.dataSource.data = this.objCommonEntryFormValueInfoList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (this.CommonEntryTypeId === '5') {
          this.displayedColumns = ['action', 'TableName', 'Description', 'Act', 'CreateBy', 'CreateDate'];
        }
        else if (this.CommonEntryTypeId === '6') {
          this.displayedColumns = ['action', 'TableName', 'Description', 'Abbreviation', 'CreateBy', 'CreateDate'];
        }
        else {
          this.displayedColumns = ['action', 'TableName', 'Description', 'CreateBy', 'CreateDate'];
        }
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

  //insertupdate
  onClickInsertUpdateInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this.TableName = "CT0019";
    this.Id = this.myform.get("Id")?.value;
    this.CommonEntryTypeId = this.myform.get("CommonEntryTypeId")?.value;
    this.Description = this.myform.get("Description")?.value;
    if(this.CommonEntryTypeId === '5')
    {
      if(this.IsshowAct == true)
      {
        if (this.ActChecked == false)
          this.Act = "0";
        else
          this.Act = "1";
      }        
    }    
    if(this.CommonEntryTypeId === '6')
    {
      if(this.IsshowAbb == true)
      {
        this.Abbreviation = this.myform.get("Abbreviation")?.value;
      }
    } 
    if (this.CommonEntryTypeId == "" || this.CommonEntryTypeId == null) {
      Swal.fire('Please select Type!');
      return false;
    }
    if (this.Description == "" || this.Description == null) {
      Swal.fire('Please enter Description!');
      return false;
    }
    if (this.CommonEntryTypeId == "5" && (this.Act == "" || this.Act == null)) {
      Swal.fire('Please select Act!');
      return false;
    }
    if (this.CommonEntryTypeId == "6" && (this.Abbreviation == "" || this.Abbreviation == null)) {
      Swal.fire('Please enter Abbreviation!');
      return false;
    }

    this._commonEntryService.InsertUpdateCommonEntryTableValueInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName, this.Id, this.CommonEntryTypeId, this.Description, this.Act, this.Abbreviation).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForValidations(response);
      if (StrErrorMsg != '') {
        Swal.fire(StrErrorMsg);
        return false;
      }
      StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForCommonSetting(response);
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
      this.disabled_CommonEntryType=true;
      this.GridViewCommonTableInfo();
      this.onClickClearInfo();
      return false;

    }, (error) => {
      console.log(error);
    });

    return false;
  }

  //edit
  onClickEditInfo(CommonEntryFormValueInfoList: CommonEntryFormValueInfoList) {
    this.myform.controls['Id'].setValue(CommonEntryFormValueInfoList.Id);
    this.myform.controls['CommonEntryTypeId'].setValue(CommonEntryFormValueInfoList.CommonEntryTypeId);
    this.myform.controls['Description'].setValue(CommonEntryFormValueInfoList.Description);
    if (CommonEntryFormValueInfoList.Act == '1')
    {
      this.ActChecked = true;
      this.Act="1";
    }      
    else
    {
      this.ActChecked = false;
      this.Act="0";
    }
    this.myform.controls['Abbreviation'].setValue(CommonEntryFormValueInfoList.Abb);
    this.BtnSaveUpdateText = "Update";
    this.disabled_CommonEntryType=true;
    this.IsshowGrid = true;
  }

  //delete
  onClickDeleteInfo(Id: number) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this.TableName = "CT0019";
    this.CommonEntryTypeId = this.myform.get("CommonEntryTypeId")?.value;

    this._commonEntryService.GetTableNameInfoByCommonEntryTypeId(SessionToken, UserTypeIdTemp, UserName, this.TableName, this.CommonEntryTypeId,).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForCommonSetting(response);
      if (StrErrorMsg != '') {
        Swal.fire(StrErrorMsg);
        return false;
      }
      else {
        this.TableName = response.Value;
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
            this._CRUDFunctionsService.DeleteTableRecordbyId(SessionToken, UserTypeIdTemp, UserName, this.TableName.toString(), Id).subscribe((response1: any) => {
              this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response1);
              if (response1 == "Successfully Deleted!") {
                this.dataSource.data = this.dataSource.data.filter(
                  (objCommonEntryFormValueInfoList: CommonEntryFormValueInfoList) => objCommonEntryFormValueInfoList.Id != Id
                );
              }
              return false;
            });
            Swal.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
            this.GridViewCommonTableInfo();
            this.onClickClearInfo();
          }
        }, (error) => {
          console.log(error);
        });
        return
      }

    }, (error) => {
      console.log(error);
    });
  }
  
  //clear
  onClickClearInfo() {
    this.BtnSaveUpdateText = "Save";
    this.myform.reset();
    this.reactiveForm();
    this.disabled_CommonEntryType=false;
    this.IsshowGrid = false;
    this.IsshowAct = false;
    this.IsshowAbb = false;
    this.ActChecked = false;
  }

  //gridfilter
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

}