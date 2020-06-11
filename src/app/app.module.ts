import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { routes } from './routes/routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import {JpImagePreloadModule} from '@jaspero/ng-image-preload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { ClickOutsideModule } from 'ng-click-outside';
import { InPlaceEditorModule } from '@syncfusion/ej2-angular-inplace-editor';
import { RocketEditModule } from 'rocket-edit';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { DataserviceService } from './services/dataservice.service';

import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header.component';
import { BotonestabComponent } from './components/botonestab.component';
import { FooterComponent } from './components/footer.component';
import { HomeComponent } from './pages/home.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { DetalleComponent } from './pages/detalle.component';

registerLocaleData(localeEs, 'es');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




@NgModule({
  declarations: [
    BotonestabComponent,
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdministracionComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    RocketEditModule,
    ClickOutsideModule,
    MatTabsModule,
    InPlaceEditorModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    JpImagePreloadModule.forRoot(),
    MatSortModule,
   
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgxDatatableModule,
    CKEditorModule,
    NgbModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DataserviceService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
