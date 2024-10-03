import { Component, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { MultiLvlTreeviewInfo } from '../kpipage/kpipage.component';
import { Router } from '@angular/router';
import { KpiPageService } from '../Services/kpi-page.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Component({
  selector: 'app-leftsidetreeviewwithlimit',
  templateUrl: './leftsidetreeviewwithlimit.component.html',
  styleUrls: ['./leftsidetreeviewwithlimit.component.scss']
})
export class LeftsidetreeviewwithlimitComponent {
  @Input() LevelTypeInputs = 'a';
  @Input() LevelUpToInputs = '99';
  @Input() WithParameters = '0';
  @Output() PassSelectedParamIds = new EventEmitter<any>();
  objMultiLvlTreeviewInfoList: MultiLvlTreeviewInfo[] = [];
  HeaderTitleName: string = "";
  res: any;
  checkboxValues: boolean[] = [];
  panelSelected: boolean[] = [];
  iSelectedParamCount: number = 0;

  constructor(private router: Router, public _KpiPageService: KpiPageService, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("SessionMenuId") != null) {
      var SessionTrendMenuId = sessionStorage.getItem('SessionMenuId') as string;
    }
    else {
      this.GetLeftSideTreeDetailsDataSet();
    }
  }

  GetLeftSideTreeDetailsDataSet() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    //this._KpiPageService.GetMultiLevelTreeViewByParametersnLevelLimit(SessionToken, UserTypeId, UserName, '1','4','','','','','b','','').subscribe((response: any) => {
    this._KpiPageService.GetMultiLevelTreeViewByParametersnLevelLimit(SessionToken, UserTypeId, UserName, this.WithParameters, this.LevelUpToInputs, '', '', '', '', this.LevelTypeInputs, '', '').subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objMultiLvlTreeviewInfoList = response;
      // this.GetFirstKpiBoxesObjectInfoByPageLoad(true,this.objMultiLvlTreeviewInfoList);
      this.GetFirstKpiBoxesObjectInfoByPageLoad(true);
    }, (error) => {
      console.log(error);
    });
    return;
  }

  public GetFirstKpiBoxesObjectInfoByPageLoad(IsTrueFalse: any) {
    if (this.objMultiLvlTreeviewInfoList.length > 0) {
      for (var i = 0; i < this.objMultiLvlTreeviewInfoList.length; i++) {
        var objMultiLvlTreeviewInfo = this.objMultiLvlTreeviewInfoList[i];
        if (objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList.length > 0) {
          for (var j = 0; j < objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList.length; j++) {
            var objMultiLvlTreeviewInfoTemp1 = objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList[j];
            if (objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList.length > 0) {
              for (var k = 0; k < objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList.length; k++) {
                var objMultiLvlTreeviewInfoTemp2 = objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList[k];
                if (objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList.length > 0) {
                  for (var l = 0; l < objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList.length; l++) {
                    var objMultiLvlTreeviewInfoTemp3 = objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList[l];
                    if (objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList.length > 0) {
                      for (var m = 0; m < objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList.length; m++) {
                        var objMultiLvlTreeviewInfoTemp4 = objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList[m];
                        if (objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList.length > 0) {
                          for (var n = 0; n < objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList.length; n++) {
                            var objMultiLvlTreeviewInfoTemp5 = objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList[n];
                            if (objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList.length > 0) {
                              for (var o = 0; o < objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList.length; o++) {
                                var objMultiLvlTreeviewInfoTemp6 = objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList[o];
                                objMultiLvlTreeviewInfoTemp6.isChecked = IsTrueFalse;
                                this.PassSelectedParamIds.emit(objMultiLvlTreeviewInfoTemp6.C001_LevelId);
                                break;
                              }
                              break; // Exit the loop of objMultiLvlTreeviewInfoTemp5
                            }
                            else {
                              objMultiLvlTreeviewInfoTemp5.isChecked = IsTrueFalse;
                              this.PassSelectedParamIds.emit(objMultiLvlTreeviewInfoTemp5.C001_LevelId);
                              break;
                            }
                          }
                          break; // Exit the loop of objMultiLvlTreeviewInfoTemp4
                        }
                        else {
                          objMultiLvlTreeviewInfoTemp4.isChecked = IsTrueFalse;
                          this.PassSelectedParamIds.emit(objMultiLvlTreeviewInfoTemp4.C001_LevelId);
                          break;
                        }
                      }
                      break; // Exit the loop of objMultiLvlTreeviewInfoTemp3
                    }
                    else {
                      objMultiLvlTreeviewInfoTemp3.isChecked = IsTrueFalse;
                      this.PassSelectedParamIds.emit(objMultiLvlTreeviewInfoTemp3.C001_LevelId);
                      break;
                    }
                  }
                  break; // Exit the loop of objMultiLvlTreeviewInfoTemp2
                }
                else {
                  objMultiLvlTreeviewInfoTemp2.isChecked = IsTrueFalse;
                  this.PassSelectedParamIds.emit(objMultiLvlTreeviewInfoTemp2.C001_LevelId);
                  break;
                }
              }
              break; // Exit the loop of objMultiLvlTreeviewInfoTemp1
            }
            else {
              objMultiLvlTreeviewInfoTemp1.isChecked = IsTrueFalse;
              this.PassSelectedParamIds.emit(objMultiLvlTreeviewInfoTemp1.C001_LevelId);
              break;
            }
          }
          break; // Exit the loop of objMultiLvlTreeviewInfo
        }
        else {
          objMultiLvlTreeviewInfo.isChecked = IsTrueFalse;
          this.PassSelectedParamIds.emit(objMultiLvlTreeviewInfo.C001_LevelId);
          break;
        }
      }
    }
  }




  // public GetFirstKpiBoxesObjectInfoByPageLoad(IsTrueFalse: any, treeViewInfoList: any) {
  //   for (let i = 0; i < treeViewInfoList.length; i++) {
  //     const objMultiLvlTreeviewInfo = treeViewInfoList[i];
  //     objMultiLvlTreeviewInfo.isChecked = IsTrueFalse;
  //     this.PassSelectedParamIds.emit(objMultiLvlTreeviewInfo.C001_LevelId);

  //     if (objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList.length > 0) {
  //       this.GetFirstKpiBoxesObjectInfoByPageLoad(IsTrueFalse, objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList);
  //     }
  //   }
  // }

  UncheckAllorSelectedParamters(C001_LevelId: any, IsUncheckAll: any, IsTrueFalse: any) {
    if (this.objMultiLvlTreeviewInfoList.length > 0) {
      for (var i = 0; i < this.objMultiLvlTreeviewInfoList.length; i++) {
        var objMultiLvlTreeviewInfo = this.objMultiLvlTreeviewInfoList[i];
        if (objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList.length > 0) {
          for (var j = 0; j < objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList.length; j++) {
            var objMultiLvlTreeviewInfoTemp1 = objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList[j];
            if (objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList.length > 0) {
              for (var k = 0; k < objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList.length; k++) {
                var objMultiLvlTreeviewInfoTemp2 = objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList[k];
                if (objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList.length > 0) {
                  for (var l = 0; l < objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList.length; l++) {
                    var objMultiLvlTreeviewInfoTemp3 = objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList[l];
                    if (objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList.length > 0) {
                      for (var m = 0; m < objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList.length; m++) {
                        var objMultiLvlTreeviewInfoTemp4 = objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList[m];
                        if (objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList.length > 0) {
                          for (var n = 0; n < objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList.length; n++) {
                            var objMultiLvlTreeviewInfoTemp5 = objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList[n];
                            if (objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList.length > 0) {
                              for (var o = 0; o < objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList.length; o++) {
                                var objMultiLvlTreeviewInfoTemp6 = objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList[o];
                                if (IsUncheckAll == "1" || objMultiLvlTreeviewInfoTemp6.C001_LevelId == C001_LevelId) {
                                  objMultiLvlTreeviewInfoTemp6.isChecked = IsTrueFalse;
                                }
                              }
                            }
                            if (IsUncheckAll == "1" || objMultiLvlTreeviewInfoTemp5.C001_LevelId == C001_LevelId) {
                              objMultiLvlTreeviewInfoTemp5.isChecked = IsTrueFalse;
                            }
                          }
                        }
                        if (IsUncheckAll == "1" || objMultiLvlTreeviewInfoTemp4.C001_LevelId == C001_LevelId) {
                          objMultiLvlTreeviewInfoTemp4.isChecked = IsTrueFalse;
                        }
                      }
                    }
                    if (IsUncheckAll == "1" || objMultiLvlTreeviewInfoTemp3.C001_LevelId == C001_LevelId) {
                      objMultiLvlTreeviewInfoTemp3.isChecked = IsTrueFalse;
                    }
                  }
                }
                if (IsUncheckAll == "1" || objMultiLvlTreeviewInfoTemp2.C001_LevelId == C001_LevelId) {
                  objMultiLvlTreeviewInfoTemp2.isChecked = IsTrueFalse;
                }
              }
            }
            if (IsUncheckAll == "1" || objMultiLvlTreeviewInfoTemp1.C001_LevelId == C001_LevelId) {
              objMultiLvlTreeviewInfoTemp1.isChecked = IsTrueFalse;
            }
          }
        }
        if (IsUncheckAll == "1" || objMultiLvlTreeviewInfo.C001_LevelId == C001_LevelId) {
          objMultiLvlTreeviewInfo.isChecked = IsTrueFalse;
        }
      }
    }
    if (IsUncheckAll == "1") {
      this.PassSelectedParamIds.emit('');
    }
  }

  public ShowKpiBoxesInfoByObjectClick(C001_LevelId: any, isChecked: any) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SelectedParamIds = "";
    this.iSelectedParamCount = 0;
    if (this.objMultiLvlTreeviewInfoList.length > 0) {
      for (var i = 0; i < this.objMultiLvlTreeviewInfoList.length; i++) {
        var objMultiLvlTreeviewInfo = this.objMultiLvlTreeviewInfoList[i];
        if (objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList.length > 0) {
          for (var j = 0; j < objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList.length; j++) {
            var objMultiLvlTreeviewInfoTemp1 = objMultiLvlTreeviewInfo.objMultiLvlTreeviewInfoList[j];
            if (objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList.length > 0) {
              for (var k = 0; k < objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList.length; k++) {
                var objMultiLvlTreeviewInfoTemp2 = objMultiLvlTreeviewInfoTemp1.objMultiLvlTreeviewInfoList[k];
                if (objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList.length > 0) {
                  for (var l = 0; l < objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList.length; l++) {
                    var objMultiLvlTreeviewInfoTemp3 = objMultiLvlTreeviewInfoTemp2.objMultiLvlTreeviewInfoList[l];
                    if (objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList.length > 0) {
                      for (var m = 0; m < objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList.length; m++) {
                        var objMultiLvlTreeviewInfoTemp4 = objMultiLvlTreeviewInfoTemp3.objMultiLvlTreeviewInfoList[m];
                        if (objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList.length > 0) {
                          for (var n = 0; n < objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList.length; n++) {
                            var objMultiLvlTreeviewInfoTemp5 = objMultiLvlTreeviewInfoTemp4.objMultiLvlTreeviewInfoList[n];
                            if (objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList.length > 0) {
                              for (var o = 0; o < objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList.length; o++) {
                                var objMultiLvlTreeviewInfoTemp6 = objMultiLvlTreeviewInfoTemp5.objMultiLvlTreeviewInfoList[o];
                                if (objMultiLvlTreeviewInfoTemp6.isChecked) {
                                  SelectedParamIds += objMultiLvlTreeviewInfoTemp6.C001_LevelId + ",";
                                  this.iSelectedParamCount++;
                                }
                              }
                            }
                            else {
                              if (objMultiLvlTreeviewInfoTemp5.isChecked) {
                                SelectedParamIds += objMultiLvlTreeviewInfoTemp5.C001_LevelId + ",";
                                this.iSelectedParamCount++;
                              }
                            }
                          }
                        }
                        else {
                          if (objMultiLvlTreeviewInfoTemp4.isChecked) {
                            SelectedParamIds += objMultiLvlTreeviewInfoTemp4.C001_LevelId + ",";
                            this.iSelectedParamCount++;
                          }
                        }
                      }
                    }
                    else {
                      if (objMultiLvlTreeviewInfoTemp3.isChecked) {
                        SelectedParamIds += objMultiLvlTreeviewInfoTemp3.C001_LevelId + ",";
                        this.iSelectedParamCount++;
                      }
                    }
                  }
                }
                else {
                  if (objMultiLvlTreeviewInfoTemp2.isChecked) {
                    SelectedParamIds += objMultiLvlTreeviewInfoTemp2.C001_LevelId + ",";
                    this.iSelectedParamCount++;
                  }
                }
              }
            }
            else {
              if (objMultiLvlTreeviewInfoTemp1.isChecked) {
                SelectedParamIds += objMultiLvlTreeviewInfoTemp1.C001_LevelId + ",";
                this.iSelectedParamCount++;
              }
            }
          }
        }
        else {
          if (objMultiLvlTreeviewInfo.isChecked) {
            SelectedParamIds += objMultiLvlTreeviewInfo.C001_LevelId + ",";
            this.iSelectedParamCount++;
          }
        }
      }
    }
    if (SelectedParamIds != "")
      SelectedParamIds = SelectedParamIds.substring(0, SelectedParamIds.length - 1);

    if (this.iSelectedParamCount > 20) {
      Swal.fire("Max selection limit should be less than 20.");
      SelectedParamIds = SelectedParamIds.replace(C001_LevelId, "");
      SelectedParamIds = SelectedParamIds.replace(",,", ",");
      this.iSelectedParamCount--;
      setTimeout(() => {
        this.UncheckAllorSelectedParamters(C001_LevelId, "0", false);
      }, 1000);
    }
    this.PassSelectedParamIds.emit(SelectedParamIds);
    return;
  }

  onPanelChange(index: number, event: boolean): void {
    this.panelSelected[index] = event;
  }
}
