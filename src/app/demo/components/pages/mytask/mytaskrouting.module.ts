import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MytaskComponent } from './mytask.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: MytaskComponent }
	])],
	exports: [RouterModule]
})
export class MyTaskRouting {
    
}