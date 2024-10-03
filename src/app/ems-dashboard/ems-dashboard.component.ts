/*
  Author: Sumit
  Description: For EMS Dashboard
  LastUpdate:on 15-12-23 by nita
*/

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { faFireFlameCurved, faIndianRupeeSign, faBolt, faWater, faWind, faBars } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { CommonSettingService } from '../Services/common-setting.service';
import { TrendserviceService } from '../Services/trndnormalview.service';
import { TrendLegendInfo } from '../trendpage/trendpage.component';
import { CommonSettingList } from '../common-setting/common-setting.component';
import { EmsdashboardcardService } from '../Services/emsdashboardcard.service';

export var StrColorArray: string[] = [];

export class EmsDashboardCardInfo {
  public Id: string = "";
  public uniqueId: string = "";
  public CardHeaderTitle: string = "";
  public CurrentFlowRateO: number = 0;
  public CurrentFlowRate: number = 0;
  public TotalFlowConsumption: string = "";
  public CurrentCostRate: string = "";
  public CurrentFlowRateIcon: any = "";
  public TotalFlowConsumptionIcon: string = "";
  public CurrentCostRateIcon: string = "";
  public CurrentFlowRateIcnColor: string = "";
  public TotalFlowConsumptionIcnColor: string = "";
  public CurrentCostRateIcnColor: string = "";
  public CurrentFlowRateUnit: string = "";
  public TotalFlowConsumptionUnit: string = "";
  public CurrentCostRateUnit: string = "";
  public GatewayNo: string = "";
  public ParameterId: string = "";
  public uniqueidB4: string = "";
}

@Component({
  selector: 'app-ems-dashboard',
  templateUrl: './ems-dashboard.component.html',
  styleUrls: ['./ems-dashboard.component.scss']
})
export class EMSDashboardComponent implements OnDestroy, OnInit {
  LastPointDateTime: any="-2";
  LeftSideTreeViewHeight: string = "";
  userTypeId: string = "";
  objTreeviewSelectObj: any;
  TempHeaderTitle: string = "";
  TempSubHeaderTitle: string = "";
  IsshowTrend: boolean = false;
  currentSpeed: number = 0;
  //Sum1: number = 0;
  sum: number = 0;
  //currentSpeed1: number = 0;
  currentSpeed2: number = 0;
  chart: any = null;
  DetasepointsArray: any = [];
  //StrColorArray: any = ['#eb4034', '#ad6903', '#a7ad03', '#4dad03', '#03ad9c', '#035ead', '#030ead', '#7703ad', '#ad0333'];
  TempLine1Dataset: any = [];
  TempLine2Dataset: any = [];
  //jaggedArray: any = [1];
  mobileQuery: MediaQueryList;
  LevelTypePassToChild: string = "b";
  LevelUpToPassToChild: string = "4";
  // WithParametersPassToChild: string = "0";
  objEmsDashboardCardInfoList: EmsDashboardCardInfo[] = [];
  objEmsDashboardCardInfoListTemp: EmsDashboardCardInfo[] = [];
  EnableDisableBtnText: string = "ENABLE DOT";
  objTrendInfo: any = [];
  stringJson: string = "";
  //dtFromDateTime: any = new FormControl(moment());
  //dtToDateTime: any = new FormControl(moment());
  TempLineIdsArray: any = [];
  objTrendLegendInfoList: TrendLegendInfo[] = [];
  SelectedParamIds: string = "";
  //BtnLiveStopTxt: string = "LIVE";
  //IsLiveDataPlottingOn: boolean = false;
  TempFromDateTime!: Date;
  TempToDateTime!: Date;
  private UpdateEmsTrendSetTimeouttime: any;
  private UpdateEmsEmsCardSetTimeouttime: any;
  IsPageLoad: string = "1";
  IsTrendPageLoad: string = "1";
  TempLevelId: string = "";
  KpiBoxBoxesPerPage: number = 3;
  page: number = 1;
  count: number = 0;
  TempPage: number = 1;

