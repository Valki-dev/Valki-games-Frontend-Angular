import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "games", loadChildren: () => import('./games/games.module').then(response => response.GamesModule)},
  {path: "user", loadChildren: () => import('./users/users.module').then(response => response.UsersModule)},
  {path: "error", loadChildren: () => import('./error/error.module').then(response => response.ErrorModule)},
  {path: "**", redirectTo: "games"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
