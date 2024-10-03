import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KpiPageService } from '../Services/kpi-page.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { Router } from '@angular/router';
import { KpiSettingList } from '../kpi-setting-page/kpi-setting-page.component';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR, faUserPlus,faM } from '@fortawesome/free-solid-svg-icons';


export class MultiLvlTreeviewInfo {
  public C001_LevelId: string = "";
  public C002_ParentLevelId: string = "";
  public C003_LevelName: string = "";
  public C004_LevelDescription: string = "";
  public isChecked: boolean = false;
  public objMultiLvlTreeviewInfoList: MultiLvlTreeviewInfo[] = [];
}

export class GatewayDetailsForLftSMenu {
  public ID: number = 0;
  public Gateway: string = "";
  public GName: string = "";
  public objObjectInfoList: ObjectInfoForLftSMenu[] = [];
  public objSystemInfoForKPInTrendList: SystemInfoForKPInTrend[] = [];
}

export class SystemInfoForKPInTrend {
  public System: string = "";
  public objObjectInfoList: ObjectInfoForLftSMenu[] = [];
  public objTagInDetailsInfoList: TagInDetailsInfo[] = [];
}

export class ObjectInfoForLftSMenu {
  public Object: string = "";
  public TableName: string = "";
  public objTagInDetailsInfoList: TagInDetailsInfo[] = [];
}

export class TagInDetailsInfo {
  public UniqueIdlblId: string = "";
  public UniqueId: number = 0;
  public Gateway: string = "";
  public TagName: string = "";
  public DataType: string = "";
  public ArrayId: string = "";
  public Threshold: string = "";
  public Object: string = "";
  public ArrayName: string = "";
  public ReadType: string = "";
  public isChecked: boolean = false;
  public TagValue: string = "";
  public TagImageUrl: string = "";
  public TagValueColor: string = "";
  public BoxClassName: string = "";
  public HeaderTitleName: string = "";
  public TagUnitName: string = "";
}

export class KpiBoxesSettingInfo {
  public UniqueId: number = 0;
  public ColumnName: string = "";
  public Value: string = "";
}

