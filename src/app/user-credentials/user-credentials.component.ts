/*
   Author:	Nita
   Description: For User credentials details
   LastUpdate:on 21-11-23 by nita for VAPT
*/

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, Subject, takeUntil } from 'rxjs'
import Swal from 'sweetalert2';
import { EmailIdService } from '../Services/email-id.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { UserCredentialsService } from './user-credentials.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { faEye, faEyeSlash, faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR, faUserPlus,faM } from '@fortawesome/free-solid-svg-icons';


export class UserCredentialsFormValueInfoList {
  public Id: number = -1;
  public UserFullName: string = "";
  public MobileNo: string = "";
  public MailId: string = "";
  public CreateBy: string = "";
  public CreateDate: string = "";
  public User_Name: string = "";
  public Password: string = "";
  public UserTypeId: string = "";
  public DesignationId: string = "";
  public EmployeeNo: string = "";
  public UserGroupId: string = "";
}

export class DropDownList {
  public Id: string = "";
  public Description: string = "";
}

@Component({
  selector: 'app-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.scss']
})

export class UserCredentialsComponent implements OnInit, OnDestroy {

  LeftSideTreeviewHeight: string = "";

  myform!: FormGroup;
  TableName: string = "CT0005";

  strErrorMsg: string = "";
  stringJson: string = "";

  Id: number = -1;
  MailId: string = "";
  UserFullName: string = "";
  UserName: string = "";
  password: string = "";
  MobileNo: string = "";
  EmployeeNo: string = "";
  UserTypeId: string = "";
  UserDesignationId: string = "";
  UserGroupId: string = "";
  CreateBy: string = "";
  CreateDate: string = "";

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  hide = true;
  faPencil = faPencil;
  faTrash = faTrash
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faUserPlus=faUserPlus;
  faM=faM;

  emailtext = EmailIdService.emailtext;

  BtnSaveUpdateText: string = "Save";

  objUserCredentialsFormValueInfoList!: UserCredentialsFormValueInfoList[];
  dataSource = new MatTableDataSource<UserCredentialsFormValueInfoList>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sort!: MatSort;

  public UserTypeFilterCtrl: FormControl = new FormControl();
  public filteredUserTypes: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActUserTypeMasterInfoList: DropDownList[]=[];

  public UserGroupFilterCtrl: FormControl = new FormControl();
  public filteredUserGroups: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActUserGroupMasterInfoList: DropDownList[]=[];

  public UserDesignationFilterCtrl: FormControl = new FormControl();
  public filteredUserDesignations: ReplaySubject<any> = new ReplaySubject<any>(1);
  objActUserDesignationMasterInfoList: DropDownList[]=[];

  displayedColumns: string[] = ['action', 'MailId', 'EmpName', 'EmpNo', 'MobileNo', 'UserName', 'UserTypeDescription', 'UserGroupDescription', 'UserDesignationDescription', 'CreateBy', 'CreateDate'];

  private _onDestroy = new Subject<void>();

