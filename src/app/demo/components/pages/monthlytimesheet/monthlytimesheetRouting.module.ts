import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonthlytimesheetComponent } from './monthlytimesheet.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MonthlytimesheetComponent }
	])],
	exports: [RouterModule]
})
export class MonthlytimesheetRouting {
    
}