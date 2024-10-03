import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { TrendSettingPageService } from '../Services/trend-setting-page.service';
import Swal from 'sweetalert2';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { CommonSettingService } from '../Services/common-setting.service';
import { ParameterSettingService } from '../Services/parameter-setting.service';

import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR,faPencil, faTrash} from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ShiftHoursList } from '../manual-entry/manual-entry.component';
import { ManualEntryService } from '../Services/manual-entry.service';
import { DropDownList, UserCredentialsFormValueInfoList } from '../user-credentials/user-credentials.component';
import { UserCredentialsService } from '../user-credentials/user-credentials.service';
import { MultiLvlTreeviewInfo } from '../kpipage/kpipage.component';
import { ReplaySubject } from 'rxjs';
import { MultiLvlTreeviewService } from '../Services/multi-lvl-treeview.service';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';


export class ParameterSettingList {
  public Id: number = -1;
  public Pname: string = "";
  public TagName :string = "";
  public LevelIdC: string = "";
  public Uid: string = "";
  public Image: string = "";
  public DecPlace: string = "";
  public UserMgmt: string = "";
  public Ugr: string = "";
  public Pcolor: string = "";
  public LevelIdA: string = "";
  public LevelIdB: string = "";
  public Cost: string = "";
  public Unit: string = "";
  public IconClass: string = "";
  public ToTUnit: string = "";
  public VOrder: string = "";
  public ParameterNo: string = "";
  public DlyTmLwAlm: string = "";
  public LwAlmSP: string = "";
  public DlyTmHighAlm: string = "";
  public HighAlmSP: string = "";
  public RawMin: string = "";
  public RawMax: string = "";
  public EnggMin: string = "";
  public EnggMax: string = "";
  public EnAlmofLhwo: string = "";
  public Lvalue: string = "";
  public Hvalue: string = "";
  public Wovalue: string = "";
  public TotaliseFactor: string = "";
  public Ptrend: string = "";
  public UnitName: string = "";
  public ToTUnitName: string = "";
  public GatewayNo:string="";
}
export class TempPSettingTreeviewDetails {
  public TreeviewType: string = "";
  public MachineId: string = "";
  public Description: string = "";
}


@Component({
  selector: 'app-parameter-setting',
  templateUrl: './parameter-setting.component.html',
  styleUrls: ['./parameter-setting.component.scss']
})
export class ParameterSettingComponent implements OnInit, OnDestroy {

  myform!: FormGroup;
  TableName: string = "CT0026";
  BtnSaveUpdateText: string = "Save";
  LeftSideTreeviewHeight: string = "";
  StrErrorMsg: any;

  IsRecEdited: string = "0";
  Id: number = -1;
  Pname: string = "";
  TagName: string = "";
  Uid: string = "";
  Image: string = "";
  ImagePath:string="";
  DecPlace: string = "";
  Pcolor: string = "#f2f2f2";
  Cost: string = "";
  Unit: string = "";
  IconClass: string = "";
  ToTUnit: string = "";
  VOrder: string = "";
  ParameterNo: string = "";
  DlyTmLwAlm: string = "";
  LwAlmSP: string = "";
  DlyTmHighAlm: string = "";
  HighAlmSP: string = "";
  RawMin: string = "";
  RawMax: string = "";
  EnggMin: string = "";
  EnggMax: string = "";
  EnAlmofLhwo = new FormControl();
  Lvalue: string = "";
  Hvalue: string = "";
  Wovalue: string = "";
  TotaliseFactor: string = "";
  Ptrend: string = "";
  stringJson: string = "";
  faPencil = faPencil;
  faTrash = faTrash;  
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  formData:any;
  IsShowLvalue: string = "0";
  IsShowHvalue: string = "0";
  IsShowWovalue: string = "0";
  splitArray: number[] = [];
  splitStrArray: string[] = [];
  UserMgmt = new FormControl();
  Ugr = new FormControl();
  objGatewayList: ShiftHoursList[] = [];
  objCurrentRateUnitList: ShiftHoursList[] = [];
  objTotalConsumptionUnitList: ShiftHoursList[] = [];
  objEnAlmOfList: ShiftHoursList[] = [];
  objDecimalPlacesList: ShiftHoursList[] = [];
  objTreeviewTypeList: ShiftHoursList[] = [];
  objActUserTypeMasterInfoList: DropDownList[]=[];
  objActUserGroupMasterInfoList: DropDownList[]=[];
  objUnitDetailsInfoList: ShiftHoursList[] = [];
  objDecimalDetailsInfoList: ShiftHoursList[] = [];
  IsDisabledTagName: boolean = false;
  public MultiLvlFilterCtrl5: FormControl = new FormControl();
  public filteredMultiLvl5: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMachineDetailsInfoList: MultiLvlTreeviewInfo[] = [];
  objAllMachineDetailsInfoList: MultiLvlTreeviewInfo[] = [];
  objParameterSettingInfoList!: ParameterSettingList[];
  objTempPSettingTreeviewDetailsList: TempPSettingTreeviewDetails[] = [];
  selectedFile!: File;

