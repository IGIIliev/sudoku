// auth-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SudokuStateModel } from '../models/sudoku-state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private sudokuBoardSubject = new BehaviorSubject<SudokuStateModel | null>(null);
  public sudokuBoard$: Observable<any> = this.sudokuBoardSubject.asObservable();

  setSudokuState(newState: SudokuStateModel): void {
    this.sudokuBoardSubject.next(newState);
  }

  get getSudokuState(): SudokuStateModel | null {
    return this.sudokuBoardSubject.value;
  }
}
