import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MultiLvlTreeviewInfo } from '../kpipage/kpipage.component';
import { Router } from '@angular/router';
import { KpiPageService } from '../Services/kpi-page.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Component({
  selector: 'app-kpitreeviewwithlimit',
  templateUrl: './kpitreeviewwithlimit.component.html',
  styleUrls: ['./kpitreeviewwithlimit.component.scss']
})
export class KpitreeviewwithlimitComponent {
  @Input() LevelTypeInputs = 'a';
  @Input() LevelUpToInputs = '99';
  @Input() WithParameters = '0';
  objMultiLvlTreeviewInfoList: MultiLvlTreeviewInfo[] = [];
  myform!: FormGroup;
  C001_LevelId: string = "";
  TempHeaderTitle: string = "";
  LastTLevelNo: number = 0;

  @Output() KpiTreeviewObjectData = new EventEmitter<any>()
  constructor(private _GlobalConstantsService: GlobalConstantsService, public _KpiPageService: KpiPageService, public _ValidationerrormessagesService: ValidationerrormessagesService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("SessionIsCustomMenu") === null) {
      this.GetLeftSideTreeDetailsDataSet();
    }
  }
  GetLeftSideTreeDetailsDataSet() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._KpiPageService.GetMultiLevelTreeViewByParametersnLevelLimit(SessionToken, UserTypeId, UserName, this.WithParameters, this.LevelUpToInputs, '', '', '', '', this.LevelTypeInputs, '', '').subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objMultiLvlTreeviewInfoList = response;
      if (this.objMultiLvlTreeviewInfoList.length > 0) {
        var objTreeviewOjbectDataTemp = this.objMultiLvlTreeviewInfoList[0];
        if (objTreeviewOjbectDataTemp.objMultiLvlTreeviewInfoList.length > 0) {
          var objTreeviewOjbectDataTemp1 = objTreeviewOjbectDataTemp.objMultiLvlTreeviewInfoList[0];
          if (objTreeviewOjbectDataTemp1.objMultiLvlTreeviewInfoList.length > 0) {
            var objTreeviewOjbectDataTemp2 = objTreeviewOjbectDataTemp1.objMultiLvlTreeviewInfoList[0];
            if (objTreeviewOjbectDataTemp2.objMultiLvlTreeviewInfoList.length > 0) {
              var objTreeviewOjbectDataTemp3 = objTreeviewOjbectDataTemp2.objMultiLvlTreeviewInfoList[0];
              if (objTreeviewOjbectDataTemp3.objMultiLvlTreeviewInfoList.length > 0) {
                var objTreeviewOjbectDataTemp4 = objTreeviewOjbectDataTemp3.objMultiLvlTreeviewInfoList[0];
                if (objTreeviewOjbectDataTemp4.objMultiLvlTreeviewInfoList.length > 0) {
                  var objTreeviewOjbectDataTemp5 = objTreeviewOjbectDataTemp4.objMultiLvlTreeviewInfoList[0];
                  if (objTreeviewOjbectDataTemp5.objMultiLvlTreeviewInfoList.length > 0) {
                    var objTreeviewOjbectDataTemp6 = objTreeviewOjbectDataTemp5.objMultiLvlTreeviewInfoList[0];
                    if (objTreeviewOjbectDataTemp6.objMultiLvlTreeviewInfoList.length > 0) {
                      var objTreeviewOjbectDataTemp7 = objTreeviewOjbectDataTemp6.objMultiLvlTreeviewInfoList[0];
                      this.LastTLevelNo = 8;
                      this.ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp7, '', 8);
                      return false;
                    }
                    else {
                      this.LastTLevelNo = 7;
                      this.ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp6, '', 7);
                      return false;
                    }
                  }
                  else {
                    this.LastTLevelNo = 6;
                    this.ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp5, '', 6);
                    return false;
                  }
                }
                else {
                  this.LastTLevelNo = 5;
                  this.ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp4, '', 5);
                  return false;
                }
              }
              else {
                this.LastTLevelNo = 4;
                this.ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp3, '', 4);
                return false;
              }
            }
            else {
              this.LastTLevelNo = 3;
              this.ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp2, '', 3);
              return false;
            }
          }
          else {
            this.LastTLevelNo = 2;
            this.ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp1, '', 2);
            return false;
          }
        }
        else {
          this.LastTLevelNo = 1;
          this.ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp, '', 1);
          return false;
        }
      }
      return;
    }, (error) => {
      console.log(error);
    });
    return;
    // var objTreeviewOjbectDataTemp = this.objMultiLvlTreeviewInfoList[0];
    // this.C001_LevelId = objTreeviewOjbectDataTemp.C001_LevelId;
    // var objTreeviewOjbectData = { C001_LevelId: objTreeviewOjbectDataTemp.C001_LevelId, C003_LevelName: objTreeviewOjbectDataTemp.C003_LevelName,
    //   C004_LevelDescription: objTreeviewOjbectDataTemp.C004_LevelDescription, C002_ParentLevelId:objTreeviewOjbectDataTemp.C002_ParentLevelId, IsBtnClick: '' };
    //  this.KpiTreeviewObjectData.emit(objTreeviewOjbectData);
  }

  public ShowKpiBoxesInfoByObjectClick(objTreeviewOjbectDataTemp: any, IsBtnClick: any, SequenceID: any) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    if (IsBtnClick == '') {
      this.C001_LevelId = objTreeviewOjbectDataTemp.C001_LevelId.toString();
    }
    var objTreeviewOjbectData = {
      C001_LevelId: objTreeviewOjbectDataTemp.C001_LevelId, C003_LevelName: objTreeviewOjbectDataTemp.C003_LevelName,
      C004_LevelDescription: objTreeviewOjbectDataTemp.C004_LevelDescription, C002_ParentLevelId: objTreeviewOjbectDataTemp.C002_ParentLevelId, IsBtnClick: IsBtnClick,
      SequenceID: SequenceID, LastTLevelNo: this.LastTLevelNo
    };
    this.KpiTreeviewObjectData.emit(objTreeviewOjbectData);
    return;
  }
}
