import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { TrendserviceService } from '../Services/trndnormalview.service';
import { KpiPageService } from '../Services/kpi-page.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import Swal from 'sweetalert2';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
//import { ColorEvent } from 'ngx-color';
import { NGX_MAT_DATE_FORMATS, NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { CustomNgxDatetimeAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '../custom-ngx-datetime-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { Color } from '@angular-material-components/color-picker';
import { TrendSettingList } from '../trend-setting-page/trend-setting-page.component';
import { TrendSettingPageService } from '../Services/trend-setting-page.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR, faUserPlus,faM,faFileExcel,faFilePdf } from '@fortawesome/free-solid-svg-icons';



const StrColorArray: string[] = [
  '#eb4034', '#ad6903', '#a7ad03', '#4dad03', '#03ad9c',
  '#035ead', '#030ead', '#7703ad', '#ad0333', '#9c4dad',
  '#3d4dad', '#3dad6b', '#6bad3d', '#ad6b3d', '#ad3d5a',
  '#ad3d97', '#6b3dad', '#3d6bad', '#3d93ad', '#3dada3'
];

export class TrendLegendInfo {
  public TagNumber: number = 0;
  public TagName: string = "";
  public LineColor: string = "";
}

@Component({
  selector: 'app-trendpage',
  templateUrl: './trendpage.component.html',
  styleUrls: ['./trendpage.component.scss'],
  providers: [{
    provide: NgxMatDateAdapter,
    useClass: CustomNgxDatetimeAdapter,
    deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: NGX_MAT_DATE_FORMATS, useValue: GlobalConstantsService.CUSTOM_DATE_FORMATSDDMMMYYYYHHmmss },
  ],
})
export class TrendpageComponent implements OnInit {
  //@Input('objGatewayDetailsForLftSMenuList') objGatewayDetailsForLftSMenuList: GatewayDetailsForLftSMenu[] = [];
  stringJson: string = "";
  objTrendInfo: any = [];
  TempLineIdsArray: any = [];
  TempLine1Dataset: any = [];
  DetasepointsArray: any = [];
  TempFromDateTime!: Date;
  TempToDateTime!: Date;
  myform!: FormGroup;
  LeftSideTreeviewHeight: string = "";
  SelectedParamIds: string = "";
  TempHeaderTitle: string = "TREND PAGE";
  IsWaitingOn: boolean = false;


  EnableDisableBtnText: string = "ENABLE DOT";
  chart: any = null;
  // color: string = '#2889e9';
  //dtFromDateTime: any = new FormControl(moment());
  dtFromDateTime: any = new FormControl(moment());
  dtToDateTime: any = new FormControl(moment());
  
  BtnLiveStopTxt: string = "LIVE";
  objKpiBoxesSettingInfoList: TrendSettingList[] = [];
  KpiBoxBoxRefreshRate: number = 5000;
  IsHideForPDFbtnClick: boolean = false;
  dtPrintDateTime: any = new FormControl(moment());
  StrFromDateTime: string = "";
  StrToDateTime: string = "";
  StrPrintDateTime: string = "";
  objTrendLegendInfoList: TrendLegendInfo[] = [];
  //objLeftSideTagInDetailsInfoListTemp: TagInDetailsInfo[] = [];
  IsLiveDataPlottingOn: boolean = false;
  showColorToggle: boolean = false;
  colorCtr: AbstractControl = new FormControl(new Color(255, 243, 0));
  
  accentr = "";
  candyAppThemeClass = 'candy-app-theme';
  trendHeaderFontColor: string = "";
  trendHeaderFontSize: string = "";
  trendRefreshRate: number = 1500;
  trendLiveTime: number = 10000;
  LevelTypePassToChild: string = "a";
  LevelUpToPassToChild: string = "99";
  WithParametersPassToChild: string = "1";
  IsPageLoad: string = "1";
  objTreeviewSelectObj: any;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;    
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faUserPlus=faUserPlus;
  faM=faM;

  constructor(private router: Router, public _TrendserviceService: TrendserviceService, public _TrendSettingPageService: TrendSettingPageService,
    private _formBuilder: FormBuilder, private datePipe: DatePipe, public _ValidationerrormessagesService: ValidationerrormessagesService, private _GlobalConstantsService: GlobalConstantsService) { }


  ngOnInit() {
    this.CheckUserHasPermissionForPageurlOrNot();
    this.IsWaitingOn = true;
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 80) + "px";
    this.reactiveForm();
    const dtFromDateTime = new Date();
    dtFromDateTime.setMinutes(dtFromDateTime.getMinutes() - 15);
    this.dtFromDateTime = new FormControl(moment(dtFromDateTime));
    const dtToDateTime = new Date();
    this.dtPrintDateTime = new Date();
    this.StrPrintDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYorYYYYmmmDDhhMMss(this.dtPrintDateTime, "-", " ", ":");
    this.StrFromDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtFromDateTime.value._d, "-", " ", ":");
    this.StrToDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtToDateTime.value._d, "-", " ", ":");
    this.getKpiBoxesSettingInfoList();
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      ToDateTime: [new Date()],
      FromDateTime: [new Date()],
      ParameterIds: [''],
      ID: [0]
    });
  }

  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._TrendSettingPageService.GettrendFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
  }


  onColorPickerColorChange(objTrendLegendInfoTemp: any, index: number): void {
    // var i=0;
    // for(i=0;i<this.objTrendLegendInfoList.length;i++){
    //   let objTrendLegendInfoTemp = this.objTrendLegendInfoList[i];
    //   this.chart.options.data[i].lineColor = objTrendLegendInfoTemp.LineColor;
    // }
    this.chart.options.data[index].lineColor = objTrendLegendInfoTemp.LineColor;
    this.chart.options.data[index].markerColor = objTrendLegendInfoTemp.LineColor;
    StrColorArray[index] = objTrendLegendInfoTemp.LineColor;
    //this.objTrendInfo.StrColorArray[index]=objTrendLegendInfoTemp.LineColor;
    //markerColor: "white",
    this.chart.render();
  }

  onChangeAlllinesColor() {
    // var i=0;
    // for(i=0;i<this.objTrendLegendInfoList.length;i++){
    //   let objTrendLegendInfoTemp = this.objTrendLegendInfoList[i];
    //   this.chart.options.data[i].lineColor = objTrendLegendInfoTemp.LineColor;
    // }
    for (var i = 0; i < this.objTrendLegendInfoList.length; i++) {
      var objTrendLegendInfoTemp = this.objTrendLegendInfoList[i];
      this.chart.options.data[i].lineColor = objTrendLegendInfoTemp.LineColor;
      this.chart.options.data[i].markerColor = objTrendLegendInfoTemp.LineColor;
      StrColorArray[i] = objTrendLegendInfoTemp.LineColor;
      //this.objTrendInfo.StrColorArray[i]=objTrendLegendInfoTemp.LineColor;
    }
    this.chart.render();
  }
  getKpiBoxesSettingInfoList() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName = "CT0027";
    this._TrendSettingPageService.GetTrendSettingInfoList(SessionToken, UserTypeId, UserName, TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objKpiBoxesSettingInfoList = response;
      var kSettingLength = this.objKpiBoxesSettingInfoList.length;
      if (kSettingLength > 0) {
        this.trendHeaderFontSize = this.objKpiBoxesSettingInfoList[0].HeaderFontSize + 'px';
        this.trendHeaderFontColor = this.objKpiBoxesSettingInfoList[0].HeaderFontColor;
        this.trendRefreshRate = Number(this.objKpiBoxesSettingInfoList[0].RefreshRate) * 1000;
        this.trendLiveTime = Number(this.objKpiBoxesSettingInfoList[0].LiveTrendTime) * 1000;
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }

  ChangeLeftSideTreeTagsSelection(SelectedParamIds: any) {
    this.SelectedParamIds = SelectedParamIds;
    //this.SelectedParamIds = "132";
    if (this.IsPageLoad == "1") {
      setTimeout(() => {
        this.onClickViewButton();
        this.IsPageLoad = "0";
      }, 1000);
    }
    return;
  }

  getKpiBoxDataByPlcNumberGatewayNoObjName($event: any) {
    this.objTreeviewSelectObj = $event;
  }

  onClickViewButton() {
    this.IsWaitingOn = false;
    if(this.dtFromDateTime.value==null){
      Swal.fire("Please select from datetime!");
      return;
    }
    if(this.dtToDateTime.value==null){
      Swal.fire("Please select to datetime!");
      return;
    }
    // StrColorArray=[];
    if (this.SelectedParamIds == "") {
      Swal.fire("Please select atleast one parameter!");
      return;
    }
    var lastChar = this.SelectedParamIds.substr(this.SelectedParamIds.length - 1);
    if (lastChar == ",")
      this.SelectedParamIds = this.SelectedParamIds.substring(0, this.SelectedParamIds.length - 1);
    var FromDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtFromDateTime.value._d, "-", "_", "-", "0", "");
    var ToDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtToDateTime.value._d, "-", "_", "-", "0", "");
    //  FromDateTime = "15-05-2023_18-10-29";
    //  ToDateTime = "16-05-2023_18-10-29";
    this.GetTrendLinesInfoByFromTonParamIds(FromDateTime, ToDateTime, this.SelectedParamIds);
    return false;
  }

  GetTrendLinesInfoByFromTonParamIds(FromDateTime: any, ToDateTime: any, ParameterIds: any) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this._TrendserviceService.GetTrendParamInfoByParamIdsNew(SessionToken, UserTypeId, UserName, FromDateTime, ToDateTime, ParameterIds).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);

      if(response=="Please select atleast one parameter!"){
        Swal.fire(response);
        return;
      }
      if (response.jaggedArray.length < 1) {
        Swal.fire('Records not found for selected parameters!');
        return;
      }
      this.stringJson = JSON.stringify(response);
      this.objTrendInfo = JSON.parse(this.stringJson);
      this.DetasepointsArray = [];
      this.TempLineIdsArray = this.objTrendInfo.LineIdArray;
      const dates = this.objTrendInfo.date1;
      // if(StrColorArray.length<1)
      // StrColorArray = this.objTrendInfo.StrColorArray;
      const LineTagArray = this.objTrendInfo.LineTagArray;
      this.objTrendLegendInfoList = [];

      for (var a = 0; a < this.objTrendInfo.jaggedArray.length; a++) {
        const Abc = this.objTrendInfo.jaggedArray[a];
        const DateArray = this.objTrendInfo.jaggedDtArray[a];
        this.objTrendInfo.StrColorArray = StrColorArray[a];
        this.TempLine1Dataset = [];
        for (var i = 0; i < Abc.length; i++) {
          //var abcd = { x: DateArray[i], y: Abc[i] };
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
      return;
    });

  }

  AddPointsInChartPointas() {
    // this.SelectedParamIds ="132,9,76";
    if (this.SelectedParamIds == null || this.SelectedParamIds == "") {
      Swal.fire('Please select atleast one parameter!');
      return;
    }
    if (this.BtnLiveStopTxt == "LIVE") {
      this.BtnLiveStopTxt = "STOP";
      this.IsLiveDataPlottingOn = true;
    }
    else {
      this.BtnLiveStopTxt = "LIVE";
      this.IsLiveDataPlottingOn = false;
    }
    var FromDateTime = new Date();
    FromDateTime.setMinutes(FromDateTime.getMinutes() - 5);
    var StrFromDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(FromDateTime);
    var ToDateTime = new Date();
    var StrToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
    this.TempFromDateTime = new Date(FromDateTime);
    this.TempToDateTime = new Date(ToDateTime);
    var lastChar = this.SelectedParamIds.substr(this.SelectedParamIds.length - 1);
    if (lastChar == ",")
      this.SelectedParamIds = this.SelectedParamIds.substring(0, this.SelectedParamIds.length - 1);
    // StrFromDateTime = "09-03-2023_01-00-00";
    // StrToDateTime = "18-03-2023_23-59-16";
    this.GetTrendLinesInfoByFromTonParamIds(StrFromDateTime, StrToDateTime, this.SelectedParamIds);
    this.onChangeAlllinesColor();
    if (this.BtnLiveStopTxt == "STOP") {
      StrFromDateTime = StrToDateTime;
      ToDateTime = new Date();
      StrToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
      this.TempToDateTime = new Date(ToDateTime);
      this.AddPointsInChartPoints(StrFromDateTime, StrToDateTime);
    }
  }

  AddPointsInChartPoints(StrFromDateTime: string, StrToDateTime: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var yVal = 15, updateCount = 0;
    var TotalCount = this.chart.options.data.length - 1;
    //this.SelectedParamIds ="132,9,76";
    var lastChar = this.SelectedParamIds.substr(this.SelectedParamIds.length - 1);
    if (lastChar == ",")
      this.SelectedParamIds = this.SelectedParamIds.substring(0, this.SelectedParamIds.length - 1);
    this._TrendserviceService.GetTrendParamInfoByParamIdsNew(SessionToken, UserTypeId, UserName, StrFromDateTime, StrToDateTime, this.SelectedParamIds).subscribe((data: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(data);
      this.stringJson = JSON.stringify(data);
      this.objTrendInfo = JSON.parse(this.stringJson);
      var NoofLines = this.chart.options.data.length;
      // if(StrColorArray.length<1)
      // StrColorArray = this.objTrendInfo.StrColorArray;
      const TempLineIdsArray = this.objTrendInfo.LineIdArray;
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
      setTimeout(() => {
        if (this.BtnLiveStopTxt == "STOP") {
          StrFromDateTime = StrToDateTime;
          var ToDateTime = new Date();
          StrToDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYhhMMss(ToDateTime);
          this.TempToDateTime = new Date(ToDateTime);
          this.AddPointsInChartPoints(StrFromDateTime, StrToDateTime);
        }
      }, this.trendRefreshRate);
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

  public openPDF(): void {
    this.IsHideForPDFbtnClick = true;
    this.dtPrintDateTime = new Date();
    this.StrPrintDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYorYYYYmmmDDhhMMss(this.dtPrintDateTime, "-", " ", ":");
    this.StrFromDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtFromDateTime.value._d, "-", " ", ":");
    this.StrToDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtToDateTime.value._d, "-", " ", ":");
    setTimeout(() => {
      let DATA: any = document.getElementById('htmlData');
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('TrendData'+this.StrFromDateTime +'To'+this.StrToDateTime+'.pdf');
      });
      this.IsHideForPDFbtnClick = false;
    }, 1000);
  }

  ExportToExcelDownload() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    if (this.SelectedParamIds == "") {
      Swal.fire("Please select atleast one parameter!");
      return false;
    }
    var lastChar = this.SelectedParamIds.substr(this.SelectedParamIds.length - 1);
    if (lastChar == ",")
      this.SelectedParamIds = this.SelectedParamIds.substring(0, this.SelectedParamIds.length - 1);
    this.dtPrintDateTime = new Date();
    var StrPrintDateTime = GlobalConstantsService.GetStrDateTimeInDDmmYYYYorYYYYmmmDDhhMMss(this.dtPrintDateTime, "-", "_", "-");
    var StrFromDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtFromDateTime.value._d, "-", "_", "-", "0", "");
    var StrToDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtToDateTime.value._d, "-", "_", "-", "0", "");
    this._TrendserviceService.GetTrendParamInfoByParamIdsForExcel(SessionToken, UserTypeId, UserName, StrFromDateTime, StrToDateTime, this.SelectedParamIds).subscribe((response: any) => {
      GlobalConstantsService.downloadFile(response.TRENDG.Table, "Datalog_" + StrPrintDateTime);
    }, (error) => {
      console.log(error);
    });
    return;
  }


  get f() {
    return this.myform.controls;
  }
}
