import { Injectable, signal, effect } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Column, Task, TaskStatus } from '../models/task';

const STORAGE_KEY = 'kanban-board';

const DEFAULT_COLUMNS: Column[] = [
  {
    id: 'todo',
    title: '📋 À faire',
    color: 'indigo',
    tasks: [
      { id: '1', title: 'Setup projet', status: 'todo', createdAt: new Date() },
      { id: '2', title: 'Créer les composants', status: 'todo', createdAt: new Date() },
    ]
  },
  {
    id: 'in-progress',
    title: '⚙️ En cours',
    color: 'amber',
    tasks: [
      { id: '3', title: 'Intégrer Tailwind', status: 'in-progress', createdAt: new Date() },
    ]
  },
  {
    id: 'done',
    title: '✅ Terminé',
    color: 'emerald',
    tasks: [
      { id: '4', title: 'Initialiser Angular', status: 'done', createdAt: new Date() },
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class BoardService {
  private columns = signal<Column[]>(this.loadFromStorage());

  constructor() {
    // Sauvegarde automatique à chaque changement
    effect(() => {
      this.saveToStorage(this.columns());
    });
  }

  // --- Storage ---

  private loadFromStorage(): Column[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_COLUMNS;

      const parsed = JSON.parse(raw) as Column[];

      // Rehydrate les dates (JSON.parse retourne des strings)
      return parsed.map(col => ({
        ...col,
        tasks: col.tasks.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }))
      }));
    } catch {
      return DEFAULT_COLUMNS;
    }
  }

  private saveToStorage(columns: Column[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    } catch {
      console.error('Erreur sauvegarde localStorage');
    }
  }

  // --- API publique ---

  getColumns() {
    return this.columns;
  }

  moveTask(taskId: string, fromStatus: TaskStatus, toStatus: TaskStatus) {
    this.columns.update(cols => {
      const from = cols.find(c => c.id === fromStatus)!;
      const to = cols.find(c => c.id === toStatus)!;
      const task = from.tasks.find(t => t.id === taskId)!;
      from.tasks = from.tasks.filter(t => t.id !== taskId);
      task.status = toStatus;
      to.tasks = [...to.tasks, task];
      return [...cols];
    });
  }

  reorderTask(status: TaskStatus, from: number, to: number) {
    this.columns.update(cols => {
      const col = cols.find(c => c.id === status)!;
      moveItemInArray(col.tasks, from, to);
      return [...cols];
    });
  }

  addTask(title: string, status: TaskStatus = 'todo') {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      status,
      createdAt: new Date()
    };
    this.columns.update(cols => {
      cols.find(c => c.id === status)!.tasks.push(task);
      return [...cols];
    });
  }

  deleteTask(taskId: string, status: TaskStatus) {
    this.columns.update(cols => {
      const col = cols.find(c => c.id === status)!;
      col.tasks = col.tasks.filter(t => t.id !== taskId);
      return [...cols];
    });
  }

  resetBoard() {
    localStorage.removeItem(STORAGE_KEY);
    this.columns.set(DEFAULT_COLUMNS);
  }
}