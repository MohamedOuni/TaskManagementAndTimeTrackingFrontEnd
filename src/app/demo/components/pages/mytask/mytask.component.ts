import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StorageService } from 'src/app/core/service/storage.service';
import { TaskService } from 'src/app/core/service/task.service';

@Component({
  templateUrl: './mytask.component.html',
  providers: [MessageService]

})
export class MytaskComponent {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  timer: any;
  elapsedTime: number = 0;
  isLoggedIn = false;
  isLoginFailed = false;
  isDraggingOverTasks = false;
  isDraggingOverInProgress = false;
  originalInProgressIndex: number | null = null;

  constructor(private messageService: MessageService,private taskService: TaskService, private storageService: StorageService, private router: Router) {}

  ngOnInit() {
   /*  if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;  
      this.router.navigate(['/tasklist']);
    } else {
      this.router.navigate(['/login']);
    } */

    this.getTasks();
  }

  getTasks() {
    const token = this.storageService.getToken();

    if (!token) {
      console.error('The authentication token is missing.');
      return;
    }
    this.taskService.getTasksForCurrentUser(token).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('An error occurred while retrieving tasks:', error);
      }
    );
  }
  startTimer(task: Task) {
    if (this.selectedTask && this.selectedTask !== task) {
      this.endTimer(this.selectedTask); 
    }
    this.selectedTask = task;
    const startTime = Date.now();
    this.timer = setInterval(() => {
      const currentTime = Date.now();
      this.elapsedTime = Math.floor((currentTime - startTime) / 1000);
    });
  }
  endTimer(task: Task) {
    if (this.selectedTask === task) {
      clearInterval(this.timer);
      this.selectedTask = null;
      const hours = this.elapsedTime ;
      task.workHours = hours;
      this.elapsedTime = 0;

      const token = this.storageService.getToken();
      if (!token) {
        console.error('The authentication token is missing.');
        return;
      }

      this.taskService.updateTask(task.id, task, token).subscribe(
        () => {
          console.log('Task updated successfully.');
        },
        (error: any) => {
          console.error('An error occurred while updating the task:', error);
        }
      );
    }
  }

  deleteTask(task: Task) {
    const token = this.storageService.getToken();
    if (!token) {
      console.error('The authentication token is missing.');
      return;
    }

    this.taskService.deleteTask(task.id, token).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
        console.log('Task deleted successfully.');
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      },
      (error: any) => {
        console.error('An error occurred while deleting the task:', error);
      }
    );
  }
  onDragOver(event: any) {
    event.preventDefault();
  }

  onDragStart(event: any, task: Task, index: number) {
    event.dataTransfer.setData('text/plain', task.id.toString());
    if (task.isInProgress) {
      this.originalInProgressIndex = index; 
    }
  }

  onDragEnter(target: string) {
    if (target === 'inProgress') {
      this.isDraggingOverInProgress = true;
    }
  }

  onDragLeave(target: string) {
    if (target === 'inProgress') {
      this.isDraggingOverInProgress = false;
    }
  }

  onDrop(event: any, task: Task | null, index: number | null, target: string) {
    const taskId = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const draggedTask = this.tasks.find(t => t.id === taskId);

    if (draggedTask) {
      if (target === 'inProgress' && !draggedTask.isInProgress) {
        draggedTask.isInProgress = true;
        this.startTimer(draggedTask);
      } else if (target === 'tasks' && draggedTask.isInProgress) {
        draggedTask.isInProgress = false;
        this.endTimer(draggedTask);
      }

      if (target === 'tasks' && index === -1 && this.originalInProgressIndex !== null) {
        const newIndex = Math.min(Math.max(0, this.originalInProgressIndex), this.tasks.length);
        if (newIndex !== this.originalInProgressIndex) {
          this.tasks.splice(this.originalInProgressIndex, 1);
          this.tasks.splice(newIndex, 0, draggedTask);
          this.originalInProgressIndex = null;
        }
      }

      this.selectedTask = draggedTask; 
    }
  }

  getFormattedTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
export class Task {
  id!: number;
  title!: string;
  description!: string;
  workHours!: number;
  projectId!: number;
  timeSpentPerWeek?: any[]; 
  isInProgress?: boolean;
  startTime?: number; 

}