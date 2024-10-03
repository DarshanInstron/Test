/*
  Author:	
  Description: For product Entry
  LastUpdate:on 18-12-23 by nita 
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { faPencil , faTrash} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { ProductEntryService } from '../Services/product-entry.service';

export class ProductEntryFormValueInfoList {
  public Id: number = -1;
  public ProductCode: string = "";
  public ProductName: string = "";
  public DownTimeSetPoint: string = "";
  public DownTimeDelay: string = "";
  public CycleTime: string = "";
  public UniqueID: string = "";
}

export class MachineList {
  public Description: string = "";
  public UniqueId: string = "";
}


@Component({
  selector: 'app-product-entry',
  templateUrl: './product-entry.component.html',
  styleUrls: ['./product-entry.component.scss']
})
export class ProductEntryComponent implements OnInit {

  LeftSideTreeviewHeight:string="";
  myform!: FormGroup;

  Id: number=-1;
  UniqueID:string="";
  ProductCode:string="";
  ProductName:string="";
  DownTimeSetPoint:string="";
  DownTimeDelay:string="";
  CycleTime:string="";

  BtnSaveUpdateText: string="Save";
  TableName: string="CT0033";
  IsDisablePtype: number=-1;
  stringJson: string = "";
  faPencil = faPencil;
  faTrash = faTrash;

  public MachineListFilterCtrl: FormControl = new FormControl();
  public filteredMachineList: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMachineInfoList!: MachineList[];

  displayedColumns: string[] = ['Action','Id','ProductCode','ProductName','DNSet','DNDelay','CycleTime','UniqueId'];

  objProductEntryFormValueInfoList!: ProductEntryFormValueInfoList[];
  dataSource = new MatTableDataSource<ProductEntryFormValueInfoList>();

  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sort!: MatSort;
  
  private _onDestroy = new Subject<void>();

  constructor(public _ProductEntryPageService : ProductEntryService, private _formBuilder: FormBuilder,private _GlobalConstantsService:GlobalConstantsService,public _ValidationerrormessagesService:ValidationerrormessagesService) {}

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 120) + "px";
    this.CheckUserHasPermissionForPageurlOrNot();
    this.reactiveForm();
    this.getMachine();
    this.GetProductEntryViewRecordsWithNewDbStructure();    

    this.MachineListFilterCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy))
    .subscribe(() => {
      this.filterMachineListInfo();
    });
    
  }

  CheckUserHasPermissionForPageurlOrNot(){
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._ProductEntryPageService.GetProductConfigFormPageWithNewDbStructure(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [1, [Validators.required]],
      ProductCode:['', Validators.required],
      ProductName: ['', Validators.required],
      DownTimeSetPoint: ['', Validators.required],
      DownTimeDelay: ['', Validators.required],
      CycleTime:['', Validators.required],
      UniqueId:["",Validators.required]
    });
  }

  getMachine()
  {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._ProductEntryPageService.getMachineList(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objMachineInfoList = response;
      this.filteredMachineList.next(this.objMachineInfoList.slice());
    }, (error) => {
      console.log(error);
    });
    return;
  }

  filterMachineListInfo(){
    if (!this.objMachineInfoList) {
      return;
    }
    let search = this.MachineListFilterCtrl.value;
    if (!search) {
      this.filteredMachineList.next(this.objMachineInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredMachineList.next(
      this.objMachineInfoList.filter(x => x.Description.toLowerCase().indexOf(search) >- 1)
    );
  }

  onClearInfoClick() {
    this.BtnSaveUpdateText = "Save";
    this.myform.reset();
    this.reactiveForm();
  }

  InsertUpdateProductEntryFormValueInfoList(){
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this.Id = this.myform.get("Id")?.value;
    this.ProductCode = this.myform.get("ProductCode")?.value;
    this.ProductName = this.myform.get("ProductName")?.value;
    this.DownTimeSetPoint = this.myform.get("DownTimeSetPoint")?.value;
    this.DownTimeDelay = this.myform.get("DownTimeDelay")?.value;
    this.CycleTime = this.myform.get("CycleTime")?.value;
    this.UniqueID = this.myform.get("UniqueId")?.value;
    
    if (this.Id == -1||this.Id == null){
      Swal.fire('Please enter Product Type');
      return false;
    }

    if (this.ProductCode == ""||this.ProductCode == null) {
      Swal.fire('Please Enter ProductCode!');
      return false;
    } 
    if (this.ProductName == ""||this.ProductName == null) {
      Swal.fire('Please Enter ProductName!');
      return false;
    } 
    if (this.DownTimeSetPoint == ""||this.DownTimeSetPoint == null) {
      Swal.fire('Please Enter Sub DNSet!');
      return false;
    }
    if (this.DownTimeDelay == ""||this.DownTimeDelay == null) {
      Swal.fire('Please enter DNDelay!');
      return false;
    }
    if (this.CycleTime == ""||this.CycleTime == null) {
      Swal.fire('Please enter CycleTime!');
      return false;
    }
    if (this.UniqueID == ""||this.UniqueID == null){
      Swal.fire('Please Select Machine');
      return false;
    }
    
    this._ProductEntryPageService.InsertUpdateProductEntryFormValueInfoList(SessionToken, UserTypeIdTemp, UserName,this.TableName,this.Id,this.ProductName,this.CycleTime,this.DownTimeSetPoint,this.DownTimeDelay,this.ProductCode,this.UniqueID).subscribe((response: any) =>
    {
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
      else 
      {
        if (this.BtnSaveUpdateText !="Update") {
          Swal.fire('Product Added Successfully!');
        }
        else {
          Swal.fire('Product Updated Successfully!');
        }
      }      
      this.onClearInfoClick();
      this.GetProductEntryViewRecordsWithNewDbStructure();
      return false;
    }, (error) => {
      console.log(error);
    });
    return false;
  }

  onEditInfoClick(objProductEntryFormValueInfoList: ProductEntryFormValueInfoList){
    this.myform.controls['Id'].setValue(objProductEntryFormValueInfoList.Id);
    this.myform.controls['ProductName'].setValue(objProductEntryFormValueInfoList.ProductName);
    this.myform.controls['CycleTime'].setValue(objProductEntryFormValueInfoList.CycleTime);
    this.myform.controls['DownTimeSetPoint'].setValue(objProductEntryFormValueInfoList.DownTimeSetPoint);
    this.myform.controls['DownTimeDelay'].setValue(objProductEntryFormValueInfoList.DownTimeDelay);
    this.myform.controls['ProductCode'].setValue(objProductEntryFormValueInfoList.ProductCode);
    this.myform.controls['UniqueId'].setValue(Number(objProductEntryFormValueInfoList.UniqueID));
    this.BtnSaveUpdateText = "Update";
  }

  DeleteProductConfig(Id:number,UniqueId:string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;    
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
        this._ProductEntryPageService.DeleteProductConfig(SessionToken, UserTypeIdTemp, UserName,this.TableName,Id,UniqueId).subscribe((response:any) => {
          this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
          if (response == "Successfully Deleted!") {
            // var tempUniqueId = Number(UniqueId);
            this.dataSource.data = this.dataSource.data.filter(
            (objProductEntryFormValueInfoList: ProductEntryFormValueInfoList) => objProductEntryFormValueInfoList.Id != Id && objProductEntryFormValueInfoList.UniqueID != UniqueId
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
        this.GetProductEntryViewRecordsWithNewDbStructure();
      }
    }, (error) => {
      console.log(error);
    });
  }

  GetProductEntryViewRecordsWithNewDbStructure(){
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;  
    this._ProductEntryPageService.GetProductEntryViewRecordsWithNewDbStructure(SessionToken, UserTypeIdTemp, UserName,this.TableName).subscribe((response) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        this.stringJson = JSON.stringify(response);
        this.objProductEntryFormValueInfoList = JSON.parse(this.stringJson);
        this.dataSource.data = this.objProductEntryFormValueInfoList;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        //console.log(this.objProductEntryFormValueInfoList);
      this.onClearInfoClick();
      return false;
    }, (error) => {
      console.log(error);
    });  
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
}
