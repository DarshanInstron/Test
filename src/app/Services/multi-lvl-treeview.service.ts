import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MultiLvlTreeviewService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }
  
  getAll_MachineAbc_ListByTreeviewType(SessionToken: string, UserTypeIdTemp: string, UserName: string, TreeviewType: string) {
    this.heroesUrl = this.apiURL + "MultiLevelTreeview/getAll_MachineAbc_ListByTreeviewType?TreeviewType=" + TreeviewType;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
}
