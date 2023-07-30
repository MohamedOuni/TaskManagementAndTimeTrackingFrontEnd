import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { MytaskComponent } from './mytask/mytask.component';
import { WeeklytimesheetComponent } from './weeklytimesheet/weeklytimesheet.component';
import { MonthlytimesheetComponent } from './monthlytimesheet/monthlytimesheet.component';

@NgModule({
    declarations: [
      
           MonthlytimesheetComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }
