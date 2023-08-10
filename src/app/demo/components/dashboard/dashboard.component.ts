import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/core/service/storage.service';
import { Task, TaskService } from 'src/app/core/service/task.service';


@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  userWorkHoursData: any;
  userWorkHoursOptions: any;
  mostWorkedUser!: User;
    subscription!: Subscription;
    projectWorkHoursData: any;
projectWorkHoursOptions: any;
mostWorkedProject!: Project;

  constructor(private taskService: TaskService, private storageService : StorageService) {}

  ngOnInit() {
    this.initCharts();
    this.loadMostWorkedUser();
    this.initProjectChart();
       this.loadMostWorkedProject();
  }
  
  initCharts() {
    var token = this.storageService.getToken();
    this.taskService.getUserWorkHoursStats(token).subscribe(
      (userStats: any) => {
        const userNames = Object.keys(userStats);
        const userWorkHours = Object.values(userStats);
        const backgroundColors = this.generateUniqueColors(userNames.length);
        this.userWorkHoursData = {
          labels: userNames,
          datasets: [
            {
              data: userWorkHours,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: backgroundColors
            }
          ]
        };
  
        this.userWorkHoursOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const label = userNames[context.dataIndex];
                  const value = userWorkHours[context.dataIndex];
                  return `${label}: ${value} seconds`;
                }
              }
            }
          }
        };
      },
      (error) => {
        console.error('An error occurred while retrieving user statistics:', error);
      }
    );
  }
  
  generateUniqueColors(count: number): string[] {
    const colors = [];

    for (let i = 0; i < count; i++) {
      const hue = (i * 137.508) % 360; 
      const color = `hsl(${hue}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  }

  
  loadMostWorkedUser() {
    const token =  this.storageService.getToken();

    this.taskService.getMostWorkedUser(token).subscribe(
      (user: User) => {
        this.mostWorkedUser = user; 
      },
      (error) => {
        console.error('An error occurred while retrieving user statistics:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  initProjectChart() {
    var token = this.storageService.getToken();
    this.taskService.getProjectWorkHoursStats(token).subscribe(
      (projectStats: any) => {
        const projectTitles = Object.keys(projectStats);
        const projectWorkHours = Object.values(projectStats);
        const backgroundColors = this.generateUniqueColors(projectTitles.length);
        
        this.projectWorkHoursData = {
          labels: projectTitles,
          datasets: [
            {
              data: projectWorkHours,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: backgroundColors
            }
          ]
        };
  
        this.projectWorkHoursOptions = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (context: any) => {
                  const label = projectTitles[context.dataIndex];
                  const value = projectWorkHours[context.dataIndex];
                  return `${label}: ${value} seconds`;
                }
              }
            }
          }
        };
      },
      (error) => {
        console.error('An error occurred while fetching project statistics:', error);
      }
    );
  }
  
  
  
  

  loadMostWorkedProject() {
    const token = this.storageService.getToken();

    this.taskService.getProjectWithMostWorkedTime(token).subscribe(
      (project: Project) => {
        this.mostWorkedProject = project;
      },
      (error) => {
        console.error('Erreur lors de la récupération du projet ayant le plus de temps de travail :', error);
      }
    );
  }
}

export class Project {
  id!: number;
  title!: string;
  createdDate!: string;
}

export class User {
  id!: number;
  userName!: string;
}