import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/service/storage.service';
import { TaskService } from 'src/app/core/service/task.service';

@Component({
  templateUrl: './weeklytimesheet.component.html',
})
export class WeeklytimesheetComponent {
  selectedWeek!: number;
  weeks: number[] = [];

  constructor(private taskService: TaskService, private storageService: StorageService) { }

  ngOnInit() {
    this.generateWeeksList();
  }
  onWeekSelectionChange(event: any) {
    this.selectedWeek = event.value;
    console.log('Selected Week:', this.selectedWeek);
  }
 
  getCurrentWeek(): string {
    const currentDate = new Date();
    const currentWeekNumber = this.getISOWeek(currentDate);
    return `Week ${currentWeekNumber}`;
  }

 
  getCurrentDate(): string {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
  }

  /* getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }
 */

  generateWeeksList() {

    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31); 

    const startWeek = this.getISOWeek(startDate);
    const endWeek = this.getISOWeek(endDate);

    for (let week = startWeek; week <= endWeek; week++) {
      this.weeks.push(week);
    }
  }

  getISOWeek(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const timeDiff = date.getTime() - startOfYear.getTime();
    const daysSinceStart = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const weekNumber = Math.ceil((daysSinceStart + startOfYear.getDay() + 1) / 7);

    return weekNumber;
  }

  exportWeeklyReport() {
    const token = this.storageService.getToken();
    const weekNumber = this.selectedWeek;
    this.taskService.exportWeeklyReport(weekNumber, token).subscribe(response => {
      this.downloadFile(response);
    });
  }

  downloadFile(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weekly_report_${this.selectedWeek}.xlsx`; 
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
