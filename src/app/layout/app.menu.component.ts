import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
          /*   {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            }, */
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
            
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Project',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Task',
                        icon: 'pi pi-fw pi-book',

                        items: [
                            {
                                label: 'New Task',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/pages/task']
                            },
                            {
                                label: 'My Task',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/pages/mytask']
                            },
                            {
                                label: 'WeeklyTimesheet',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/pages/weekly']
                            },
                        ]
                        
                    },
                ]
            },
          
        ];
    }
}
