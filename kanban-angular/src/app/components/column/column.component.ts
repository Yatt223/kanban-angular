import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CdkDropList, CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Column, TaskStatus } from '../../models/task';
import { CardComponent } from '../card/card.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CardComponent, DatePipe, CdkDropList, CdkDrag, AddTaskComponent],
  templateUrl: './column.component.html',
})
export class ColumnComponent {
  column = input.required<Column>();
  boardService = inject(BoardService);

  deleteTask(taskId: string) {
    this.boardService.deleteTask(taskId, this.column().id as TaskStatus);
  }

  onDrop(event: CdkDragDrop<TaskStatus>) {
    if (event.previousContainer !== event.container) {
      this.boardService.moveTask(
        event.item.data,
        event.previousContainer.data,
        event.container.data
      );
    } else {
      this.boardService.reorderTask(
        this.column().id as TaskStatus,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}