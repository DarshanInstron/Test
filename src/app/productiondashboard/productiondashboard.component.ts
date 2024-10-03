import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { OeeDashboardService } from '../Services/oee-dashboard.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import { CommonSettingService } from '../Services/common-setting.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { CommonSettingList } from '../common-setting/common-setting.component';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR,faCircleXmark,faClipboardList,faArrowTrendDown, faArrowTrendUp,faArrowsSpin} from '@fortawesome/free-solid-svg-icons';


export class OeeDashboardDtlSliderInfo {
  public DepartmentId: string = "";
  public DepartmentName: string = "";
  public objOeeDashboardDetailsInfoList: OeeDashboardDetailsInfo[] = [];
}

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
export class OeeDashGraphDetailsInfo {
  public Id: string = "";
  public Datetime: string = "";
  public A: string = "";
  public P: string = "";
  public Q: string = "";
  public OEE: string = "";
  public LevelId: string = "";
  public SliderId:string="";
}

@Component({
  selector: 'app-productiondashboard',
  templateUrl: './productiondashboard.component.html',
  styleUrls: ['./productiondashboard.component.scss']
})
export class ProductiondashboardComponent {
  @ViewChild('carousel') carousel!: MdbCarouselComponent;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  chartOptionsArray: any = [];
  charts: any = null;
  objOeeDashboardDtlSliderInfoList: OeeDashboardDtlSliderInfo[] = [];
  objOeeDashboardDtlSliderInfoListTemp: OeeDashboardDtlSliderInfo[] = [];
  LevelTypePassToChild: string = "c";
  LevelUpToPassToChild: string = "4";
  WithParametersPassToChild: string = "0";
  LeftSideTreeviewHeight: string = "";
  prodContentHeight: string ="";
  disableNxtPrev: boolean = false;
  objTreeviewSelectObj: any;
  TempHeaderTitle: string = "";
  IsPageLoad: string = "1";
  IsWaitingOn:boolean = false;
  barLoading:boolean = false;
  TempLevelId:string="";
  TempSlider:string="";
  TempSequenceID:string="";
  mobileQuery: MediaQueryList;
  private UpdateProdDashSetTimeouttime: any;
  objCommonSettingInfoList1!: CommonSettingList[];
  DashboardUpdateTime: number = 20000;
  SliderTime:number=20000;
  show:boolean = false;
  faBars = faBars;
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faArrowTrendDown=faArrowTrendDown;
  faClipboardList=faClipboardList;
  faCircleXmark=faCircleXmark;
  faArrowTrendUp=faArrowTrendUp;
  faArrowsSpin=faArrowsSpin;
  publicIPAddress: string="";
  private _mobileQueryListener: () => void;


