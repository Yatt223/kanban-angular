import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../../models/task';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card.component.html',
})
export class CardComponent {
  task = input.required<Task>();
  onDelete = output<string>();

  delete() {
    this.onDelete.emit(this.task().id);
  }
}
