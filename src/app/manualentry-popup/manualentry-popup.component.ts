import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManualEntryService } from '../Services/manual-entry.service';
import { ShiftHoursList } from '../manual-entry/manual-entry.component';
import { LossesEntryService } from '../losses-entry/losses-entry.service';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';

export class ManualLossesEntryTblDataInfo {
  public ApqType: string = "";
  public ReasonNo: string = "";
  public ReasonId: string = "";
  public TimeOrQty: string = "";
  public StrApqType: string = "";
  public StrReasonNo: string = "";
  public StreReasonId: string = "";
}
export class SubGroupMasterInfo {
  public Id: string = "";
  public Description: string = "";
  public OeeId: string = "";
}

@Component({
  selector: 'app-manualentry-popup',
  templateUrl: './manualentry-popup.component.html',
  styleUrls: ['./manualentry-popup.component.scss']
})
export class ManualentryPopupComponent implements OnInit {
  months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  myform!: FormGroup;
  formattedDate: string = "";
  objReasonNo: ShiftHoursList[] = [];
  stringJson: string = "";
  SelectedApqId: string = "1";
  objReasonsAllList!: SubGroupMasterInfo[];
  objReasonsList!: SubGroupMasterInfo[];
  objManualLossesEntryTblDataInfoList: ManualLossesEntryTblDataInfo[] = [];
  CHeckboxValue: string = "1";
  IsWaitingOn: boolean = false;

  public StdLossGroupFilterCtrl: FormControl = new FormControl();
  public filteredStdLossGroups: ReplaySubject<any> = new ReplaySubject<any>(1);
  private _onDestroy = new Subject<void>();
  protected _onDestroys = new Subject();

