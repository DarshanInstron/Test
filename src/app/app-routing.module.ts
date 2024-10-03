import { NgModule, Component,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ManualEntryComponent } from './manual-entry/manual-entry.component';
import { ManualentryPopupComponent } from './manualentry-popup/manualentry-popup.component';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { UserCredentialsComponent } from './user-credentials/user-credentials.component';
import { Treeleveladdupdate1Component } from './treeleveladdupdate1/treeleveladdupdate1.component';
import { CommonEntryComponent } from './common-entry/common-entry.component';
import { TrendSettingPageComponent } from './trend-setting-page/trend-setting-page.component';
import { KpiSettingPageComponent } from './kpi-setting-page/kpi-setting-page.component';
import { LossesEntryComponent } from './losses-entry/losses-entry.component';
import { StandardLossesEntryComponent } from './standard-losses-entry/standard-losses-entry.component';

import { CustomReportComponent } from './custom-report/custom-report.component';
import { CommonSettingComponent } from './common-setting/common-setting.component';
import { ProductEntryComponent } from './product-entry/product-entry.component';
import { ParameterSettingComponent } from './parameter-setting/parameter-setting.component';
import { TreeviewReorderComponent } from './treeview-reorder/treeview-reorder.component';
import { ProductionTvdashboardComponent } from './production-tvdashboard/production-tvdashboard.component';
import { PlanVsActualComponent } from './plan-vs-actual/plan-vs-actual.component';
import { ProductiondashboardComponent } from './productiondashboard/productiondashboard.component';
import { TrendpageComponent } from './trendpage/trendpage.component';
import { KpipageComponent } from './kpipage/kpipage.component';
import { MenuUpdateComponent } from './menu-update/menu-update.component';
import { MenuReorderComponent } from './menu-reorder/menu-reorder.component';
import { PasswordSettingComponent } from './password-setting/password-setting.component';
import { DragdropCustomComponent} from './dragdrop-custom/dragdrop-custom.component';
import { EMSDashboardComponent } from './ems-dashboard/ems-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'header',
    component: HeaderComponent
  },
  {
    path:'footer',
    component: FooterComponent
  },
  {
    path:'dashboard1',
    component: ProductiondashboardComponent
  },
  {
    path:'dashboardnew',
    component: ProductiondashboardComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'userdefination',
    component: UserCredentialsComponent
  },
  {
    path:'manualentry',
    component: ManualEntryComponent
  },
  {
    path:'manualentrypopup',
    component: ManualentryPopupComponent
  },
  {
    path: 'kpipage',
    component: KpipageComponent
  },
  {
    path: 'trendpage',
    component: TrendpageComponent
  },
  {
    path: 'loader',
    component: LoaderComponent
  },
  {
    path: 'treeleveladdupdate1',
    component: Treeleveladdupdate1Component
  },
  {
    path: 'commonentry',
    component:CommonEntryComponent
  },
  {
    path: 'kpisetting',
    component:KpiSettingPageComponent
  },
  {
    path: 'trendsetting',
    component:TrendSettingPageComponent
  },
  {
    path: 'lossesentry',
    component:LossesEntryComponent
  },
  {
    path: 'standardlossesentry',
    component:StandardLossesEntryComponent
  },
  {
    path:'customreport',
    component: CustomReportComponent
  },
  {
    path: 'commonsetting',
    component : CommonSettingComponent,
  }
  ,
  {
    path: 'productentry',
    component : ProductEntryComponent,
  },
  {
    path: 'parametersetting',
    component  : ParameterSettingComponent
  },
  {
    path: 'treeviewreorder',
    component : TreeviewReorderComponent
  },
  {
    path: 'dashboard',
    component : ProductionTvdashboardComponent
  },
  {
    path: 'planvsactual',
    component : PlanVsActualComponent
  },
  {
    path: 'menuupdate',
    component : MenuUpdateComponent
  },
  {
    path: 'menureorder',
    component : MenuReorderComponent
  }, 
  {
    path: 'passwordsetting',
    component : PasswordSettingComponent
  },
  {
    path:'dragdropcustom',
    component :DragdropCustomComponent
  },
  {
    path:'emsdashboard',
    component :EMSDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), CommonModule],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppRoutingModule { }
