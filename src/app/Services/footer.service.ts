import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  GetGatewayNoInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string):Observable<string>
  {
    this.heroesUrl = this.apiURL + "GetwayAndAPIs/getGatewayStatusInfoList";   
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post<string>(this.heroesUrl, '', { headers: headers });
  }

  GetAlarmDetailsInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string)
  {
    this.heroesUrl = this.apiURL + "AlarmDetails/getAlarmLastUpdatedDateInfo";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post<string>(this.heroesUrl, '', { headers: headers });
  }

}