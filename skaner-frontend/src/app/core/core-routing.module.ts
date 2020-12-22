import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'scanning',
    loadChildren: () => import('@/pages/scanning-page/scanning-page.module').then(m => m.ScanningPageModule),
  },
  {
    path: 'scans',
    loadChildren: () => import('@/pages/scans-page/scans-page.module').then(m => m.ScansPageModule),
  },
  {
    path: 'scan-details',
    loadChildren: () => import('@/pages/scan-details-page/scan-details-page.module').then(m => m.ScanDetailsPageModule),
  },
  {
    path: 'current-scan',
    loadChildren: () => import('@/pages/current-scan-page/current-scan-page.module').then(m => m.CurrentScanPageModule),
  },
  {
    path: '**',
    redirectTo: 'scans',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
