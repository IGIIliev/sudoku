import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MultiplayerGameComponent } from './pages/multiplayer/multiplayer-game.component';
import { SinglePlayerComponent } from './pages/single-player/single-player-game.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "home", component: HomeComponent },
    { path: "multiplayer", component: MultiplayerGameComponent },
    { path: "single-player", component: SinglePlayerComponent },
];
