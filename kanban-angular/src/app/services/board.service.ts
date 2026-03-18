import { Injectable, signal } from '@angular/core';
import { Column, Task, TaskStatus } from '../models/task';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private columns = signal<Column[]>([
    {
      id: 'todo',
      title: '📋 À faire',
      color: 'indigo',
      tasks: [
        {
          id: '1',
          title: 'Setup projet',
          status: 'todo',
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Créer les composants',
          status: 'todo',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 'in-progress',
      title: '⚙️ En cours',
      color: 'amber',
      tasks: [
        {
          id: '3',
          title: 'Intégrer Tailwind',
          status: 'in-progress',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 'done',
      title: '✅ Terminé',
      color: 'emerald',
      tasks: [
        {
          id: '4',
          title: 'Initialiser Angular',
          status: 'done',
          createdAt: new Date(),
        },
      ],
    },
  ]);

  getColumns() {
    return this.columns;
  }

  moveTask(taskId: string, fromStatus: TaskStatus, toStatus: TaskStatus) {
    this.columns.update((cols) => {
      const from = cols.find((c) => c.id === fromStatus)!;
      const to = cols.find((c) => c.id === toStatus)!;
      const task = from.tasks.find((t) => t.id === taskId)!;
      from.tasks = from.tasks.filter((t) => t.id !== taskId);
      task.status = toStatus;
      to.tasks = [...to.tasks, task];
      return [...cols];
    });
  }

  addTask(title: string, status: TaskStatus = 'todo') {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      status,
      createdAt: new Date(),
    };
    this.columns.update((cols) => {
      cols.find((c) => c.id === status)!.tasks.push(task);
      return [...cols];
    });
  }

  deleteTask(taskId: string, status: TaskStatus) {
    this.columns.update((cols) => {
      const col = cols.find((c) => c.id === status)!;
      col.tasks = col.tasks.filter((t) => t.id !== taskId);
      return [...cols];
    });
  }

  reorderTask(status: TaskStatus, from: number, to: number) {
    this.columns.update((cols) => {
      const col = cols.find((c) => c.id === status)!;
      moveItemInArray(col.tasks, from, to);
      return [...cols];
    });
  }
}
