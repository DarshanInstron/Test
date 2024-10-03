import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class AlarmCountPnlPopupService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;
  constructor(private _httpClient: HttpClient) { }

  // GetAlarmDetailsInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string): Observable<string> {
  //   this.heroesUrl = this.apiURL + "AlarmDetails/GetAlarmGridViewInfoList";
  //   let headers = new HttpHeaders();
  //   headers = headers.set('SessionToken', SessionToken);
  //   headers = headers.set('UserName', UserName);
  //   headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
  //   return this._httpClient.post<string>(this.heroesUrl, '', { headers: headers });     
  // }

  GetAlarmCountInfo(SessionToken: string, UserTypeIdTemp: string, UserName: string, flag:string, flag1:string) {
    this.heroesUrl = this.apiURL + "AlarmAndAPIs/GetAlarmListInfo?FLAG="+flag+"&FLAG1=" + flag1;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, '', { headers: headers });
  }

}