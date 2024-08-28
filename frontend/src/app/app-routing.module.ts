import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './demandeur/layout/layout.component';
import { LayoutDemandeComponent } from './demandeur/layout-demande/layout-demande.component';
import { TotalDemandesComponent } from './total-demandes/total-demandes.component';
import { ListDemandeComponent } from './assistant/list-demande/list-demande.component';
import { ControleEnginsComponent } from './controle-engins/controle-engins.component';
import { DemandeDetailsComponent } from './demande-details/demande-details.component';
import { RequestFormComponent } from './request-form/request-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers une page d'accueil par défaut
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'layout', component: LayoutComponent},
  { path: 'layout-demande', component: LayoutDemandeComponent},
  { path: 'total-demandes', component: TotalDemandesComponent},
  { path: 'list-demande', component: ListDemandeComponent},
  { path: 'controle-engins', component: ControleEnginsComponent},
  { path: 'demande-details', component: DemandeDetailsComponent},
  { path: 'demande/:id', component: DemandeDetailsComponent},
  { path: 'request-form', component: RequestFormComponent},
  { path: 'demande/:id', component: ControleEnginsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
