import { NgxMatDateFormats } from '@angular-material-components/datetime-picker';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as fileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { PurchaseDashboardService } from './purchase-dashboard.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
//@Injectable()

@Injectable({
  providedIn: 'root'
})

export class GlobalConstantsService {
  //public static apiURL: string = "http://192.168.0.145/plantonv3apis1388n/";
  //public static apiURL: string = "http://192.168.0.145/apitrial/";
  //public static apiURL: string = "http://192.168.0.181/plantonv3apis1388n/";
  //public static apiURL: string = "http://192.168.0.174/plantonv3apis1388n1/";
  //public static apiURL: string = "http://localhost/plantonv3apis1388n/";
  //public static apiURL: string = "http://192.168.0.135/Plantonv3Apis1332/";
  //public static apiURL: string = "http://192.168.0.135/AngularAPIs_1364/";
  //public static apiURL: string = "http://103.148.120.139/plantonv3apis1388n1/";
  //public static apiURL: string = "http://103.148.120.139:1010/plantonv3apis1388n1/";
  public static apiURL: string = "http://localhost:53566/";
  public static SigmaApisBaseURL: string = "https://innerconnect.sigmaengineeredsolutions.com:8051/api/";
  BaseUrl: string = "";
  public static treeformscaption = [['abc', 'pqr', 'pqr', 'pqr', 'pqr', 'pqr'], ['msn', 'msn', 'pqr', 'msn', 'msn', 'msn'], ['hindi', 'hindi', 'hindi', 'hindi', 'hindi', 'hindi']];
  public static TreeCharMonthscaption = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public static FullCharMonthscaption = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  StrErrorMsg: string = "";

  constructor(private router: Router, public _PurchaseDashboardService: PurchaseDashboardService) { }

  ngOnInit(): void { }

  //check session is runing or not
  CheckSessionIsRuningOrNot() {
    if (sessionStorage.getItem("SessionToken") === null) {
      this.router.navigate(['/login']);
      return;
    }
  }

  GenerateSigmaApisTokenDetailsInfo() {
    this._PurchaseDashboardService.Purchase_KPI_IOTToken().subscribe((response: any) => {
      sessionStorage.setItem('SigmaSessionToken', response.Token);
    }, (error) => {
      console.log(error);
    });
  }
  ClearLastSessionFrom() {
    sessionStorage.removeItem('SigmaSessionToken');
  }
  public static GetStrDateInDDmmYYYY2(StrDate: Date) {
    function p3(n: number) {
      return (n < 10 ? '0' : '') + n;
    }
    var month = p3(StrDate.getMonth() + 1);//months (0-11)
    var day = p3(StrDate.getDate());//day (1-31)
    var year = StrDate.getFullYear();
    var GetHours = p3(StrDate.getHours());
    var GetMinutes = p3(StrDate.getMinutes());
    var GetSeconds = p3(StrDate.getSeconds());
    var datetime = day + "-" + month + "-" + year;
    var datetime = year + "-" + month + "-" + day + " " + GetHours + ":" + GetMinutes + ":" + GetSeconds;
    return datetime;
  }

  public static GetStrDateTimeInDDmmYYYYhhMMss(StrDate: Date) {
    var GetDay = (StrDate.getDate());
    var StrGetDay = "" + GetDay;
    if (GetDay < 10)
      StrGetDay = "0" + GetDay;
    var GetMonth = (StrDate.getMonth() + 1);
    var StrGetMonth = "" + GetMonth;
    if (GetMonth < 10)
      StrGetMonth = "0" + GetMonth;
    var GetHours = (StrDate.getHours());
    var StrGetHours = "" + GetHours;
    if (GetHours < 10)
      StrGetHours = "0" + GetHours;
    var GetMinutes = (StrDate.getMinutes());
    var StrGetMinutes = "" + GetMinutes;
    if (GetMinutes < 10)
      StrGetMinutes = "0" + GetMinutes;
    var GetSeconds = (StrDate.getSeconds());
    var StrGetSeconds = "" + GetSeconds;
    if (GetSeconds < 10)
      StrGetSeconds = "0" + GetSeconds;
    var datetime = StrGetDay + "-"
      + StrGetMonth + "-"
      + StrDate.getFullYear() + "_"
      + StrGetHours + "-" + StrGetMinutes + "-" + StrGetSeconds;
    return datetime;
  }

