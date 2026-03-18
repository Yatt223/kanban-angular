import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Column, TaskStatus } from '../../models/task';
import { CardComponent } from '../card/card.component';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './column.component.html',
})
export class ColumnComponent {
  column = input.required<Column>();
  boardService = inject(BoardService);

  deleteTask(taskId: string) {
    this.boardService.deleteTask(taskId, this.column().id as TaskStatus);
  }
}