  faFireFlameCurved: any = faFireFlameCurved;
  faBolt: any = faBolt;
  faIndianRupeeSign: any = faIndianRupeeSign;
  faWind: any = faWind;
  faWater: any = faWater;
  faBars: any = faBars;

  EmsCardRefreshRate: number = 3000;
  EmsTrendRefreshRate: number = 3000;

  objCommonSettingInfoList1!: CommonSettingList[];

  IsWaitingOn: boolean = false;
  IsWaitingOn2: boolean = false;
  IsWaitingOn3: boolean = false;
  

  StrColorArray = ['#eb4034', '#ad6903', '#a7ad03', '#4dad03', '#03ad9c', '#035ead', '#030ead', '#7703ad', '#ad0333'];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService,
    public objEmsdashboardcardService: EmsdashboardcardService, public _TrendserviceService: TrendserviceService,
    public _CommonSettingPageService: CommonSettingService) {
    //For Collapsable treeview.....>
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    //For Collapsable treeview...../>
  }

  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeViewHeight = (h - 120) + "px";
    this.CheckUserHasPermissionForPageurlOrNot();
    Swal.close();
    this.onViewCommonSettingFormInfo();
  }

  ngOnDestroy(): void {
    clearTimeout(this.UpdateEmsTrendSetTimeouttime);
    clearTimeout(this.UpdateEmsEmsCardSetTimeouttime);
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // for meter........> 

  // current(va: any) {
  //   let val = Number(va);
  //   this.currentSpeed = val;
  //   this.sum += val;
  // }

  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.objEmsdashboardcardService.GetEmsdashboardcardFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
  }

  onTableDataChange(event: any) {
    if (event != -2)
      this.page = event;
    else {
      var PageNo = this.objEmsDashboardCardInfoList.length / this.KpiBoxBoxesPerPage;
      PageNo = Math.ceil(PageNo);
      this.page = PageNo;
    }
    return;
  }

  onViewCommonSettingFormInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName = 'CT0032';
    this._CommonSettingPageService.GetCommonSettingInfoList(SessionToken, UserTypeIdTemp, UserName, TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objCommonSettingInfoList1 = response;
      var cSettingLength = this.objCommonSettingInfoList1.length;
      if (cSettingLength > 0) {
        this.EmsCardRefreshRate = Number(this.objCommonSettingInfoList1[0].EmsCardRefreshRate) * 1000;
        this.EmsTrendRefreshRate = Number(this.objCommonSettingInfoList1[0].EmsTrendRefreshRate) * 1000;
      }
      return false;
    }, (error) => {
      console.log(error);
    });
    return;
  }

  // for treeview.......>
  getKpiBoxDataByPlcNumberGatewayNoObjName($event: any) {
    this.IsshowTrend = false;
    var LastTLevelNo = $event.LastTLevelNo;
    var SequenceID = $event.SequenceID;
    if (LastTLevelNo == SequenceID) {
      this.objTreeviewSelectObj = $event;
      this.TempHeaderTitle = this.objTreeviewSelectObj.C003_LevelName;
      this.IsPageLoad = "1";
      clearTimeout(this.UpdateEmsEmsCardSetTimeouttime);
      clearTimeout(this.UpdateEmsTrendSetTimeouttime);
      
      this.getEmsDashboardCardDetailsListByLevelIdSliderSequence(this.objTreeviewSelectObj.C001_LevelId);
    }
  }

  getEmsDashboardCardDetailsListByLevelIdSliderSequence(LevelId: any) {
    console.log("yes")
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    this.userTypeId = UserTypeId;
    var UserName = sessionStorage.getItem('UserName') as string;

    const container: any = document.getElementById('treeview') as HTMLElement

    if (this.IsPageLoad == "1") {
      this.IsWaitingOn = true;
      if (this.IsWaitingOn == true) {
        container.style.opacity = 0;
        container.style['pointer-events'] = 'none';
      }
    }

    this.objEmsdashboardcardService.getEmsDashboardCardDetailsListByLevelIdSliderSequence(SessionToken, UserTypeId, UserName, LevelId).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      if (this.IsPageLoad == "1" || this.TempLevelId != LevelId) {

        this.objEmsDashboardCardInfoList = response;


        for (var i = 0; i < this.objEmsDashboardCardInfoList.length; i++) {
          var objOeeDashboardDetailsInfoTemp = this.objEmsDashboardCardInfoList[i];

          if (objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcon == 'faWater') {
            objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcon = this.faWater;
          }
          if (objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcon == 'faWind') {
            objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcon = this.faWind;
          }
          if (objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcon == 'faFireFlameCurved') {
            objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcon = this.faFireFlameCurved;
          }
          if (objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcon == 'faBolt') {
            objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcon = this.faBolt;
          }

        }
        // console.log(this.objEmsDashboardCardInfoList);
      }
      else {
        this.objEmsDashboardCardInfoListTemp = response;

        for (var i = 0; i < this.objEmsDashboardCardInfoListTemp.length; i++) {
          var objOeeDashboardDetailsInfoTemp = this.objEmsDashboardCardInfoList[i];
          var objOeeDashboardDetailsInfoTemp2 = this.objEmsDashboardCardInfoListTemp[i];
          objOeeDashboardDetailsInfoTemp.Id = objOeeDashboardDetailsInfoTemp2.Id;
          objOeeDashboardDetailsInfoTemp.uniqueId = objOeeDashboardDetailsInfoTemp2.uniqueId;
          objOeeDashboardDetailsInfoTemp.CardHeaderTitle = objOeeDashboardDetailsInfoTemp2.CardHeaderTitle;
          objOeeDashboardDetailsInfoTemp.CurrentFlowRateO = objOeeDashboardDetailsInfoTemp2.CurrentFlowRateO;
          objOeeDashboardDetailsInfoTemp.CurrentFlowRate = objOeeDashboardDetailsInfoTemp2.CurrentFlowRate;
          objOeeDashboardDetailsInfoTemp.TotalFlowConsumption = objOeeDashboardDetailsInfoTemp2.TotalFlowConsumption;
          objOeeDashboardDetailsInfoTemp.CurrentCostRate = objOeeDashboardDetailsInfoTemp2.CurrentCostRate;
          objOeeDashboardDetailsInfoTemp.CurrentFlowRateIcnColor = objOeeDashboardDetailsInfoTemp2.CurrentFlowRateIcnColor;
          objOeeDashboardDetailsInfoTemp.TotalFlowConsumptionIcnColor = objOeeDashboardDetailsInfoTemp2.TotalFlowConsumptionIcnColor;
          objOeeDashboardDetailsInfoTemp.CurrentCostRateIcnColor = objOeeDashboardDetailsInfoTemp2.CurrentCostRateIcnColor;
          objOeeDashboardDetailsInfoTemp.CurrentFlowRateUnit = objOeeDashboardDetailsInfoTemp2.CurrentFlowRateUnit;
          objOeeDashboardDetailsInfoTemp.TotalFlowConsumptionUnit = objOeeDashboardDetailsInfoTemp2.TotalFlowConsumptionUnit;
          objOeeDashboardDetailsInfoTemp.CurrentCostRateUnit = objOeeDashboardDetailsInfoTemp2.CurrentCostRateUnit;
        }

      }
      this.TempLevelId = LevelId;
      this.IsPageLoad = "0";


      if (this.IsPageLoad == "0") {
        this.IsWaitingOn = false;
        if (this.IsWaitingOn == false) {
          container.style.opacity = 1;
          container.style['pointer-events'] = 'auto';
        }
      }
      this.UpdateEmsEmsCardSetTimeouttime = setTimeout(() => {
        this.getEmsDashboardCardDetailsListByLevelIdSliderSequence(this.objTreeviewSelectObj.C001_LevelId);
      }, this.EmsCardRefreshRate);

    }, (error) => {
      console.log(error);
    });
    return;
  }

  getTrendDataBySelectUtilityId(objEmsDashboardCardInfo: any) {
    this.IsWaitingOn3=true;
    this.IsshowTrend = false;
    this.TempSubHeaderTitle = objEmsDashboardCardInfo.CardHeaderTitle;
    this.SelectedParamIds = objEmsDashboardCardInfo.uniqueId;
    clearTimeout(this.UpdateEmsTrendSetTimeouttime);
    this.IsTrendPageLoad = "1";
    this.AddPointsInChartPointas();
  }

  GetTrendLinesInfoByFromTonParamIds(FromDateTime: any, ToDateTime: any, ParameterIds: any) {
    
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    const container: any = document.getElementById('treeview') as HTMLElement
    this.IsWaitingOn2 = true;
    if (this.IsWaitingOn2 == true) {
      container.style.opacity = 0;
      container.style['pointer-events'] = 'none';
    }

    this._TrendserviceService.GetTrendParamInfoByParamIdsFromToDateTimeForEmsDashboard(SessionToken, UserTypeId, UserName, FromDateTime, ToDateTime, ParameterIds).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.IsshowTrend = false;
      this.IsWaitingOn3=true;
      if (response.jaggedArray.length < 1) {
        Swal.fire('Records not found for selected parameters!');
        return;
      }
      this.stringJson = JSON.stringify(response);
      this.objTrendInfo = JSON.parse(this.stringJson);
      this.DetasepointsArray = [];
      this.TempLineIdsArray = this.objTrendInfo.LineIdArray;

      this.IsWaitingOn2 = false;
      if (this.IsWaitingOn2 == false) {
        container.style.opacity = 1;
        container.style['pointer-events'] = 'auto';
      }

      const dates = this.objTrendInfo.date1;
      if (!StrColorArray)
        StrColorArray = this.objTrendInfo.StrColorArray;
      const LineTagArray = this.objTrendInfo.LineTagArray;
      this.objTrendLegendInfoList = [];
      this.LastPointDateTime = this.objTrendInfo.jaggedDtArray[this.objTrendInfo.jaggedDtArray.length-1][this.objTrendInfo.jaggedDtArray[this.objTrendInfo.jaggedDtArray.length-1].length-1];
      for (var a = 0; a < this.objTrendInfo.jaggedArray.length; a++) {
        const Abc = this.objTrendInfo.jaggedArray[a];
        const DateArray = this.objTrendInfo.jaggedDtArray[a];
        this.TempLine1Dataset = [];
        for (var i = 0; i < Abc.length; i++) {
          var abcd = { x: new Date(DateArray[i]), y: Abc[i] };

          this.TempLine1Dataset.push(abcd);
        }
        var DatasetpointInfo = {
          type: "spline",
          name: LineTagArray[a],
          lineColor: StrColorArray[a],
          markerColor: StrColorArray[a],
          markerSize: 0,
          axisYIndex: a,
          connectNullData: true,
          xValueFormatString: "MMM",
          dataPoints: this.TempLine1Dataset
        };
        DatasetpointInfo.lineColor = StrColorArray[a];
        DatasetpointInfo.markerColor = StrColorArray[a];
        this.DetasepointsArray.push(DatasetpointInfo);
        var objTrendLegendInfoTemp = {
          TagNumber: a + 1,
          TagName: LineTagArray[a],
          LineColor: StrColorArray[a]
        };
        this.objTrendLegendInfoList.push(objTrendLegendInfoTemp);
      }
      if (this.chart) {
        this.chart.destroy();
      }
      var objTrendLegendInfoList = this.objTrendLegendInfoList;
      var dataPoints = [{ y: 10 }, { y: 13 }, { y: 18 }, { y: 20 }, { y: 17 }];
      this.chart = new CanvasJS.Chart("chartContainer", {
        zoomEnabled: true,
        toolTip: {
          shared: true,
          contentFormatter: function (e: { entries: string | any[]; }) {
            var str = "";
            for (var i = 0; i < e.entries.length; i++) {
              var dataIndex = e.entries[i].index;
              const index = objTrendLegendInfoList.findIndex(x => x.TagName === e.entries[i].dataSeries.name);
              var temp = "";
              const dtToDateTime = new Date(e.entries[i].dataPoint.x);
              var FromDateTime = GlobalConstantsService.GetStrDateTimeInYYYYmmDDhhMMssDbFormat(dtToDateTime);
              if (i == 0)
                temp = "<b>" + FromDateTime + "</b> <br/>";
              if (e.entries[i].dataSeries.name != "")
                temp += "<small style='color:" + StrColorArray[index] + "'>" + e.entries[i].dataSeries.name + "</small> <strong> : " + e.entries[i].dataPoint.y + "</strong> <br/>";
              str = str.concat(temp);
            }
            return (str);
          }
        },
        axisY2: [{
          title: "Linear Scale",
          lineColor: "#7F6084",
          titleFontColor: "#7F6084",
          labelFontColor: "#7F6084"
        },
        {
          title: "Logarithmic Scale",
          logarithmic: true,
          interval: 1,
          lineColor: "#86B402",
          titleFontColor: "#86B402",
          labelFontColor: "#86B402"
        }],
        data: this.DetasepointsArray
      });
      this.chart.render();
      var yVal = 15, updateCount = 0;
      FromDateTime = ToDateTime;
      ToDateTime = new Date();
      // ToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
      // this.TempToDateTime = new Date(ToDateTime);
      var StrToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
      //this.AddPointsInChartPoints(FromDateTime, StrToDateTime);
      
      var LastPointDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.LastPointDateTime,'-','_','-','','','1');
      this.AddPointsInChartPoints(LastPointDateTime, StrToDateTime);
      return;
    });

  }

  AddPointsInChartPointas() {
    this.IsshowTrend = true;
    // this.SelectedParamIds ="132,9,76";
    if (this.SelectedParamIds == null || this.SelectedParamIds == "") {
      Swal.fire('Please select atleast one parameter!');
      return;
    }
    var FromDateTime = new Date();
    FromDateTime.setMinutes(FromDateTime.getMinutes() - 15);
    var StrFromDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(FromDateTime);
    var ToDateTime = new Date();
    var StrToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
    this.TempFromDateTime = new Date(FromDateTime);
    this.TempToDateTime = new Date(ToDateTime);
    var lastChar = this.SelectedParamIds.substr(this.SelectedParamIds.length - 1);
    if (lastChar == ",")
      this.SelectedParamIds = this.SelectedParamIds.substring(0, this.SelectedParamIds.length - 1);
    // StrFromDateTime = "27-07-2023_01-00-00";
    // StrToDateTime = "18-03-2023_23-59-16";
    this.GetTrendLinesInfoByFromTonParamIds(StrFromDateTime, StrToDateTime, this.SelectedParamIds);
    // StrFromDateTime = StrToDateTime;
    // ToDateTime = new Date();
    // StrToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
    // this.TempToDateTime = new Date(ToDateTime);
    //this.AddPointsInChartPoints(StrFromDateTime, StrToDateTime);
  }

  AddPointsInChartPoints(StrFromDateTime: string, StrToDateTime: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var yVal = 15, updateCount = 0;
    //var TotalCount = this.chart.options.data.length - 1;
    //this.SelectedParamIds ="132,9,76";

    var lastChar = this.SelectedParamIds.substr(this.SelectedParamIds.length - 1);
    if (lastChar == ",")
      this.SelectedParamIds = this.SelectedParamIds.substring(0, this.SelectedParamIds.length - 1);
    this._TrendserviceService.GetTrendParamInfoByParamIdsFromToDateTimeForEmsDashboard(SessionToken, UserTypeId, UserName, StrFromDateTime, StrToDateTime, this.SelectedParamIds).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        if (response == "Record not found!" || response == "Records not found!") {
          this.UpdateEmsTrendSetTimeouttime = setTimeout(() => {
            StrFromDateTime = StrToDateTime;
            var ToDateTime = new Date();
            StrToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
            this.TempToDateTime = new Date(ToDateTime);
            //this.AddPointsInChartPoints(StrFromDateTime, StrToDateTime);
            
       var LastPointDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.LastPointDateTime,'-','_','-','','','1');
            this.AddPointsInChartPoints(LastPointDateTime, StrToDateTime);
          }, this.EmsTrendRefreshRate);
          return false;
        }
      if (response.jaggedArray.length < 1) {
        Swal.fire('Records not found for selected parameters!');
        return;
      }
      this.stringJson = JSON.stringify(response);
      this.objTrendInfo = JSON.parse(this.stringJson);
      //var NoofLines = this.chart.options.data.length;
      if (StrColorArray.length < 1)
        StrColorArray = this.objTrendInfo.StrColorArray;
      const TempLineIdsArray = this.objTrendInfo.LineIdArray;
      this.LastPointDateTime = this.objTrendInfo.jaggedDtArray[this.objTrendInfo.jaggedDtArray.length-1][this.objTrendInfo.jaggedDtArray[this.objTrendInfo.jaggedDtArray.length-1].length-1];
      for (var a = 0; a < this.objTrendInfo.jaggedArray.length; a++) {
        const Abc = this.objTrendInfo.jaggedArray[a];
        const DateArray = this.objTrendInfo.jaggedDtArray[a];
        var ParamId = TempLineIdsArray[a];
        const LineTagArray = this.objTrendInfo.LineTagArray;
        let index = this.TempLineIdsArray.indexOf(ParamId);
        if (index < 0) {
          this.TempLine1Dataset = [];
          for (var i = 0; i < this.objTrendInfo.jaggedDtArray[a].length; i++) {
            var abcd = { x: new Date(DateArray[i]), y: Abc[i] };
            this.TempLine1Dataset.push(abcd);
          }
          var DatasetpointInfo = {
            type: "spline",
            name: LineTagArray[a],
            lineColor: StrColorArray[a],
            markerColor: StrColorArray[a],
            markerSize: 0,
            connectNullData: true,
            xValueFormatString: "MMM",
            dataPoints: this.TempLine1Dataset
          };
          this.chart.options.data.push(DatasetpointInfo);
          //console.log(this.chart.options.data);
          this.TempLineIdsArray.push(ParamId);
        }
        else {
          for (var i = 0; i < this.objTrendInfo.jaggedDtArray[a].length; i++) {
            var abcd = { x: new Date(DateArray[i]), y: Abc[i] };
            this.chart.options.data[index].dataPoints.push(abcd);
          }
        }
        this.chart.render();
      }
      this.UpdateEmsTrendSetTimeouttime = setTimeout(() => {
        StrFromDateTime = StrToDateTime;
        var ToDateTime = new Date();
        StrToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
        this.TempToDateTime = new Date(ToDateTime);
       var LastPointDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.LastPointDateTime,'-','_','-','','','1');
        //this.AddPointsInChartPoints(StrFromDateTime, StrToDateTime);
        this.AddPointsInChartPoints(LastPointDateTime, StrToDateTime);
      }, this.EmsTrendRefreshRate);
      return;
    });
  }

  EnableDisableLineChartPoints() {
    if (this.EnableDisableBtnText == "DISABLE DOT") {
      this.EnableDisableBtnText = "ENABLE DOT";
      for (var i = 0; i < this.chart.options.data.length; i++) {
        this.chart.options.data[i].markerSize = 0;
      }
    }
    else {
      this.EnableDisableBtnText = "DISABLE DOT";
      for (var i = 0; i < this.chart.options.data.length; i++) {
        this.chart.options.data[i].markerSize = 10;
      }
    }
    this.chart.render();
  }

}