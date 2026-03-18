import { Component, inject } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { ColumnComponent } from '../column/column.component';


@Component({
  selector: 'app-board',
  standalone:true,
  imports: [ColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  boardService = inject(BoardService);
  columns = this.boardService.getColumns();

}
