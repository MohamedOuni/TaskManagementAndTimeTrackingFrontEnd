import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WeeklytimesheetComponent } from './weeklytimesheet.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: WeeklytimesheetComponent }
	])],
	exports: [RouterModule]
})
export class WeeklytimesheetRouting {
    
}