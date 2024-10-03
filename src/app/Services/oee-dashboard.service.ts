import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OeeDashboardService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }
  GetproductiondashboardFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "OeeDashboardAPIs/OeeDashboardFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  //pageload
  CheckUserHasPermissionForPageUrl(SessionToken: string, UserTypeId: string, UserName: string) {
    this.heroesUrl = this.apiURL + "OeeDashboardAPIs/CheckUserHasPermissionForPageUrl";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }  
  
  GetOeeDashboardDetailsDsByLevelId(SessionToken: string, UserTypeIdTemp: string, UserName: string, LevelId: string) {
    this.heroesUrl = this.apiURL + "OeeDashboardAPIs/GetOeeDashboardDetailsDsByLevelId?LevelId=" + LevelId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  getOeeDashboardDetailsListByLevelIdSliderSequence(SessionToken: string, UserTypeIdTemp: string, UserName: string, LevelId: string,Slider:string,SequenceID:string,TrendData:string,IsWithValidity:string) {
    this.heroesUrl = this.apiURL + "OeeDashboardAPIs/getOeeDashboardDetailsListByLevelIdSliderSequence?LevelId=" + LevelId+"&Slider="+Slider+"&SequenceID="+SequenceID+"&TrendData="+TrendData+"&IsWithValidity="+IsWithValidity;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  OEEDashboard_BarGraphsDsByLevelIdSliderSequence(SessionToken: string, UserTypeIdTemp: string, UserName: string, LevelId: string,Slider:string,SequenceID:string,TrendData:string,IsWithValidity:string) {
    this.heroesUrl = this.apiURL + "OeeDashboardAPIs/OEEDashboard_BarGraphsDsByLevelIdSliderSequence?LevelId=" + LevelId+"&Slider="+Slider+"&SequenceID="+SequenceID+"&TrendData="+TrendData+"&IsWithValidity="+IsWithValidity;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetPlanvsActualDetailsInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string, FromDate: string,Machine:string,SHIFT:string) {
    this.heroesUrl = this.apiURL + "OeeDashboardAPIs/GetPlanvsActualDetailsInfoList?FromDate=" + FromDate+"&Machine="+Machine+"&SHIFT="+SHIFT;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
}
