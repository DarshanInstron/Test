import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ManualentryPopupComponent } from '../manualentry-popup/manualentry-popup.component';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ManualEntryService } from '../Services/manual-entry.service';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MultiLvlTreeviewInfo } from '../kpipage/kpipage.component';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { CustomNgxDatetimeAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '../custom-ngx-datetime-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { NGX_MAT_DATE_FORMATS, NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { GlobalConstantsService } from '../Services/global-constants.service';
import Swal from 'sweetalert2';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR, faUserPlus, faPencil, faTrash,faM } from '@fortawesome/free-solid-svg-icons';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';


interface Item {
  id: number;
  fromTime: string;
  toTime: string;
  count: string;
  isEditing: boolean;
}
export class ShiftHoursList {
  public Description: string = "";
  public Id: string = "";
}

export class ManualEntryTableDataList {
  public Id: string = "";
  public DateTime: string = "";
  public Date: string = "";
  public FromTime: string = "";
  public ToTime: string = "";
  public Shift: string = "";
  public PlanOff: string = "";
  public Dt_1: string = "";
  public Pt_1: string = "";
  public Dur_1: string = "";
  public Pc_1: string = "";
  public Rm_1: string = "";
  public PLAN_1: string = "";
  public Aotherqty: string = "";
  public RmSpec: string = "";
  public Oper_1: string = "";
  public LineInc: string = "";
  public Ar_1: string = "";
  public Arqty_1: string = "";
  public Ar_2: string = "";
  public Arqty_2: string = "";
  public Ar_3: string = "";
  public Arqty_3: string = "";
  public Qr_1: string = "";
  public QrQty_1: string = "";
  public Qr_2: string = "";
  public QrQty_2: string = "";
  public Qr_3: string = "";
  public QrQty_3: string = "";
  public Qotherqty: string = "";
  public Prr_1: string = "";
  public Prqty_1: string = "";
  public Prr_2: string = "";
  public Prqty_2: string = "";
  public Prr_3: string = "";
  public Prqty_3: string = "";
  public Potherqty: string = "";
  public Trej: string = "";
  public SPARE_1: string = "";
  public SPARE_2: string = "";
  public H: string = "";
  public TOT_MIN: string = "";
  public A_TIME: string = "";
  public P_TIME: string = "";
  public Q_TIME: string = "";
  public SPEEDLOSS: string = "";
  public PlanOffOld: string = "";
  public Dt_1Old: string = "";
  public AotherqtyOld: string = "";
  public MachineLevelId: string = "";
  public TempAotherqty: string = "";
}

export class APQSummeryList {
  public A: string = "";
  public A_Time: string = "";
  public Act: string = "";
  public Asset: string = "";
  public Asset_Id: string = "";
  public Dept_Id: string = "";
  public Dwn: string = "";
  public Gap: string = "";
  public OEE: string = "";
  public Ok: string = "";
  public P: string = "";
  public P_Time: string = "";
  public Plan: string = "";
  public Plan_Off: string = "";
  public Plant_Id: string = "";
  public Pro: string = "";
  public Prod_1: string = "";
  public Q: string = "";
  public Q_Time: string = "";
  public Rej: string = "";
  public Shift_Date: string = "";
  public Tot_min: string = "";
  public SpeedLoss: string = "";
}

@Component({
  selector: 'app-manual-entry',
  templateUrl: './manual-entry.component.html',
  styleUrls: ['./manual-entry.component.scss'],
  providers: [{
    provide: NgxMatDateAdapter,
    useClass: CustomNgxDatetimeAdapter,
    deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: NGX_MAT_DATE_FORMATS, useValue: GlobalConstantsService.CUSTOM_DATE_FORMATSDDMMMYYYY },
  ],

})
export class ManualEntryComponent implements OnDestroy, OnInit {
  selectCompany: string = "0";
  selectPlant: string = "0";
  selectLine: string = "0";
  selectSubLine: string = "0";
  selectMachine: string = "0";
  selectAsset: string = "";
  selectedShift: string = '0';
  selectedMachine: string = '';
  TrViewTypeC005: string = "C";
  changeTableText: boolean = true;
  selectedTimeRange: string = '';
  timeRanges: string[] = [];
  LeftSideTreeviewHeight: string = "";
  dateControl!: FormControl;
  disableViewbtn: boolean = false;
  stringJson: string = "";
  objShiftHours: ShiftHoursList[] = [];
  objManualEntryTableData: ManualEntryTableDataList[] = [];
  objOperatorInchargeData: ShiftHoursList[] = [];
  selectedRowData: any;
  operatorIds = new FormControl();
  operatorList: ShiftHoursList[] = [];

