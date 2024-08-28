import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RegisterComponent } from './register/register.component';
// Angular Material imports
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { DemandesUserComponent } from './demandes-user/demandes-user.component';
import { EnginPhotosComponent } from './engin-photos/engin-photos.component';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutComponent } from './demandeur/layout/layout.component';
import { LayoutDemandeComponent } from './demandeur/layout-demande/layout-demande.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router'; 
import { NgConfirmModule } from 'ng-confirm-box';
import { NgToastModule } from 'ng-angular-popup';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import nécessaire pour les animations
import { MatMenuModule } from '@angular/material/menu';
import { SubmitRequestComponent } from './demandeur/submit-request/submit-request.component';
import { TotalDemandesComponent } from './total-demandes/total-demandes.component';
import { ListDemandeComponent } from './assistant/list-demande/list-demande.component';
import { ChangeDateDialogComponent } from './change-date-dialog/change-date-dialog.component';
import { ControleEnginsComponent } from './controle-engins/controle-engins.component';
import { DemandeDetailsComponent } from './demande-details/demande-details.component';
import { RequestFormComponent } from './request-form/request-form.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavComponent,
    RegisterComponent,
    HomeComponent,
    DemandesUserComponent,
    EnginPhotosComponent,
    LayoutComponent,
    LayoutDemandeComponent,
    SubmitRequestComponent,
    TotalDemandesComponent,
    ListDemandeComponent,
    ChangeDateDialogComponent,
    ControleEnginsComponent,
    DemandeDetailsComponent,
    RequestFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    NgToastModule,
    NgConfirmModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSortModule ,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    RouterModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [
    provideClientHydration(),
    //provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