  public static GetStrDateTimeInYYYYmmDDhhMMss(StrDate: Date) {
    var GetDay = (StrDate.getDate());
    var StrGetDay = "" + GetDay;
    if (GetDay < 10)
      StrGetDay = "0" + GetDay;
    var GetMonth = (StrDate.getMonth() + 1);
    var StrGetMonth = "" + GetMonth;
    if (GetMonth < 10)
      StrGetMonth = "0" + GetMonth;
    var GetHours = (StrDate.getHours());
    var StrGetHours = "" + GetHours;
    if (GetHours < 10)
      StrGetHours = "0" + GetHours;
    var GetMinutes = (StrDate.getMinutes());
    var StrGetMinutes = "" + GetMinutes;
    if (GetMinutes < 10)
      StrGetMinutes = "0" + GetMinutes;
    var GetSeconds = (StrDate.getSeconds());
    var StrGetSeconds = "" + GetSeconds;
    if (GetSeconds < 10)
      StrGetSeconds = "0" + GetSeconds;
    var datetime = StrDate.getFullYear() + "-"
      + StrGetMonth + "-"
      + StrGetDay + " "
      + StrGetHours + ":" + StrGetMinutes + ":" + StrGetSeconds;
    return datetime;
  }
  public static GetStrDateTimeInYYYYmmDDhhMMssDbFormat(StrDate: Date) {
    var GetDay = (StrDate.getDate());
    var StrGetDay = "";
    if (GetDay < 10)
      StrGetDay = "0" + GetDay;
    else
      StrGetDay = "" + GetDay;
    var GetMonth = (StrDate.getMonth() + 1);
    var StrGetMonth = "";
    if (GetMonth < 10)
      StrGetMonth = "0" + GetMonth;
    else
      StrGetMonth = "" + GetMonth;
    var GetHours = (StrDate.getHours());
    var StrGetHours = "";
    if (GetHours < 10)
      StrGetHours = "0" + GetHours;
    else
      StrGetHours = "" + GetHours;
    var GetMinutes = (StrDate.getMinutes());
    var StrGetMinutes = "";
    if (GetMinutes < 10)
      StrGetMinutes = "0" + GetMinutes;
    else
      StrGetMinutes = "" + GetMinutes;
    var GetSeconds = (StrDate.getSeconds());
    var StrGetSeconds = "";
    if (GetSeconds < 10)
      StrGetSeconds = "0" + GetSeconds;
    else
      StrGetSeconds = "" + GetSeconds;
    var datetime = StrDate.getFullYear() + "-"
      + StrGetMonth + "-"
      + StrGetDay + "_"
      + StrGetHours + ":" + StrGetMinutes + ":" + StrGetSeconds;

    return datetime;
  }

