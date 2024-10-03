import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class TreeviewReorderService {

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  GettreeviewreorderFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "EmsDashboardAngApis/EmsDashboardFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  UpdateMultiLevelTreeViewByParametersnList(SessionToken: string, UserTypeIdTemp: string, UserName: string,ParentLevelId:string,objMultiLvlTreeviewInfoList:any) 
  {  
    this.heroesUrl = this.apiURL +"MultiLevelTreeview/UpdateMultiLevelTreeViewByParametersnList?ParentLevelId="+ParentLevelId+"&objMultiLvlTreeviewInfoList="+objMultiLvlTreeviewInfoList;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, objMultiLvlTreeviewInfoList, { headers: headers });
  }
}