  displayedColumns: string[] = ['Action', 'Gateway', 'ParameterName','TagName', 'ParameterNo', 'TotaliseFactor', 'Ptrend', 'Cost', 'CurrentRateUnit'
    , 'TotalConsumptionUnit', 'DlyTmLowAlm', 'DlyTmHighAlm', 'LowALmSp', 'HighAlmSp', 'RawMin', 'RawMax',
    'EnggMin', 'EnggMax', 'EnAlmof', 'DecimalPlaces'];

  dataSource = new MatTableDataSource<ParameterSettingList>();

  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sort!: MatSort;

  constructor(private router: Router, public _ParameterSettingPageService: ParameterSettingService, public _CRUDFunctionsService: CRUDFunctionsService,public _userCredentialsService: UserCredentialsService, public _ManualEntryPageService: ManualEntryService, private _GlobalConstantsService: GlobalConstantsService, private _formBuilder: FormBuilder, public _MultiLvlTreeviewService: MultiLvlTreeviewService,public _ValidationerrormessagesService:ValidationerrormessagesService) { }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  ngOnInit(): void {
    this.objParameterSettingInfoList = [];
    this.objTempPSettingTreeviewDetailsList = [];
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 80) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();
    this.GetAllnMachinesDetailsInfoListByTtype('-1', '1');
    this.reactiveForm();
    this.myform.controls['TagName'].disable();
    this.myform.controls['ParameterNo'].disable();
    this.myform.controls['GatewayNo'].disable();    
    this.GetDropdownListByTableName('CT0037');
    this.GetDropdownListByTableName('CT0036');
    this.GetDropdownListByTableName('CT0010');
    this.GetDropdownListByTableName('CT0011');
    this.ChangeFillMachinesDetailsInfoList();
    this.onViewParameterSettingFormInfo();
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      Id: [-1, [Validators.required]],
      Pname: ['', [Validators.required]],
      TagName : ['', [Validators.required]],
      Uid: ['', [Validators.required]],
      Image: ['', [Validators.required]],
      DecPlace: ['', [Validators.required]],
      UserMgmt: ['', [Validators.required]],
      Ugr: ['', [Validators.required]],
      LevelIdC: ['', [Validators.required]],
      LevelIdA: ['', [Validators.required]],
      LevelIdB: ['', [Validators.required]],
      Cost: ['', [Validators.required]],
      Unit: ['', [Validators.required]],
      IconClass: ['', [Validators.required]],
      ToTUnit: ['', [Validators.required]],
      VOrder: ['', [Validators.required]],
      ParameterNo: ['', [Validators.required]],
      DlyTmLwAlm: ['', [Validators.required]],
      LwAlmSP: ['', [Validators.required]],
      DlyTmHighAlm: ['', [Validators.required]],
      HighAlmSP: ['', [Validators.required]],
      RawMin: ['', [Validators.required]],
      RawMax: ['', [Validators.required]],
      EnggMin: ['', [Validators.required]],
      EnggMax: ['', [Validators.required]],
      EnAlmofLhwo: ['', [Validators.required]],
      Lvalue: ['', [Validators.required]],
      Hvalue: ['', [Validators.required]],
      Wovalue: ['', [Validators.required]],
      TotaliseFactor: ['', [Validators.required]],
      Ptrend: ['', [Validators.required]],
      TreeviewType: ['a', [Validators.required]],
      MachineId: ['0', [Validators.required]],
      GatewayNo:['']
    });
  }

  onColorPickerColorChange(Pcolor: any): void {
    this.Pcolor = Pcolor;
  }
  CheckUserHasPermissionForPageurlOrNot(){   
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._ParameterSettingPageService.GetParameterSettingFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error: any) => {
      console.log(error);
    });
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
        if (Table == 'CT0037') {
          this.objDecimalDetailsInfoList = JSON.parse(this.stringJson);
          //this.filteredDecimalDetailss.next(this.objDecimalDetailsInfoList.slice());
          return;
        }
        else if (Table == 'CT0036') {
          this.objUnitDetailsInfoList = JSON.parse(this.stringJson);
          //this.filteredUnitDetails.next(this.objUnitDetailsInfoList.slice());
          return;
        }
        else if (Table == 'CT0010') 
        {
          this.objActUserTypeMasterInfoList = JSON.parse(this.stringJson);
        }
        else if (Table == 'CT0011') 
        {
          this.objActUserGroupMasterInfoList = JSON.parse(this.stringJson);
        }
    }, (error) => {
      console.log(error);
    });
  }

  ShowLhWoInputControls() {
    this.IsShowLvalue = "0";
    this.IsShowHvalue = "0";
    this.IsShowWovalue = "0";
    if (this.EnAlmofLhwo.value != null && this.EnAlmofLhwo.value != "") {
      for (var i = 0; i < this.EnAlmofLhwo.value.length; i++) {
        var EnAlmofLhwoId = this.EnAlmofLhwo.value[i];
        if (EnAlmofLhwoId == "l") {
          this.IsShowLvalue = "1";
        }
        else if (EnAlmofLhwoId == "h") {
          this.IsShowHvalue = "1";
        }
        else if (EnAlmofLhwoId == "wo") {
          this.IsShowWovalue = "1";
        }
      }
    }
  }

  ChangeFillMachinesDetailsInfoList() {
    this.myform.controls['MachineId'].setValue('0');
    this.objMachineDetailsInfoList = [];
    this.filteredMultiLvl5.next(this.objMachineDetailsInfoList.slice());
    var TreeviewType = this.myform.get("TreeviewType")?.value;
    if (TreeviewType == null || TreeviewType == "") {
      return;
    }
    var TreeviewType = this.myform.get("TreeviewType")?.value;

    this.GetAllnMachinesDetailsInfoListByTtype(TreeviewType, '0');
    return;
  }

  GetAllnMachinesDetailsInfoListByTtype(TreeviewType: any, IsPageLoad: any) {
    if (IsPageLoad != "1") {
      this.myform.controls['MachineId'].setValue('0');
      this.objMachineDetailsInfoList = [];
      this.filteredMultiLvl5.next(this.objMachineDetailsInfoList.slice());
    }
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this._MultiLvlTreeviewService.getAll_MachineAbc_ListByTreeviewType(SessionToken, UserTypeId, UserName, TreeviewType).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      if (IsPageLoad == "1") {
        this.objAllMachineDetailsInfoList = JSON.parse(this.stringJson);
      }
      else {
        this.objMachineDetailsInfoList = JSON.parse(this.stringJson);
        this.filteredMultiLvl5.next(this.objMachineDetailsInfoList.slice());
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }
  AddTempPSettingTreeviewDetailsToList() {
    var TreeviewType = this.myform.get("TreeviewType")?.value;
    if (TreeviewType == null || TreeviewType == "") {
      Swal.fire("Please select treeview type!");
      return;
    }
    var MachineId = this.myform.get("MachineId")?.value;
    if (MachineId == null || MachineId == "" || MachineId == "0") {
      Swal.fire("Please select machine!");
      return;
    }
    var Description = "";
    for (var i = 0; i < this.objMachineDetailsInfoList.length; i++) {
      var objMachineDetailsInfo = this.objMachineDetailsInfoList[i];
      if (objMachineDetailsInfo.C001_LevelId == MachineId) {
        Description = objMachineDetailsInfo.C003_LevelName;
        break;
      }
    }
    var IsUpdate = "";

    for (var i = 0; i < this.objTempPSettingTreeviewDetailsList.length; i++) {
      var objTempPSettingTreeviewDetailsTemp = this.objTempPSettingTreeviewDetailsList[i];
      if (objTempPSettingTreeviewDetailsTemp.TreeviewType == TreeviewType) {
        this.objTempPSettingTreeviewDetailsList[i].MachineId = MachineId;
        this.objTempPSettingTreeviewDetailsList[i].Description = Description;
        IsUpdate = "1";
        break;
      }
    }
    if (IsUpdate == "") {
      var objTempPSettingTreeviewDetails = {
        TreeviewType: TreeviewType,
        MachineId: MachineId,
        Description: Description
      }
      this.objTempPSettingTreeviewDetailsList.push(objTempPSettingTreeviewDetails);
      
    }
    //this.myform.controls['TreeviewType'].setValue('');
    this.myform.controls['MachineId'].setValue('0');
    return;
  }
  DeleteTempPSettingTreeviewDetailsFromList(index: number) {
    this.objTempPSettingTreeviewDetailsList.splice(index, 1);
    return;
  }
  //GetParameterSettingInfo
  onViewParameterSettingFormInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this._ParameterSettingPageService.GetParameterSettingInfoList(SessionToken, UserTypeIdTemp, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objParameterSettingInfoList = JSON.parse(this.stringJson);
      this.dataSource.data = this.objParameterSettingInfoList;
      //console.log(this.objParameterSettingInfoList)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      return false;
    }, (error) => {
      console.log(error);
    });
    return;
  }
  onEditParameterSettingFormInfo(objParameterSettingInfo: any) {
    this.objTempPSettingTreeviewDetailsList = [];
    this.IsShowLvalue = "0";
    this.IsShowHvalue = "0";
    this.IsShowWovalue = "0";
    this.IsRecEdited = "1";
    this.myform.controls['Id'].setValue(objParameterSettingInfo.Id);
    this.myform.controls['Pname'].setValue(objParameterSettingInfo.Pname);
    this.myform.controls['TagName'].setValue(objParameterSettingInfo.TagName);
    this.myform.controls['LevelIdC'].setValue(objParameterSettingInfo.LevelIdC);
    this.myform.controls['Uid'].setValue(objParameterSettingInfo.Uid);
    this.Image = objParameterSettingInfo.Image;
    //this.myform.controls['Image'].setValue(objParameterSettingInfo.Image);
    this.myform.controls['DecPlace'].setValue(objParameterSettingInfo.DecPlace);
    if (objParameterSettingInfo.Pcolor != "" && objParameterSettingInfo.Pcolor != null)
      this.Pcolor = '#' + objParameterSettingInfo.Pcolor;
    this.myform.controls['LevelIdA'].setValue(objParameterSettingInfo.LevelIdA);
    this.myform.controls['Cost'].setValue(objParameterSettingInfo.Cost);
    this.myform.controls['LevelIdB'].setValue(objParameterSettingInfo.LevelIdB);
    this.myform.controls['Unit'].setValue(objParameterSettingInfo.Unit);
    this.myform.controls['IconClass'].setValue(objParameterSettingInfo.IconClass);
    this.myform.controls['ToTUnit'].setValue(objParameterSettingInfo.ToTUnit);
    this.myform.controls['VOrder'].setValue(objParameterSettingInfo.VOrder);
    this.myform.controls['DlyTmLwAlm'].setValue(objParameterSettingInfo.DlyTmLwAlm);
    this.myform.controls['ParameterNo'].setValue(objParameterSettingInfo.ParameterNo);
    this.myform.controls['HighAlmSP'].setValue(objParameterSettingInfo.HighAlmSP);
    this.myform.controls['LwAlmSP'].setValue(objParameterSettingInfo.LwAlmSP);
    this.myform.controls['DlyTmHighAlm'].setValue(objParameterSettingInfo.DlyTmHighAlm);
    this.myform.controls['RawMin'].setValue(objParameterSettingInfo.RawMin);
    this.myform.controls['RawMax'].setValue(objParameterSettingInfo.RawMax);
    this.myform.controls['EnggMin'].setValue(objParameterSettingInfo.EnggMin);
    this.myform.controls['EnggMax'].setValue(objParameterSettingInfo.EnggMax);
    this.myform.controls['Lvalue'].setValue(objParameterSettingInfo.Lvalue);
    this.myform.controls['Hvalue'].setValue(objParameterSettingInfo.Hvalue);
    this.myform.controls['Wovalue'].setValue(objParameterSettingInfo.Wovalue);
    this.myform.controls['TotaliseFactor'].setValue(objParameterSettingInfo.TotaliseFactor);
    this.myform.controls['Ptrend'].setValue(objParameterSettingInfo.Ptrend);
    this.myform.controls['GatewayNo'].setValue(objParameterSettingInfo.GatewayNo);
    // this.myform.controls['Ugr'].setValue(objParameterSettingInfo.Ugr);
    //this.myform.controls['EnAlmofLhwo'].setValue(objParameterSettingInfo.EnAlmofLhwo);
    var ImagePathtemp =[];
    ImagePathtemp = this.Image.split("/");
    this.ImagePath = ImagePathtemp[ImagePathtemp.length-1];
    const UserMgmtSelectedValues: any = [];
    if (objParameterSettingInfo.UserMgmt != "" && objParameterSettingInfo.UserMgmt != null) {
      this.splitArray = objParameterSettingInfo.UserMgmt.split(',');
      for (var i = 0; i < this.splitArray.length; i++) {
        var objUserMgmt = this.splitArray[i];
        UserMgmtSelectedValues.push(Number(objUserMgmt));
      }
    }
    this.UserMgmt = new FormControl(UserMgmtSelectedValues);
    const UgrSelectedValues: any = [];
    if (objParameterSettingInfo.Ugr != "" && objParameterSettingInfo.Ugr != null) {
      this.splitArray = objParameterSettingInfo.Ugr.split(',');
      for (var i = 0; i < this.splitArray.length; i++) {
        var objUgr = this.splitArray[i];
        UgrSelectedValues.push(Number(objUgr));
      }
    }
    this.Ugr = new FormControl(UgrSelectedValues);

    const EnAlmofLhwoSelectedValues: any = [];
    if (objParameterSettingInfo.StrEnAlmofLhwo != "" && objParameterSettingInfo.StrEnAlmofLhwo != null) {
      this.splitStrArray = objParameterSettingInfo.StrEnAlmofLhwo.split(',');
      for (var i = 0; i < this.splitStrArray.length; i++) {
        var objEnAlmofLhwo = this.splitStrArray[i];
        EnAlmofLhwoSelectedValues.push(objEnAlmofLhwo);
        if (objEnAlmofLhwo == "l") {
          this.IsShowLvalue = "1";
        }
        else if (objEnAlmofLhwo == "h") {
          this.IsShowHvalue = "1";
        }
        else if (objEnAlmofLhwo == "wo") {
          this.IsShowWovalue = "1";
        }
      }
    }
    this.EnAlmofLhwo = new FormControl(EnAlmofLhwoSelectedValues);

    var Description = "";
    if (objParameterSettingInfo.LevelIdA != "0" && objParameterSettingInfo.LevelIdA != "" && objParameterSettingInfo.LevelIdA != null) {
      for (var i = 0; i < this.objAllMachineDetailsInfoList.length; i++) {
        var objAllMachineDetailsInfoTemp = this.objAllMachineDetailsInfoList[i];
        if (objAllMachineDetailsInfoTemp.C001_LevelId == objParameterSettingInfo.LevelIdA) {
          Description = objAllMachineDetailsInfoTemp.C003_LevelName;
          break;
        }
      }
      var objTempPSettingTreeviewDetails = {
        TreeviewType: 'a',
        MachineId: objParameterSettingInfo.LevelIdA,
        Description: Description
      }
      this.objTempPSettingTreeviewDetailsList.push(objTempPSettingTreeviewDetails);
    }
    Description = '';
    if (objParameterSettingInfo.LevelIdB != "0" && objParameterSettingInfo.LevelIdB != "" && objParameterSettingInfo.LevelIdB != null) {
      for (var i = 0; i < this.objAllMachineDetailsInfoList.length; i++) {
        var objAllMachineDetailsInfoTemp = this.objAllMachineDetailsInfoList[i];
        if (objAllMachineDetailsInfoTemp.C001_LevelId == objParameterSettingInfo.LevelIdB) {
          Description = objAllMachineDetailsInfoTemp.C003_LevelName;
          break;
        }
      }
      var objTempPSettingTreeviewDetails = {
        TreeviewType: 'b',
        MachineId: objParameterSettingInfo.LevelIdB,
        Description: Description
      }
      this.objTempPSettingTreeviewDetailsList.push(objTempPSettingTreeviewDetails);
    }
    Description = '';
    if (objParameterSettingInfo.LevelIdC != "0" && objParameterSettingInfo.LevelIdC != "" && objParameterSettingInfo.LevelIdC != null) {
      for (var i = 0; i < this.objAllMachineDetailsInfoList.length; i++) {
        var objAllMachineDetailsInfoTemp = this.objAllMachineDetailsInfoList[i];
        if (objAllMachineDetailsInfoTemp.C001_LevelId == objParameterSettingInfo.LevelIdC) {
          Description = objAllMachineDetailsInfoTemp.C003_LevelName;
          break;
        }
      }
      var objTempPSettingTreeviewDetails = {
        TreeviewType: 'c',
        MachineId: objParameterSettingInfo.LevelIdC,
        Description: Description
      }
      this.objTempPSettingTreeviewDetailsList.push(objTempPSettingTreeviewDetails);
    }
    return;
  }
  onClearParameterSettingDetailsClick() {
    this.objTempPSettingTreeviewDetailsList = [];
    this.IsShowLvalue = "0";
    this.IsShowHvalue = "0";
    this.IsShowWovalue = "0";
    this.IsRecEdited = "0";
    this.Pcolor = '';
    this.Image = '';
    const UserMgmtSelectedValues: any = [];
    this.UserMgmt = new FormControl(UserMgmtSelectedValues);

    const UgrSelectedValues: any = [];
    this.Ugr = new FormControl(UgrSelectedValues);

    const EnAlmofLhwoSelectedValues: any = [];
    this.EnAlmofLhwo = new FormControl(EnAlmofLhwoSelectedValues);
    this.myform.reset();
    this.myform.controls['TreeviewType'].setValue('a');
    this.myform.controls['MachineId'].setValue('0');
    this.ChangeFillMachinesDetailsInfoList();
    return;
  }
  onFileSelected(event:any): void {
    this.selectedFile = event.target.files[0];
  }
  //UpdateParameterSettingInfo
  onInsertUpdateParameterSettingClick() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    var nEnAlmofLhwo = 0;
    var EnAlmofLhwoIds = "";
    if (this.EnAlmofLhwo.value != null && this.EnAlmofLhwo.value != "") {
      for (var i = 0; i < this.EnAlmofLhwo.value.length; i++) {
        var EnAlmofLhwoId = this.EnAlmofLhwo.value[i];
        EnAlmofLhwoIds += EnAlmofLhwoId + ",";
        var TempnEnAlmofLhwo = 0;
        if (EnAlmofLhwoId == "l") {
          TempnEnAlmofLhwo = 1;
          nEnAlmofLhwo = (nEnAlmofLhwo + TempnEnAlmofLhwo);
        }
        else if (EnAlmofLhwoId == "h") {
          TempnEnAlmofLhwo = 2;
          nEnAlmofLhwo = (nEnAlmofLhwo + TempnEnAlmofLhwo);
        }
        else if (EnAlmofLhwoId == "wo") {
          TempnEnAlmofLhwo = 4;
          nEnAlmofLhwo = (nEnAlmofLhwo + TempnEnAlmofLhwo);
        }
      }
      if (EnAlmofLhwoIds.length > 1)
        EnAlmofLhwoIds = EnAlmofLhwoIds.slice(0, -1);
    }
    var UserMgmtIds = "";
    if (this.UserMgmt.value != null && this.UserMgmt.value != "") {
      for (var i = 0; i < this.UserMgmt.value.length; i++) {
        var UserMgmtId = this.UserMgmt.value[i];
        UserMgmtIds += UserMgmtId + ",";
      }
      if (UserMgmtIds.length > 1)
        UserMgmtIds = UserMgmtIds.slice(0, -1);
    }
    var UgrIds = "";
    if (this.Ugr.value != null && this.Ugr.value != "") {
      for (var i = 0; i < this.Ugr.value.length; i++) {
        var UgrId = this.Ugr.value[i];
        UgrIds += UgrId + ",";
      }
      if (UgrIds.length > 0)
        UgrIds = UgrIds.slice(0, -1);
    }
    if (UserMgmtIds == "" || UserMgmtIds == null) {
      Swal.fire('Please enter UserMgmt');
      return false;
    }
    if (UgrIds == "" || UgrIds == null) {
      Swal.fire('Please enter User');
      return false;
    }
    var LevelIdA = "";
    var LevelIdB = "";
    var LevelIdC = "";
    if (this.objTempPSettingTreeviewDetailsList.length > 0) {
      for (var i = 0; i < this.objTempPSettingTreeviewDetailsList.length; i++) {
        var objTempPSettingTreeviewDetails = this.objTempPSettingTreeviewDetailsList[i];
        if (objTempPSettingTreeviewDetails.TreeviewType == "a") {
          LevelIdA = objTempPSettingTreeviewDetails.MachineId;
        }
        else if (objTempPSettingTreeviewDetails.TreeviewType == "b") {
          LevelIdB = objTempPSettingTreeviewDetails.MachineId;
        }
        else if (objTempPSettingTreeviewDetails.TreeviewType == "c") {
          LevelIdC = objTempPSettingTreeviewDetails.MachineId;
        }
      }
    }
    this.Id = this.myform.get("Id")?.value;
    this.Pname = this.myform.get("Pname")?.value;
    this.Uid = this.myform.get("Uid")?.value;
    this.DecPlace = this.myform.get("DecPlace")?.value;
    this.Cost = this.myform.get("Cost")?.value;
    this.Unit = this.myform.get("Unit")?.value;
    this.IconClass = this.myform.get("IconClass")?.value;
    this.ToTUnit = this.myform.get("ToTUnit")?.value;
    this.VOrder = this.myform.get("VOrder")?.value;
    this.ParameterNo = this.myform.get("ParameterNo")?.value;
    this.DlyTmLwAlm = this.myform.get("DlyTmLwAlm")?.value;
    this.LwAlmSP = this.myform.get("LwAlmSP")?.value;
    this.DlyTmHighAlm = this.myform.get("DlyTmHighAlm")?.value;
    this.HighAlmSP = this.myform.get("HighAlmSP")?.value;
    this.RawMin = this.myform.get("RawMin")?.value;
    this.RawMax = this.myform.get("RawMax")?.value;
    this.EnggMin = this.myform.get("EnggMin")?.value;
    this.EnggMax = this.myform.get("EnggMax")?.value;
    this.EnAlmofLhwo = this.myform.get("EnAlmofLhwo")?.value;
    this.Lvalue = this.myform.get("Lvalue")?.value;
    this.Hvalue = this.myform.get("Hvalue")?.value;
    this.Wovalue = this.myform.get("Wovalue")?.value;
    this.TotaliseFactor = this.myform.get("TotaliseFactor")?.value;
    this.Ptrend = this.myform.get("Ptrend")?.value;
    if (this.Pname == "" || this.Pname == null) {
      Swal.fire('Please enter Parameter name');
      return false;
    }
    if (this.Uid == "" || this.Uid == null) {
      Swal.fire('Please enter Uid');
      return false;
    }
    if (this.ParameterNo == "" || this.ParameterNo == null) {
      Swal.fire('Please enter ParameterNo');
      return false;
    }
    var Image ="";
    if(this.selectedFile){
      this.formData = new FormData();
      this.formData.append('file', this.selectedFile);
    }
    else{
      if(this.Image!= "")
        Image=this.Image;
    }
    if (this.DecPlace == "" || this.DecPlace == null) {
      Swal.fire('Please enter Decimal Place');
      return false;
    }
    if (this.Pcolor == "" || this.Pcolor == null) {
      Swal.fire('Please enter Pcolor');
      return false;
    }
    if (this.Cost == "" || this.Cost == null) {
      Swal.fire('Please enter Cost');
      return false;
    }
    if (this.Unit == "" || this.Unit == null) {
      Swal.fire('Please enter Current Rate Unit');
      return false;
    }
    if (this.IconClass == "" || this.IconClass == null) {
      Swal.fire('Please enter IconClass');
      return false;
    }
    if (this.ToTUnit == "" || this.ToTUnit == null) {
      Swal.fire('Please enter Total Consumption Unit');
      return false;
    }
    if (this.VOrder == "" || this.VOrder == null) {
      Swal.fire('Please enter View Order');
      return false;
    }
    if (this.DlyTmLwAlm == "" || this.DlyTmLwAlm == null) {
      Swal.fire('Please enter Dly.Tm-Low Alm');
      return false;
    }
    if (this.LwAlmSP == "" || this.LwAlmSP == null) {
      Swal.fire('Please enter Low ALm Sp');
      return false;
    }
    if (this.DlyTmHighAlm == "" || this.DlyTmHighAlm == null) {
      Swal.fire('Please enter Dly.Tm-High Alm');
      return false;
    }
    if (this.HighAlmSP == "" || this.HighAlmSP == null) {
      Swal.fire('Please enter High Alm SP');
      return false;
    }
    if (this.RawMin == "" || this.RawMin == null) {
      Swal.fire('Please enter Raw Min');
      return false;
    }
    if (this.RawMax == "" || this.RawMax == null) {
      Swal.fire('Please enter Raw Max');
      return false;
    }
    if (this.EnggMin == "" || this.EnggMin == null) {
      Swal.fire('Please enter Engg. Min');
      return false;
    }
    if (this.EnggMax == "" || this.EnggMax == null) {
      Swal.fire('Please enter Engg. Max');
      return false;
    }
    if (this.TotaliseFactor == "" || this.TotaliseFactor == null) {
      Swal.fire('Please enter TotaliseFactor');
      return false;
    }
    if (this.Ptrend == "" || this.Ptrend == null) {
      Swal.fire('Please enter Ptrend');
      return false;
    }
    if (this.Lvalue == "" || this.Lvalue == null) {
      Swal.fire('Please enter Lvalue');
      return false;
    }
    if (this.Hvalue == "" || this.Hvalue == null) {
      Swal.fire('Please enter Hvalue');
      return false;
    }
    if (this.Wovalue == "" || this.Wovalue == null) {
      Swal.fire('Please enter Wovalue');
      return false;
    }

    this.Pcolor = this.Pcolor.substring(1);
    this._ParameterSettingPageService.InsertUpdateParameterSettingInfo(SessionToken, UserTypeId, UserName, this.TableName, this.Id, this.Pname, LevelIdC, this.Uid, Image,
      this.DecPlace, UserMgmtIds, UgrIds, this.Pcolor, LevelIdA, LevelIdB, this.Cost, this.Unit, this.IconClass, this.ToTUnit, this.VOrder, this.ParameterNo, this.DlyTmLwAlm,
      this.LwAlmSP, this.DlyTmHighAlm, this.HighAlmSP, this.RawMin, this.RawMax, this.EnggMin, this.EnggMax, nEnAlmofLhwo.toString(), this.Lvalue, this.Hvalue, this.Wovalue, this.TotaliseFactor,
      this.Ptrend, EnAlmofLhwoIds,this.formData).subscribe((response: any) => {
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
          Swal.fire('Parameter setting changed!');
          this.BtnSaveUpdateText = "Update";
          this.onClearParameterSettingDetailsClick();
          this.onViewParameterSettingFormInfo();
        }
        return false;
      }, (error) => {
        console.log(error);
      });
    return false;
  }
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
  RemoveImageFromParameterSetting() {
    Swal.fire({
      title: 'Are you sure you want to delete image?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!',
      focusCancel:true
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform your action here
        var SessionToken = sessionStorage.getItem('SessionToken') as string;
        var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
        var UserName = sessionStorage.getItem('UserName') as string;
        var Id = this.myform.get("Id")?.value;
        this._ParameterSettingPageService.RemoveImageFromParameterSetting(SessionToken, UserTypeIdTemp, UserName,Id).subscribe((response: any) => {
          this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
          this.ImagePath ="";
            Swal.fire(response);
          return;
        }, (error) => {
          console.log(error);
        });
        return;
      }
    });
  }
}
