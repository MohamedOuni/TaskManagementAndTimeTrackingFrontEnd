import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/service/storage.service';
import { TaskService } from 'src/app/core/service/task.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  templateUrl: './monthlytimesheet.component.html',
})
export class MonthlytimesheetComponent {

  selectedDate!: string;
  selectedMonthTasks: any[] = [];

  constructor(private taskService: TaskService, private storageService: StorageService) { }

  getTasksForSelectedMonth() {
    const token = this.storageService.getToken();
    const date = new Date(this.selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
  
    this.taskService.getTasksWithTimeForMonth(year, month, token).pipe(
      catchError((error) => {
        console.error('Error fetching tasks for the selected month:', error);
        this.selectedMonthTasks = [];
        return of([]);
      })
    ).subscribe((response: any) => { // Ajoutez ici le type spécifique pour "response"
      console.log('API Response:', response);
  
      this.selectedMonthTasks = Object.keys(response).map(taskId => ({
        currentDate: response[taskId].currentDate,
        title: response[taskId].title,
        description: response[taskId].description,
        workHours: response[taskId].workHours,
        projectName: response[taskId].projectName,
        userName: response[taskId].userName

      }));
    });
  }

  exportMonthlyReport() {
    const token = this.storageService.getToken();
    const date = new Date(this.selectedDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    this.taskService.exportMonthlyReport(year, month, token).subscribe(response => {
      this.downloadFile(response);
    });
  }

  downloadFile(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monthly_report_${this.selectedDate}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
