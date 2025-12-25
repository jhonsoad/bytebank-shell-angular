import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => {
      return loadRemoteModule('bytebank-home-angular', './Component').then((m) => m.AppComponent)
    }
  },
  // {
  //   path: 'bytebank', // O prefixo na URL da Shell
  //   loadChildren: () =>
  //     loadRemoteModule('bytebank-home-angular', './routes')
  //       .then((m) => m.routes)
  // },
  {
    path: 'dashboard',
    loadComponent: () => {
      return loadRemoteModule('bytebank-dashboard-angular', './Component').then((m) => m.AppComponent)
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
