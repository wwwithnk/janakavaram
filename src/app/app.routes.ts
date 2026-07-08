import { Routes } from '@angular/router';
import { TotalComponent } from './components/total/total.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TotalCardsComponent } from './components/total-cards/total-cards.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'total', component: TotalComponent },
  { path: 'tc', component: TotalCardsComponent },
];