  public static GetStrDateTimeInDDmmYYYYorYYYYmmmDDhhMMss(StrDate: Date, StrDateSign: string = "-", StrMidDatenTimeSign: string = "_", StrTimeSign: string = "-", IsStartDDorYYYY: string = "0") {
    var GetDay = (StrDate.getDate());
    var StrGetDay = "" + GetDay;
    if (GetDay < 10)
      StrGetDay = "0" + GetDay;
    var StrMonthName = this.TreeCharMonthscaption[StrDate.getMonth()];
    var GetMonth = (StrDate.getMonth() + 1);
    var StrGetMonth = "" + GetMonth;
    if (GetMonth < 10)
      StrGetMonth = "0" + GetMonth;
    var GetHours = (StrDate.getHours());
    var StrGetHours = "" + GetHours;
    if (GetHours < 10)
      StrGetHours = "0" + GetHours;
    var GetMinutes = (StrDate.getMinutes());
    var StrGetMinutes = "" + GetMinutes;
    if (GetMinutes < 10)
      StrGetMinutes = "0" + GetMinutes;
    var GetSeconds = (StrDate.getSeconds());
    var StrGetSeconds = "" + GetSeconds;
    if (GetSeconds < 10)
      StrGetSeconds = "0" + GetSeconds;
    var datetime = StrGetDay + StrDateSign
      + StrMonthName + StrDateSign +
      + StrDate.getFullYear() + StrMidDatenTimeSign
      + StrGetHours + StrTimeSign + StrGetMinutes + StrTimeSign + StrGetSeconds;
    if (IsStartDDorYYYY == "1") {
      datetime = StrDate.getFullYear() + StrDateSign
        + StrMonthName + StrDateSign +
        + StrGetDay + StrMidDatenTimeSign
        + StrGetHours + StrTimeSign + StrGetMinutes + StrTimeSign + StrGetSeconds;
    }
    return datetime;
  }
  public static convertMomentDateToDDorYYYYHHmmss(str: any, StrDateSign: string = "-", StrMidSign: string = " ", StrTimeSign: string = ":", IsStartDDorYYYY: string = "0", DwMname: string = "1", WithDateTime: string = "1") {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    const hr = ("0" + date.getHours()).slice(-2);
    const min = ("0" + date.getMinutes()).slice(-2);
    const sec = ("0" + date.getSeconds()).slice(-2);
    var StrMonthName = mnth;
    if (DwMname == "1")
      StrMonthName = this.TreeCharMonthscaption[date.getMonth()];
    var jointdate = [day, StrMonthName, date.getFullYear()].join(StrDateSign);
    if (IsStartDDorYYYY == "1")
      jointdate = [date.getFullYear(), StrMonthName, day].join(StrDateSign);
    var jointTime = [hr, min, sec].join(StrTimeSign);
    if (WithDateTime == "1")
      return jointdate + StrMidSign + jointTime;
    else
      return jointdate;
  }

  public static CUSTOM_DATE_FORMATSDDMMMYYYY: NgxMatDateFormats = {
    parse: {
      dateInput: 'l, LTS'
    },
    display: {
      dateInput: 'DD-MMM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    }
  };

  public static CUSTOM_DATE_FORMATSYYYYMMMDD: NgxMatDateFormats = {
    parse: {
      dateInput: 'l, LTS'
    },
    display: {
      dateInput: 'YYYY-MMM-DD',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    }
  };
  public static CUSTOM_DATE_FORMATSDDMMYYYYHHmmss: NgxMatDateFormats = {
    parse: {
      dateInput: 'l, LTS'
    },
    display: {
      dateInput: 'DD-MM-YYYY HH:mm:ss',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    }
  };
  public static CUSTOM_DATE_FORMATSDDMMMYYYYHHmmss: NgxMatDateFormats = {
    parse: {
      dateInput: 'l, LTS'
    },
    display: {
      dateInput: 'DD-MMM-YYYY HH:mm:ss',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    }
  };

  public static CUSTOM_DATE_FORMATSYYYYMMMDDHHmmss: NgxMatDateFormats = {
    parse: {
      dateInput: 'l, LTS'
    },
    display: {
      dateInput: 'YYYY-MMM-DD HH:mm:ss',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    }
  };

  public static exportAsExcelFileold(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFileold(excelBuffer, excelFileName);
  }

  private static saveAsExcelFileold(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public static exportAsExcelFile(json: any[], json1: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json1);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet, 'data1': worksheet1 }, SheetNames: ['data', 'data1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private static saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public static downloadFile(data: any, fileName: string) {
    const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], { type: 'text/csv' })
    fileSaver(blob, fileName + ".csv");
  }

  public static downloadFileerror(data: any, fileName: string) {
    const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    const header1 = Object.keys(data[0]);
    let csv1 = data.map((row: { [x: string]: any; }) => header1.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv1.unshift(header1.join(','));
    let csvArray1 = csv1.join('\r\n');

    console.log(csvArray);
    var blob = new Blob([csvArray, csvArray1], { type: 'text/csv' })
    fileSaver(blob, "myFile.csv");
  }
}
