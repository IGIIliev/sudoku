import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import * as complexityEnum from '../../core/models/enums/complexityLevel.enum';
import { StateService } from '../../core/state/state.service';
import { SudokuStateModel } from '../../core/models/sudoku-state.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule, 
    MatCardModule, 
    MatButtonModule, 
    RouterModule, 
    MatIconModule, 
    MatInputModule, 
    MatSelectModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user: string = '';
  levels = Object.values(complexityEnum.ComplexityEnum);
  selectedDifficulty: complexityEnum.ComplexityEnum | null = null;
  currentState: SudokuStateModel | null = null;
  homeForm: FormGroup = new FormGroup({});

  compareByCode = (a: any, b: any): boolean => a?.code === b?.code;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private state: StateService
  ) {
    this.initializeForm();
    this.currentState = this.state.getSudokuState;

    this.homeForm.get('user')?.valueChanges.subscribe(value => {
      this.user = value;
      this.currentState = {
        userName: value,
        difficulty: this.selectedDifficulty,
        board: []
      }
      this.state.setSudokuState(this.currentState);
    });

    this.homeForm.get('difficulty')?.valueChanges.subscribe(value => {
      this.selectedDifficulty = value;
      this.currentState = {
        userName: this.user,
        difficulty: value,
        board: []
      }
      this.state.setSudokuState(this.currentState);
    });

    if(this.currentState) {
        this.homeForm.controls['user'].setValue(this.currentState!.userName);
        this.homeForm.controls['difficulty'].setValue({code: this.currentState!.difficulty});
      } 
  }

  navigateToSingleplayer() {
    if (this.homeForm.valid) {
      this.router.navigate(['/single-player', { isMultyplayer: false }]);
    } else {
      this.homeForm.markAllAsTouched(); // To show errors
    }
  }

  navigateToMultiplayer() {
    if (this.homeForm.valid) {
      this.router.navigate(['/multiplayer', { isMultyplayer: true }]);
    } else {
      this.homeForm.markAllAsTouched(); // To show errors
    }
  }

  onDifficultyChange(value: complexityEnum.ComplexityEnum) {
    this.selectedDifficulty = value;
    this.currentState = {
      userName: this.user,
      difficulty: value,
      board: []
    }
    this.state.setSudokuState(this.currentState);
  }

  private initializeForm(): void {
    this.homeForm = this.fb.group({
      user: ['', Validators.required],
      difficulty: ['', Validators.required]
    });
  }
}
