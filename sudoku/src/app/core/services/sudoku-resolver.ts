// user.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SudocuService } from './services/sudocu.service';
import { StateService } from '../state/state.service';

@Injectable({ providedIn: 'root' })
export class SudokuResolver implements Resolve<any> {
  constructor(private sudokuService: SudocuService, private state: StateService) {}

  resolve(): Observable<any> {
    const difficulty = this.state.getSudokuState?.difficulty;
    return this.sudokuService.getBoard(difficulty!);
  }
}
