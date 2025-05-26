import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import * as complexityEnum from '../../core/models/enums/complexityLevel.enum';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user: string = '';
  levels = Object.values(complexityEnum.ComplexityEnum);
  selectedDificalty: complexityEnum.ComplexityEnum | null = null;

  constructor(private router: Router) {

  }

  navigateToSingleplayer() {
    if (this.selectedDificalty) {
      this.router.navigate(['//play-alone', { name: this.user, dificalty: this.selectedDificalty, isMultyplayer: false }]);
    }
    else {
      alert('select dificalty level first')
    }
  }

  navigateToMultiplayer() {
    if (this.user) {
      this.router.navigate(['/multiplayer', { name: this.user, dificalty: this.selectedDificalty, isMultyplayer: true }]);
    }
    else {
      alert('must type user name first')
    }
  }

  onDifficultyChange(value: complexityEnum.ComplexityEnum) {
    console.log('Selected difficulty:', value);
    this.selectedDificalty = value;
  }
}
