import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProjectService } from 'src/app/core/service/project.service';
import { StorageService } from 'src/app/core/service/storage.service';

@Component({
  templateUrl: './crud.component.html',
  providers: [MessageService]
})
export class CrudComponent implements OnInit {

  projectDialog: boolean = false;
  deleteProjectDialog: boolean = false;
  deleteProjectsDialog: boolean = false;
  projects: any[] = [];
  project: any = {};
  selectedProjects: any[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [10, 20, 30];

  constructor(private projectService: ProjectService, private messageService: MessageService, private storageService: StorageService) { }

  ngOnInit() {
    if (!this.project.id) {
      this.getProjects();
    }
  
    this.cols = [
      { field: 'id', header: 'Identifier' },
      { field: 'title', header: 'Title' },
      { field: 'createdDate', header: 'Date' }
    ];
  }

  getProjects() {
    const token = this.storageService.getToken();

    this.projectService.getProjectsForUser(token)
      .subscribe(
        response => {
          this.projects = response;
        },
        error => {
          console.log('Une erreur s\'est produite lors de la récupération des projets :', error);
        }
      );
  }

  openNew() {
    this.project = {};
    this.submitted = false;
    this.projectDialog = true;
  }

  deleteSelectedProjects() {
    this.deleteProjectsDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteProjectsDialog = false;

    const token = this.storageService.getToken();
    for (const selectedProject of this.selectedProjects) {
      this.projectService.deleteProject(selectedProject.id, token).subscribe(
        () => {
          this.getProjects();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la suppression du projet :', error);
        }
      );
    }

    this.selectedProjects = [];
  }

  editProject(project: any) {
    this.project = { ...project };
    this.projectDialog = true;
  }

  deleteProject(project: any) {
    this.deleteProjectDialog = true;
    this.project = { ...project };
  }

  confirmDelete() {
    this.deleteProjectDialog = false;
    const projectId = this.project.id;
    const token = this.storageService.getToken();

    this.projectService.deleteProject(projectId, token).subscribe(
      () => {
        this.getProjects();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression du projet :', error);
      }
    );
  }

  hideDialog() {
    this.projectDialog = false;
    this.submitted = false;
  }

  saveProject() {
    this.submitted = true;
  
    if (this.project.title) {
      const token = this.storageService.getToken();
  
      if (this.project.id) {
        delete this.project.createdDate;
  
        this.projectService.updateProject(this.project.id, this.project, token).subscribe(
          () => {
            this.getProjects();
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Projet mis à jour', life: 3000 });
          },
          (error: HttpErrorResponse) => {
            console.error('Une erreur s\'est produite lors de la mise à jour du projet :', error);
          }
        );
      } else {
        this.projectService.createProject(this.project, token).subscribe(
          () => {
            this.getProjects();
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Nouveau projet créé', life: 3000 });
          },
          (error: HttpErrorResponse) => {
            console.error('Une erreur s\'est produite lors de la création du projet :', error);
          }
        );
      }
  
      this.projectDialog = false;
      this.project = {};
    }
  }
  

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
