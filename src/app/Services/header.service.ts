
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { HttpHeaders } from "@angular/common/http";
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {
  myform!: FormGroup;

  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  GetUserHasPermissionForMenuList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "MenuAPI/GetUserHasPermissionForMenuListWithNewDbStructureForHeader";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });

  }
  GetMenuInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string, ParentId: string) {
    this.heroesUrl = this.apiURL + "MenuAPI/GetUserHasPermissionForMenuListWithNewDbStructure?ParentId=" + ParentId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });

  }

  GetAlarmDetailsInfoList(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "AlarmDetails/getAlarmnCountInfo";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  getChildMenuInfoListByParentId(SessionToken: string, UserTypeIdTemp: string, UserName: string, ParentMenuId: string) {
    this.heroesUrl = this.apiURL + "Menu/getChildMenuInfoListByParentId?ParentMenuId=" + ParentMenuId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  GetAllPagesList(SessionToken: string, UserTypeIdTemp: string, UserName: string){
    this.heroesUrl = this.apiURL + "MenuAPI/AllPagesListForDropdown"
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  
  AddnUpdateMenuDetails(SessionToken: string, UserTypeId: string, UserName: string,MenuId:string,ParentMenuId:string,Title:string,DescriptionName:string,Url:string,AlertToId:string,IsCustomMenu:string,VOrder:string) {
    this.heroesUrl = this.apiURL + "MenuAPI/AddnUpdateMenuViewLevel?MenuId="+MenuId+"&ParentMenuId="+
    ParentMenuId+"&Title="+Title+"&DescriptionName="+DescriptionName+"&Url="+Url+"&AlertToId="+AlertToId+"&IsCustomMenu="+IsCustomMenu+"&VOrder="+VOrder;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  DeleteMenuViewlevelsInfo(SessionToken: string, UserTypeId: string, UserName: string,TableName:string,MenuId:string){
    this.heroesUrl = this.apiURL + "MenuAPI/DeleteMenuViewlevelsInfo?TableName="+TableName + "&MenuId="+MenuId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  GetUserHasPermissionForMenuUpdate(SessionToken: string, UserTypeIdTemp: string, UserName: string) {
    this.heroesUrl = this.apiURL + "MenuAPI/MenuUpdateFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }
  UpdateMenuViewByParametersnList(SessionToken: string, UserTypeIdTemp: string, UserName: string,ParentLevelId:string,objMultiLvlTreeviewInfoList:any) 
  {  
    this.heroesUrl = this.apiURL +"MenuAPI/UpdateMenuViewByParametersnList?ParentLevelId="+ParentLevelId+"&objMultiLvlTreeviewInfoList="+objMultiLvlTreeviewInfoList;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, objMultiLvlTreeviewInfoList, { headers: headers });
  }
  GetMenuViewreorderFormPage(SessionToken: string, UserTypeIdTemp: string, UserName: string){
    this.heroesUrl = this.apiURL + "MenuAPI/MenuReorderFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
 }
}