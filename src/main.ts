import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { LicenseManager } from 'ag-grid-enterprise'

LicenseManager.setLicenseKey("CompanyName=Sapori di Toscana SpA,LicensedGroup=DXEBYTP,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-012654,ExpiryDate=18_January_2022_[v2]_MTY0MjQ2NDAwMDAwMA==a7a48fad796e3e59f145742b0e3d0531");


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
