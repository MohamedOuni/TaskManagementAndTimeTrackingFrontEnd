import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'task', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
        { path: 'mytask', loadChildren: () => import('./mytask/mytask.module').then(m => m.MyTaskModule) },
        { path: 'weekly', loadChildren: () => import('./weeklytimesheet/weeklytimesheet.module').then(m => m.WeeklyTimesheetModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
