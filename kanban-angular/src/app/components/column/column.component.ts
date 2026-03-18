import { Column } from './../../models/task';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  column = input.required<Column>();
}
