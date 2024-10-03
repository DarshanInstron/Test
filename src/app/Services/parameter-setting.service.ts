import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ParameterSettingService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;
  constructor(private _httpClient: HttpClient) { }

  GetParameterSettingFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "ParamSettingAngApis/ParameterSettingFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  GetParameterSettingInfoList(SessionToken: string, UserTypeId: string, UserName: string) {
   this.heroesUrl = this.apiURL + "ParamSettingAngApis/GetParameterSettingDetailsList";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl,'', { headers: headers });
  }


  InsertUpdateParameterSettingInfo(SessionToken: string, UserTypeId: string, UserName: string,TableName: string,  Id: number, Pname: string, LevelIdC: string, UId: string, 
    Image: string, DecPlace: string, UserMgmt: string, Ugr: string, Pcolor: string, LevelIdA: string,  LevelIdB: string,  Cost: string, Unit: string, IconClass: string, 
    ToTUnit: string, VOrder: string, ParameterNo: string, DlyTmLwAlm: string, LwAlmSP: string, DlyTmHighAlm: string, HighAlmSP: string, RawMin: string, RawMax: string,
    EnggMin: string, EnggMax: string, EnAlmofLhwo: string, Lvalue: string, Hvalue: string, Wovalue: string, TotaliseFactor: string, Ptrend: string,EnAlmofLhwoIds:string,formData:any) {
    this.heroesUrl = this.apiURL + "ParamSettingAngApis/SaveUpdateParameterSettingDetails?TableName="+TableName+"&Id=" + Id + "&Pname=" + Pname +"&LevelIdC=" + LevelIdC + 
    "&UId=" + UId + "&Image=" + Image + "&DecPlace=" + DecPlace + "&UserMgmt=" + UserMgmt + "&Ugr=" + Ugr + "&Pcolor=" + Pcolor+ "&LevelIdA=" + LevelIdA + "&LevelIdB=" + 
    LevelIdB + "&Cost=" + Cost + "&Unit=" + Unit+ "&IconClass=" + IconClass+"&ToTUnit=" +ToTUnit+"&VOrder="+VOrder+"&ParameterNo="+ParameterNo+"&DlyTmLwAlm="+DlyTmLwAlm+
    "&LwAlmSP="+LwAlmSP+"&DlyTmHighAlm="+DlyTmHighAlm+"&HighAlmSP="+HighAlmSP+"&RawMin="+RawMin+"&RawMax="+RawMax+"&EnggMin="+EnggMin+"&EnggMax="+EnggMax+"&EnAlmofLhwo="+
    EnAlmofLhwo +"&Lvalue="+Lvalue+"&Hvalue="+Hvalue+"&Wovalue="+Wovalue+"&TotaliseFactor="+TotaliseFactor+"&Ptrend="+Ptrend+"&EnAlmofLhwoIds="+EnAlmofLhwoIds;

    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, formData, { headers: headers });
  }

  RemoveImageFromParameterSetting(SessionToken: string, UserTypeId: string, UserName: string,Id:string) {
    this.heroesUrl = this.apiURL + "ParamSettingAngApis/RemoveImageFromParameterSetting?Id="+Id;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId.toString());
     return this._httpClient.post(this.heroesUrl,'', { headers: headers });
   }
}
