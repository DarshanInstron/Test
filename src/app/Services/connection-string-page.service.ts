import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalConstantsService } from './global-constants.service';

@Injectable({
  providedIn: 'root'
})

export class ConnectionStringPageService {
  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private _httpClient: HttpClient) { }

  UpdateConnectionString(ServerName: string, DbName: String, DbUserName: string, DbPassword: String) {
    this.heroesUrl = this.apiURL + "WebConfigChanges/UpdateConnectionStringInWebConfig?ServerName=" + ServerName + "&DbName=" + DbName + "&DbUserName=" + DbUserName + "&DbPassword=" + DbPassword;
    return this._httpClient.post(this.heroesUrl, {});
  }

  GetConnectionStringInfo(): Observable<string> {
    this.heroesUrl = this.apiURL + "WebConfigChanges/GetConnectionStringFromWebConfig";
    return this._httpClient.get<string>(this.heroesUrl);

  }
}