import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalConstantsService } from 'src/app/Services/global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class WOMRealTimeTrendService {

  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  GetTestTypeInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/GetTestTypeInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetTestInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/GetTestInfoList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  CheckSOVStatusInfo(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/CheckSOVStatusInfo";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  CheckOKnOKStatusInfo(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/CheckOKnOKStatusInfo";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  InsertIntoG1M11InfoForWom(SessionToken: string, UserTypeIdTemp: string, UserName: string, Id: number, SO: string, AsslyPartNo: String, JobNo: string, TestType: number, Test: number, Torque: string, PressureSP: string,
    PSLLevel: string, Time1: string, Time2: string, Time3: string, Qty: string, IONo: string, PressureGuageIdNo: string, Description: string, TestedBy: string,
    VerifiedBy: string, WitnessedBy: string, PressureHysterisis: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/InsertIntoG1M11InfoForWom?Id=" + Id + "&SO=" + SO + "&AsslyPartNo=" + AsslyPartNo + "&JobNo=" + JobNo + "&TestType=" + TestType +
      "&Test=" + Test + "&Torque=" + Torque + "&PressureSP=" + PressureSP + "&PSLLevel=" + PSLLevel + "&Time1=" + Time1 + "&Time2=" + Time2 + "&Time3=" + Time3 + "&Qty=" + Qty + "&IONo=" + IONo +
      "&PressureGuageIdNo=" + PressureGuageIdNo + "&Description=" + Description + "&TestedBy=" + TestedBy + "&VerifiedBy=" + VerifiedBy + "&WitnessedBy=" + WitnessedBy +
      "&PressureHysterisis=" + PressureHysterisis;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  StartCycleTestProcedure(SessionToken: string, UserTypeIdTemp: string, UserName: string, ID: number) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/StartCycleTestProcedure&Id=" + ID + "&C1=1";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetPresuretestReportByTestTypeJobPdfStatus(SessionToken: string, UserTypeIdTemp: string, UserName: string, TestType: number = 0, Test: number = 0, JobNo: String = "", PdfStatus: String = "") {
    this.heroesUrl = this.apiURL + "PressureTestReport1364/GetPresuretestReportByTestTypeJobPdfStatus?TestType=" + TestType + "&Test=" + Test + "&JobNo=" + JobNo + "&PdfStatus=" + PdfStatus;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  StopCycleTestProcedure(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/StopCycleTestProcedure?C2=5";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetTrendParamInfoByParamIdsNew(SessionToken: string, UserTypeIdTemp: string, UserName: string, FromDateTime: string, ToDateTime: string, StrTrendParam: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/GetTrendParamInfoByParamIdsNew?FromDateTime=" + FromDateTime + "&ToDateTime=" + ToDateTime + "&ParameterIds=" + StrTrendParam;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  CycleTestProcedureDataLog(SessionToken: string, UserTypeIdTemp: string, UserName: string, Status: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/CycleTestProcedureDataLog?Status=" + Status;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetobjTbl_ScadaInfo(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/objTbl_ScadaInfo";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  ResetCycleTestProcedure(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/ResetCycleTestProcedure&C6=6";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetTbl_ScadaInfo(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/GetTbl_ScadaInfo";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetTrendParamInfoByParamIdsNew1(SessionToken: string, UserTypeIdTemp: string, UserName: string, FromDateTime: string, ToDateTime: string, StrTrendParam: string) {
    this.heroesUrl = this.apiURL + "TrendAndAPIs/GetTrendPARAMInfoByParamIdsNew1?FromDateTime=" + FromDateTime + "&ToDateTime=" + ToDateTime + "&ParameterIds=" + StrTrendParam;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetobjG1M11_B1Info(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/objG1M11_B1InfoNew";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  ResetTblScadaAllData(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/ResetTblScadaAllData?C6=8";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetWOMRealTimeTrendPage(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "HomeScreen1364/WOMRealTimeTrendPage";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
}