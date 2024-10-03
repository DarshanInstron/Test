import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OeeDashboardService } from '../Services/oee-dashboard.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { TrendLegendInfo } from '../trendpage/trendpage.component';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';
import { TagInDetailsInfo } from '../kpipage/kpipage.component';
import { KpiPageService } from '../Services/kpi-page.service';
import { ManualEntryService } from '../Services/manual-entry.service';
import { KpiSettingList } from '../kpi-setting-page/kpi-setting-page.component';
import { TrendSettingPageService } from '../Services/trend-setting-page.service';
import { TrendSettingList } from '../trend-setting-page/trend-setting-page.component';
import { CommonSettingService } from '../Services/common-setting.service';
import { CommonSettingList } from '../common-setting/common-setting.component';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR} from '@fortawesome/free-solid-svg-icons';


const StrColorArray: string[] = [
   '#03ad9c', '#ad0333', '#9c4dad',
  '#3d4dad', '#3dad6b', '#6bad3d', '#ad6b3d', '#ad3d5a',
  '#ad3d97', '#6b3dad', '#3d6bad', '#3d93ad', '#8fbea8'
];

export class OeeDashboardDetailsInfo {
  public Id: string = "";
  public uniqueid: string = "";
  public C001_Pname: string = "";
  public C002_LevelId: string = "";
  public C003_Uid: string = "";
  public C004_Image: string = "";
  public C005_DecPlace: string = "";
  public C006_UserMgmt: string = "";
  public C007_Ugr: string = "";
  public C008_Pcolor: string = "";
  public Name: string = "";
  public Datetime: string = "";
  public Planned: string = "";
  public Actual: string = "";
  public Rejected: string = "";
  public Downtime: string = "";
  public CycleTime: string = "";
  public MaterialBal: string = "";
  public A: string = "";
  public P: string = "";
  public Q: string = "";
  public OEE: string = "";
  public TotTime: string = "";
  public ProductType: string = "";
  public LevelId: string = "";
  public CircleBgImage: string = "";
  public CircleColor: string = "";
  public nOEE: number = 0;
  public SequenceNo: number = 0;
  public DepartmentId:string="";
  public objOeeDashGraphDetailsInfoList: OeeDashGraphDetailsInfo[] = [];
  
}

export class OeeDashboardDetailsInfotemp {
  public Id: string = "";
  public uniqueid: string = "";
  public C001_Pname: string = "";
  public C002_LevelId: string = "";
  public Name: string = "";
  public Shift_Date: string = "";
  public Plan: string = "";
  public Act: string = "";
  public Rej: string = "";
  public Dwn: string = "";
  public CycleTime: string = "";
  public MaterialBal: string = "";
  public A: string = "";
  public P: string = "";
  public Q: string = "";
  public OEE: string = "";
  public LevelId: string = "";
  public CircleBgImage: string = "";
  public CircleColor: string = "";
  public nOEE: number = 0;
  public objOeeDashGraphDetailsInfoList: OeeDashGraphDetailsInfo[] = [];
}
export class OeeDashGraphDetailsInfo {
  public Id: string = "";
  public Datetime: string = "";
  public A: string = "";
  public P: string = "";
  public Q: string = "";
  public OEE: string = "";
  public LevelId: string = "";
}

export class ProdTrendLegend {
  public DateTime: string = "";
  public Plan: string = "";
  public Actual :string = "";
  public LineColor: string = "";
}

@Component({
  selector: 'app-plan-vs-actual',
  templateUrl: './plan-vs-actual.component.html',
  styleUrls: ['./plan-vs-actual.component.scss']
})
export class PlanVsActualComponent implements OnInit, OnDestroy {
  LeftSideTreeviewHeight: string="";
  PageContentHeight:string ="";
  objOeeDashboardDetailsInfo!:OeeDashboardDetailsInfo;
  objOeeDashboardDetailsInfotemp!:OeeDashboardDetailsInfotemp;
  
