import { Injectable } from '@angular/core';
import { GlobalConstantsService } from './global-constants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManualEntryService {
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }
  GetManualEntryFormPage(SessionToken:string,UserTypeIdTemp:string,UserName:string)
  {
    this.heroesUrl = this.apiURL + "ProductionEntryAngAPIs/ManualEntryFormPageWithNewDbStructure";
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeIdTemp.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
  }

  getManualEntryDropdowns(SessionToken: string, UserTypeId: string, UserName: string, ParentId: string,TrViewTypeC005:string) {
    this.heroesUrl = this.apiURL + "MultiLevelTreeview/GetMultiLevelTreeViewWithNewDbStructureByParentId?ParentId="+ParentId+"&TrViewTypeC005="+TrViewTypeC005;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId.toString());
     return this._httpClient.post(this.heroesUrl,'', { headers: headers });
   }

   getOperator(SessionToken: string, UserTypeId: string, UserName: string, tableName: string,DesignationId:string) {
    this.heroesUrl = this.apiURL + "ProductionEntryAngAPIs/getUserNameListByDesignationId?TableName="+tableName+"&DesignationId="+DesignationId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
   }
   getManualEntryTableData(SessionToken: string, UserTypeId: string, UserName: string, FromDate:string,UniqueId: string, Shift:string) {
    this.heroesUrl = this.apiURL + "ProductionEntryAngAPIs/getTableRecordsListWithNewDbStructure?FRMDATE="+FromDate+"&UniqueId=" + UniqueId + "&SHIFT=" + Shift;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId.toString());
     return this._httpClient.post(this.heroesUrl,'', { headers: headers });
   }

   getOperatorIncharge(SessionToken: string, UserTypeId: string, UserName: string, TableName: string, DesignationId: string) {
    this.heroesUrl = this.apiURL + "ProductionEntryAngAPIs/getUserNameListByDesignationId?TableName="+TableName+"&DesignationId="+DesignationId;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId.toString());
    return this._httpClient.get(this.heroesUrl, { headers: headers });
   }

   getAPQSummeryList(SessionToken: string, UserTypeId: string, UserName: string, FromDate: string, Machine: string, Shift: string, MonthStart: string, Tot: string) {
    this.heroesUrl = this.apiURL + "ProductionEntryAngAPIs/getAPQSummaryListWithNewDbStructure?FromDate="+FromDate+"&Machine="+Machine+"&Shift="+Shift+"&MonthStart="+MonthStart+"&Tot="+Tot;
    let headers = new HttpHeaders();
    headers = headers.set('SessionToken', SessionToken);
    headers = headers.set('UserName', UserName);
    headers = headers.set('UserTypeId', UserTypeId);
    return this._httpClient.get(this.heroesUrl, { headers: headers });
   }
   SP_UpdateProductionEntry_DevForList(SessionToken: string, UserTypeId: string, UserName: string,LevelId:string,OperatorIds:any, InchargeIds:string, objManualEntryTableData: any) {
    this.heroesUrl = this.apiURL + "ProductionEntryAngAPIs/SP_UpdateProductionEntry_DevForList?LevelId="+LevelId+"&OperatorIds="+OperatorIds+"&InchargeIds="+InchargeIds;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId);
     return this._httpClient.post(this.heroesUrl,objManualEntryTableData, { headers: headers });
   }
   SP_UpdateProductionEntry_Dev(SessionToken: string, UserTypeId: string, UserName: string,LevelId:string,OperatorIds:string, InchargeIds:string, objManualEntryTableData: any) {
    this.heroesUrl = this.apiURL + "ProductionEntryAngAPIs/SP_UpdateProductionEntry_Dev?LevelId="+LevelId+"&OperatorIds="+OperatorIds+"&InchargeIds="+InchargeIds;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId);
     return this._httpClient.post(this.heroesUrl,objManualEntryTableData, { headers: headers });
   }
   getManualEntryDropdownsAccParentId(SessionToken: string, UserTypeId: string, UserName: string, ParentId: string) {
    this.heroesUrl = this.apiURL + "MenuAPI/GetMenuViewWithNewDbStructureByParentId?ParentId="+ParentId;
     let headers = new HttpHeaders();
     headers = headers.set('SessionToken', SessionToken);
     headers = headers.set('UserName', UserName);
     headers = headers.set('UserTypeId', UserTypeId.toString());
     return this._httpClient.post(this.heroesUrl,'', { headers: headers });
   }
}
