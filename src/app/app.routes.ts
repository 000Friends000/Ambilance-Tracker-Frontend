import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CaseComponent } from './cases/case.component';
import { SettingsComponent } from './settings/settings.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cases', component: CaseComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'pages', component: PagesComponent },
];