  Name:string="";
  Planned:string="";
  Actual:string="";
  Rejection:string="";
  DownTime:string="";
  CycleTime:string="";
  MaterialBalance:string="";
  OEE:number=0;
  A:number=0;
  P:number=0;
  Q:number=0;
  OEEColor:string="";
  AColor:string="";
  PColor:string="";
  QColor:string="";
  stringJson: string="";
  objTagInDetailsInfoListTemp: TagInDetailsInfo[] = [];
  objTagInDetailsInfoListTemp2: TagInDetailsInfo[] = [];
  objTrendInfo: any = [];
  DetasepointsArray: any = [];
  TempLineIdsArray: any = [];
  TempLine1Dataset: any = [];
  TempLine2Dataset: any = [];
  objTrendLegendInfoList: TrendLegendInfo[] = [];
  chart: any = null;
  objTagInDetailsInfoList: TagInDetailsInfo[] = [];
  LevelId:string="";
  objKpiBoxesSettingInfoList: KpiSettingList[] = [];
  objTrendSettingInfoList: TrendSettingList[] = [];
  KpiBoxBoxRefreshRate: number = 20000;
  trendRefreshRate: number = 600000;
  objCommonSettingInfoList1!: CommonSettingList[];
  ProductDashRefreshRate: number = 3000;
  machineLevel4KpiCard:any;
  StrSelectedTagIds: string = "";
  dateTime:any;
  private UpdateProdDashSetTimeouttime: any;
  private UpdateKpiBoxSetTimeouttime: any;
  private UpdateTrendChartSetTimeouttime: any;

  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;

  constructor(private router: Router,public _OeeDashboardService: OeeDashboardService,public _KpiPageService: KpiPageService,public _ManualEntryPageService: ManualEntryService,
    public _CommonSettingPageService: CommonSettingService, private _GlobalConstantsService: GlobalConstantsService,public _ValidationerrormessagesService:ValidationerrormessagesService,
    public _TrendSettingPageService: TrendSettingPageService) {
   }

   

  ngOnInit(): void {    
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 120) + "px";
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();
    if (sessionStorage.getItem("objOeeDashboardDetailsInfo") === null) {
      this.router.navigate(['/dashboard']);
      return;
    }
    var objOeeDashboardDetailsInfo = sessionStorage.getItem('objOeeDashboardDetailsInfo') as any;
    this.objOeeDashboardDetailsInfo = JSON.parse(objOeeDashboardDetailsInfo);

    this.machineLevel4KpiCard = this.objOeeDashboardDetailsInfo.C002_LevelId;
    this.dateTime = this.objOeeDashboardDetailsInfo.Datetime;
    //console.log(machineLevel4KpiCard);
    this.getProdCardDetails();
    // this.updateMachineCards();
    this.GetTrendLinesInfoByFromTonParamIds(this.dateTime,this.machineLevel4KpiCard,'ALL');
    // this.AddPointsInChartPoints(this.dateTime,'66','ALL');
    this.ShowKpiBoxesInfoByTagNamesClick(this.machineLevel4KpiCard, "c", "a");
    this.onUpdateKpiBoxIntervalEventClick(this.machineLevel4KpiCard, "c", "a");
    this.onViewCommonSettingFormInfo();
    
    //sessionStorage.removeItem('objOeeDashboardDetailsInfo');
    // console.log(this.objOeeDashboardDetailsInfo);
  }

