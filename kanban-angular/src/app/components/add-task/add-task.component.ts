import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoardService } from '../../services/board.service';
import { TaskStatus } from '../../models/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent {
  status = input.required<TaskStatus>();
  boardService = inject(BoardService);

  title = '';
  isOpen = false;

  open() { this.isOpen = true; }
  cancel() { this.isOpen = false; this.title = ''; }

  submit() {
    if (this.title.trim()) {
      this.boardService.addTask(this.title.trim(), this.status());
      this.title = '';
      this.isOpen = false;
    }
  }
}