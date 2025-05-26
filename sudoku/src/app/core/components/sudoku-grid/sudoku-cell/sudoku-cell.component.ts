import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { SocketService } from '../../../services/services/socket/socket.service';
import { SudokuCellModel } from '../../../models/sudoku-cell.model';

@Component({
  standalone: true,
  selector: 'app-sudoku-cell',
  imports: [CommonModule, MatMenuModule, MatSelectModule, FormsModule],
  templateUrl: './sudoku-cell.component.html',
  styleUrl: './sudoku-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuCellComponent {
  @Input() cellValue!: SudokuCellModel;
  @Output() cellValueChanged = new EventEmitter<any>();

  list: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(
    public socket: SocketService
  ) { }

  onSelectionChange(newValue: any) {
    this.cellValueChanged.emit(
      {
        value: newValue,
        oldCoordinates: this.cellValue.oldCoordinates,
        newCoordinates: this.cellValue.newCoordinates,
        enabled: this.cellValue.enabled
      }
    );
  }
}
