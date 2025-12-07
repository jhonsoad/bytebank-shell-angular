import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'bytebank-home-angular',
    loadComponent: () => {
      return loadRemoteModule('bytebank-home-angular', './Component').then((m) => m.AppComponent)
    }

  },
  {
    path: 'bytebank-dashboard-angular',
    loadComponent: () => {
      return loadRemoteModule('bytebank-dashboard-angular', './Component').then((m) => m.AppComponent)
    },
  }
];
