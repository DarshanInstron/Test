/*
    Author:	Nita
    Description: For KPI Setting
    LastUpdate:on 18-12-23 by nita 
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class KpiPageService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }
 
  GetkpinewdbstpageFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/kpinewdbstpageFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }
  
  GetkpisettingpageFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/kpisettingeFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }  
  
  getKpiBoxesSettingInfoList(SessionToken: string, UserTypeId: string, UserName: string, TableName: string) {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/GetKpiSettingTableRecordsListWithNewDbStructure?TableName="+TableName;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId.toString());
     return this._httpClient.get(this.heroesUrl, { headers: headers });
   }

  InsertUpdateKpiBoxesSettingInfo(SessionToken: string, UserTypeId: string, UserName: string,TableName: string, Id: number, HeaderFontSize: string, HeaderFontColor: string, ValueFontSize: string,
    BoxIconHeight: string, BoxIconWidth: string, BoxHeight: string, BoxWidth: string, BoxesPerPage: string, RefreshRate: string) {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/InsertUpdateKpiBoxesSettingInfo?TableName="+TableName+"&Id=" + Id + "&HeaderFontSize=" + HeaderFontSize + "&HeaderFontColor=" + HeaderFontColor
      + "&ValueFontSize=" + ValueFontSize + "&BoxIconHeight=" + BoxIconHeight + "&BoxIconWidth=" + BoxIconWidth + "&BoxHeight=" + BoxHeight + "&BoxWidth=" + BoxWidth + "&BoxesPerPage=" + BoxesPerPage
      + "&RefreshRate=" + RefreshRate;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetKPIBoxDetailsListBySPNew(SessionToken: string, UserTypeId: string, UserName: string, GatewayName: string, ObjectName: string) {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/GetKPIBoxDetailsListBySPNew?GatewayName=" + GatewayName + "&ObjectName=" + ObjectName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetLeftSideTreeDetailsListBySPNew(SessionToken: string, UserTypeId: string, UserName: string, TagNames: string) {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/GetLeftSideTreeDetailsListBySPNew?TagNames=" + TagNames;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetLeftSideTreeDetailsListBySP(SessionToken: string, UserTypeId: string, UserName: string) {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/GetLeftSideTreeDetailsListBySP";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetKPIBoxDetailsListBySP(SessionToken: string, UserTypeId: string, UserName: string, TempLevelId: string, TreeviewFrom: string, TreeviewTo: string) {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/GetKPIBoxDetailsListBySP?LevelId="+TempLevelId+"&TreeviewFrom="+TreeviewFrom+"&TreeviewTo="+TreeviewTo;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetKPIBoxDetailsListBySPnTagIds(SessionToken: string, UserTypeId: string, UserName: string, StrSelectedTagIds: string) {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/GetKPIBoxDetailsListBySPnTagIds?SelectedTagIds=" + StrSelectedTagIds;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetKPIBoxTagInfoByPlcNumbernTag(SessionToken: string, UserTypeId: string, UserName: string, TempPLCNumber: string, TagName: string) {
    this.heroesUrl = this.apiURL + "KpiApisForAngular/GetKPIBoxTagInfoByPlcNumbernTag?PLCNumber=" + TempPLCNumber + "&TagName=" + TagName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetMultiLevelTreeViewWithNewDbStructure(SessionToken: string, UserTypeId: string, UserName: string) {
    this.heroesUrl = this.apiURL + "MultiLevelTreeView/GetMultiLevelTreeViewWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  UGetMultiLevelTreeViewWithNewDbStructure(SessionToken: string, UserTypeId: string, UserName: string,WithParameters:string) {
    this.heroesUrl = this.apiURL + "MultiLevelTreeview/GetMultiLevelTreeViewWithNewDbStructure?WithParameters="+WithParameters;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  GetMultiLevelTreeViewByParametersnLevelLimit(SessionToken: string, UserTypeId: string, UserName: string,WithParameters:string,LevelUpTo:string,C001:string,C002:string,C003:string,C004:string,C005:string,C006:string,C007:string) {
    this.heroesUrl = this.apiURL + "MultiLevelTreeview/GetMultiLevelTreeViewByParametersnLevelLimit?WithParameters="+WithParameters+"&LevelUpTo="+LevelUpTo+"&C001="+C001+"&C002="+C002+"&C003="+C003+"&C004="+C004+"&C005="+C005+"&C006="+C006+"&C007="+C007;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }
  
  AddnUpdateMultiLevelTreeView(SessionToken: string, UserTypeId: string, UserName: string,C001_LevelId:string,C002_ParentLevelId:string,C003_LevelName:string,C004_LevelDescription:string,C005_Type:string) {
    this.heroesUrl = this.apiURL + "MultiLevelTreeview/AddnUpdateMultiLevelTreeView?C001_LevelId="+C001_LevelId+"&C002_ParentLevelId="+
    C002_ParentLevelId+"&C003_LevelName="+C003_LevelName+"&C004_LevelDescription="+C004_LevelDescription+"&C005_Type="+C005_Type;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

  DeleteAllTreeviewlevelsInfo(SessionToken: string, UserTypeId: string, UserName: string,TableName:string) {
    this.heroesUrl = this.apiURL + "MultiLevelTreeview/DeleteAllTreeviewlevelsInfo?TableName="+TableName;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  }

   // getKpiBoxesSettingInfoList(SessionToken: string, UserTypeId: string, UserName: string, UniqueId: string) {
  //   this.heroesUrl = this.apiURL + "KpiApisForAngular/getKpiBoxesSettingInfoList?UniqueId=" + UniqueId;
  //   let headers = new HttpHeaders();
  //   headers = headers.set('SessionToken', SessionToken);
  //   headers = headers.set('UserName', UserName);
  //   headers = headers.set('UserTypeId', UserTypeId.toString());
  //   return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  // }

  // UpdateKpiBoxesSettingInfo(SessionToken: string, UserTypeId: string, UserName: string, UniqueId: string, HeaderFontSize: string, HeaderFontColor: string, ValueFontSize: string,
  //   BoxIconHeight: string, BoxIconWidth: string, BoxHeight: string, BoxWidth: string, BoxesPerPage: string, RefreshRate: string) {
  //   this.heroesUrl = this.apiURL + "KpiApisForAngular/UpdateKpiBoxesSettingInfo?UniqueId=" + UniqueId + "&HeaderFontSize=" + HeaderFontSize + "&HeaderFontColor=" + HeaderFontColor
  //     + "&ValueFontSize=" + ValueFontSize + "&BoxIconHeight=" + BoxIconHeight + "&BoxIconWidth=" + BoxIconWidth + "&BoxHeight=" + BoxHeight + "&BoxWidth=" + BoxWidth + "&BoxesPerPage=" + BoxesPerPage
  //     + "&RefreshRate=" + RefreshRate;
  //   let headers = new HttpHeaders();
  //   headers = headers.set('SessionToken', SessionToken);
  //   headers = headers.set('UserName', UserName);
  //   headers = headers.set('UserTypeId', UserTypeId.toString());
  //   return this._httpClient.post(this.heroesUrl, "", { headers: headers });
  // }

}