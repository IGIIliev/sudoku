import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MultiplayerComponent } from './core/components/multiplayer/multiplayer.component';
import { SudokuGridComponent } from './core/components/sudoku-grid/sudoku-grid.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "multiplayer", component: MultiplayerComponent },
    { path: "play-alone", component: SudokuGridComponent },
];