  incharge = new FormControl();
  splitArray: number[] = [];
  objAPQSummeryList: APQSummeryList[] = [];
  faPencil = faPencil;
  faTrash = faTrash;
  private VarManualEntrySetTimeouttime: any;
  animal: any;
  IsWaitingOn: boolean = false;

  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faUserPlus=faUserPlus;
  faM=faM;

  private _onDestroy = new Subject<void>();
  protected _onDestroys = new Subject();

  public MultiLvlFilterCtrl1: FormControl = new FormControl();
  public filteredMultiLvl1: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMultiLvlTreeviewInfoList1: MultiLvlTreeviewInfo[] = [];

  public MultiLvlFilterCtrl2: FormControl = new FormControl();
  public filteredMultiLvl2: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMultiLvlTreeviewInfoList2: MultiLvlTreeviewInfo[] = [];

  public MultiLvlFilterCtrl3: FormControl = new FormControl();
  public filteredMultiLvl3: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMultiLvlTreeviewInfoList3: MultiLvlTreeviewInfo[] = [];

  public MultiLvlFilterCtrl4: FormControl = new FormControl();
  public filteredMultiLvl4: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMultiLvlTreeviewInfoList4: MultiLvlTreeviewInfo[] = [];

  public MultiLvlFilterCtrl5: FormControl = new FormControl();
  public filteredMultiLvl5: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMultiLvlTreeviewInfoList5: MultiLvlTreeviewInfo[] = [];

  public MultiLvlFilterCtrl6: FormControl = new FormControl();
  public filteredMultiLvl6: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMultiLvlTreeviewInfoList6: MultiLvlTreeviewInfo[] = [];

  public OperatorFilterCtrl1: FormControl = new FormControl();
  public filteredOperators: ReplaySubject<any> = new ReplaySubject<any>(1);
  objOperatorInfoList: ShiftHoursList[] = [];

  public LineInchargeFilterCtrl1: FormControl = new FormControl();
  public filteredLineIncharge: ReplaySubject<any> = new ReplaySubject<any>(1);
  // dateControl1:any = new FormControl(moment());
  // minDate: any =new Date();
  // maxDate: any =new Date();

  data: Item[] = [
    { id: 1, fromTime: '', toTime: '', count: '', isEditing: false },
    { id: 2, fromTime: '', toTime: '', count: '', isEditing: false },
    { id: 3, fromTime: '', toTime: '', count: '', isEditing: false },
    { id: 4, fromTime: '', toTime: '', count: '', isEditing: false },
    { id: 5, fromTime: '', toTime: '', count: '', isEditing: false },
    { id: 6, fromTime: '', toTime: '', count: '', isEditing: false },
    { id: 7, fromTime: '', toTime: '', count: '', isEditing: false },
    { id: 8, fromTime: '', toTime: '', count: '', isEditing: false }
  ];

  constructor(private dialog: MatDialog, private router: Router, public _ManualEntryPageService: ManualEntryService,public _CRUDFunctionsService: CRUDFunctionsService,  private datePipe: DatePipe, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService) {
    // this.minDate.setDate(this.minDate.getDate());
    // this.maxDate.setDate(this.maxDate.getDate());

  }

  ngOnInit(): void {
    this.CheckUserHasPermissionForPageurlOrNot();
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 100) + "px";
    this.getOperatorIncharge("CT0005", "");
    this.getManualEntryDropdowns("0", "0");
    this.GetDropdownListByTableName('CT0029');
    this.dateControl = new FormControl(moment());

