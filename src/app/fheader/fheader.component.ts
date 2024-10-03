import { Component, Input, OnDestroy, OnInit, VERSION } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from '../Services/header.service';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { faFireFlameCurved, faIndianRupeeSign , faBolt , faWater , faWind , faBars , faChevronDown,faBell,faUser} from '@fortawesome/free-solid-svg-icons';
import { AlarmCountPnlPopupService } from '../Services/alarm-count-pnl-popup.service';
// import { AlarmPopupComponent } from '../alarm-popup/alarm-popup.component';
import { CommonSettingList } from '../common-setting/common-setting.component';
import { CommonSettingService } from '../Services/common-setting.service';
import { GlobalConstantsService } from '../Services/global-constants.service';



export class AlarmDetailsMasterInfo {
  public AlarmCount: string = "";
}
export class MenuInfo {
  public MenuId: number=0;
  public ParentMenuId: number=0;
  public Title: string="";
  public DescriptionName: string="";
  public Url: string="";
  public IconName: string="";
  public AlertToId: string="";
  public IsCustomMenu: number=0;
  public IsHideShow: number=0;
  public IsHideShowChiledMenu: number=0;
  public objMenuInfoList?: MenuInfo[]; 

}

export class AlarmCountListInfo {
 public ID:string="";
 public MASSAGE:string="";
 public DATETIME:string="";
 public NORMALISED:string="";
 public ASSET:string="";
 public paramno:string="";
 public parameter:string="";
 public plant:string="";
 public section:string="";
 public status1:string="";
}

export class AlarmCountList{
  public AlarmInfo=[];
  public AlarmInfo1:AlarmCountListInfo[]=[];
}
@Component({
  selector: 'app-fheader',
  templateUrl: './fheader.component.html',
  styleUrls: ['./fheader.component.scss']
})
export class FheaderComponent implements OnInit,OnDestroy {
  
  notification: any;
  StrErrorMsg: string = "";
  stringJson: string = "";
  navbarsExampleDefault = false;
  collapse: boolean = true;
  version = VERSION;
  faChevronDown = faChevronDown;
  faUser = faUser;
  AlarmCount: string = "";
  TempUserName: any;
  objMenuInfoList!: MenuInfo[];
  StrparentId!: string;
  IconName!: string;
  DescriptionName: string = "";
  Url: string = "";
  AlertToId: string = "";
  currentDateTime:any;
  logTimeOut:string="";
  clearUpdateInterval:any;
  currDateTime:any;
  
  targetDateTime: any;
  countdown: number = 0;
  timer: any;
  SetInterval:any;
  showCountDown:boolean=false;
  faBell=faBell;
  faBars=faBars;
  objAlarmCount!:AlarmCountList;
  alarm:any;
  id:any;
  alarmDateTime:any;
  objCommonSettingInfoList1!: CommonSettingList[];
  CountDownTime:number= -1;
  TokenExpiryTime:number= -1;
  logInTimeTemp:any;
  updatedTargetLogOutTime:any;
  @Input() snav:any = "snav";
  @Input() pageName:string="";
  @Input() subTitle:string="";
  @Input() isTreeview:boolean=true;
  showImage = true;

  public AlarmDetailsFilterCtrl: FormControl = new FormControl();
  public filteredAlarmDetails: ReplaySubject<any> = new ReplaySubject<any>(1);

  itemSelected: any;
  IsShowLogoutBtn: boolean = true;

  constructor(private router: Router,public datepipe: DatePipe, private matdialog: MatDialog, public _headerService: HeaderService,private _GlobalConstantsService: GlobalConstantsService,
    public _alarmService: AlarmCountPnlPopupService,public dialog: MatDialog,public _CommonSettingPageService: CommonSettingService) { }
  
    ngOnDestroy(): void {
      this.SetInterval;
      clearInterval(this.SetInterval);
      //console.log("header stopped");
    }

  ngOnInit(): void {    
    this.CheckUserHasPermissionForPageurlOrNot();
    this.timeStamp();
    this.SetInterval = setInterval(() => this.sessionLogout(), 5000);
    //this.sessionLogout();
    this.timer = setInterval(() => this.updateCountdown(), 1000);
    this.GetAlarmCountInfoDetails();
    this.onViewCommonSettingFormInfo();
    this. toggleImage();
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  sessionLogout(){   
      var dateNow = new Date().toString();
      this.logInTimeTemp = sessionStorage.getItem("logInTime");

      var targetLogInTime = new Date(this.logInTimeTemp);
      
       targetLogInTime.setMinutes(targetLogInTime.getMinutes() + this.TokenExpiryTime);
       this.updatedTargetLogOutTime = targetLogInTime;
       var updatedTargetLogOutDateTemp:string = this.updatedTargetLogOutTime.toString();
      //console.log("header started");
      if(updatedTargetLogOutDateTemp === dateNow){
        sessionStorage.removeItem('SessionToken');
        sessionStorage.removeItem('UserTypeId');
        sessionStorage.removeItem('UserName');
        sessionStorage.removeItem('logInTime');
        this.router.navigate(['/login']);
        clearInterval(this.SetInterval);
        return;
      }
   
  }

  CheckUserHasPermissionForPageurlOrNot() {
    
    if (sessionStorage.getItem("SessionToken") === null) {
      this.router.navigate(['/login']);
      this.IsShowLogoutBtn = false;
      return false;
    }
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this.TempUserName = UserName;
    this._headerService.GetUserHasPermissionForMenuList(SessionToken, UserTypeId, UserName).subscribe((response) => {
      this.stringJson = JSON.stringify(response);
      this.objMenuInfoList = JSON.parse(this.stringJson);
    }, (error) => {
      console.log(error);
    });
    return false;
  }

  openDialog() {
    // Create a MatDialogConfig object to configure the dialog
  const dialogConfig = new MatDialogConfig();

  // Set the position of the dialog
  dialogConfig.position = {
    top: '1%',    // You can use pixels or percentage
    // left: '50px'    // You can use pixels or percentage
  };
  dialogConfig.data = {
    objAlarmCount:this.objAlarmCount
    // Add more data properties as needed
  };
    // const dialogRef = this.dialog.open(AlarmPopupComponent,dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   //console.log(`Dialog result: ${result}`);
    // });
  }

  CheckIsCustomPageUrlOrNot(objMenuInfo: any) {
    if (objMenuInfo.IsCustomMenu == "1") {
      sessionStorage.setItem('SessionIsCustomMenu', objMenuInfo.IsCustomMenu);
      sessionStorage.setItem('SessionMenuId', objMenuInfo.MenuId);
      sessionStorage.setItem('SessionParentMenuId', objMenuInfo.ParentMenuId);
    }
    else {
      sessionStorage.removeItem('SessionIsCustomMenu');
      sessionStorage.removeItem('SessionMenuId');
      sessionStorage.removeItem('SessionParentMenuId');
    }
    if (this.router.url == objMenuInfo.Url) {
      this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate([objMenuInfo.Url]));
    }
    else {
      this.router.navigate([objMenuInfo.Url]);
    }
  }