  OEEParameterId: string = "-1";
  dtEntryText: string = "Time(Min.)";
  ApqType: string = "";
  ReasonNo: string = "0";
  ReasonId: string = "0";
  TimeOrQty: string = "0";
  StrErrorMsg: string = "";
  TempData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ManualentryPopupComponent>,
    public _ManualEntryPageService: ManualEntryService, public _CRUDFunctionsService: CRUDFunctionsService, public _lossesEntryService: LossesEntryService, public _ValidationerrormessagesService: ValidationerrormessagesService, public _GlobalConstantsService: GlobalConstantsService) { }

  ngOnInit(): void {
    this.TempData = Object.assign({}, this.data);
    this.objManualLossesEntryTblDataInfoList = [];
    this.GetDropdownListByTableName('CT0031');
    //this.GetSubGroupByStdLossGroupId();

    this.StdLossGroupFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterStdLossGroupInfo();
      });

    this.SelectedApqId = "1";
    this.GetSubGroupInfoList();
    const dateString = this.TempData.Date;
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1]) - 1;
    const day = dateParts[2];
    this.formattedDate = `${this.months[monthIndex]} ${day} ${year}`;

    // var Arqty_1Temp = 0;
    // var Arqty_2Temp = 0;
    // var Arqty_3Temp = 0;
    // var AotherqtyTemp = 0;
    // var Prqty_1Temp = 0;
    // var Prqty_2Temp = 0;
    // var Prqty_3Temp = 0;
    // var PotherqtyTemp = 0;
    // var QrQty_1Temp = 0;
    // var QrQty_2Temp = 0;
    // var QrQty_3Temp = 0;
    // var QotherqtyTemp = 0;
    // if (this.TempData.Arqty_1 != "")
    //   Arqty_1Temp = Number(this.TempData.Arqty_1);
    // if (this.TempData.Arqty_2 != "")
    //   Arqty_2Temp = Number(this.TempData.Arqty_2);
    // if (this.TempData.Arqty_3 != "")
    //   Arqty_3Temp = Number(this.TempData.Arqty_3);
    // if (this.TempData.Aotherqty != "")
    //   AotherqtyTemp = Number(this.TempData.Aotherqty);

    // if (this.TempData.Prqty_1 != "")
    //   Prqty_1Temp = Number(this.TempData.Prqty_1);
    // if (this.TempData.Prqty_2 != "")
    //   Prqty_2Temp = Number(this.TempData.Prqty_2);
    // if (this.TempData.Prqty_3 != "")
    //   Prqty_3Temp = Number(this.TempData.Prqty_3);
    // if (this.TempData.Potherqty != "")
    //   PotherqtyTemp = Number(this.TempData.Potherqty);

    // if (this.TempData.QrQty_1 != "")
    //   QrQty_1Temp = Number(this.TempData.QrQty_1);
    // if (this.TempData.QrQty_2 != "")
    //   QrQty_2Temp = Number(this.TempData.QrQty_2);
    // if (this.TempData.QrQty_3 != "")
    //   QrQty_3Temp = Number(this.TempData.QrQty_3);
    // if (this.TempData.Qotherqty != "")
    //   QotherqtyTemp = Number(this.TempData.Qotherqty);

    // var dTotalrTime = Arqty_1Temp + Arqty_2Temp + Arqty_3Temp + Prqty_1Temp + Prqty_2Temp + Prqty_3Temp + PotherqtyTemp + QrQty_1Temp + QrQty_2Temp + QrQty_3Temp + QotherqtyTemp;
    // if (Number(this.TempData.Dt_1) > dTotalrTime) {
    //   AotherqtyTemp = Number(this.TempData.Dt_1) - dTotalrTime;
    //   //this.AddLossesEntryToTblByManualEntryTblDtTemp('1', '1', '0', AotherqtyTemp, 'A', 'Other', '');
    //   var isUpdated="";
    //   for (var i = 0; i < this.objManualLossesEntryTblDataInfoList.length; i++) {
    //     var objManualLossesEntryTblDataInfoTemp = this.objManualLossesEntryTblDataInfoList[i];
    //     if (objManualLossesEntryTblDataInfoTemp.ApqType == '1' && objManualLossesEntryTblDataInfoTemp.ReasonNo == '4') {
    //       this.objManualLossesEntryTblDataInfoList[i].ApqType = '1';
    //       this.objManualLossesEntryTblDataInfoList[i].ReasonNo = '4';
    //       this.objManualLossesEntryTblDataInfoList[i].ReasonId = '0';
    //       this.objManualLossesEntryTblDataInfoList[i].TimeOrQty = AotherqtyTemp.toString();
    //       this.objManualLossesEntryTblDataInfoList[i].StrApqType = 'A';
    //       this.objManualLossesEntryTblDataInfoList[i].StrReasonNo = 'Other';
    //       this.objManualLossesEntryTblDataInfoList[i].StreReasonId = '';
    //       isUpdated = "1";
    //       break;
    //     }
    //   }
    //   if (isUpdated == "") {
    //     var objManualLossesEntryTblDataInfo = {
    //       ApqType: '1',
    //       ReasonNo: '4',
    //       ReasonId: '',
    //       TimeOrQty: AotherqtyTemp.toString(),
    //       StrApqType: 'A',
    //       StrReasonNo: 'Other',
    //       StreReasonId: ''
    //     };
    //     this.objManualLossesEntryTblDataInfoList.push(objManualLossesEntryTblDataInfo);
    //   }
    // }
  }

  GetSubGroupInfoList() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    // const TableName = 'CT0021';
    // this._lossesEntryService.GetStdLossGroupInfoList(SessionToken, UserTypeId, UserName, TableName, -1).subscribe((response: any) => {
    //   this.stringJson = JSON.stringify(response);
    //   this.objReasonsAllList = JSON.parse(this.stringJson);
    //   setTimeout(()=>{
    //     this.GetnViewLossesEntryTblByPageLoad();
    //   }, 1500);
    // }, (error) => {
    //   console.log(error);
    // });
    // return;
    var Type = "Sublosses";
    this._CRUDFunctionsService.GetLossesEntryGridViewInfoListbyType(SessionToken, UserTypeId, UserName, Type).subscribe((response) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objReasonsAllList = JSON.parse(this.stringJson);
      this.GetSubGroupByStdLossGroupId("1", 1);
      setTimeout(() => {
        this.GetnViewLossesEntryTblByPageLoad();
      }, 1500);
    }, (error) => {
      console.log(error);
    });
  }

  // For reason number dropdown
  GetDropdownListByTableName(Table:string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.ReasonId = "0";
    this.TimeOrQty = "0";
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName = Table;
    this._CRUDFunctionsService.GetDropdownListByTableName(SessionToken, UserTypeId, UserName, TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objReasonNo = response;
    }, (error) => {
      console.log(error);
    });
    return;
  }

  GetSubGroupByStdLossGroupId(val: string, IsBtnClick: any) {
    this.ReasonNo = "0";
    this.ReasonId = "0";
    if (IsBtnClick == '1') {
      this.OEEParameterId = val;
    }
    if (val == "3") {
      this.dtEntryText = "Quantity(Nos.)";
    }
    else {
      this.dtEntryText = "Time(Min.)";
    }
    this.objReasonsList = this.objReasonsAllList.filter(reason =>
      reason.OeeId.toLowerCase().includes(this.OEEParameterId.toLowerCase())
    );
    this.filteredStdLossGroups.next(this.objReasonsList.slice());
  }

  private filterStdLossGroupInfo() {
    if (!this.objReasonsList) {
      return;
    }
    let search = this.StdLossGroupFilterCtrl.value;
    if (!search) {
      this.filteredStdLossGroups.next(this.objReasonsList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredStdLossGroups.next(
      this.objReasonsList.filter(reason => reason.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  AddLoseEntryToTempTable() {
    this.StrErrorMsg = "";
    if (this.SelectedApqId == "") {
      this.StrErrorMsg = "Please select APQ option!";
      return false;
    }
    if (this.ReasonNo == "0") {
      this.StrErrorMsg = "Please select reason no!";
      return false;
    }
    if (this.ReasonId == "0") {
      this.StrErrorMsg = "Please select reason!";
      return false;
    }
    if (this.SelectedApqId == "1") {
      if (this.ReasonNo == "4") {
        this.StrErrorMsg = "Please select reason no!";
        return false;
      }
    }
    
    if (this.TimeOrQty == "0" || this.TimeOrQty == "" || this.TimeOrQty == null) {
      var StrMsg = "time!";
      if (this.SelectedApqId == "3")
        StrMsg = "quantity!";
      this.StrErrorMsg = "Please enter " + StrMsg;
      return false;
    }
    if (Number(this.TimeOrQty) < 0.1) {
      var StrMsg = "Time ";
      if (this.SelectedApqId == "3")
        StrMsg = "Quantity ";
      this.StrErrorMsg = StrMsg + " should not be less than zero!";
      return false;
    }
    if (Number(this.TempData.Dt_1) < 0) {
      this.StrErrorMsg = "Sorry! Downtime is less than 0.";
      return;
    }
    if (this.SelectedApqId == '3') {
      var isNoInt = this.isPositiveInteger(this.TimeOrQty);
      if (isNoInt == false) {
        this.StrErrorMsg = "Entered quntity should be numeric(without decimal places)!";
        return;
      }
    }
    else {
      var isNoInt = this.CheckGivenStringNumeric(this.TimeOrQty);
      if (isNoInt == false) {
        this.StrErrorMsg = "Entered time should be numeric!";
        return false;
      }
    }
    this.TempData.Aotherqty = parseFloat(this.TempData.Aotherqty).toFixed(2);
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
    if (this.TempData.Arqty_1 != "")
      Arqty_1Temp = Number(this.TempData.Arqty_1);
    if (this.TempData.Arqty_2 != "")
      Arqty_2Temp = Number(this.TempData.Arqty_2);
    if (this.TempData.Arqty_3 != "")
      Arqty_3Temp = Number(this.TempData.Arqty_3);
    if (this.TempData.Aotherqty != "")
      AotherqtyTemp = Number(this.TempData.Aotherqty);

    if (this.TempData.Prqty_1 != "")
      Prqty_1Temp = Number(this.TempData.Prqty_1);
    if (this.TempData.Prqty_2 != "")
      Prqty_2Temp = Number(this.TempData.Prqty_2);
    if (this.TempData.Prqty_3 != "")
      Prqty_3Temp = Number(this.TempData.Prqty_3);
    if (this.TempData.Potherqty != "")
      PotherqtyTemp = Number(this.TempData.Potherqty);

    if (this.TempData.QrQty_1 != "")
      QrQty_1Temp = Number(this.TempData.QrQty_1);
    if (this.TempData.QrQty_2 != "")
      QrQty_2Temp = Number(this.TempData.QrQty_2);
    if (this.TempData.QrQty_3 != "")
      QrQty_3Temp = Number(this.TempData.QrQty_3);
    if (this.TempData.Qotherqty != "")
      QotherqtyTemp = Number(this.TempData.Qotherqty);

    if (this.SelectedApqId == "1") {
      if (this.ReasonNo == "1") {
        Arqty_1Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "2") {
        Arqty_2Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "3") {
        Arqty_3Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "4") {
        AotherqtyTemp = Number(this.TimeOrQty);
      }
    }
    else if (this.SelectedApqId == "2") {
      if (this.ReasonNo == "1") {
        Prqty_1Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "2") {
        Prqty_2Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "3") {
        Prqty_3Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "4") {
        PotherqtyTemp = Number(this.TimeOrQty);
      }
    }
    else if (this.SelectedApqId == "3") {
      if (this.ReasonNo == "1") {
        QrQty_1Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "2") {
        QrQty_2Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "3") {
        QrQty_3Temp = Number(this.TimeOrQty);
      }
      else if (this.ReasonNo == "4") {
        QotherqtyTemp = Number(this.TimeOrQty);
      }
    }
    var OtherV = Arqty_1Temp + Arqty_2Temp + Arqty_3Temp + Prqty_1Temp + Prqty_2Temp + Prqty_3Temp + PotherqtyTemp;
    if (((Number(this.TempData.PlanOffOld) + Number(this.TempData.Dt_1Old)) - OtherV) >= Number(this.TempData.PlanOff)) {
      var TempAotherqty = Number(this.TempData.Dt_1) - Number(OtherV);
      this.TempData.Aotherqty = parseFloat(Number(TempAotherqty).toFixed(2));
      AotherqtyTemp = TempAotherqty;
      //this.TempData.Ar_1 = this.ReasonId;
      // // if(Number(this.TempData.PlanOffOld) != Number(this.TempData.PlanOff)){
      // //   if(Number(this.TempData.PlanOffOld) > Number(this.TempData.PlanOff)){
      // //     //this.TempData.Dt_1 = parseFloat(Number((Number(this.TempData.PlanOffOld) + Number(this.TempData.Dt_1Old))-Number(this.TempData.PlanOff)).toFixed(2));
      // //     this.TempData.Aotherqty = parseFloat(Number((Number(this.TempData.PlanOffOld) + Number(this.TempData.Dt_1Old))-Number(this.TempData.PlanOff)).toFixed(2));
      // //     AotherqtyTemp = this.TempData.Aotherqty;
      // //   }
      // //   else{
      // //     var b = Number(this.TempData.PlanOff)-Number(this.TempData.PlanOffOld);
      // //     if((Number(this.TempData.PlanOff)-Number(this.TempData.PlanOffOld))>=Number(this.TempData.Dt_1)){
      // //       if(Number(this.TempData.Aotherqty)>=b){
      // //         //this.TempData.PlanOff = parseFloat(Number(Number(this.TempData.Dt_1)+Number(this.TempData.PlanOffOld)).toFixed(2));
      // //         //this.TempData.Dt_1 = 0;
      // //         this.TempData.Aotherqty = 0;
      // //         AotherqtyTemp = this.TempData.Aotherqty;
      // //       }
      // //     }
      // //     else{
      // //       //this.TempData.Dt_1 = parseFloat(Number(Number(this.TempData.Dt_1Old)-Number(this.TempData.PlanOff)+Number(this.TempData.PlanOffOld)).toFixed(2));
      // //       this.TempData.Aotherqty = parseFloat(Number(Number(this.TempData.Dt_1)-Number(OtherV)).toFixed(2));
      // //       AotherqtyTemp = this.TempData.Aotherqty;
      // //     }
      // //   }
      // // }
      var StrSelectedApqId = "A";
      if (this.SelectedApqId == "2")
        StrSelectedApqId = "P";
      else if (this.SelectedApqId == "3")
        StrSelectedApqId = "Q";

      var StrReasonNo = "Reason No 1";
      for (var i = 0; i < this.objReasonNo.length; i++) {
        var objReasonNoInfo = this.objReasonNo[i];
        if (objReasonNoInfo.Id == this.ReasonNo) {
          StrReasonNo = objReasonNoInfo.Description;
          break;
        }
      }
      var StreReasonId = "A";
      for (var i = 0; i < this.objReasonsList.length; i++) {
        var objReasonsInfo = this.objReasonsList[i];
        if (objReasonsInfo.Id == this.ReasonId) {
          StreReasonId = objReasonsInfo.Description;
          break;
        }
      }
      var isUpdated = "";
      var z = 0;
      for (var i = 0; i < this.objManualLossesEntryTblDataInfoList.length; i++) {
        var objManualLossesEntryTblDataInfoTemp = this.objManualLossesEntryTblDataInfoList[i];
        if (objManualLossesEntryTblDataInfoTemp.ApqType == this.SelectedApqId && objManualLossesEntryTblDataInfoTemp.ReasonNo == this.ReasonNo) {
          this.TimeOrQty = parseFloat(this.TimeOrQty).toFixed(2);
          this.objManualLossesEntryTblDataInfoList[i].ApqType = this.SelectedApqId;
          this.objManualLossesEntryTblDataInfoList[i].ReasonNo = this.ReasonNo;
          this.objManualLossesEntryTblDataInfoList[i].ReasonId = this.ReasonId;
          this.objManualLossesEntryTblDataInfoList[i].TimeOrQty = this.TimeOrQty;
          this.objManualLossesEntryTblDataInfoList[i].StrApqType = StrSelectedApqId;
          this.objManualLossesEntryTblDataInfoList[i].StrReasonNo = StrReasonNo;
          this.objManualLossesEntryTblDataInfoList[i].StreReasonId = StreReasonId;
          isUpdated = "1";
          break;
        }
      }
      if (isUpdated == "") {
        this.TimeOrQty = parseFloat(this.TimeOrQty).toFixed(2);
        var objManualLossesEntryTblDataInfo = {
          ApqType: this.SelectedApqId,
          ReasonNo: this.ReasonNo,
          ReasonId: this.ReasonId,
          TimeOrQty: this.TimeOrQty,
          StrApqType: StrSelectedApqId,
          StrReasonNo: StrReasonNo,
          StreReasonId: StreReasonId
        };
        this.objManualLossesEntryTblDataInfoList.push(objManualLossesEntryTblDataInfo);
      }
      if (this.SelectedApqId == "1") {
        if (this.ReasonNo == "1") {
          this.TempData.Ar_1 = this.ReasonId;
          this.TempData.Arqty_1 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "2") {
          this.TempData.Ar_2 = this.ReasonId;
          this.TempData.Arqty_2 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "3") {
          this.TempData.Ar_3 = this.ReasonId;
          this.TempData.Arqty_3 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "4") {
          //this.TempData.Ar_1 = this.ReasonId;
          this.TempData.Aotherqty = this.TimeOrQty;
        }
      }
      else if (this.SelectedApqId == "2") {
        if (this.ReasonNo == "1") {
          this.TempData.Prr_1 = this.ReasonId;
          this.TempData.Prqty_1 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "2") {
          this.TempData.Prr_2 = this.ReasonId;
          this.TempData.Prqty_2 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "3") {
          this.TempData.Prr_3 = this.ReasonId;
          this.TempData.Prqty_3 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "4") {
          //this.TempData.Prr_1 = this.ReasonId;
          this.TempData.Potherqty = this.TimeOrQty;
        }
      }
      else if (this.SelectedApqId == "3") {
        if (this.ReasonNo == "1") {
          this.TempData.Qr_1 = this.ReasonId;
          this.TempData.QrQty_1 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "2") {
          this.TempData.Qr_2 = this.ReasonId;
          this.TempData.QrQty_2 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "3") {
          this.TempData.Qr_3 = this.ReasonId;
          this.TempData.QrQty_3 = this.TimeOrQty;
        }
        else if (this.ReasonNo == "4") {
          //this.TempData.Qr_1 = this.ReasonId;
          this.TempData.Qotherqty = this.TimeOrQty;
        }
      }
      // var OtherV2 = Number(this.TempData.Arqty_1 + this.TempData.Arqty_2 + this.TempData.Arqty_3 + this.TempData.Prqty_1 + this.TempData.Prqty_2 + this.TempData.Prqty_3 + this.TempData.Potherqty);
      // var dAllTimeCount = (Number(this.TempData.PlanOffOld+this.TempData.Dt_1Old)) - (Number(OtherV2+this.TempData.PlanOff));
      //     this.TempData.Aotherqty = parseFloat(Number(dAllTimeCount).toFixed(2));
      //     AotherqtyTemp = dAllTimeCount;
      AotherqtyTemp = Number(parseFloat(AotherqtyTemp.toString()).toFixed(2));
      StrReasonNo = this.GetStrResonNoByResonNo('4');
      isUpdated = "";
      for (var i = 0; i < this.objManualLossesEntryTblDataInfoList.length; i++) {
        var objManualLossesEntryTblDataInfoTemp = this.objManualLossesEntryTblDataInfoList[i];
        if (objManualLossesEntryTblDataInfoTemp.ApqType == '1' && objManualLossesEntryTblDataInfoTemp.ReasonNo == '4') {
          this.objManualLossesEntryTblDataInfoList[i].ApqType = '1';
          this.objManualLossesEntryTblDataInfoList[i].ReasonNo = '4';
          this.objManualLossesEntryTblDataInfoList[i].ReasonId = '';
          this.objManualLossesEntryTblDataInfoList[i].TimeOrQty = AotherqtyTemp.toString();
          this.objManualLossesEntryTblDataInfoList[i].StrApqType = 'A';
          this.objManualLossesEntryTblDataInfoList[i].StrReasonNo = StrReasonNo;
          this.objManualLossesEntryTblDataInfoList[i].StreReasonId = '';
          isUpdated = "1";
          break;
        }
      }
      if (isUpdated == "") {
        AotherqtyTemp = Number(parseFloat(AotherqtyTemp.toString()).toFixed(2));
        var objManualLossesEntryTblDataInfo = {
          ApqType: '1',
          ReasonNo: '4',
          ReasonId: '',
          TimeOrQty: AotherqtyTemp.toString(),
          StrApqType: 'A',
          StrReasonNo: StrReasonNo,
          StreReasonId: ''
        };
        this.objManualLossesEntryTblDataInfoList.push(objManualLossesEntryTblDataInfo);
      }
      this.TempData.Aotherqty = parseFloat(this.TempData.Aotherqty).toFixed(2);
      this.ReasonId = "0";
      this.TimeOrQty = "0";
    }
    else {
      this.StrErrorMsg = "Sorry! Downtime should not be less than total time added in below table!";
      return;
    }
    return;
  }
  SaveUpdatePopupLossesInformation() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    if (this.objManualLossesEntryTblDataInfoList.length < 1) {
      this.StrErrorMsg = "Atleast one record add in below table!";
      return;
    }
    for (var i = 0; i < this.objManualLossesEntryTblDataInfoList.length; i++) {
      var objManualLossesEntryTblDataInfo = this.objManualLossesEntryTblDataInfoList[i];
      if (objManualLossesEntryTblDataInfo.ApqType == "1") {
        if (objManualLossesEntryTblDataInfo.ReasonNo == "1") {
          this.TempData.Ar_1 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.Arqty_1 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "2") {
          this.TempData.Ar_2 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.Arqty_2 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "3") {
          this.TempData.Ar_3 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.Arqty_3 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "4") {
          this.TempData.Aotherqty = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
      }
      else if (objManualLossesEntryTblDataInfo.ApqType == "2") {
        if (objManualLossesEntryTblDataInfo.ReasonNo == "1") {
          this.TempData.Prr_1 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.Prqty_1 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "2") {
          this.TempData.Prr_2 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.Prqty_2 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "3") {
          this.TempData.Prr_3 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.Prqty_3 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "4") {
          this.TempData.Potherqty = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
      }
      else if (objManualLossesEntryTblDataInfo.ApqType == "3") {
        if (objManualLossesEntryTblDataInfo.ReasonNo == "1") {
          this.TempData.Qr_1 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.QrQty_1 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "2") {
          this.TempData.Qr_2 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.QrQty_2 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "3") {
          this.TempData.Qr_3 = objManualLossesEntryTblDataInfo.ReasonId;
          this.TempData.QrQty_3 = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
        else if (objManualLossesEntryTblDataInfo.ReasonNo == "4") {
          this.TempData.Qotherqty = objManualLossesEntryTblDataInfo.TimeOrQty;
        }
      }
    }

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
    if (this.TempData.Arqty_1 != "")
      Arqty_1Temp = Number(this.TempData.Arqty_1);
    if (this.TempData.Arqty_2 != "")
      Arqty_2Temp = Number(this.TempData.Arqty_2);
    if (this.TempData.Arqty_3 != "")
      Arqty_3Temp = Number(this.TempData.Arqty_3);
    if (this.TempData.Aotherqty != "")
      AotherqtyTemp = Number(this.TempData.Aotherqty);

    if (this.TempData.Prqty_1 != "")
      Prqty_1Temp = Number(this.TempData.Prqty_1);
    if (this.TempData.Prqty_2 != "")
      Prqty_2Temp = Number(this.TempData.Prqty_2);
    if (this.TempData.Prqty_3 != "")
      Prqty_3Temp = Number(this.TempData.Prqty_3);
    if (this.TempData.Potherqty != "")
      PotherqtyTemp = Number(this.TempData.Potherqty);

    if (this.TempData.QrQty_1 != "")
      QrQty_1Temp = Number(this.TempData.QrQty_1);
    if (this.TempData.QrQty_2 != "")
      QrQty_2Temp = Number(this.TempData.QrQty_2);
    if (this.TempData.QrQty_3 != "")
      QrQty_3Temp = Number(this.TempData.QrQty_3);
    if (this.TempData.Qotherqty != "")
      QotherqtyTemp = Number(this.TempData.Qotherqty);

    var OtherV = Arqty_1Temp + Arqty_2Temp + Arqty_3Temp + Prqty_1Temp + Prqty_2Temp + Prqty_3Temp + PotherqtyTemp + AotherqtyTemp;
    var PlanOffDt1Old = Number(this.TempData.PlanOffOld) + Number(this.TempData.Dt_1Old);
    var PlanOffOtherV = Number(OtherV) + Number(this.TempData.PlanOff);
    PlanOffDt1Old = Number(parseFloat(PlanOffDt1Old.toString()).toFixed(2));
    PlanOffOtherV = Number(parseFloat(PlanOffOtherV.toString()).toFixed(2));
    if (PlanOffDt1Old != PlanOffOtherV) {
      this.StrErrorMsg = "Sorry! Downtime should not be less than total time added in below table!";
      return;
    }

    this.IsWaitingOn = true;
    var OperatorIds = this.TempData.Oper_1;
    var InchargeIds = this.TempData.LineInc;
    // var TableName = "CT0005";
    // var DesignationId = "4";
    this.data = this.TempData;
    this._ManualEntryPageService.SP_UpdateProductionEntry_Dev(SessionToken, UserTypeId, UserName, this.TempData.MachineLevelId, OperatorIds, InchargeIds, this.TempData).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.IsWaitingOn = false;
      if (response == "Production updated successfully!") {
        this.StrErrorMsg = response;
        return;
      }
      else {
        if (response == "Hourly duration is not matching with entered (Scheduled + Downtime).") {
          this.StrErrorMsg = response;
        }
        else {
          this.StrErrorMsg = "Something went wrong!";
        }
        return;
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }
  GetnViewLossesEntryTblByPageLoad() {
    var ApqType = "1";
    var ReasonNo = "1";
    var ReasonId = "";
    var TimeOrQty = "";
    var StrApqType = "A";
    var StrReasonNo = "";
    var StreReasonId = "";
    if (this.TempData.Ar_1 != "" && this.TempData.Arqty_1 != "" && this.TempData.Arqty_1 != "0") {
      ReasonNo = "1";
      ReasonId = this.TempData.Ar_1;
      TimeOrQty = this.TempData.Arqty_1;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Ar_2 != "" && this.TempData.Arqty_2 != "" && this.TempData.Arqty_2 != "0") {
      ReasonNo = "2"
      ReasonId = this.TempData.Ar_2;
      TimeOrQty = this.TempData.Arqty_2;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Ar_3 != "" && this.TempData.Arqty_3 != "" && this.TempData.Arqty_3 != "0") {
      ReasonNo = "3"
      ReasonId = this.TempData.Ar_3;
      TimeOrQty = this.TempData.Arqty_3;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Aotherqty != "0" && this.TempData.Aotherqty != "") {
      ReasonNo = "4"
      TimeOrQty = this.TempData.Aotherqty;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      ReasonId = '';
      StreReasonId = '';
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    ApqType = "2";
    StrApqType = "P";
    if (this.TempData.Prr_1 != "" && this.TempData.Prqty_1 != "0" && this.TempData.Prqty_1 != "") {
      ReasonNo = "1";
      ReasonId = this.TempData.Prr_1;
      TimeOrQty = this.TempData.Prqty_1;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Prr_2 != "" && this.TempData.Prqty_2 != "0" && this.TempData.Prqty_2 != "") {
      ReasonNo = "2"
      ReasonId = this.TempData.Prr_2;
      TimeOrQty = this.TempData.Prqty_2;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Prr_3 != "" && this.TempData.Prqty_3 != "0" && this.TempData.Prqty_3 != "") {
      ReasonNo = "3"
      ReasonId = this.TempData.Prr_3;
      TimeOrQty = this.TempData.Prqty_3;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Potherqty != "" && this.TempData.Potherqty != "0") {
      ReasonNo = "4"
      TimeOrQty = this.TempData.Potherqty;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      ReasonId = '';
      StreReasonId = '';
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    ApqType = "3";
    StrApqType = "Q";
    if (this.TempData.Qr_1 != "" && this.TempData.QrQty_1 != "0" && this.TempData.QrQty_1 != "") {
      ReasonNo = "1";
      ReasonId = this.TempData.Qr_1;
      TimeOrQty = this.TempData.QrQty_1;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Qr_2 != "" && this.TempData.QrQty_2 != "0" && this.TempData.QrQty_2 != "") {
      ReasonNo = "2"
      ReasonId = this.TempData.Qr_2;
      TimeOrQty = this.TempData.QrQty_2;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Qr_3 != "" && this.TempData.QrQty_3 != "0" && this.TempData.QrQty_3 != "") {
      ReasonNo = "3"
      ReasonId = this.TempData.Qr_3;
      TimeOrQty = this.TempData.QrQty_3;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      StreReasonId = this.GetStrResonIdByResonId(ReasonId);
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    if (this.TempData.Qotherqty != "" && this.TempData.Qotherqty != "0") {
      ReasonNo = "4"
      TimeOrQty = this.TempData.Qotherqty;
      StrReasonNo = this.GetStrResonNoByResonNo(ReasonNo);
      ReasonId = '';
      StreReasonId = '';
      this.AddLossesEntryToTblByManualEntryTblDtTemp(ApqType, ReasonNo, ReasonId, TimeOrQty, StrApqType, StrReasonNo, StreReasonId);
    }
    return;
  }
  GetStrResonNoByResonNo(ReasonNo: any) {
    var StrReasonNo = "Reason No 1";
    for (var i = 0; i < this.objReasonNo.length; i++) {
      var objReasonNoInfo = this.objReasonNo[i];
      if (objReasonNoInfo.Id == ReasonNo) {
        StrReasonNo = objReasonNoInfo.Description;
        return StrReasonNo;
        break;
      }
    }
    return StrReasonNo;
  }

  GetStrResonIdByResonId(ReasonId: any) {
    var StreReasonId = "";
    for (var i = 0; i < this.objReasonsAllList.length; i++) {
      var objReasonsInfo = this.objReasonsAllList[i];
      if (objReasonsInfo.Id == ReasonId) {
        StreReasonId = objReasonsInfo.Description;
        return StreReasonId;
        break;
      }
    }
    return StreReasonId;
  }
  AddLossesEntryToTblByManualEntryTblDtTemp(SelectedApqId: any, ReasonNo: any, ReasonId: any, TimeOrQty: any, StrSelectedApqId: string, StrReasonNo: any, StreReasonId: any) {
    // console.log(SelectedApqId+'='+ ReasonNo +'='+StrSelectedApqId);
    // if(SelectedApqId=='1' && ReasonNo=='4'&& StrSelectedApqId=='A'){
    //   this.StrErrorMsg = "You can't add Aother!";
    //   return;
    // }    
    var objManualLossesEntryTblDataInfo = {
      ApqType: SelectedApqId,
      ReasonNo: ReasonNo,
      ReasonId: ReasonId,
      TimeOrQty: TimeOrQty,
      StrApqType: StrSelectedApqId,
      StrReasonNo: StrReasonNo,
      StreReasonId: StreReasonId
    };
    this.objManualLossesEntryTblDataInfoList.push(objManualLossesEntryTblDataInfo);
  }
  isPositiveInteger(n: any): boolean {
    return parseFloat(n) === (n >>> 0);
  }

  CheckGivenStringNumeric(num: any): boolean {
    return !isNaN(num);
  }
}
