import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ContentAreaComponent } from './layout/content-area/content-area.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalExceptionService } from './common/global-exception.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorDialogueComponent } from './common/error-dialogue/error-dialogue.component';
import { VolunteeringRegistrationComponent } from './components/volunteering-registration/volunteering-registration.component';
import { FundRaisingComponent } from './components/fund-raising/fund-raising.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    ContentAreaComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ErrorDialogueComponent,
    VolunteeringRegistrationComponent,
    FundRaisingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalExceptionService }],
  // entryComponents: [ErrorDialogueComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