    this.MultiLvlFilterCtrl1.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteredMultiLvl1Info();
      });

    this.MultiLvlFilterCtrl2.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteredMultiLvl2Info();
      });

    this.MultiLvlFilterCtrl3.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteredMultiLvl3Info();
      });

    this.MultiLvlFilterCtrl4.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteredMultiLvl4Info();
      });

    this.MultiLvlFilterCtrl5.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteredMultiLvl5Info();
      });

      this.OperatorFilterCtrl1.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteredOperatorsInfo();
      });

      this.LineInchargeFilterCtrl1.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteredLineInchargeInfo();
      });
    // this.dateControl.valueChanges.subscribe(value => {
    //   const currentDate = moment();
    //   if (!moment(value).isSame(currentDate, 'day')) {
    //     this.disableViewbtn = true;
    //     Swal.fire('The date is not the same as the current date.');
    //   }
    //   else {
    //     this.disableViewbtn = false;
    //   }
    // });
  }
  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._ManualEntryPageService.GetManualEntryFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error: any) => {
      console.log(error);
    });
  }
  private filteredMultiLvl1Info() {
    if (!this.objMultiLvlTreeviewInfoList1) {
      return;
    }
    let search = this.MultiLvlFilterCtrl1.value;
    if (!search) {
      this.filteredMultiLvl1.next(this.objMultiLvlTreeviewInfoList1.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredMultiLvl1.next(
      this.objMultiLvlTreeviewInfoList1.filter(reason => reason.C003_LevelName.toLowerCase().indexOf(search) > - 1)
    );
  }
  private filteredMultiLvl2Info() {
    if (!this.objMultiLvlTreeviewInfoList2) {
      return;
    }
    let search = this.MultiLvlFilterCtrl2.value;
    if (!search) {
      this.filteredMultiLvl2.next(this.objMultiLvlTreeviewInfoList2.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredMultiLvl2.next(
      this.objMultiLvlTreeviewInfoList2.filter(reason => reason.C003_LevelName.toLowerCase().indexOf(search) > - 1)
    );
  }
  private filteredMultiLvl3Info() {
    if (!this.objMultiLvlTreeviewInfoList3) {
      return;
    }
    let search = this.MultiLvlFilterCtrl3.value;
    if (!search) {
      this.filteredMultiLvl3.next(this.objMultiLvlTreeviewInfoList3.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredMultiLvl3.next(
      this.objMultiLvlTreeviewInfoList3.filter(reason => reason.C003_LevelName.toLowerCase().indexOf(search) > - 1)
    );
  }
  private filteredMultiLvl4Info() {
    if (!this.objMultiLvlTreeviewInfoList4) {
      return;
    }
    let search = this.MultiLvlFilterCtrl4.value;
    if (!search) {
      this.filteredMultiLvl4.next(this.objMultiLvlTreeviewInfoList4.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredMultiLvl4.next(
      this.objMultiLvlTreeviewInfoList4.filter(reason => reason.C003_LevelName.toLowerCase().indexOf(search) > - 1)
    );
  }
  private filteredMultiLvl5Info() {
    if (!this.objMultiLvlTreeviewInfoList5) {
      return;
    }
    let search = this.MultiLvlFilterCtrl5.value;
    if (!search) {
      this.filteredMultiLvl5.next(this.objMultiLvlTreeviewInfoList5.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredMultiLvl5.next(
      this.objMultiLvlTreeviewInfoList5.filter(reason => reason.C003_LevelName.toLowerCase().indexOf(search) > - 1)
    );
  }
  private filteredOperatorsInfo() {
    if (!this.objOperatorInfoList) {
      return;
    }
    let search = this.OperatorFilterCtrl1.value;
    if (!search) {
      this.filteredOperators.next(this.objOperatorInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredOperators.next(
      this.objOperatorInfoList.filter(reason => reason.Description.toLowerCase().indexOf(search) > - 1)
    );
  }
  private filteredLineInchargeInfo() {
    if (!this.objOperatorInfoList) {
      return;
    }
    let search = this.LineInchargeFilterCtrl1.value;
    if (!search) {
      this.filteredLineIncharge.next(this.objOperatorInfoList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredLineIncharge.next(
      this.objOperatorInfoList.filter(reason => reason.Description.toLowerCase().indexOf(search) > - 1)
    );
  }
  ngOnDestroy(): void {
    clearTimeout(this.VarManualEntrySetTimeouttime);
  }
  updateMachineChanges(): void {
    if (this.selectedMachine == 'Weighing Scale') {
      this.changeTableText = false;
    }
    else {
      this.changeTableText = true;
    }
  }
  onDateChange(event: any) {
    console.log(event);
  }
  openManualEntryPopupForSpecificRec(item: any): void {
    if (item.PlanOff == "" || item.PlanOff == null) {
      Swal.fire('Please enter Planoff!');
      return;
    }
    if (Number(item.PlanOff) < 0) {
      Swal.fire('Planoff should not be less than zero!');
      return;
    }
    var AotherqtyOld = Number(item.AotherqtyOld);
    // if(Number(item.AotherqtyOld)!= Number(item.Aotherqty))
    //   AotherqtyOld=Number(item.Aotherqty)
    var PlanOffOldnAotherOld = Number(item.PlanOffOld) + Number(AotherqtyOld);
    if (PlanOffOldnAotherOld < Number(item.PlanOff)) {
      Swal.fire('Planoff should not be greater than old planoff + A Other!');
      return;
    }
    var Aotherqty = PlanOffOldnAotherOld - Number(item.PlanOff);
    Aotherqty = Number(Aotherqty.toFixed(2));
    item.Aotherqty = Aotherqty;
    //item.AotherqtyOld = Aotherqty;
    var Dt_1New = (Number(item.PlanOffOld) + Number(item.Dt_1Old)) - Number(item.PlanOff);
    item.Dt_1 = Number(Dt_1New.toFixed(2));
    var OperatorIds = "";
    for (var i = 0; i < this.operatorIds.value.length; i++) {
      var OperatorId = this.operatorIds.value[i];
      OperatorIds += OperatorId + ",";
    }
    OperatorIds = OperatorIds.slice(0, -1);
    var InchargeIds = "";
    for (var i = 0; i < this.incharge.value.length; i++) {
      var InchargeId = this.incharge.value[i];
      InchargeIds += InchargeId + ",";
    }
    InchargeIds = InchargeIds.slice(0, -1);
    item.Oper_1 = OperatorIds;
    item.LineInc = InchargeIds;
    item.MachineLevelId = this.selectMachine;
    item.TempAotherqty = item.Aotherqty;
    this.selectedRowData = item;
    const dialogRef = this.dialog.open(ManualentryPopupComponent, {
      //disableClose: true,
      data: this.selectedRowData // Pass the selected row data to the mat-popup component
    });
    const dialogConfig: MatDialogConfig = {
      width: '70%',
      height: '60%',
    };
    dialogRef.afterClosed().subscribe(result => {
      this.GetManualEntryTblData();
      if (!result) {
        // for (var i = 0; i < this.objManualEntryTableData.length; i++) {
        //   var objManualEntryTableDataTemp = this.objManualEntryTableData[i];
        //   if (objManualEntryTableDataTemp.Id == result.Id) {
        //     objManualEntryTableDataTemp.Ar_1 = result.Ar_1;
        //     objManualEntryTableDataTemp.Arqty_1 = result.Arqty_1;
        //     objManualEntryTableDataTemp.Ar_2 = result.Ar_2;
        //     objManualEntryTableDataTemp.Arqty_2 = result.Arqty_2;
        //     objManualEntryTableDataTemp.Ar_3 = result.Ar_3;
        //     objManualEntryTableDataTemp.Arqty_3 = result.Arqty_3;
        //     //objManualEntryTableDataTemp.Ar_1 = result.ReasonId;
        //     objManualEntryTableDataTemp.Aotherqty = result.Aotherqty;
        //     objManualEntryTableDataTemp.Prr_1 = result.Prr_1;
        //     objManualEntryTableDataTemp.Prqty_1 = result.Prqty_1;
        //     objManualEntryTableDataTemp.Prr_2 = result.Prr_2;
        //     objManualEntryTableDataTemp.Prqty_2 = result.Prqty_2;
        //     objManualEntryTableDataTemp.Prr_3 = result.Prr_3;
        //     objManualEntryTableDataTemp.Prqty_3 = result.Prqty_3;
        //     //objManualEntryTableDataTemp.Prr_1 = result.ReasonId;
        //     objManualEntryTableDataTemp.Potherqty = result.Potherqty;
        //     objManualEntryTableDataTemp.Qr_1 = result.Qr_1;
        //     objManualEntryTableDataTemp.QrQty_1 = result.QrQty_1;
        //     objManualEntryTableDataTemp.Qr_2 = result.Qr_2;
        //     objManualEntryTableDataTemp.QrQty_2 = result.QrQty_2;
        //     objManualEntryTableDataTemp.Qr_3 = result.Qr_3;
        //     objManualEntryTableDataTemp.QrQty_3 = result.QrQty_3;
        //     //objManualEntryTableDataTemp.Qr_1 = result.ReasonId;
        //     objManualEntryTableDataTemp.Qotherqty = result.Qotherqty;
        //     break;
        //   }
        // }
      }
      this.animal = result;
    });
  }
  DefaultSelectionanualEntryDropdowns() {
    if (this.objShiftHours.length > 0) {
      var objShiftHours = this.objShiftHours[0];
      this.selectedShift = objShiftHours.Description;
    }
    if (this.objMultiLvlTreeviewInfoList1.length > 0) {
      var objMultiLvlTreeviewInfo1 = this.objMultiLvlTreeviewInfoList1[0];
      this.selectCompany = objMultiLvlTreeviewInfo1.C001_LevelId;
      this.getManualEntryDropdowns(objMultiLvlTreeviewInfo1.C001_LevelId, '1');
      this.VarManualEntrySetTimeouttime = setTimeout(() => {
        if (this.objMultiLvlTreeviewInfoList2.length > 0) {
          var objMultiLvlTreeviewInfo2 = this.objMultiLvlTreeviewInfoList2[0];
          this.selectPlant = objMultiLvlTreeviewInfo2.C001_LevelId;
          this.getManualEntryDropdowns(objMultiLvlTreeviewInfo2.C001_LevelId, '2');
          this.VarManualEntrySetTimeouttime = setTimeout(() => {
            if (this.objMultiLvlTreeviewInfoList3.length > 0) {
              var objMultiLvlTreeviewInfo3 = this.objMultiLvlTreeviewInfoList3[0];
              this.selectLine = objMultiLvlTreeviewInfo3.C001_LevelId;
              this.getManualEntryDropdowns(objMultiLvlTreeviewInfo3.C001_LevelId, '3');
              this.VarManualEntrySetTimeouttime = setTimeout(() => {
                if (this.objMultiLvlTreeviewInfoList4.length > 0) {
                  var objMultiLvlTreeviewInfo4 = this.objMultiLvlTreeviewInfoList4[0];
                  this.selectSubLine = objMultiLvlTreeviewInfo4.C001_LevelId;
                  this.getManualEntryDropdowns(objMultiLvlTreeviewInfo4.C001_LevelId, '4');
                  this.VarManualEntrySetTimeouttime = setTimeout(() => {
                    if (this.objMultiLvlTreeviewInfoList5.length > 0) {
                      var objMultiLvlTreeviewInfo5 = this.objMultiLvlTreeviewInfoList5[0];
                      this.selectMachine = objMultiLvlTreeviewInfo5.C001_LevelId;
                      this.getManualEntryDropdowns(objMultiLvlTreeviewInfo5.C001_LevelId, '5');
                      this.VarManualEntrySetTimeouttime = setTimeout(() => {
                        if (this.objMultiLvlTreeviewInfoList6.length > 0) {
                          var objMultiLvlTreeviewInfo6 = this.objMultiLvlTreeviewInfoList6[0];
                        }
                      }, 800);
                    }
                  }, 800);
                }
              }, 800);
            }
          }, 800);
        }
      }, 800);
    }
  }
  getManualEntryDropdowns(LevelId: string, ForLevelNo: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    if (ForLevelNo == "0") {
      this.selectPlant = "0";
      this.selectLine = "0";
      this.selectSubLine = "0";
      this.selectMachine = "0";
      this.objMultiLvlTreeviewInfoList2 = [];
      this.objMultiLvlTreeviewInfoList3 = [];
      this.objMultiLvlTreeviewInfoList4 = [];
      this.objMultiLvlTreeviewInfoList5 = [];
      this.objMultiLvlTreeviewInfoList6 = [];
      this.filteredMultiLvl2.next(this.objMultiLvlTreeviewInfoList2.slice());
      this.filteredMultiLvl3.next(this.objMultiLvlTreeviewInfoList3.slice());
      this.filteredMultiLvl4.next(this.objMultiLvlTreeviewInfoList4.slice());
      this.filteredMultiLvl5.next(this.objMultiLvlTreeviewInfoList5.slice());
      this.filteredMultiLvl6.next(this.objMultiLvlTreeviewInfoList6.slice());
      setTimeout(() => {
        this.DefaultSelectionanualEntryDropdowns();
      }, 1000);
    }
    else if (ForLevelNo == "1") {
      this.selectLine = "0";
      this.selectSubLine = "0";
      this.selectMachine = "0";
      if (LevelId == "0") {
        this.selectPlant = "0";
        this.objMultiLvlTreeviewInfoList2 = [];
        this.filteredMultiLvl2.next(this.objMultiLvlTreeviewInfoList2.slice());
      }
      this.objMultiLvlTreeviewInfoList3 = [];
      this.objMultiLvlTreeviewInfoList4 = [];
      this.objMultiLvlTreeviewInfoList5 = [];
      this.objMultiLvlTreeviewInfoList6 = [];
      this.filteredMultiLvl3.next(this.objMultiLvlTreeviewInfoList3.slice());
      this.filteredMultiLvl4.next(this.objMultiLvlTreeviewInfoList4.slice());
      this.filteredMultiLvl5.next(this.objMultiLvlTreeviewInfoList5.slice());
      this.filteredMultiLvl6.next(this.objMultiLvlTreeviewInfoList6.slice());
    }
    else if (ForLevelNo == "2") {
      this.selectSubLine = "0";
      this.selectMachine = "0";
      if (LevelId == "0") {
        this.selectLine = "0";
        this.objMultiLvlTreeviewInfoList3 = [];
        this.filteredMultiLvl3.next(this.objMultiLvlTreeviewInfoList3.slice());
      }
      this.objMultiLvlTreeviewInfoList4 = [];
      this.objMultiLvlTreeviewInfoList5 = [];
      this.objMultiLvlTreeviewInfoList6 = [];
      this.filteredMultiLvl4.next(this.objMultiLvlTreeviewInfoList4.slice());
      this.filteredMultiLvl5.next(this.objMultiLvlTreeviewInfoList5.slice());
      this.filteredMultiLvl6.next(this.objMultiLvlTreeviewInfoList6.slice());
    }
    else if (ForLevelNo == "3") {
      this.selectMachine = "0";
      if (LevelId == "0") {
        this.selectSubLine = "0";
        this.objMultiLvlTreeviewInfoList4 = [];
        this.filteredMultiLvl4.next(this.objMultiLvlTreeviewInfoList4.slice());
      }
      this.objMultiLvlTreeviewInfoList5 = [];
      this.objMultiLvlTreeviewInfoList6 = [];
      this.filteredMultiLvl5.next(this.objMultiLvlTreeviewInfoList5.slice());
      this.filteredMultiLvl6.next(this.objMultiLvlTreeviewInfoList6.slice());
    }
    else if (ForLevelNo == "4") {
      if (LevelId == "0") {
        this.selectMachine = "0";
        this.objMultiLvlTreeviewInfoList5 = [];
        this.filteredMultiLvl5.next(this.objMultiLvlTreeviewInfoList5.slice());
      }
      this.objMultiLvlTreeviewInfoList6 = [];
      this.filteredMultiLvl6.next(this.objMultiLvlTreeviewInfoList6.slice());
    }
    if (LevelId == "0" && ForLevelNo != "0")
      return;
    this._ManualEntryPageService.getManualEntryDropdowns(SessionToken, UserTypeId, UserName, LevelId, this.TrViewTypeC005).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      if (ForLevelNo == "0") {
        this.objMultiLvlTreeviewInfoList1 = JSON.parse(this.stringJson);
        this.filteredMultiLvl1.next(this.objMultiLvlTreeviewInfoList1.slice());
      }
      else if (ForLevelNo == "1") {
        this.objMultiLvlTreeviewInfoList2 = JSON.parse(this.stringJson);
        this.filteredMultiLvl2.next(this.objMultiLvlTreeviewInfoList2.slice());
      }
      else if (ForLevelNo == "2") {
        this.objMultiLvlTreeviewInfoList3 = JSON.parse(this.stringJson);
        this.filteredMultiLvl3.next(this.objMultiLvlTreeviewInfoList3.slice());
      }
      else if (ForLevelNo == "3") {
        this.objMultiLvlTreeviewInfoList4 = JSON.parse(this.stringJson);
        this.filteredMultiLvl4.next(this.objMultiLvlTreeviewInfoList4.slice());
      }
      else if (ForLevelNo == "4") {
        this.objMultiLvlTreeviewInfoList5 = JSON.parse(this.stringJson);
        this.filteredMultiLvl5.next(this.objMultiLvlTreeviewInfoList5.slice());
      }
      else if (ForLevelNo == "5") {
        this.objMultiLvlTreeviewInfoList6 = JSON.parse(this.stringJson);
        this.filteredMultiLvl6.next(this.objMultiLvlTreeviewInfoList6.slice());
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }

  GetDropdownListByTableName(Table: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName = Table;
    this._CRUDFunctionsService.GetDropdownListByTableName(SessionToken, UserTypeId, UserName, TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objShiftHours = response;
    }, (error) => {
      console.log(error);
    });
    return;
  }

  GetManualEntryTblData() {
    if (this.dateControl.value == null) {
      Swal.fire('Please select date!');
      return;
    }
    if (this.selectedShift == "0") {
      Swal.fire('Please select shift!');
      return;
    }
    if (this.selectCompany == "0") {
      Swal.fire('Please select company!');
      return;
    }
    if (this.selectPlant == "0") {
      Swal.fire('Please select plant!');
      return;
    }
    if (this.selectLine == "0") {
      Swal.fire('Please select line!');
      return;
    }
    if (this.selectSubLine == "0") {
      Swal.fire('Please select subline!');
      return;
    }
    if (this.selectMachine == "0") {
      Swal.fire('Please select machine!');
      return;
    }
    var StrDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dateControl.value._d, "-", " ", ":", "1", "", "");
    this.getManualEntryTableData(StrDateTime, this.selectMachine, this.selectedShift);
  }

  getManualEntryTableData(FromDate: string, UniqueId: string, Shift: string) {
    this.objAPQSummeryList = [];
    this.objManualEntryTableData = [];
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    //date formatting  from  "Mon Jul 03 2023 10:58:30 GMT+0530 (India Standard Time)" to " 2023-07-03"
    const currentDateString = String(FromDate);
    const dateParts = currentDateString.split(" ");
    const year = dateParts[3];
    const month = ("JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(dateParts[1]) / 3 + 1).toString().padStart(2, '0');
    const day = dateParts[2];
    const formattedDate = `${year}-${month}-${day}`;

    this._ManualEntryPageService.getManualEntryTableData(SessionToken, UserTypeId, UserName, FromDate, UniqueId, Shift).subscribe((response: any) => {
      console.log(response);
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objManualEntryTableData = response;
      if (this.objManualEntryTableData.length > 0) {
        this.getAPQSummeryList(FromDate, UniqueId, Shift, '0', '1');
        //const defaultSelectedValues = [1, 2];
        const OperatorSelectedValues: any = [];
        if (response[0].Oper_1 != "" && response[0].Oper_1 != null) {
          this.splitArray = response[0].Oper_1.split(',');
          for (var i = 0; i < this.splitArray.length; i++) {
            var abc = this.splitArray[i];
            OperatorSelectedValues.push(Number(abc));
          }
        }
        this.operatorIds = new FormControl(OperatorSelectedValues);
        const InchargeSelectedValues: any = [];
        if (response[0].LineInc != "" && response[0].LineInc != null) {
          this.splitArray = response[0].LineInc.split(',');
          for (var i = 0; i < this.splitArray.length; i++) {
            var abc = this.splitArray[i];
            InchargeSelectedValues.push(Number(abc));
          }
        }
        this.incharge = new FormControl(InchargeSelectedValues);
      }
      else {
        Swal.fire('Records not found!');
        return;
      }
    }, (error) => {
      console.log(error);
    });
    return;

  }

  getOperatorIncharge(TableName: string, DesignationId: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    // var TableName = "CT0005";
    // var DesignationId = "4";
    this._ManualEntryPageService.getOperatorIncharge(SessionToken, UserTypeId, UserName, TableName, DesignationId).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objOperatorInchargeData = response;
      this.objOperatorInfoList = this.objOperatorInchargeData;
      this.filteredOperators.next(this.objOperatorInfoList.slice());
      this.filteredLineIncharge.next(this.objOperatorInfoList.slice());
    }, (error) => {
      console.log(error);
    });
    return;
  }

  getAPQSummeryList(FromDate: string, Machine: string, Shift: string, MonthStart: string, Tot: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    // var TableName = "CT0005";
    // var DesignationId = "4";
    this._ManualEntryPageService.getAPQSummeryList(SessionToken, UserTypeId, UserName, FromDate, Machine, Shift, MonthStart, Tot).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objAPQSummeryList = response;
    }, (error) => {
      console.log(error);
    });
    return;
  }

  SP_UpdateProductionEntry_Dev() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this.IsWaitingOn = true;

    var OperatorIds = "";
    for (var i = 0; i < this.operatorIds.value.length; i++) {
      var OperatorId = this.operatorIds.value[i];
      OperatorIds += OperatorId + ",";
    }
    OperatorIds = OperatorIds.slice(0, -1);
    var InchargeIds = "";
    for (var i = 0; i < this.incharge.value.length; i++) {
      var InchargeId = this.incharge.value[i];
      InchargeIds += InchargeId + ",";
    }
    InchargeIds = InchargeIds.slice(0, -1);
    // var TableName = "CT0005";
    // var DesignationId = "4";
    for (var i = 0; i < this.objManualEntryTableData.length; i++) {
      var objManualEntryDetails = this.objManualEntryTableData[i];
      var Arqty_1Temp = 0;
      var Arqty_2Temp = 0;
      var Arqty_3Temp = 0;
      var AotherqtyTemp = 0;
      var Prqty_1Temp = 0;
      var Prqty_2Temp = 0;
      var Prqty_3Temp = 0;
      var PotherqtyTemp = 0;
      var QrQty_1Temp = 0;
      var QrQty_2Temp = 0;
      var QrQty_3Temp = 0;
      var QotherqtyTemp = 0;
      if (objManualEntryDetails.Arqty_1 != "")
        Arqty_1Temp = Number(objManualEntryDetails.Arqty_1);
      if (objManualEntryDetails.Arqty_2 != "")
        Arqty_2Temp = Number(objManualEntryDetails.Arqty_2);
      if (objManualEntryDetails.Arqty_3 != "")
        Arqty_3Temp = Number(objManualEntryDetails.Arqty_3);
      if (objManualEntryDetails.Aotherqty != "")
        AotherqtyTemp = Number(objManualEntryDetails.Aotherqty);

      if (objManualEntryDetails.Prqty_1 != "")
        Prqty_1Temp = Number(objManualEntryDetails.Prqty_1);
      if (objManualEntryDetails.Prqty_2 != "")
        Prqty_2Temp = Number(objManualEntryDetails.Prqty_2);
      if (objManualEntryDetails.Prqty_3 != "")
        Prqty_3Temp = Number(objManualEntryDetails.Prqty_3);
      if (objManualEntryDetails.Potherqty != "")
        PotherqtyTemp = Number(objManualEntryDetails.Potherqty);

      if (objManualEntryDetails.QrQty_1 != "")
        QrQty_1Temp = Number(objManualEntryDetails.QrQty_1);
      if (objManualEntryDetails.QrQty_2 != "")
        QrQty_2Temp = Number(objManualEntryDetails.QrQty_2);
      if (objManualEntryDetails.QrQty_3 != "")
        QrQty_3Temp = Number(objManualEntryDetails.QrQty_3);
      if (objManualEntryDetails.Qotherqty != "")
        QotherqtyTemp = Number(objManualEntryDetails.Qotherqty);

      if (objManualEntryDetails.PlanOff == "" || objManualEntryDetails.PlanOff == null) {
        Swal.fire("Please enter Planoff! for row no " + Number(i + 1));
        this.IsWaitingOn = false;
        return;
      }
      if (Number(objManualEntryDetails.PlanOff) < 0) {
        Swal.fire("Planoff should not be less than zero! for row no " + Number(i + 1));
        this.IsWaitingOn = false;
        return;
      }

      var OtherV = Arqty_1Temp + Arqty_2Temp + Arqty_3Temp + Prqty_1Temp + Prqty_2Temp + Prqty_3Temp + PotherqtyTemp;
      var Dt_1 = Number(objManualEntryDetails.PlanOffOld) + Number(objManualEntryDetails.Dt_1Old) - Number(objManualEntryDetails.PlanOff);
      objManualEntryDetails.Dt_1 = parseFloat(Number(Dt_1).toFixed(2)).toString();
      var TempAotherqty = Number(Dt_1) - Number(OtherV);
      if (TempAotherqty < 0) {
        Swal.fire("Sorry! Downtime should not be less than total time added for reasons and plan off time! for row no " + Number(i + 1));
        this.IsWaitingOn = false;
        break;
      }
      else
        objManualEntryDetails.Aotherqty = parseFloat(Number(TempAotherqty).toFixed(2)).toString();
      // AotherqtyTemp = (Number(objManualEntryDetails.Dt_1)+Number(objManualEntryDetails.PlanOffOld)) - (Number(dTotalrTime)+Number(objManualEntryDetails.PlanOff));
      // objManualEntryDetails.Aotherqty = AotherqtyTemp.toFixed(2);

      // var Dt_1New = (Number(objManualEntryDetails.PlanOffOld) + Number(objManualEntryDetails.Dt_1Old)) - Number(objManualEntryDetails.PlanOff);
      // objManualEntryDetails.Dt_1 = Dt_1New.toFixed(2);
    }
    this._ManualEntryPageService.SP_UpdateProductionEntry_DevForList(SessionToken, UserTypeId, UserName, this.selectMachine, OperatorIds, InchargeIds, this.objManualEntryTableData).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.IsWaitingOn = false;
      if (response == "Production updated successfully!") {
        this.GetManualEntryTblData();
        Swal.fire(response);
        return;
      }
      else {
        Swal.fire(response);
        return;
        // const myJSON = JSON.stringify(response);
        // let result1 = myJSON.indexOf("Hourly duration is not matching with entered (Scheduled + Downtime). Row number ");
        // if (result1 != -1) {
        //   Swal.fire(response);
        // }
        // return;
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }
}