@Component({
  selector: 'app-kpipage',
  templateUrl: './kpipage.component.html',
  styleUrls: ['./kpipage.component.scss']
})
export class KpipageComponent implements OnInit, OnDestroy {
  myform!: FormGroup;
  objTagInDetailsInfoList: TagInDetailsInfo[] = [];
  objTagInDetailsInfoListTemp: TagInDetailsInfo[] = [];
  objTagInDetailsInfoListTemp2: TagInDetailsInfo[] = [];
  objLeftSideTagInDetailsInfoListTemp: TagInDetailsInfo[] = [];
  IsWaitingOn: boolean = false;
  TempHeaderTitle: string = "";
  objKpiBoxesSettingInfoList: KpiSettingList[] = [];
  objTreeviewSelectObj: any;
  kpiBoxSettingId: number = -1;
  KpiBoxHeaderFontSize: string = "";
  KpiBoxHeaderFontColor: string = "";
  KpiBoxValueFontSize: string = "";
  KpiBoxBoxIconHeight: string = "";
  KpiBoxBoxIconWidth: string = "";
  KpiBoxBoxHeight: string = "";
  KpiBoxBoxWidth: string = "";
  KpiBoxBoxRefreshRate: number = 3000;
  LevelId: string = "";
  KpiBoxBoxesPerPage: number = 1;
  page: number = 1;
  count: number = 0;
  TempPage: number = 1;
  LeftSideTreeviewHeight: string = "";
  C001_LevelId: string = "0";
  StrSelectedTagIds: string = "";
  private UpdateKpiBoxIntervaltime: any;
  LevelTypePassToChild: string = "a";
  LevelUpToPassToChild: string = "99";
  WithParametersPassToChild: string = "0";
  LastLevelSequenceNo: number = 1;
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faUserPlus=faUserPlus;
  faM=faM;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public _KpiPageService: KpiPageService, private _formBuilder: FormBuilder, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService
    ,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnDestroy(): void {
    clearTimeout(this.UpdateKpiBoxIntervaltime);
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.CheckUserHasPermissionForPageurlOrNot();
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 50) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.reactiveForm();
    this.onUpdateKpiBoxIntervalEventClick();
    this.getKpiBoxesSettingInfoList();
    //this.ShowKpiBoxesInfoByObjectClick(this.C001_LevelId, "0");
    // if (sessionStorage.getItem("SessionMenuId") != null) {
    //   // var SessionRtdMenuId = sessionStorage.getItem('SessionMenuId') as string;
    //   // this.GetLeftSideTagInfoListByMenuId(SessionRtdMenuId);
    // }
    // else {
    //   this.getKpiBoxesSettingInfoList();
    // }
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      TempUserName: ["", [Validators.required]],
      TempPassword: ['', Validators.required],
      ID: [0],
      strdate: [""]
    });
  }
  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._KpiPageService.GetkpinewdbstpageFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error: any) => {
      console.log(error);
    });
  }
  onUpdateKpiBoxIntervalEventClick() {
    this.UpdateKpiBoxIntervaltime = setTimeout(() => {
      this.objTagInDetailsInfoListTemp = [];
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
      if (sessionStorage.getItem("SessionIsCustomMenu") === null) {
        var SessionToken = sessionStorage.getItem('SessionToken') as string;
        var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
        var UserName = sessionStorage.getItem('UserName') as string;
        var TempLevelId = this.LevelId;
        var objName = "";
        //var TempLevelId = sessionStorage.getItem('TempLevelId') as string;
        //var objName = sessionStorage.getItem('objDataTypeName') as string;
        if (TempLevelId == null || TempLevelId == "")
          return;
        this._KpiPageService.GetKPIBoxDetailsListBySP(SessionToken, UserTypeId, UserName, TempLevelId, "0", "0").subscribe((response: any) => {
          this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
          this.objTagInDetailsInfoListTemp = response;
          if (this.objTagInDetailsInfoListTemp.length > 0) {
            for (var i = 0; i < this.objTagInDetailsInfoListTemp.length; i++) {
              var objTagInDetailsInfoInfoTemp = this.objTagInDetailsInfoListTemp[i];
              let index = this.objTagInDetailsInfoList.findIndex(x => x.UniqueIdlblId === objTagInDetailsInfoInfoTemp.UniqueIdlblId);
              if (index != -1) {
                this.objTagInDetailsInfoList[index].TagValue = objTagInDetailsInfoInfoTemp.TagValue;
                this.objTagInDetailsInfoList[index].TagValueColor = objTagInDetailsInfoInfoTemp.TagValueColor;
              }
            }
          }
          this.onUpdateKpiBoxIntervalEventClick();
        }, (error) => {
          console.log(error);
        });
      }
      else {
        var SessionToken = sessionStorage.getItem('SessionToken') as string;
        var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
        var UserName = sessionStorage.getItem('UserName') as string;
        if (this.StrSelectedTagIds == null || this.StrSelectedTagIds == "")
          return;
        this._KpiPageService.GetKPIBoxDetailsListBySPnTagIds(SessionToken, UserTypeId, UserName, this.StrSelectedTagIds).subscribe((response: any) => {
          this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
          this.objTagInDetailsInfoListTemp = response;
          if (this.objTagInDetailsInfoListTemp.length > 0) {
            for (var i = 0; i < this.objTagInDetailsInfoListTemp.length; i++) {
              var objTagInDetailsInfoInfoTemp = this.objTagInDetailsInfoListTemp[i];
              let index = this.objTagInDetailsInfoList.findIndex(x => x.UniqueIdlblId === objTagInDetailsInfoInfoTemp.UniqueIdlblId);
              if (index != -1) {
                this.objTagInDetailsInfoList[index].TagValue = objTagInDetailsInfoInfoTemp.TagValue;
                this.objTagInDetailsInfoList[index].TagValueColor = objTagInDetailsInfoInfoTemp.TagValueColor;
              }
            }
          }
          this.onUpdateKpiBoxIntervalEventClick();
        }, (error) => {
          console.log(error);
        });
      }
      return false;
    }, this.KpiBoxBoxRefreshRate);
  }

  getKpiBoxDataByPlcNumberGatewayNoObjName($event: any) {
    var LastTLevelNo = $event.LastTLevelNo;
    var SequenceID = $event.SequenceID;
    if (LastTLevelNo == SequenceID) {
      this.objTreeviewSelectObj = $event;
      this.TempHeaderTitle = this.objTreeviewSelectObj.C003_LevelName;
      this.LevelId = this.objTreeviewSelectObj.C001_LevelId;
      this.ShowKpiBoxesInfoByObjectClick(this.objTreeviewSelectObj.C001_LevelId, this.objTreeviewSelectObj.IsBtnClick);
    }
  }

  ShowKpiBoxesInfoByObjectClick(C001_LevelId: any, IsBtnClick: any) {
    this.IsWaitingOn = true;
    this.objTagInDetailsInfoList = [];
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    // if (TempGatewayName != '') {
    //   TempGatewayName = TempGatewayName + '-';
    // }
    this._KpiPageService.GetKPIBoxDetailsListBySP(SessionToken, UserTypeId, UserName, C001_LevelId, "0", "0").subscribe((response: any) => {// TempGatewayName + objName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objTagInDetailsInfoList = response;
      var PageNo = this.objTagInDetailsInfoList.length / this.KpiBoxBoxesPerPage;
      this.TempPage = Math.ceil(PageNo);
      if (IsBtnClick === 1) {
        this.TempPage = 1;
        this.page = 1;
      }
      if (this.objTagInDetailsInfoList.length > 0) {
        //this.TempHeaderTitle = this.objTagInDetailsInfoList[0].HeaderTitleName;
        const myArray = this.objTagInDetailsInfoList[0].HeaderTitleName.split("-");
        sessionStorage.setItem('C001_LevelId', C001_LevelId);
        sessionStorage.setItem('objDataTypeName', this.objTagInDetailsInfoList[0].HeaderTitleName);
      }
      this.IsWaitingOn = false;
    }, (error) => {
      console.log(error);
    });
    return;
  }

  onTableDataChange(event: any) {
    if (event != -2)
      this.page = event;
    else {
      var PageNo = this.objTagInDetailsInfoList.length / this.KpiBoxBoxesPerPage;
      PageNo = Math.ceil(PageNo);
      this.page = PageNo;
    }
    return;
  }

  getKpiBoxesSettingInfoList() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName = "CT0028";
    this._KpiPageService.getKpiBoxesSettingInfoList(SessionToken, UserTypeId, UserName, TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objKpiBoxesSettingInfoList = response;
      var kSettingLength = this.objKpiBoxesSettingInfoList.length;
      if (kSettingLength > 0) {
        this.kpiBoxSettingId = this.objKpiBoxesSettingInfoList[0].Id;
        this.KpiBoxHeaderFontSize = this.objKpiBoxesSettingInfoList[0].KpiBoxHeaderFontSize + 'px';
        this.KpiBoxHeaderFontColor = this.objKpiBoxesSettingInfoList[0].KpiBoxHeaderFontColor;
        this.KpiBoxValueFontSize = this.objKpiBoxesSettingInfoList[0].KpiBoxValueFontSize + 'px';
        this.KpiBoxBoxIconHeight = this.objKpiBoxesSettingInfoList[0].KpiBoxBoxIconHeight + 'px';
        this.KpiBoxBoxIconWidth = this.objKpiBoxesSettingInfoList[0].KpiBoxBoxIconWidth + 'px';
        this.KpiBoxBoxHeight = this.objKpiBoxesSettingInfoList[0].KpiBoxBoxHeight + 'px';
        this.KpiBoxBoxWidth = 'col-md-' + this.objKpiBoxesSettingInfoList[0].KpiBoxBoxWidth;
        this.KpiBoxBoxesPerPage = Number(this.objKpiBoxesSettingInfoList[0].KpiBoxBoxesPerPage);
        this.KpiBoxBoxRefreshRate = Number(this.objKpiBoxesSettingInfoList[0].KpiBoxBoxRefreshRate) * 1000;
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }

  ShowKpiBoxesInfoByTagNamesClick(SelectedTagIds: any, IsBtnClick: any) {
    this.objTagInDetailsInfoList = [];
    this.objTagInDetailsInfoListTemp2 = [];
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this._KpiPageService.GetKPIBoxDetailsListBySPnTagIds(SessionToken, UserTypeId, UserName, SelectedTagIds).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objTagInDetailsInfoList = response;
      this.objTagInDetailsInfoListTemp2 = response;
      var PageNo = this.objTagInDetailsInfoList.length / this.KpiBoxBoxesPerPage;
      this.TempPage = Math.ceil(PageNo);
      if (IsBtnClick === 1) {
        this.TempPage = 1;
        this.page = 1;
      }
      if (this.objTagInDetailsInfoList.length > 0) {
        sessionStorage.setItem('C001_LevelId', this.objTagInDetailsInfoList[0].Gateway);
        sessionStorage.setItem('objDataTypeName', this.objTagInDetailsInfoList[0].HeaderTitleName);
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }
}