  toggleNavbar() {
    this.navbarsExampleDefault = !this.navbarsExampleDefault;
  }

  getClass(item: { faIcon: any; }) {
    return {
      [item.faIcon]: true
    }
  }

  selectedItem($event: any) {
    console.log($event);
  }



  timeStamp(){
    // this.currentDateTime =this.datepipe.transform((new Date), 'MMM dd, yyyy h:mm:ss');
    //this.currentDateTime =new Date();
    setInterval(() => {
      this.currentDateTime =Date.now();
    }, 1000);
    //console.log(this.currentDateTime);
  }

  alarmList1 = [
    

    {
        micname: "DieCasting-2",
        pname: "DC 2 MM Temp1 PV",
        time: "Feb 7, 2024, 8:53:16 PM",
        msg: "LowAlmSp",
    },

    {
        micname: "Trimming-2",
        pname: "DC 1 MM Temp1 PV",
        time: "Feb 7, 2024, 4:29:16 PM",
        msg: "LowAlmSp",
    },

     {
        micname: "Single Gang 1",
        pname: "SG 1 MM Temp1 PV",
        time: "Feb 7, 2024, 11:49:16 PM",
        msg: "HighAlmSp",
    },

    {
        micname: "Trimming-1",
        pname: "TM 1 MM Temp1 PV",
        time: "Feb 8, 2024, 3:49:16 PM",
        msg: "HighAlmSp",
    },

    {
        micname: "DieCasting-1",
        pname: "DC 1 MM Temp1 PV",
        time: "Feb 8, 2024, 11:49:16 PM",
        msg: "HighAlmSp",
    }

    
];

alarmList:any;

  GetAlarmCountInfoDetails(){
    if (sessionStorage.getItem("SessionToken") === null) {
      this.router.navigate(['/login']);
      return false;
    }
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._alarmService.GetAlarmCountInfo(SessionToken, UserTypeId, UserName,"0","2").subscribe((response: any) => {
      this.objAlarmCount = response;
      this.alarmList = this.objAlarmCount.AlarmInfo1

      this.alarm=this.alarmList1.length;

    }, (error) => {
      console.log(error);
    });
    return false;
  }


  // startCountDown() {
  //   // this.currDateTime = new Date();
    
  //   // const targetDateTimeTemp = sessionStorage.getItem("logInTime");
  //   // if (targetDateTimeTemp !== null) {
  //   //   this.targetDateTime = new Date(targetDateTimeTemp);
  //   // }
  //   // this.timer = setInterval(() => this.updateCountdown(), 1000);
  // }

  updateCountdown() {
    this.currDateTime = new Date(); // Update current datetime
    const timeDifference = this.updatedTargetLogOutTime - this.currDateTime.getTime();
    this.countdown = Math.floor(timeDifference / 1000); // Convert to seconds

    const countDownTimeTemp = this.CountDownTime*60;

    if (this.countdown <= countDownTimeTemp && this.countdown > 0) {
      this.showCountDown=true;
      // Start the countdown
    } else if (this.countdown <= 0) {
      // Datetimes have matched, end the countdown
      clearInterval(this.timer);
      this.showCountDown=false;
    }
  }

  //get common settings info
  onViewCommonSettingFormInfo() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeIdTemp = sessionStorage.getItem('UserTypeId') as string;
  
    var UserName = sessionStorage.getItem('UserName') as string;
    var TableName = 'CT0032';
    this._CommonSettingPageService.GetCommonSettingInfoList(SessionToken, UserTypeIdTemp, UserName, TableName).subscribe((response: any) => {
      
      this.objCommonSettingInfoList1 = response;

      var cSettingLength = this.objCommonSettingInfoList1.length;
  
      if (cSettingLength > 0) {
       this.TokenExpiryTime = Number(this.objCommonSettingInfoList1[0].TokenExpiryTime);
       this.CountDownTime = Number(this.objCommonSettingInfoList1[0].CountDownTime);
       //console.log(this.TokenExpiryTime,this.CountDownTime);
      }
    
    return false;
  }, (error) => {
    console.log(error);
  });
  return;
}

}



