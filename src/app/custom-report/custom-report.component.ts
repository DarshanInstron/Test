/*
   Author:	Nita
   Description: For Custom Report (Production,Performance,Alarm,CBM,Utilization,UtilitySummary) 
   LastUpdate:on 20-11-23 by nita 
*/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CustomReportService } from './custom-report.service';
import { ManualEntryService } from '../Services/manual-entry.service';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { NGX_MAT_DATE_FORMATS, NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { CustomNgxDatetimeAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '../custom-ngx-datetime-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { ValidationerrormessagesService } from '../Services/validationerrormessages.service';
import { CRUDFunctionsService } from '../Services/crudfunctions.service';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR, faUserPlus,faM } from '@fortawesome/free-solid-svg-icons';

export class DropDownList {
  public Id: string = "";
  public Description: string = "";
}

@Component({
  selector: 'app-custom-report',
  templateUrl: './custom-report.component.html',
  styleUrls: ['./custom-report.component.scss'],
  providers: [{
    provide: NgxMatDateAdapter,
    useClass: CustomNgxDatetimeAdapter,
    deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: NGX_MAT_DATE_FORMATS, useValue: GlobalConstantsService.CUSTOM_DATE_FORMATSDDMMMYYYYHHmmss },
  ],
})

export class CustomReportComponent implements OnInit, OnDestroy {

  LeftSideTreeviewHeight: string = "";

  selectedMachineId: string = "0";
  selectedReportId: string = "0";
  selectedIntervalId: string = "0";
  dtFromDateTime: any = new FormControl(moment());
  dtToDateTime: any = new FormControl(moment());
  StrFromDateTime: string = "";
  StrToDateTime: string = "";

  pdfStatus: string = "";
  base64String: string = "";
  strErrorMsg: string = "";
  stringJson: string = "";
  imagePath: any = "";
  
  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faUserPlus=faUserPlus;
  faM=faM;

  public ReportTypeFilterCtrl: FormControl = new FormControl();
  public filteredReportList: ReplaySubject<any> = new ReplaySubject<any>(1);
  objReportList: DropDownList[] = [];

  public MachinesFilterCtrl: FormControl = new FormControl();
  public filteredMachinesList: ReplaySubject<any> = new ReplaySubject<any>(1);
  objMachinesList: DropDownList[] = [];

  public IntervalFilterCtrl: FormControl = new FormControl();
  public filteredIntervalList: ReplaySubject<any> = new ReplaySubject<any>(1);
  objIntervalList: DropDownList[] = [];

  private _onDestroy = new Subject<void>();

  reportContainerVisible = false;

  constructor(private sanitizer: DomSanitizer, private _GlobalConstantsService: GlobalConstantsService, public _ValidationerrormessagesService: ValidationerrormessagesService, public _CRUDFunctionsService: CRUDFunctionsService, public _ManualEntryPageService: ManualEntryService, public _CustomReportService: CustomReportService) { }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  //pageload
  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 110) + "px";

    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.CheckUserHasPermissionForPageurlOrNot();

    this.GetActiveReportList('CT0030');
    this.GetDropdownListByTableName('CT0034');

    this.ReportTypeFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtereReportInfo();
      });

    this.MachinesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMachineInfo();
      });

    this.IntervalFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterIntervalInfo();
      });
  }

  CheckUserHasPermissionForPageurlOrNot() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    this._CustomReportService.CheckUserHasPermissionForPageUrl(SessionToken, UserTypeId, UserName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
    });
    return false;
  }

  //dropdowns
  GetActiveReportList(Table: string) {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    var TableName = Table;
    this._CustomReportService.GetActiveReportList(SessionToken, UserTypeId, UserName, TableName).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objReportList = JSON.parse(this.stringJson);
      this.filteredReportList.next(this.objReportList.slice());
      return;
    }, (error) => {
      console.log(error);
    });
    return;

  }

  GetMachineIdByReportId() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;
    if(this.selectedReportId>="1"){
    this.selectedMachineId = "0";
    this.selectedIntervalId = "0";
    this._CustomReportService.GetMachineListByReportType(SessionToken, UserTypeId, UserName, this.selectedReportId).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.stringJson = JSON.stringify(response);
      this.objMachinesList = JSON.parse(this.stringJson);
      this.filteredMachinesList.next(this.objMachinesList.slice());
      return;
    }, (error) => {
      console.log(error);
    });
  } else{
    //Swal.fire('Please select Report Type!');
    this.selectedMachineId = "0";
    this.selectedIntervalId = "0";
  }
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
      this.stringJson = JSON.stringify(response);
      if (Table = 'CT0034') {
        this.objIntervalList = JSON.parse(this.stringJson);
        this.filteredIntervalList.next(this.objIntervalList.slice());
        return;
      }
    }, (error) => {
      console.log(error);
    });
    return;

  }

  filtereReportInfo() {
    if (!this.objReportList) {
      return;
    }
    let search = this.ReportTypeFilterCtrl.value;
    if (!search) {
      this.filteredReportList.next(this.objReportList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredReportList.next(
      this.objReportList.filter(data => data.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  filterIntervalInfo() {
    if (!this.objIntervalList) {
      return;
    }
    let search = this.IntervalFilterCtrl.value;
    if (!search) {
      this.filteredIntervalList.next(this.objIntervalList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredIntervalList.next(
      this.objIntervalList.filter(data => data.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  filterMachineInfo() {
    if (!this.objMachinesList) {
      return;
    }
    let search = this.MachinesFilterCtrl.value;
    if (!search) {
      this.filteredMachinesList.next(this.objMachinesList.slice());
      return;
    }
    else {
      search = search.toLowerCase();
    }
    this.filteredMachinesList.next(
      this.objMachinesList.filter(data => data.Description.toLowerCase().indexOf(search) > - 1)
    );
  }

  //onbtnclick
  //Report view logic Start
  onClickViewPdf() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    if (this.dtFromDateTime.value == null) {
      Swal.fire('Please select From Date!');
      return;
    }
    if (this.dtToDateTime.value == null) {
      Swal.fire('Please select To Date!');
      return;
    }
    if (this.selectedReportId == "0") {
      Swal.fire('Please select Report Type!');
      return false;
    }
    if (this.selectedReportId == "1") {
      if (this.selectedMachineId == "0") {
        Swal.fire('Please select Machine!');
        return false;
      }
      if (this.selectedIntervalId == "0") {
        Swal.fire('Please select Interval!');
        return false;
      }
    }
    if (this.selectedReportId == "2" || this.selectedReportId == "3" || this.selectedReportId == "4" || this.selectedReportId == "11") {
      if (this.selectedMachineId == "0") {
        Swal.fire('Please select Machine!');
        return false;
      }
    }
    if (this.selectedReportId != "1" && this.selectedReportId != "2" && this.selectedReportId != "3" && this.selectedReportId != "4" && this.selectedReportId != "5" && this.selectedReportId != "7" && this.selectedReportId != "9" && this.selectedReportId != "11" && this.selectedReportId != "12" && this.selectedReportId != "13") {
      Swal.fire('Record Not Found!');
      return false;
    }

    this.imagePath = "";
    this.pdfStatus = "0";
    this.StrFromDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtFromDateTime.value._d, "-", "_", "-", "1", "");
    this.StrToDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtToDateTime.value._d, "-", "_", "-", "1", "");
    Swal.fire({
      title: '',
      html: 'Report loading <b> Please wait....</b>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    this._CustomReportService.GetCustomeReport(SessionToken, UserTypeId, UserName, this.selectedIntervalId, this.selectedMachineId, this.selectedReportId, this.StrFromDateTime, this.StrToDateTime, this.pdfStatus).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      var StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForCustomReport(response);
      if (StrErrorMsg != '') {
        console.log(StrErrorMsg)
        Swal.fire(StrErrorMsg);
        return false;
      }
      StrErrorMsg = ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForValidations(response);
      if (StrErrorMsg != '') {
        console.log(StrErrorMsg);
        Swal.fire(StrErrorMsg);
        return false;
      }
      this.base64String = response;
      this.stringJson = JSON.stringify(response);
      this.onViewerInit(this.base64String);
      setTimeout(() => {
        this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
        this.imagePath = this.transform();
      }, 3000);
      Swal.close();
      return
    }, (error) => {
      console.log(error);
      Swal.close();
    });
    return false;
  }
  onViewerInit(base64String: any) {
    const reportData = this.base64ToArrayBuffer(base64String);
    const blob = new Blob([reportData], { type: 'application/pdf' });

    const reportUrl = URL.createObjectURL(blob);
    let reportContainer = document.getElementById('reportContainer');

    if (reportContainer) {
      if (!this.reportContainerVisible) {
        reportContainer.style.display = 'block';
        this.reportContainerVisible = true;
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '800px';
        iframe.allowFullscreen = true;
        iframe.src = reportUrl;
        reportContainer.appendChild(iframe);
      }
      else {
        const existingIframe = document.querySelector('iframe');
        if (existingIframe) {
          existingIframe.remove();
        }
        reportContainer.style.display = 'block';
        this.reportContainerVisible = true;
        const iframe1 = document.createElement('iframe');
        iframe1.style.width = '100%';
        iframe1.style.height = '800px';
        iframe1.allowFullscreen = true;
        iframe1.src = reportUrl;
        reportContainer.appendChild(iframe1);
      }
    }

  }
  base64ToArrayBuffer(base64: any) {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  //Report view logic End

  //Report Excel download logic Start
  downloadExcel(base64String: any, fileName: any) {
    const source = `data:application/vnd.ms-excel;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.xls`;
    link.click();
  }
  onClickDownloadExcel() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    if (this.dtFromDateTime.value == null) {
      Swal.fire('Please select From Date!');
      return;
    }
    if (this.dtToDateTime.value == null) {
      Swal.fire('Please select To Date!');
      return;
    }
    if (this.selectedReportId == "0") {
      Swal.fire('Please select Report Type!');
      return false;
    }
    if (this.selectedReportId == "1") {
      if (this.selectedMachineId == "0") {
        Swal.fire('Please select Machine!');
        return false;
      }
      if (this.selectedIntervalId == "0") {
        Swal.fire('Please select Interval!');
        return false;
      }
    }
    if (this.selectedReportId == "1" || this.selectedReportId == "2" || this.selectedReportId == "3" || this.selectedReportId == "4" || this.selectedReportId == "11") {
      if (this.selectedMachineId == "0") {
        Swal.fire('Please select Machine!');
        return false;
      }
    }
    if (this.selectedReportId != "1" && this.selectedReportId != "2" && this.selectedReportId != "3" && this.selectedReportId != "4" && this.selectedReportId != "5" && this.selectedReportId != "7" && this.selectedReportId != "9" && this.selectedReportId != "11" && this.selectedReportId != "12" && this.selectedReportId != "13") {
      Swal.fire('Record Not Found!');
      return false;
    }

    this.imagePath = "";
    this.pdfStatus = "1";
    this.StrFromDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtFromDateTime.value._d, "-", "_", "-", "1", "");
    this.StrToDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtToDateTime.value._d, "-", "_", "-", "1", "");
    Swal.fire({
      title: '',
      html: 'Report Downloading <b> Please wait....</b>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });

    this._CustomReportService.GetCustomeReport(SessionToken, UserTypeId, UserName, this.selectedIntervalId, this.selectedMachineId, this.selectedReportId, this.StrFromDateTime, this.StrToDateTime, this.pdfStatus).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.base64String = response;
      this.stringJson = JSON.stringify(response);
      var reportfilename = "";
      var MachineDescription = "";
      for (var i = 0; i < this.objMachinesList.length; i++) {
        var objActMachineMasterInfo = this.objMachinesList[i];
        if (objActMachineMasterInfo.Id == this.selectedMachineId) {
          MachineDescription = objActMachineMasterInfo.Description;
          break;
        }
      }
      if (this.selectedReportId == "1" && this.selectedIntervalId == "Daily") {
        reportfilename = this.selectedIntervalId + "_Production Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "1" && this.selectedIntervalId == "Shift") {
        reportfilename = this.selectedIntervalId + "_Production Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "2") {
        reportfilename = "Performance Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "3") {
        reportfilename = "Performance Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "4") {
        reportfilename = "Performance Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "5") {
        reportfilename = "Alarm Report_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "7") {
        reportfilename = "CBM ALL Report_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "9") {
        reportfilename = "Utilization Report_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "11") {
        reportfilename = "CBM Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "12") {
        reportfilename = "Utility Summary Report_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "13") {
        reportfilename = "Utility Summary Report_" + this.StrFromDateTime;
      }
      else {
        reportfilename = "";
      }

      this.downloadExcel(this.base64String, reportfilename);
      setTimeout(() => {
        this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
        this.imagePath = this.transform();
      }, 3000);
      Swal.close();
    }, (error) => {
      console.log(error);
      Swal.close();
    });

    return false;

  }
  //Report Excel download logic End

  //Report PDF download logic Start
  downloadPdf(base64String: any, fileName: any) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }
  onClickDownloadPdf() {
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    var SessionToken = sessionStorage.getItem('SessionToken') as string;
    var UserTypeId = sessionStorage.getItem('UserTypeId') as string;
    var UserName = sessionStorage.getItem('UserName') as string;

    if (this.dtFromDateTime.value == null) {
      Swal.fire('Please select From Date!');
      return;
    }
    if (this.dtToDateTime.value == null) {
      Swal.fire('Please select To Date!');
      return;
    }
    if (this.selectedReportId == "0") {
      Swal.fire('Please select Report Type!');
      return false;
    }
    if (this.selectedReportId == "1") {
      if (this.selectedMachineId == "0") {
        Swal.fire('Please select Machine!');
        return false;
      }
      if (this.selectedIntervalId == "0") {
        Swal.fire('Please select Interval!');
        return false;
      }
    }
    if (this.selectedReportId == "2" || this.selectedReportId == "3" || this.selectedReportId == "4" || this.selectedReportId == "11") {
      if (this.selectedMachineId == "0") {
        Swal.fire('Please select Machine!');
        return false;
      }
    }
    if (this.selectedReportId != "1" && this.selectedReportId != "2" && this.selectedReportId != "3" && this.selectedReportId != "4" && this.selectedReportId != "5" && this.selectedReportId != "7" && this.selectedReportId != "9" && this.selectedReportId != "11" && this.selectedReportId != "12" && this.selectedReportId != "13") {
      Swal.fire('Record Not Found!');
      return false;
    }

    this.imagePath = "";
    this.pdfStatus = "0";
    this.StrFromDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtFromDateTime.value._d, "-", "_", "-", "1", "");
    this.StrToDateTime = GlobalConstantsService.convertMomentDateToDDorYYYYHHmmss(this.dtToDateTime.value._d, "-", "_", "-", "1", "");
    Swal.fire({
      title: '',
      html: 'Report Downloading <b> Please wait....</b>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    this._CustomReportService.GetCustomeReport(SessionToken, UserTypeId, UserName, this.selectedIntervalId, this.selectedMachineId, this.selectedReportId, this.StrFromDateTime, this.StrToDateTime, this.pdfStatus).subscribe((response: any) => {
      this._ValidationerrormessagesService.CheckErrorMsgIsFoundOrNotForSession(response);
      this.base64String = response;
      this.stringJson = JSON.stringify(response);
      var reportfilename = "";
      var MachineDescription = "";
      for (var i = 0; i < this.objMachinesList.length; i++) {
        var objActMachineMasterInfo = this.objMachinesList[i];
        if (objActMachineMasterInfo.Id == this.selectedMachineId) {
          MachineDescription = objActMachineMasterInfo.Description;
          break;
        }
      }
      if (this.selectedReportId == "1" && this.selectedIntervalId == "Daily") {
        reportfilename = this.selectedIntervalId + "_Production Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "1" && this.selectedIntervalId == "Shift") {
        reportfilename = this.selectedIntervalId + "_Production Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "2") {
        reportfilename = "Performance Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "3") {
        reportfilename = "Performance Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "4") {
        reportfilename = "Performance Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "5") {
        reportfilename = "Alarm Report_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "7") {
        reportfilename = "CBM ALL Report_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "9") {
        reportfilename = "Utilization Report_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "11") {
        reportfilename = "CBM Report_" + MachineDescription + "_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "12") {
        reportfilename = "Utility Summary Report_" + this.StrFromDateTime;
      }
      else if (this.selectedReportId == "13") {
        reportfilename = "Utility Summary Report_" + this.StrFromDateTime;
      }
      else {
        reportfilename = "";
      }
      console.log(reportfilename);
      this.downloadPdf(this.base64String, reportfilename);
      setTimeout(() => {
        this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
        this.imagePath = this.transform();
      }, 3000);
      Swal.close();
    }, (error) => {
      console.log(error);
      Swal.close();
    });
    return false;
  }
  //Report PDF download logic End 

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  }

  base64Image = 'data:image/png;base64, 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';

}