//pageload
CheckUserHasPermissionForPageurlOrNot() {
  this._GlobalConstantsService.CheckSessionIsRuningOrNot();
  var SessionToken = sessionStorage.getItem('SessionToken') as string;
  var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
  var UserName = sessionStorage.getItem('UserName') as string;
  this._OeeDashboardService.CheckUserHasPermissionForPageUrl(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
    this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    });
    return false;
  }

  ngOnDestroy(): void {
    clearTimeout(this.UpdateProdDashSetTimeouttime);
    clearTimeout(this.UpdateKpiBoxSetTimeouttime);
    clearTimeout(this.UpdateTrendChartSetTimeouttime);
  }



  // #region  machine cards

  //get machine card values
  getProdCardDetails(){
  this.Name =this.objOeeDashboardDetailsInfo.Name;
  this.Planned=this.objOeeDashboardDetailsInfo.Planned;
  this.Actual=this.objOeeDashboardDetailsInfo.Actual;
  this.Rejection=this.objOeeDashboardDetailsInfo.Rejected;
  this.DownTime=this.objOeeDashboardDetailsInfo.Downtime;
  this.CycleTime=this.objOeeDashboardDetailsInfo.CycleTime;
  this.MaterialBalance=this.objOeeDashboardDetailsInfo.MaterialBal;
  this.OEE=Number(this.objOeeDashboardDetailsInfo.OEE);
  this.A=Number(this.objOeeDashboardDetailsInfo.A);
  this.P=Number(this.objOeeDashboardDetailsInfo.P);
  this.Q=Number(this.objOeeDashboardDetailsInfo.Q);
  this.OEEColor=this.objOeeDashboardDetailsInfo.CircleColor;
   
  if(this.OEE <= 24){
    this.OEEColor='#D92121';
  }
  if(this.OEE >= 25 && this.A <= 49){
    this.OEEColor='#FF8C00';
  }
  if(this.OEE >= 50 && this.A <= 74){
    this.OEEColor='#ccc600';
  }
  if(this.OEE >= 75 ){
    this.OEEColor='#008000';
  }

  if(this.A <= 24){
    this.AColor='#D92121';
  }
  if(this.A >= 25 && this.A <= 49){
    this.AColor='#FF8C00';
  }
  if(this.A >= 50 && this.A <= 74){
    this.AColor='#ccc600';
  }
  if(this.A >= 75 ){
    this.AColor='#008000';
  }

  if(this.P <= 24){
    this.PColor='#D92121';
  }
  if(this.P >= 25 && this.P <= 49){
    this.PColor='#FF8C00';
  }
  if(this.P >= 50 && this.P <= 74){
    this.PColor='#ccc600';
  }
  if(this.P >= 75 ){
    this.PColor='#008000';
  }

  if(this.Q <= 24){
    this.QColor='#D92121';
  }
  if(this.Q >= 25 && this.Q <= 49){
    this.QColor='#FF8C00';
  }
  if(this.Q >= 50 && this.Q <= 74){
    this.QColor='#ccc600';
  }
  if(this.Q >= 75 ){
    this.QColor='#008000';
  }

  this.updateMachineCards();
  
 
}
  