  constructor(private router: Router, public _OeeDashboardService: OeeDashboardService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, 
    private cd: ChangeDetectorRef,public _CommonSettingPageService: CommonSettingService, private _GlobalConstantsService: GlobalConstantsService,public _ValidationerrormessagesService:ValidationerrormessagesService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }
 
  
  ngOnDestroy(): void {
    clearTimeout(this.UpdateProdDashSetTimeouttime);
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.CheckUserHasPermissionForPageurlOrNot();
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 120) + "px";
    //this.GetDashboardCardDetailsInfo("10"); 
    this.prodContentHeight = (h-250)+"px";
    //this.GetDashboardCardDetailsInfo("10");
   // this.getGeneralSettingInfoTableRecordsListWithNewDbStructure();
      
  }

  stopCarousel() {
    this.carousel.stop();
  }


  startCarousel() {
    this.carousel.play();
  }


  prevCarousel() {
    this.carousel.prev();
  }


  nextCarousel() {
    this.carousel.next();
  }

  // carousel-indicators button
  toggleSwitch(): void {
    const switchElement: any = document.getElementById("sliderToggle") as HTMLInputElement;
    

    if (switchElement.checked) {
      this.carousel.stop();
      this.disableNxtPrev = true;
    } 
    else {
      this.carousel.play();
      this.disableNxtPrev = false;
    }
  }

    CheckUserHasPermissionForPageurlOrNot(){   
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._OeeDashboardService.GetproductiondashboardFormPage(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    }, (error) => {
      console.log(error);
    });
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
        this.DashboardUpdateTime = Number(this.objCommonSettingInfoList1[0].DashboardUpdateTime)*1000;
        this.SliderTime = Number(this.objCommonSettingInfoList1[0].SliderTime)*1000;
      }
    
    return false;
  }, (error) => {
    console.log(error);
  });
  return;
}

  getKpiBoxDataByPlcNumberGatewayNoObjName($event: any) {
    this.objTreeviewSelectObj = $event;
    this.TempHeaderTitle = this.objTreeviewSelectObj.C003_LevelName;
    var IsWithSlider="0";
    if(this.objTreeviewSelectObj.SequenceID=="3")
      IsWithSlider="1";
      this.GetDashboardCardDetailsInfo(this.objTreeviewSelectObj.C001_LevelId,IsWithSlider,this.objTreeviewSelectObj.SequenceID);
    //this.GetDashboardCardDetailsInfo('3',IsWithSlider,'3');
  }

  moveToPlanVsActual(objOeeDashboardDetailsInfo:any){
    //console.log(objOeeDashboardDetailsInfo);
    const myJSON = JSON.stringify(objOeeDashboardDetailsInfo);
    sessionStorage.setItem('objOeeDashboardDetailsInfo', myJSON) as any;
    this.router.navigate(['/planvsactual']);
  }
  GetDashboardCardDetailsInfo(LevelId: any,IsWithSlider:any, SequenceID:any) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    if(this.IsPageLoad=="1" || this.TempLevelId!=LevelId||this.TempSlider!=IsWithSlider||this.TempSequenceID!=SequenceID){
    // Swal.fire({
    //   title: '',
    //   html: '<b> Please wait....</b>',
    //   showConfirmButton: false,
    //   allowOutsideClick: false,
    //   allowEscapeKey: false
    // });
    const container :any = document.getElementById('treeview') as HTMLElement
    
    this.IsWaitingOn=true;
    if(this.IsWaitingOn == true)
    {
      container.style.opacity = 0;
      container.style['pointer-events'] = 'none';
    }
  }
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    //this._OeeDashboardService.GetOeeDashboardDetailsDsByLevelId(SessionToken, UserTypeId, UserName, LevelId).subscribe((response: any) => {
    this._OeeDashboardService.getOeeDashboardDetailsListByLevelIdSliderSequence(SessionToken, UserTypeId, UserName, LevelId, IsWithSlider, SequenceID,this.IsPageLoad,"-1").subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      if(this.IsPageLoad=="1" || this.TempLevelId!=LevelId||this.TempSlider!=IsWithSlider||this.TempSequenceID!=SequenceID){
      this.objOeeDashboardDtlSliderInfoList = response;
      this.chartOptionsArray=[];
      for (var j = 0; j < this.objOeeDashboardDtlSliderInfoList.length; j++) {
        var objOeeDashboardDtlSliderInfoTemp = this.objOeeDashboardDtlSliderInfoList[j];
        for (var i = 0; i < objOeeDashboardDtlSliderInfoTemp.objOeeDashboardDetailsInfoList.length; i++) {
          var objOeeDashboardDetailsInfoTemp = objOeeDashboardDtlSliderInfoTemp.objOeeDashboardDetailsInfoList[i];
          this.chartOptionsArray.push(this.loadTripleBarChart(objOeeDashboardDetailsInfoTemp.objOeeDashGraphDetailsInfoList));
        }
      }
      this.getOEEDashboard_BarGraphsDsByLevelIdSliderSequence(LevelId, IsWithSlider, SequenceID,this.IsPageLoad,"-1");
    }
    else{
      this.objOeeDashboardDtlSliderInfoListTemp = response;
      for (var j = 0; j < this.objOeeDashboardDtlSliderInfoList.length; j++) {
        var objOeeDashboardDtlSliderInfoTemp = this.objOeeDashboardDtlSliderInfoList[j];
        for (var i = 0; i < objOeeDashboardDtlSliderInfoTemp.objOeeDashboardDetailsInfoList.length; i++) {
          var objOeeDashboardDetailsInfoTemp = objOeeDashboardDtlSliderInfoTemp.objOeeDashboardDetailsInfoList[i];
          var objOeeDashboardDetailsInfoTemp2 = this.objOeeDashboardDtlSliderInfoListTemp[j].objOeeDashboardDetailsInfoList[i];
          objOeeDashboardDetailsInfoTemp.Id=objOeeDashboardDetailsInfoTemp2.Id;
          objOeeDashboardDetailsInfoTemp.uniqueid=objOeeDashboardDetailsInfoTemp2.uniqueid;
          objOeeDashboardDetailsInfoTemp.C001_Pname=objOeeDashboardDetailsInfoTemp2.C001_Pname;
          objOeeDashboardDetailsInfoTemp.C002_LevelId=objOeeDashboardDetailsInfoTemp2.C002_LevelId;
          objOeeDashboardDetailsInfoTemp.C003_Uid=objOeeDashboardDetailsInfoTemp2.C003_Uid;
          objOeeDashboardDetailsInfoTemp.C004_Image=objOeeDashboardDetailsInfoTemp2.C004_Image;
          objOeeDashboardDetailsInfoTemp.C005_DecPlace=objOeeDashboardDetailsInfoTemp2.C005_DecPlace;
          objOeeDashboardDetailsInfoTemp.C006_UserMgmt=objOeeDashboardDetailsInfoTemp2.C006_UserMgmt;
          objOeeDashboardDetailsInfoTemp.C007_Ugr=objOeeDashboardDetailsInfoTemp2.C007_Ugr;
          objOeeDashboardDetailsInfoTemp.C008_Pcolor=objOeeDashboardDetailsInfoTemp2.C008_Pcolor;
          objOeeDashboardDetailsInfoTemp.Name=objOeeDashboardDetailsInfoTemp2.Name;
          objOeeDashboardDetailsInfoTemp.Datetime=objOeeDashboardDetailsInfoTemp2.Datetime;
          objOeeDashboardDetailsInfoTemp.Planned=objOeeDashboardDetailsInfoTemp2.Planned;
          objOeeDashboardDetailsInfoTemp.Actual=objOeeDashboardDetailsInfoTemp2.Actual;
          objOeeDashboardDetailsInfoTemp.Rejected=objOeeDashboardDetailsInfoTemp2.Rejected;
          objOeeDashboardDetailsInfoTemp.Downtime=objOeeDashboardDetailsInfoTemp2.Downtime;
          objOeeDashboardDetailsInfoTemp.CycleTime=objOeeDashboardDetailsInfoTemp2.CycleTime;
          objOeeDashboardDetailsInfoTemp.MaterialBal=objOeeDashboardDetailsInfoTemp2.MaterialBal;
          objOeeDashboardDetailsInfoTemp.A=objOeeDashboardDetailsInfoTemp2.A;
          objOeeDashboardDetailsInfoTemp.P=objOeeDashboardDetailsInfoTemp2.P;
          objOeeDashboardDetailsInfoTemp.Q=objOeeDashboardDetailsInfoTemp2.Q;
          objOeeDashboardDetailsInfoTemp.OEE=objOeeDashboardDetailsInfoTemp2.OEE;
          objOeeDashboardDetailsInfoTemp.TotTime=objOeeDashboardDetailsInfoTemp2.TotTime;
          objOeeDashboardDetailsInfoTemp.ProductType=objOeeDashboardDetailsInfoTemp2.ProductType;
          objOeeDashboardDetailsInfoTemp.LevelId=objOeeDashboardDetailsInfoTemp2.LevelId;
          objOeeDashboardDetailsInfoTemp.CircleBgImage=objOeeDashboardDetailsInfoTemp2.CircleBgImage;
          objOeeDashboardDetailsInfoTemp.CircleColor=objOeeDashboardDetailsInfoTemp2.CircleColor;
          objOeeDashboardDetailsInfoTemp.nOEE=objOeeDashboardDetailsInfoTemp2.nOEE;
          objOeeDashboardDetailsInfoTemp.SequenceNo=objOeeDashboardDetailsInfoTemp2.SequenceNo;
        }
      }
    }
    if(SequenceID=="1" || SequenceID=="2"){
      var objOeeDashboardDtlSliderInfoTemp = this.objOeeDashboardDtlSliderInfoList[0];
      var objOeeDashboardDetailsInfoTemp = objOeeDashboardDtlSliderInfoTemp.objOeeDashboardDetailsInfoList[0];
      objOeeDashboardDetailsInfoTemp.Name=this.objTreeviewSelectObj.C003_LevelName;
    }
    this.TempLevelId=LevelId;
    this.TempSlider=IsWithSlider;
    this.TempSequenceID=SequenceID;
    this.IsPageLoad = "0";
    // Swal.close();
    const container :any = document.getElementById('treeview') as HTMLElement
    this.IsWaitingOn = false;
    if(this.IsWaitingOn == false)
    {
      container.style.opacity = 1;
      container.style['pointer-events'] = 'auto';
    }
    
    this.UpdateOeeDashboardCards();
      return false;
    });
    return false;
  }
  UpdateOeeDashboardCards() {
    this.UpdateProdDashSetTimeouttime = setTimeout(() => {
      var IsWithSlider="0";
      if(this.objTreeviewSelectObj.SequenceID=="3")
        IsWithSlider="1";
      this.GetDashboardCardDetailsInfo(this.objTreeviewSelectObj.C001_LevelId,IsWithSlider,this.objTreeviewSelectObj.SequenceID);
      //this.GetDashboardCardDetailsInfo('3',IsWithSlider,'3');
    }, this.DashboardUpdateTime);
  }

  getOEEDashboard_BarGraphsDsByLevelIdSliderSequence(LevelId:any, IsWithSlider:any, SequenceID:any,IsPageLoad:any,IsWithValidity:any) {
    this.barLoading=true;
    if (sessionStorage.getItem("SessionToken") === null) {
      return false;
    }
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName ="CT0032";
    this._OeeDashboardService.OEEDashboard_BarGraphsDsByLevelIdSliderSequence(SessionToken, UserTypeId, UserName, LevelId, IsWithSlider, SequenceID,IsPageLoad,IsWithValidity).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      var objOeeDashGraphDetailsInfoListTemp = response;
      this.chartOptionsArray=[];
      for (var j = 0; j < this.objOeeDashboardDtlSliderInfoList.length; j++) {
        var objOeeDashboardDtlSliderInfoTemp = this.objOeeDashboardDtlSliderInfoList[j];
        for (var i = 0; i < objOeeDashboardDtlSliderInfoTemp.objOeeDashboardDetailsInfoList.length; i++) {
          var objOeeDashboardDetailsInfoTemp = objOeeDashboardDtlSliderInfoTemp.objOeeDashboardDetailsInfoList[i];
          var objOeeDashGraphDetailsInfoList = objOeeDashGraphDetailsInfoListTemp.filter((x: { LevelId: any; }) => x.LevelId === objOeeDashboardDetailsInfoTemp.LevelId && IsWithSlider);
          objOeeDashboardDetailsInfoTemp.objOeeDashGraphDetailsInfoList = objOeeDashGraphDetailsInfoList;
          this.chartOptionsArray.push(this.loadTripleBarChart(objOeeDashGraphDetailsInfoList));
          this.barLoading=false;
        }
      }
    }, (error) => {
      console.log(error);
    });
    return;
  }
  
  loadTripleBarChart(objOeeDashGraphDetailsInfoList: any) {
    var FirstDataPointsArray = [];
    var SecDataPointsArray = [];
    var ThirdDataPointsArray = [];
    for (var j = 0; j < objOeeDashGraphDetailsInfoList.length; j++) {
      var objOeeDashGraphDetailsInfoTemp = objOeeDashGraphDetailsInfoList[j];
      var FirstDataPoints = {
        label: objOeeDashGraphDetailsInfoTemp.Datetime, y: objOeeDashGraphDetailsInfoTemp.A
      };
      var SecDataPoints = {
        label: objOeeDashGraphDetailsInfoTemp.Datetime, y: objOeeDashGraphDetailsInfoTemp.P
      };
      var ThirdDataPoints = {
        label: objOeeDashGraphDetailsInfoTemp.Datetime, y: objOeeDashGraphDetailsInfoTemp.Q
      };
      FirstDataPointsArray.push(FirstDataPoints);
      SecDataPointsArray.push(SecDataPoints);
      ThirdDataPointsArray.push(ThirdDataPoints);
    }
    // {label: "2023-06-17", y: 120},
    // {label: "2023-06-18", y: 99},
    // {label: "2023-06-19", y: 82}

    var chartOptions = {
      animationEnabled: true,
      // title: {
      // text: "Crude Oil Reserves Vs Production"
      // },
      axisX: {
        margin: 10
      },
      axisY: {
        title: "Last Three Day OEE"
      },
      axisY2: {
        title: "million barrels/day"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",  // "center", "top" , "bottom"
        horizontalAlign: "center",  // "left", "center" , "right"
        itemclick: function (e: any) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        }
      },
      data: [{
        type: "column",
        name: "A",
        legendText: "A",
        showInLegend: true,
        dataPoints: FirstDataPointsArray
        // dataPoints:[
        //   {label: "2023-06-17", y: 120},
        //   {label: "2023-06-18", y: 99},
        //   {label: "2023-06-19", y: 82}
        // ]
      }, {
        type: "column",
        name: "P",
        legendText: "P",
        //axisYType: "secondary",
        showInLegend: true,
        dataPoints: SecDataPointsArray
        // dataPoints:[
        //   {label: "2023-06-17", y: 45},
        //   {label: "2023-06-18", y: 69},
        //   {label: "2023-06-19", y: 73}
        // ]
      }, {
        type: "column",
        name: "Q",
        legendText: "Q",
        //axisYType: "secondary",
        showInLegend: true,
        dataPoints: ThirdDataPointsArray
        // dataPoints:[
        //   {label: "2023-06-17", y: 80},
        //   {label: "2023-06-18", y: 81},
        //   {label: "2023-06-19", y: 75}
        // ]
      }]
    }
    return chartOptions;
  }

  getDimensionsByFilter(objOeeDashboardDetailsInfoList:OeeDashboardDetailsInfo[], LevelId:string){
    return objOeeDashboardDetailsInfoList.filter(x => x.LevelId === LevelId);
  }
  
  getDimensionsByFind(objOeeDashboardDetailsInfoList:OeeDashboardDetailsInfo[], LevelId:string){
    return objOeeDashboardDetailsInfoList.find(x => x.LevelId === LevelId);
  }
  // var test = getDimensionsByFilter(10);
  // console.log(test);
  
  // test = getDimensionsByFind(10);
  // console.log(test);
}
