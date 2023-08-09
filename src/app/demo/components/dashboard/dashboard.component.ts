import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from 'src/app/core/service/task.service';
import { StorageService } from 'src/app/core/service/storage.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{

    
  tasks: Task[] = [];
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private taskService: TaskService, private storageService: StorageService,private router:Router) {}

  ngOnInit() {
  

    const token = this.storageService.getToken();

    if (!token) {
      console.error('Le jeton d\'authentification est manquant.');
      return;
    }

    this.taskService.getTasksForSupervispr(token).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des tâches :', error);
      }
    );
  }

formatWorkHours(workHours: number): string {
  const totalSeconds = Math.floor(workHours);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return ` ${hours}h ${minutes}m ${seconds}s`;
}


}