// Update machine card values
  updateMachineCards(){
    
    this.UpdateProdDashSetTimeouttime = setTimeout(() => {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
        var SessionToken = sessionStorage.getItem('SessionToken') as string;
        var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
        var UserName = sessionStorage.getItem('UserName') as string;
        this._ManualEntryPageService.getAPQSummeryList(SessionToken, UserTypeId, UserName, "-2", this.machineLevel4KpiCard, "-2","0","1").subscribe((response: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
        //console.log(response)
        this.objOeeDashboardDetailsInfotemp = response[0];


  // this.Name =this.objOeeDashboardDetailsInfotemp.Name;
  this.Planned=this.objOeeDashboardDetailsInfotemp.Plan;
  this.Actual=this.objOeeDashboardDetailsInfotemp.Act;
  this.Rejection=this.objOeeDashboardDetailsInfotemp.Rej;
  this.DownTime=this.objOeeDashboardDetailsInfotemp.Dwn;
  this.OEE=Number(this.objOeeDashboardDetailsInfotemp.OEE);
  this.A=Number(this.objOeeDashboardDetailsInfotemp.A);
  this.P=Number(this.objOeeDashboardDetailsInfotemp.P);
  this.Q=Number(this.objOeeDashboardDetailsInfotemp.Q);
  this.OEEColor=this.objOeeDashboardDetailsInfotemp.CircleColor;
   
  if(this.OEE <= 24){
    this.OEEColor='#D92121';
  }
  if(this.OEE >= 25 && this.A <= 49){
    this.OEEColor='#FF8C00';
  }
  if(this.OEE >= 50 && this.A <= 74){
    this.OEEColor='#ccc600';
  }
  if(this.OEE >= 75 ){
    this.OEEColor='#008000';
  }

  if(this.A <= 24){
    this.AColor='#D92121';
  }
  if(this.A >= 25 && this.A <= 49){
    this.AColor='#FF8C00';
  }
  if(this.A >= 50 && this.A <= 74){
    this.AColor='#ccc600';
  }
  if(this.A >= 75 ){
    this.AColor='#008000';
  }

  if(this.P <= 24){
    this.PColor='#D92121';
  }
  if(this.P >= 25 && this.P <= 49){
    this.PColor='#FF8C00';
  }
  if(this.P >= 50 && this.P <= 74){
    this.PColor='#ccc600';
  }
  if(this.P >= 75 ){
    this.PColor='#008000';
  }

  if(this.Q <= 24){
    this.QColor='#D92121';
  }
  if(this.Q >= 25 && this.Q <= 49){
    this.QColor='#FF8C00';
  }
  if(this.Q >= 50 && this.Q <= 74){
    this.QColor='#ccc600';
  }
  if(this.Q >= 75 ){
    this.QColor='#008000';
  }
  this.updateMachineCards();
      }, (error) => {
        console.log(error);
      });
      
     
      return false;
    }, this.ProductDashRefreshRate);
  }


  // get values from general setting 
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
        this.ProductDashRefreshRate = Number(this.objCommonSettingInfoList1[0].DashboardUpdateTime)*1000;
      }
    
    return false;
  }, (error) => {
    console.log(error);
  });
  return;
}

   // #endregion machine cards

  // #region  kpiboxes

  // Update kpi boxes values
  onUpdateKpiBoxIntervalEventClick(SelectedTagIds: any, TreeviewFrom:string, TreeviewTo:string ) {
    this.UpdateKpiBoxSetTimeouttime = setTimeout(() => {
      this.objTagInDetailsInfoListTemp = [];
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
        var SessionToken = sessionStorage.getItem('SessionToken') as string;
        var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
        var UserName = sessionStorage.getItem('UserName') as string;
        var TempLevelId = this.LevelId;
        var objName = "";
        //var TempLevelId = sessionStorage.getItem('TempLevelId') as string;
        //var objName = sessionStorage.getItem('objDataTypeName') as string;
        // if (TempLevelId == null || TempLevelId == "")
        //   return;
        this._KpiPageService.GetKPIBoxDetailsListBySP(SessionToken, UserTypeId, UserName, SelectedTagIds, TreeviewFrom, TreeviewTo).subscribe((response: any) => {
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
          this.onUpdateKpiBoxIntervalEventClick(this.machineLevel4KpiCard, "c", "a"); 
        }, (error) => {
          console.log(error);
        });
      
      return false;
    }, this.KpiBoxBoxRefreshRate);
  }

  // Get kpi boes values
  ShowKpiBoxesInfoByTagNamesClick(SelectedTagIds: any, TreeviewFrom:string, TreeviewTo:string ) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._KpiPageService.GetKPIBoxDetailsListBySP(SessionToken, UserTypeId, UserName, SelectedTagIds, TreeviewFrom, TreeviewTo).subscribe((response: any) => {// TempGatewayName + objName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objTagInDetailsInfoList = response;
      this.objTagInDetailsInfoListTemp2 = response;
     
      // if (IsBtnClick === 1) {
      //   this.TempPage = 1;
      //   this.page = 1;
      // }
      if (this.objTagInDetailsInfoList.length > 0) {
        //this.TempHeaderTitle = this.objTagInDetailsInfoList[0].HeaderTitleName;
        const myArray = this.objTagInDetailsInfoList[0].HeaderTitleName.split("-");
        sessionStorage.setItem('C001_LevelId', SelectedTagIds);
        sessionStorage.setItem('objDataTypeName', this.objTagInDetailsInfoList[0].HeaderTitleName);
      }
     
    }, (error) => {
      console.log(error);
    });
    return;
  }

  // Get kpi boxes dynamic refresh rate from kpi settings
  getKpiBoxesSettingInfoList() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName ="CT0028";
    this._KpiPageService.getKpiBoxesSettingInfoList(SessionToken, UserTypeId, UserName, TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.objKpiBoxesSettingInfoList = response;
      var kSettingLength = this.objKpiBoxesSettingInfoList.length;

      if (kSettingLength > 0) {
        this.KpiBoxBoxRefreshRate = Number(this.objKpiBoxesSettingInfoList[0].KpiBoxBoxRefreshRate) * 1000;
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }


  // #endregion  kpi boxes


  // #region trend lines
  //Get trend lines
  GetTrendLinesInfoByFromTonParamIds(FromDate: any, Machine: any, SHIFT: any) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    this._OeeDashboardService.GetPlanvsActualDetailsInfoList(SessionToken, UserTypeId, UserName, FromDate, Machine, SHIFT).subscribe((data: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(data);
      this.stringJson = JSON.stringify(data);
      this.objTrendInfo = JSON.parse(this.stringJson);
      this.DetasepointsArray = [];

      const dates = this.objTrendInfo.DateTime;

      this.objTrendLegendInfoList = [];
      this.TempLine1Dataset = [];
      this.TempLine2Dataset = [];
      for(let i=0 ; i<this.objTrendInfo.length ; i++){

        const objActualLine = this.objTrendInfo[i].Actual;
        const objPlanLine = this.objTrendInfo[i].Plan;
        const DateArray = this.objTrendInfo[i].DateTime;

        this.objTrendInfo.StrColorArray = StrColorArray[i];

        var Plan = { x: new Date(DateArray), y: Number(objPlanLine) };

        this.TempLine1Dataset.push(Plan);

        var Actual = { x: new Date(DateArray), y: Number(objActualLine)};

        this.TempLine2Dataset.push(Actual);

      }



      DatasetpointInfo = {
        type: "spline",
        name: "Plan",
        lineColor: StrColorArray[0],
        markerColor: StrColorArray[0],
        markerSize: 0,
        axisYIndex: 1,
        connectNullData: true,
        xValueFormatString: "MMM",
        dataPoints: this.TempLine1Dataset
      };
      
      this.DetasepointsArray.push(DatasetpointInfo);

      var DatasetpointInfo = {
        type: "spline",
        name: "Actual",
        lineColor: StrColorArray[1],
        markerColor: StrColorArray[1],
        markerSize: 0,
        axisYIndex: 1,
        connectNullData: true,
        xValueFormatString: "MMM",
        dataPoints: this.TempLine2Dataset
      };
     
      this.DetasepointsArray.push(DatasetpointInfo);

      var objTrendLegendInfoTemp = {
        TagNumber: 1 ,
        TagName: "Plan",
        LineColor: StrColorArray[0]
      };
      this.objTrendLegendInfoList.push(objTrendLegendInfoTemp);

      objTrendLegendInfoTemp = {
        TagNumber: 2 ,
        TagName:"Actual",
        LineColor: StrColorArray[1]
      };
      this.objTrendLegendInfoList.push(objTrendLegendInfoTemp);
      
      


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
        backgroundColor: "#EFF2FF", //background color for chart div
        data: this.DetasepointsArray
      });
      this.chart.render();
      this.AddPointsInChartPoints(this.dateTime,this.machineLevel4KpiCard,'ALL');
      var yVal = 15, updateCount = 0;
      return;
    });

  }
  

  // add points to trend lines
  AddPointsInChartPoints(FromDate: any, Machine: any, SHIFT: any) {
    this.UpdateTrendChartSetTimeouttime = setTimeout(() => {
      this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

      this._OeeDashboardService.GetPlanvsActualDetailsInfoList(SessionToken, UserTypeId, UserName, FromDate, Machine, SHIFT).subscribe((data: any) => {
        this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(data);
      this.stringJson = JSON.stringify(data);
      this.objTrendInfo = JSON.parse(this.stringJson);
      var NoofLines = this.chart.options.data.length;
      // if(StrColorArray.length<1)
      // StrColorArray = this.objTrendInfo.StrColorArray;
      const TempLineIdsArray = this.objTrendInfo.LineIdArray;
      this.chart.options.data[1].dataPoints=[];
      this.chart.options.data[0].dataPoints=[];
      
      this.chart.render();
      for(let i=0 ; i<this.objTrendInfo.length ; i++){

        
        const objPlanLine = this.objTrendInfo[i].Plan;
        const objActualLine = this.objTrendInfo[i].Actual;
        const DateArray = this.objTrendInfo[i].DateTime;

        // this.objTrendInfo.StrColorArray = StrColorArray[i];
        
        var Plan = { x: new Date(DateArray), y: Number(objActualLine) };
        var Actual = { x: new Date(DateArray), y: Number(objPlanLine)};
        
       
        this.chart.options.data[1].dataPoints.push(Plan);
        this.chart.options.data[0].dataPoints.push(Actual);
        
      }

      this.chart.render();

      this.AddPointsInChartPoints(this.dateTime,this.machineLevel4KpiCard,'ALL');
        
      
    });
  }, this.trendRefreshRate);
  }

  //Get dynamic values from trend setting
  getTrendSettingInfoList() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    var TableName = "CT0027";

    this._TrendSettingPageService.GetTrendSettingInfoList(SessionToken, UserTypeId, UserName, TableName).subscribe((response: any) => {
            this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
            this.objTrendSettingInfoList = response;

      var kSettingLength = this.objTrendSettingInfoList.length;

      if (kSettingLength > 0) {
        this.trendRefreshRate = Number(this.objTrendSettingInfoList[0].RefreshRate) * 1000;
      }

    }, (error) => {
      console.log(error);
    });
    return;
  }

  // #endregion  trend lines

}
