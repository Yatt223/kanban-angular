import { Component, inject } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { ColumnComponent } from '../column/column.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ColumnComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent {
  boardService = inject(BoardService);
  columns = this.boardService.getColumns();

  reset() {
    if (confirm('Remettre le board à zéro ?')) {
      this.boardService.resetBoard();
    }
  }
}