  constructor(public _userCredentialsService: UserCredentialsService, public _CRUDFunctionsService: CRUDFunctionsService, private _GlobalConstantsService: GlobalConstantsService, private _formBuilder: FormBuilder,public _ValidationerrormessagesService:ValidationerrormessagesService) { }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 110) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();

    this.GetDropdownListByTableName('CT0010');
    this.GetDropdownListByTableName('CT0011');
    this.GetDropdownListByTableName('CT0012');
    this.reactiveForm();

    this.onViewUserCredentialsFormInfo();

    this.UserTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUserTypeInfo();
      });

      this.UserGroupFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterUserGroupInfo();
        });

    this.UserDesignationFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUserDesignationInfo();
      });

  }

  //pageload
  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._userCredentialsService.CheckUserHasPermissionForPageUrl(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
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
            // const pattern = /{"Id":\s*"3",\s*"Description":[^{}]*},?\s*/g;
            // this.stringJson = this.stringJson.replace(pattern, '');
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

  private filterUserGroupInfo() {
    if (!this.objActUserGroupMasterInfoList) {
      return;
    }
    let search = this.UserGroupFilterCtrl.value;
    if (!search) {
      this.filteredUserGroups.next(this.objActUserGroupMasterInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredUserGroups.next(
      this.objActUserGroupMasterInfoList.filter(bank6 => bank6.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  private filterUserDesignationInfo() {
    if (!this.objActUserDesignationMasterInfoList) {
      return;
    }
    let search = this.UserDesignationFilterCtrl.value;
    if (!search) {
      this.filteredUserDesignations.next(this.objActUserDesignationMasterInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredUserDesignations.next(
      this.objActUserDesignationMasterInfoList.filter(data => data.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      MailId: ['', Validators.required],
      UserFullName: ['', Validators.required],
      UserName: ['', Validators.required],
      password: ['', Validators.required],
      MobileNo: ['', Validators.required],
      EmployeeNo: ['', Validators.required],
      UserTypeId: ['0', Validators.required],
      UserGroupId: ['0', Validators.required],
      UserDesignationId: ['0', Validators.required],
      CreateBy: ['', Validators.required],
      CreateDate: ['', Validators.required],
    });
  }

  onViewUserCredentialsFormInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._CRUDFunctionsService.GetTableRecordsListForGridView(SessionToken, UserTypeId, UserName, this.TableName).subscribe((response) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        this.stringJson = JSON.stringify(response);
        this.objUserCredentialsFormValueInfoList = JSON.parse(this.stringJson);
        if (UserTypeId != '3') {
          // Filter the array to show data where UserTypeId is not equal to 3
          const filteredData = this.objUserCredentialsFormValueInfoList.filter(item => item.UserTypeId !== '3');
          // Update the 'dataSource' with the filtered data
          this.dataSource.data = filteredData;
        }
        else {
          this.dataSource.data = this.objUserCredentialsFormValueInfoList;
        }
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      this.onClickClearInfo();
    }, (error) => {
      console.log(error);
    });
  }

  //onbtnclick
  onClickClearInfo() {
    this.BtnSaveUpdateText = "Save";
    this.myform.reset();
    this.reactiveForm();
  }

  onClickInsertUpdateInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.TableName = "CT0005";
    this.Id = this.myform.get("Id")?.value;
    this.UserFullName = this.myform.get("UserFullName")?.value;
    this.MobileNo = this.myform.get("MobileNo")?.value;
    this.MailId = this.myform.get("MailId")?.value;
    this.UserName = this.myform.get("UserName")?.value;
    this.password = this.myform.get("password")?.value;
    this.EmployeeNo = this.myform.get("EmployeeNo")?.value;
    this.UserTypeId = this.myform.get("UserTypeId")?.value;
    this.UserDesignationId = this.myform.get("UserDesignationId")?.value;
    this.UserGroupId = this.myform.get("UserGroupId")?.value;

    if (this.UserFullName == "" || this.UserFullName == null) {
      Swal.fire('Please Enter Name of Person!');
      return false;
    }
    if (this.UserName == "" || this.UserName == null) {
      Swal.fire('Please Enter User Name!');
      return false;
    }
    if (this.password == "" || this.password == null) {
      Swal.fire('Please Enter Password!');
      return false;
    }
    if (this.UserTypeId == "" || this.UserTypeId == null || this.UserTypeId == '0') {
      Swal.fire('Please Select User Type!');
      return false;
    }
    if (this.MobileNo == "" || this.MobileNo == null) {
      Swal.fire('Please Enter Mobile No!');
      return false;
    }
    if (this.MailId == "" || this.MailId == null) {
      Swal.fire('Please Enter Mail Id!');
      return false;
    }
    if (this.EmployeeNo == "" || this.EmployeeNo == null) {
      Swal.fire('Please Enter Employee No!');
      return false;
    }
    if (this.UserDesignationId == "" || this.UserDesignationId == null || this.UserDesignationId == '0') {
      Swal.fire('Please Select User Designation!');
      return false;
    }
    if (this.UserGroupId == "" || this.UserGroupId == null || this.UserGroupId == '0') {
      Swal.fire('Please Select User Group!');
      return false;
    }
    this._userCredentialsService.CheckPasswordIsValidOrNot(SessionToken, UserTypeIdTemp, UserName, 'CT0006', this.password).subscribe((response2: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response2);
      var StrErrorMsg = response2;
      if (StrErrorMsg != '') {
        Swal.fire(StrErrorMsg);
        return false;
      }
      // this._userCredentialsService.CheckEmployeeNoIsValidOrNot(SessionToken, UserTypeIdTemp, UserName, 'CT0004', this.EmployeeNo).subscribe((response1: any) => {
      //   this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response1);
      //   var StrErrorMsg = response1;
      //   if (StrErrorMsg != '') {
      //     Swal.fire(StrErrorMsg);
      //     return false;
      //   }
        this._userCredentialsService.InsertUpdateUserCredentialsFormValueInfoList(SessionToken, UserTypeIdTemp, UserName, this.TableName, this.Id, this.MailId, this.UserFullName, this.UserName, this.password, this.UserTypeId, this.UserGroupId, this.EmployeeNo, this.MobileNo, this.UserDesignationId).subscribe((response: any) => {
          this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
          var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForLogin(response);
          if (StrErrorMsg != '') {
            console.log(StrErrorMsg)
            Swal.fire(StrErrorMsg);
            return false;
          }
          StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForValidations(response);
          if (StrErrorMsg != '') {
            console.log(StrErrorMsg);
            Swal.fire(StrErrorMsg);
            return false;
          }
          StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForUserCredencials(response);
          if (StrErrorMsg != '') {
            console.log(StrErrorMsg);
            Swal.fire(StrErrorMsg);
            return false;
          }
          else {
            if (this.Id == -1) {
              Swal.fire('Data Added Successfully!');
            }
            else {
              Swal.fire('Data updated Successfully!');
            }
          }
          this.onViewUserCredentialsFormInfo();
          this.onClickClearInfo();
          return false;
        });
      //   return false;
      // });
      return false;
    });
    return false;
  }

  onClickEditInfo(objUserCredentialsFormValueInfoList: UserCredentialsFormValueInfoList) {
    this.myform.controls['Id'].setValue(objUserCredentialsFormValueInfoList.Id);
    this.myform.controls['UserFullName'].setValue(objUserCredentialsFormValueInfoList.UserFullName);
    this.myform.controls['MobileNo'].setValue(objUserCredentialsFormValueInfoList.MobileNo);
    this.myform.controls['MailId'].setValue(objUserCredentialsFormValueInfoList.MailId);
    this.myform.controls['CreateBy'].setValue(objUserCredentialsFormValueInfoList.CreateBy);
    this.myform.controls['CreateDate'].setValue(objUserCredentialsFormValueInfoList.CreateDate);
    this.myform.controls['UserName'].setValue(objUserCredentialsFormValueInfoList.User_Name);
    this.myform.controls['password'].setValue(objUserCredentialsFormValueInfoList.Password);
    this.myform.controls['UserTypeId'].setValue(objUserCredentialsFormValueInfoList.UserTypeId);
    this.myform.controls['UserDesignationId'].setValue(objUserCredentialsFormValueInfoList.DesignationId);
    this.myform.controls['EmployeeNo'].setValue(objUserCredentialsFormValueInfoList.EmployeeNo);
    this.myform.controls['UserGroupId'].setValue(objUserCredentialsFormValueInfoList.UserGroupId);
    this.BtnSaveUpdateText = "Update";
  }

  onClickDeleteInfo(Id: number) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.TableName = "CT0005";
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
        this._CRUDFunctionsService.DeleteTableRecordbyId(SessionToken, UserTypeId, UserName, this.TableName, Id).subscribe((response: any) => {
          this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
            this.dataSource.data = this.dataSource.data.filter(
              (UserCredentialsFormValueInfoList: UserCredentialsFormValueInfoList) => UserCredentialsFormValueInfoList.Id != Id
            );
        });
        Swal.fire(
          'Deleted!',
          'Your record has been deleted.',
          'success'
        );
        this.onViewUserCredentialsFormInfo();
        this.onClickClearInfo();
      }
    })
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
}