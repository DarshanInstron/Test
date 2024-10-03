import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


// mat modules start
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';



// mat modules end


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { FormsModule } from '@angular/forms';
import { ManualEntryComponent } from './manual-entry/manual-entry.component';
import { ManualentryPopupComponent } from './manualentry-popup/manualentry-popup.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatDatetimePickerModule,NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import { UserCredentialsComponent } from './user-credentials/user-credentials.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Treeleveladdupdate1Component } from './treeleveladdupdate1/treeleveladdupdate1.component';
import { CommonEntryComponent } from './common-entry/common-entry.component';
import { TrendSettingPageComponent } from './trend-setting-page/trend-setting-page.component';
import { KpiSettingPageComponent } from './kpi-setting-page/kpi-setting-page.component';
import { LossesEntryComponent } from './losses-entry/losses-entry.component';
import { StandardLossesEntryComponent } from './standard-losses-entry/standard-losses-entry.component';
import { LeftsidetreeviewwithlimitComponent } from './leftsidetreeviewwithlimit/leftsidetreeviewwithlimit.component';
import { KpitreeviewwithlimitComponent } from './kpitreeviewwithlimit/kpitreeviewwithlimit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonSettingComponent } from './common-setting/common-setting.component';
import { ProductEntryComponent } from './product-entry/product-entry.component';
import { ParameterSettingComponent } from './parameter-setting/parameter-setting.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TreeviewReorderComponent } from './treeview-reorder/treeview-reorder.component';
import { ProductionTvdashboardComponent } from './production-tvdashboard/production-tvdashboard.component';
import { PlanVsActualComponent } from './plan-vs-actual/plan-vs-actual.component';
import { ProductiondashboardComponent } from './productiondashboard/productiondashboard.component';
import { KpipageComponent } from './kpipage/kpipage.component';
import { TrendpageComponent } from './trendpage/trendpage.component';
import { MenuUpdateComponent } from './menu-update/menu-update.component';
import { MenuReorderComponent } from './menu-reorder/menu-reorder.component';
import { PasswordSettingComponent } from './password-setting/password-setting.component';
import { DragdropCustomComponent } from './dragdrop-custom/dragdrop-custom.component';
import { LeftsidetreeobjWlimitComponent } from './leftsidetreeobj-wlimit/leftsidetreeobj-wlimit.component';
import { FheaderComponent } from './fheader/fheader.component';
import { SideheaderComponent } from './sideheader/sideheader.component';
import { CustomReportComponent } from './custom-report/custom-report.component';
import { EMSDashboardComponent } from './ems-dashboard/ems-dashboard.component';
import { NewmeterComponent } from './newmeter/newmeter.component';



@NgModule({
  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LoaderComponent,
    ManualEntryComponent,
    ManualentryPopupComponent,
    MenuItemComponent,
    UserCredentialsComponent,
    Treeleveladdupdate1Component,
    CommonEntryComponent,
    TrendSettingPageComponent,
    KpiSettingPageComponent,
    LossesEntryComponent,
    StandardLossesEntryComponent,
    LeftsidetreeviewwithlimitComponent,
    KpitreeviewwithlimitComponent,
    CustomReportComponent,
    CommonSettingComponent,
    ProductEntryComponent,
    ParameterSettingComponent,
    TreeviewReorderComponent,
    ProductionTvdashboardComponent,
    PlanVsActualComponent,
    ProductiondashboardComponent,
    KpipageComponent,
    TrendpageComponent,
    MenuUpdateComponent,
    MenuReorderComponent,
    PasswordSettingComponent,
    DragdropCustomComponent,
    LeftsidetreeobjWlimitComponent,
    FheaderComponent,
    SideheaderComponent,
    EMSDashboardComponent,
    NewmeterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PasswordStrengthMeterModule.forRoot(),
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule ,
    NgxMatNativeDateModule,
    NgxMatColorPickerModule,
    NgxMatSelectSearchModule,
    MatSidenavModule,
    MatListModule,
    CanvasJSAngularStockChartsModule,

  // mat modules start
    MatExpansionModule,
    MatCheckboxModule, 
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatRadioModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    FontAwesomeModule,
    DragDropModule,
    MatBadgeModule,
    




    
  // mat modules end

  
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#7aa4d5",
      animationDuration: 300,
    }),
    TooltipModule.forRoot(),
    ColorPickerModule,
      MdbAccordionModule,
      MdbCarouselModule,
      MdbCheckboxModule,
      MdbCollapseModule,
      MdbDropdownModule,
      MdbFormsModule,
      MdbModalModule,
      MdbPopoverModule,
      MdbRadioModule,
      MdbRangeModule,
      MdbRippleModule,
      MdbScrollspyModule,
      MdbTabsModule,
      MdbTooltipModule,
      MdbValidationModule,
      FontAwesomeModule
  ],
  providers: [
    DatePipe ,{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
