import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/core/service/storage.service';
import { Project, TaskService } from 'src/app/core/service/task.service';

@Component({
  templateUrl: './task.component.html',
  providers: [MessageService]

})
export class TaskComponent implements OnInit {
  availableProjects: any[] = [];
  selectedProjectId: any;
  task: Task = new Task();
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private messageService: MessageService,private taskService: TaskService, private storageService: StorageService,private router:Router) {
  }

  ngOnInit() {

    const token = this.storageService.getToken();

    if (!token) {
      console.error('Le jeton d\'authentification est manquant.');
      return;
    }

    this.taskService.getProjectsForTeam(token).subscribe(
      (projects: Project[]) => {
        this.availableProjects = projects;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération des projets :', error);
      }
    );
  }


  onProjectSelectionChange(event: any) {
    this.selectedProjectId = event.value;
    console.log('Selected Project ID:', this.selectedProjectId);

  }

  onSubmit() {
    if (this.selectedProjectId === undefined || this.selectedProjectId === null) {
      console.log("Please select a project before submitting the form.");
      return;
    }
  
    const token = this.storageService.getToken();
  
    if (!token) {
      console.error('Le jeton d\'authentification est manquant.');
      return;
    }
  
    const currentUser = this.storageService.getUser();
  
    if (!currentUser || !currentUser.Team) {
      console.error('Impossible de récupérer les informations de l\'utilisateur actuel.');
      return;
    }
  
    this.task.projectId = this.selectedProjectId;
    this.taskService.createTask(this.task, this.selectedProjectId.id, token).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Task Created', life: 3000 })
        console.log('Tâche créée avec succès.');
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la création de la tâche :', error);
      }
    );
  }
}
export class Task {
  id!: number;
  title!: string;
  description!: string;
  workHours!: number;
  projectId!: number;
  isInProgress?: boolean;
  startTime?: number; 

}
